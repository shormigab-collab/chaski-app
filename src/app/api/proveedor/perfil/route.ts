import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";

const esquema = z.object({
  nombre: z.string().min(2),
  telefono: z.string().min(6),
  ciudad: z.string().min(2),
  bio: z.string().optional(),
  fotoUrl: z.string().optional(),
  categoriaIds: z.array(z.string()).min(1),
});

export async function PUT(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisa los campos" }, { status: 400 });
  }
  const data = parsed.data;

  await prisma.user.update({
    where: { id: usuario.id },
    data: { nombre: data.nombre, telefono: data.telefono, ciudad: data.ciudad },
  });

  await prisma.proveedor.update({
    where: { id: usuario.proveedor.id },
    data: {
      bio: data.bio,
      fotoUrl: data.fotoUrl,
      categorias: { set: data.categoriaIds.map((id) => ({ id })) },
    },
  });

  return NextResponse.json({ ok: true });
}
