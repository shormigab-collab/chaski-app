import { NextResponse } from "next/server";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  await prisma.reporte.update({
    where: { id: params.id },
    data: { estado: "REVISADO" },
  });

  return NextResponse.json({ ok: true });
}
