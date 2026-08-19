import { Resend } from "resend";

// RESEND_API_KEY se configura en las variables de entorno (ver .env.example
// y las instrucciones de configuracion). Si todavia no esta configurada, no
// tronamos la app entera: solo el envio de correos falla silenciosamente y
// queda registrado en los logs del servidor, para no bloquear el resto del
// sitio mientras se activa el servicio de correo.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Direccion "from" verificada en Resend. Mientras no se verifique el
// dominio usechaski.com en Resend, hay que usar "onboarding@resend.dev"
// (la direccion de prueba que Resend da gratis) o los correos no salen.
const FROM = process.env.RESEND_FROM_EMAIL || "chaski <onboarding@resend.dev>";

function envolverPlantilla(tituloInterno: string, cuerpoHtml: string) {
  return `
  <div style="background:#FFF9F4;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #E7E2EF;">
      <div style="background:#3B2F8F;padding:24px 32px;">
        <span style="color:#FFF9F4;font-weight:800;font-size:20px;letter-spacing:-0.02em;">chaski</span>
      </div>
      <div style="padding:32px;">
        ${cuerpoHtml}
      </div>
      <div style="padding:20px 32px;border-top:1px solid #E7E2EF;">
        <p style="color:#8A8499;font-size:12px;margin:0;">${tituloInterno}</p>
      </div>
    </div>
  </div>`;
}

// Direccion donde caen los casos escalados desde el widget de chat. Mientras
// no exista un buzon dedicado (ej. soporte@usechaski.com), por defecto cae
// en el correo del propio Sebas para que nada se pierda; se puede cambiar
// con la variable de entorno SUPPORT_EMAIL en cualquier momento.
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "samuel@provintechus.com";

export async function enviarCorreoEscalamientoSoporte(datos: {
  nombre: string;
  correo: string;
  mensaje: string;
  transcripcion: { role: "user" | "assistant"; content: string }[];
}) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY no configurada, no se envio el escalamiento de soporte de", datos.correo);
    return { ok: false, error: "RESEND_API_KEY no configurada" };
  }

  const transcripcionHtml = datos.transcripcion
    .map(
      (m) =>
        `<p style="margin:0 0 8px;font-size:13px;color:${m.role === "user" ? "#17133A" : "#6B6484"};">
          <strong>${m.role === "user" ? "Usuario" : "Asistente"}:</strong> ${m.content.replace(/</g, "&lt;")}
        </p>`
    )
    .join("");

  const html = envolverPlantilla(
    "Caso escalado desde el chat de soporte de usechaski.com",
    `
      <h1 style="color:#17133A;font-size:20px;margin:0 0 12px;">Nuevo caso escalado desde el chat</h1>
      <p style="color:#4A4560;font-size:14px;line-height:1.6;margin:0 0 4px;"><strong>Nombre:</strong> ${datos.nombre}</p>
      <p style="color:#4A4560;font-size:14px;line-height:1.6;margin:0 0 16px;"><strong>Correo:</strong> ${datos.correo}</p>
      <p style="color:#17133A;font-size:14px;line-height:1.6;margin:0 0 8px;"><strong>Mensaje:</strong></p>
      <p style="color:#4A4560;font-size:14px;line-height:1.6;margin:0 0 20px;white-space:pre-wrap;">${datos.mensaje.replace(/</g, "&lt;")}</p>
      ${
        datos.transcripcion.length > 0
          ? `<p style="color:#17133A;font-size:14px;margin:0 0 8px;"><strong>Conversación previa con el asistente:</strong></p>
             <div style="background:#F7F5FC;border-radius:12px;padding:16px;">${transcripcionHtml}</div>`
          : ""
      }
    `
  );

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: SUPPORT_EMAIL,
      replyTo: datos.correo,
      subject: `Soporte chaski: ${datos.nombre}`,
      html,
    });
    if (error) {
      console.error("[email] error al enviar escalamiento de soporte:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] excepcion al enviar escalamiento de soporte:", err);
    return { ok: false, error: "No se pudo enviar el correo" };
  }
}

export async function enviarCorreoRecuperacion(email: string, nombre: string, resetUrl: string) {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY no configurada, no se envio el correo de recuperacion a", email);
    return { ok: false, error: "RESEND_API_KEY no configurada" };
  }

  const html = envolverPlantilla(
    "chaski · Marketplace profesional de Latinoamérica",
    `
      <h1 style="color:#17133A;font-size:20px;margin:0 0 12px;">Recupera tu contraseña</h1>
      <p style="color:#4A4560;font-size:14px;line-height:1.6;margin:0 0 24px;">
        Hola ${nombre || ""}, recibimos una solicitud para restablecer la contraseña de tu cuenta en chaski.
        Si fuiste tú, dale clic al botón de abajo (el enlace vence en 1 hora).
      </p>
      <a href="${resetUrl}" style="display:inline-block;background:#29206F;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 24px;border-radius:12px;">
        Crear nueva contraseña
      </a>
      <p style="color:#8A8499;font-size:12px;line-height:1.6;margin:24px 0 0;">
        Si tú no pediste esto, ignora este correo — tu contraseña actual sigue siendo válida.
      </p>
    `
  );

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Recupera tu contraseña en chaski",
      html,
    });
    if (error) {
      console.error("[email] error al enviar correo de recuperacion:", error);
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] excepcion al enviar correo de recuperacion:", err);
    return { ok: false, error: "No se pudo enviar el correo" };
  }
}
