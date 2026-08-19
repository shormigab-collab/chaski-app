// Enmascara telefono/correo para mostrarle al proveedor una vista previa
// del contacto ANTES de gastar el credito para destaparlo (mismo patron
// que usan otros marketplaces de leads). Solo se usa en el servidor: el
// valor completo nunca se manda al navegador si la solicitud todavia no
// esta desbloqueada por ese proveedor.

export function enmascararTelefono(telefono: string): string {
  const limpio = telefono.trim();
  if (limpio.length <= 4) return "*".repeat(limpio.length);
  return `${limpio.slice(0, 3)} ***-****`;
}

export function enmascararCorreo(correo: string): string {
  const [usuario, dominio] = correo.split("@");
  if (!usuario || !dominio) return correo;

  const enmascararParte = (parte: string) => {
    if (parte.length <= 2) return `${parte[0]}*`;
    return `${parte[0]}${"*".repeat(Math.max(parte.length - 2, 3))}${parte[parte.length - 1]}`;
  };

  const [nombreDominio, ...resto] = dominio.split(".");
  const dominioFinal =
    resto.length > 0
      ? `${enmascararParte(nombreDominio)}.${resto.join(".")}`
      : enmascararParte(nombreDominio);

  return `${enmascararParte(usuario)}@${dominioFinal}`;
}
