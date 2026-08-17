import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

const esquema = z.object({
  token: z.string().min(10),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { resetToken: parsed.data.token } });

  if (!user || !user.resetTokenExpiraEn || user.resetTokenExpiraEn < new Date()) {
    return NextResponse.json(
      { error: "Este enlace ya no es válido. Pide uno nuevo desde 'Olvidé mi contraseña'." },
      { status: 400 }
    );
  }

  const passwordHash = await hashPassword(parsed.data.password);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash, resetToken: null, resetTokenExpiraEn: null },
  });

  return NextResponse.json({ ok: true });
}
