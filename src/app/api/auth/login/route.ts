import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { verifyPassword, crearSesion } from "@/lib/auth";
import { limitarPorIp } from "@/lib/rateLimit";
import { verificarTurnstile, ipDeSolicitud, MENSAJE_CAPTCHA } from "@/lib/turnstile";

const esquema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  // Maximo 10 intentos por IP cada 10 minutos (frena adivinar contraseñas).
  if (!limitarPorIp(`login:${ipDeSolicitud(req) ?? "anon"}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Demasiados intentos. Espera unos minutos." }, { status: 429 });
  }
  const body = await req.json();
  if (!(await verificarTurnstile(body?.turnstileToken, ipDeSolicitud(req)))) {
    return NextResponse.json({ error: MENSAJE_CAPTCHA }, { status: 400 });
  }
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const passwordOk = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!passwordOk) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  await crearSesion({ userId: user.id, role: user.role as "CLIENTE" | "PROVEEDOR" | "ADMIN" | "EQUIPO" });

  return NextResponse.json({ ok: true, role: user.role });
}
