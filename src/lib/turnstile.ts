// Verificacion de Cloudflare Turnstile (captcha casi invisible) en el
// servidor. Si no hay TURNSTILE_SECRET_KEY configurada (por ejemplo en
// desarrollo local, o antes de crear las claves en Cloudflare), la
// verificacion se OMITE y el formulario funciona normal: asi el sitio
// nunca se rompe por falta de configuracion. En cuanto se agrega la
// clave en Vercel, la proteccion se activa sola.
export async function verificarTurnstile(token: unknown, ip?: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  if (typeof token !== "string" || token.length === 0) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    // Si Cloudflare no responde, se bloquea por seguridad.
    return false;
  }
}

export function ipDeSolicitud(req: Request): string | null {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip");
}

export const MENSAJE_CAPTCHA = "No pudimos verificar que eres una persona. Recarga la página e inténtalo de nuevo.";
