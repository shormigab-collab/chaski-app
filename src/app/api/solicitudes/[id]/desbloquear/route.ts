import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const solicitud = await prisma.solicitud.findUnique({ where: { id: params.id } });
  if (!solicitud) {
    return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });
  }

  const yaDesbloqueada = await prisma.desbloqueo.findUnique({
    where: {
      proveedorId_solicitudId: {
        proveedorId: usuario.proveedor.id,
        solicitudId: solicitud.id,
      },
    },
  });
  if (yaDesbloqueada) {
    return NextResponse.json({ ok: true, yaDesbloqueada: true });
  }

  if (usuario.proveedor.creditos < 1) {
    return NextResponse.json(
      { error: "No tienes créditos suficientes. Compra más créditos para continuar." },
      { status: 402 }
    );
  }

  // Transaccion: descuenta 1 credito y registra el desbloqueo de forma atomica
  await prisma.$transaction([
    prisma.proveedor.update({
      where: { id: usuario.proveedor.id },
      data: { creditos: { decrement: 1 } },
    }),
    prisma.desbloqueo.create({
      data: {
        proveedorId: usuario.proveedor.id,
        solicitudId: solicitud.id,
        creditosUsados: 1,
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
