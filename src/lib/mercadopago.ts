// Integracion con Mercado Pago (Checkout Pro).
// Necesitas MERCADOPAGO_ACCESS_TOKEN en tu .env (lo obtienes en
// https://www.mercadopago.com/developers/panel/app).
// Mientras no lo configures, esta funcion lanzara un error controlado
// y la pagina de creditos mostrara un aviso en vez de romperse.

type PreferenceItem = {
  title: string;
  quantity: number;
  unit_price: number;
};

export async function crearPreferencia(item: PreferenceItem, externalReference: string) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken || accessToken.startsWith("TEST-xxxx")) {
    throw new Error(
      "Mercado Pago no esta configurado todavia. Agrega MERCADOPAGO_ACCESS_TOKEN en tu archivo .env"
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      items: [{ ...item, currency_id: "COP" }],
      external_reference: externalReference,
      back_urls: {
        success: `${baseUrl}/proveedor/creditos?estado=exito`,
        failure: `${baseUrl}/proveedor/creditos?estado=fallo`,
        pending: `${baseUrl}/proveedor/creditos?estado=pendiente`,
      },
      notification_url: `${baseUrl}/api/webhooks/mercadopago`,
      auto_return: "approved",
    }),
  });

  if (!res.ok) {
    const detalle = await res.text();
    throw new Error(`Error creando preferencia de pago: ${detalle}`);
  }

  return res.json() as Promise<{ id: string; init_point: string }>;
}
