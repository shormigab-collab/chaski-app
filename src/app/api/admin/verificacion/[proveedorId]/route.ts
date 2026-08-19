import { NextResponse } from "next/server";
import { z } from "zod";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";

const esquema = z.object({
  accion: z.enum(["APROBAR", "RECHAZAR"]),
});

export async function POST(req: Request, { params }: { params: { proveedorId: string } }) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const aprobado = parsed.data.accion === "APROBAR";

  await prisma.proveedor.update({
    where: { id: params.proveedorId },
    data: {
      verificado: aprobado,
      estadoVerificacion: aprobado ? "APROBADO" : "RECHAZADO",
    } as any,
  });

  return NextResponse.json({ ok: true });
}
