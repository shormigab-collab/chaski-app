import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashPassword, crearSesion } from "@/lib/auth";

const esquemaBase = z.object({
  role: z.enum(["CLIENTE", "PROVEEDOR"]),
  nombre: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  telefono: z.string().min(6),
  ciudad: z.string().min(2),
  bio: z.string().optional(),
  categoriaIds: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = esquemaBase.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const data = parsed.data;

  const existente = await prisma.user.findUnique({ where: { email: data.email } });
  if (existente) {
    return NextResponse.json({ error: "Ya existe una cuenta con ese correo" }, { status: 409 });
  }

  if (data.role === "PROVEEDOR" && (!data.categoriaIds || data.categoriaIds.length === 0)) {
    return NextResponse.json({ error: "Selecciona al menos una categoría" }, { status: 400 });
  }

  const passwordHash = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      passwordHash,
      telefono: data.telefono,
      ciudad: data.ciudad,
      role: data.role,
      ...(data.role === "PROVEEDOR"
        ? {
            proveedor: {
              create: {
                bio: data.bio,
                categorias: { connect: data.categoriaIds!.map((id) => ({ id })) },
              },
            },
          }
        : {}),
    },
  });

  await crearSesion({ userId: user.id, role: user.role });

  return NextResponse.json({ ok: true, role: user.role });
}
