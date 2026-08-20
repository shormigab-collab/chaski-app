import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";
import { calcularCostoCreditos } from "@/lib/creditos";

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

  // El costo en creditos escala segun el presupuesto de la solicitud (1-3
  // creditos): a mas presupuesto, mas vale la pena el lead, mas cuesta.
  const costo = calcularCostoCreditos(solicitud.presupuesto, solicitud.presupuestoMoneda);

  if (usuario.proveedor.creditos < costo) {
    return NextResponse.json(
      {
        error: `Esta solicitud cuesta ${costo} crédito${costo === 1 ? "" : "s"} y no tienes suficientes. Compra más créditos para continuar.`,
      },
      { status: 402 }
    );
  }

  // Transaccion: descuenta el costo y registra el desbloqueo de forma atomica
  await prisma.$transaction([
    prisma.proveedor.update({
      where: { id: usuario.proveedor.id },
      data: { creditos: { decrement: costo } },
    }),
    prisma.desbloqueo.create({
      data: {
        proveedorId: usuario.proveedor.id,
        solicitudId: solicitud.id,
        creditosUsados: costo,
      },
    }),
  ]);

  return NextResponse.json({ ok: true, costo });
}
