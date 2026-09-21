// Plantillas de correo para prospección. Generan un link "mailto:" con
// todo pre-llenado (asunto + cuerpo), para que el correo salga desde la
// bandeja real de quien lo envía (Gmail/Mail) en vez de mandarlo desde el
// backend de chaski — evita cualquier riesgo de reputación del dominio
// por enviar correo frío en volumen desde el mismo dominio que manda
// correos transaccionales (recuperar contraseña, etc.).

function primerNombre(nombreCompleto: string) {
  return nombreCompleto.trim().split(/\s+/)[0] || nombreCompleto;
}

export function plantillaEs(nombre: string) {
  const n = primerNombre(nombre);
  const asunto = "¿Ayuda para contratar freelancers en Latinoamérica?";
  const cuerpo = `Hola ${n},

Te escribo porque vi que tu negocio podría necesitar apoyo de un profesional independiente (diseño, desarrollo, marketing, soporte, etc.), y quería contarte sobre chaski: publicas lo que necesitas gratis y profesionales de Latinoamérica te escriben directamente, sin bidding wars ni intermediarios.

Si te sirve, aquí puedes ver cómo funciona: https://www.usechaski.com/como-funciona

Cualquier duda, con gusto te ayudo.

Saludos,
`;
  return { asunto, cuerpo };
}

export function plantillaEn(nombre: string) {
  const n = primerNombre(nombre);
  const asunto = "Hiring freelance talent in Latin America?";
  const cuerpo = `Hi ${n},

I noticed your business might benefit from freelance support (development, design, marketing, VA work, etc.), and wanted to introduce chaski: you post what you need for free and vetted professionals across Latin America reach out to you directly — no bidding wars, no middleman commission.

If it's helpful, here's a quick overview: https://www.usechaski.com/en

Happy to answer any questions.

Best,
`;
  return { asunto, cuerpo };
}

export function construirMailto(email: string, asunto: string, cuerpo: string) {
  const params = new URLSearchParams({ subject: asunto, body: cuerpo });
  return `mailto:${email}?${params.toString()}`;
}
