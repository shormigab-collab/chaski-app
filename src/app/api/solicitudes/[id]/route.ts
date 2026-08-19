import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";

const esquemaEdicion = z.object({
  categoriaId: z.string().min(1),
  titulo: z.string().min(3),
  descripcion: z.string().min(10),
  ciudad: z.string().min(2),
  presupuesto: z.string().optional(),
  presupuestoMoneda: z.enum(["COP", "USD", "EUR"]).default("COP"),
  telefonoContacto: z.string().min(6),
  preferenciaContacto: z.enum(["TELEFONO", "CORREO", "AMBOS"]).default("AMBOS"),
});

// Edita una solicitud ya publicada. Solo el cliente dueño de la solicitud
// puede editarla.
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "CLIENTE") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const solicitud = await prisma.solicitud.findUnique({ where: { id: params.id } });
  if (!solicitud || solicitud.clienteId !== usuario.id) {
    return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = esquemaEdicion.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisa los campos del formulario" }, { status: 400 });
  }

  await prisma.solicitud.update({
    where: { id: params.id },
    data: parsed.data,
  });

  return NextResponse.json({ ok: true });
}
