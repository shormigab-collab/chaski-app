import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";

// El profesional puede borrar sus propias publicaciones; el admin, cualquiera.
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const pub = await prisma.publicacion.findUnique({ where: { id: params.id } });
  if (!pub) return NextResponse.json({ error: "No existe" }, { status: 404 });

  const esDueno = usuario.role === "PROVEEDOR" && usuario.proveedor?.id === pub.proveedorId;
  if (!esDueno && usuario.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  await prisma.publicacion.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
