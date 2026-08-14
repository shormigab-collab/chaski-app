export const metadata = { title: "Centro de ayuda | chaski" };

export default function AyudaPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-ink mb-8">Centro de ayuda</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">¿Cómo publico una solicitud?</h2>
          <p className="text-ink/60">
            Crea una cuenta gratis como cliente, describe qué necesitas en tres pasos, y los profesionales
            interesados te contactarán directamente. No tiene ningún costo.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">¿Cómo funcionan los créditos para profesionales?</h2>
          <p className="text-ink/60">
            Cada profesional recibe créditos de bienvenida al crear su perfil. Desbloquear el contacto de un
            cliente cuesta 1 crédito. Puedes comprar más créditos desde tu panel cuando los necesites.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">¿Necesitas más ayuda?</h2>
          <p className="text-ink/60">
            Escríbenos a{" "}
            <a href="mailto:soporte@usechaski.com" className="text-brand-500 font-medium hover:text-brand-600">
              soporte@usechaski.com
            </a>{" "}
            y te respondemos lo antes posible.
          </p>
        </div>
      </div>
    </div>
  );
}
