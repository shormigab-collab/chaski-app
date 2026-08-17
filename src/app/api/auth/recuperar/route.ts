import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { enviarCorreoRecuperacion } from "@/lib/email";

const esquema = z.object({
  email: z.string().email(),
});

const MENSAJE_GENERICO = {
  ok: true,
  mensaje: "Si ese correo tiene una cuenta en chaski, te enviamos un enlace para recuperar tu contraseña.",
};

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Correo inválido" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });

  // Respondemos siempre lo mismo, exista o no la cuenta — asi no revelamos
  // que correos estan registrados en la plataforma (buena practica de
  // seguridad basica para este tipo de formularios).
  if (!user) {
    return NextResponse.json(MENSAJE_GENERICO);
  }

  const token = randomBytes(32).toString("hex");
  const expiraEn = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExpiraEn: expiraEn },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/restablecer?token=${token}`;

  await enviarCorreoRecuperacion(user.email, user.nombre, resetUrl);

  return NextResponse.json(MENSAJE_GENERICO);
}
