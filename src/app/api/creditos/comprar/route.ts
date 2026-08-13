import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";
import { crearPreferencia } from "@/lib/mercadopago";

const esquema = z.object({ paqueteId: z.string().min(1) });

export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Paquete inválido" }, { status: 400 });
  }

  const paquete = await prisma.paqueteCreditos.findUnique({ where: { id: parsed.data.paqueteId } });
  if (!paquete || !paquete.activo) {
    return NextResponse.json({ error: "Paquete no disponible" }, { status: 404 });
  }

  const transaccion = await prisma.transaccion.create({
    data: {
      userId: usuario.id,
      creditos: paquete.creditos,
      montoCOP: paquete.precioCOP,
      estado: "PENDIENTE",
    },
  });

  try {
    const preferencia = await crearPreferencia(
      { title: `${paquete.nombre} (${paquete.creditos} créditos)`, quantity: 1, unit_price: paquete.precioCOP },
      transaccion.id
    );

    await prisma.transaccion.update({
      where: { id: transaccion.id },
      data: { mpPreferenceId: preferencia.id },
    });

    return NextResponse.json({ ok: true, initPoint: preferencia.init_point });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error iniciando el pago" },
      { status: 500 }
    );
  }
}
