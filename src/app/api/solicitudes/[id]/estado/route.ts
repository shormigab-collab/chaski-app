import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";

const esquema = z.object({
  estado: z.enum(["ABIERTA", "CERRADA"]),
});

// Permite al cliente dueño cerrar una solicitud ya cubierta (o reabrirla),
// sin tener que editar el resto de los campos.
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "CLIENTE") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const solicitud = await prisma.solicitud.findUnique({ where: { id: params.id } });
  if (!solicitud || solicitud.clienteId !== usuario.id) {
    return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  await prisma.solicitud.update({
    where: { id: params.id },
    data: { estado: parsed.data.estado },
  });

  return NextResponse.json({ ok: true });
}
