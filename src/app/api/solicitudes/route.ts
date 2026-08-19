import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";

const esquema = z.object({
  categoriaId: z.string().min(1),
  titulo: z.string().min(3),
  descripcion: z.string().min(10),
  ciudad: z.string().min(2),
  presupuesto: z.string().optional(),
  telefonoContacto: z.string().min(6),
  preferenciaContacto: z.enum(["TELEFONO", "CORREO", "AMBOS"]).default("AMBOS"),
});

export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "CLIENTE") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisa los campos del formulario" }, { status: 400 });
  }

  const solicitud = await prisma.solicitud.create({
    data: {
      ...parsed.data,
      clienteId: usuario.id,
    },
  });

  return NextResponse.json({ ok: true, id: solicitud.id });
}
