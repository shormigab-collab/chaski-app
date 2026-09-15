import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual, hashPassword } from "@/lib/auth";

const esquema = z.object({
  nombre: z.string().trim().min(2),
  email: z.string().trim().email(),
  password: z.string().min(6),
});

// Solo un ADMIN puede crear cuentas de equipo (acceso al CRM interno).
export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const existente = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existente) {
    return NextResponse.json({ error: "Ya existe una cuenta con ese correo" }, { status: 409 });
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const miembro = await prisma.user.create({
    data: {
      nombre: parsed.data.nombre,
      email: parsed.data.email,
      passwordHash,
      role: "EQUIPO",
    },
  });

  return NextResponse.json({ ok: true, id: miembro.id });
}
