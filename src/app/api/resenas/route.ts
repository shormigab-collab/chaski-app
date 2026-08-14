import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";

const esquema = z.object({
  proveedorId: z.string().min(1),
  puntuacion: z.number().int().min(1).max(5),
  comentario: z.string().trim().max(500).optional(),
});

export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "CLIENTE") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const { proveedorId, puntuacion, comentario } = parsed.data;

  // Solo puede calificar a un proveedor que realmente desbloqueó una de sus
  // solicitudes (evita reseñas falsas de gente que nunca tuvo contacto real).
  const contactoReal = await prisma.desbloqueo.findFirst({
    where: {
      proveedorId,
      solicitud: { clienteId: usuario.id },
    },
  });
  if (!contactoReal) {
    return NextResponse.json(
      { error: "Solo puedes calificar profesionales que hayan contactado una de tus solicitudes" },
      { status: 403 }
    );
  }

  await prisma.resena.upsert({
    where: { proveedorId_autorId: { proveedorId, autorId: usuario.id } },
    update: { puntuacion, comentario: comentario || null },
    create: { proveedorId, autorId: usuario.id, puntuacion, comentario: comentario || null },
  });

  const agregado = await prisma.resena.aggregate({
    where: { proveedorId },
    _avg: { puntuacion: true },
    _count: true,
  });

  await prisma.proveedor.update({
    where: { id: proveedorId },
    data: {
      calificacionProm: agregado._avg.puntuacion || 0,
      totalResenas: agregado._count,
    },
  });

  return NextResponse.json({ ok: true });
}
