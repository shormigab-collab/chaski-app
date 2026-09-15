import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual, esEquipoCrm } from "@/lib/auth";

// "as any": ver nota en /api/crm/contactos/route.ts
const db = prisma as any;

const esquemaCrear = z.object({
  contactoId: z.string().trim().min(1),
  tipo: z.enum(["NOTA", "LLAMADA", "CORREO", "REUNION"]),
  contenido: z.string().trim().min(1).max(2000),
});

export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!esEquipoCrm(usuario)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = esquemaCrear.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const data = parsed.data;

  const actividad = await db.crmActividad.create({
    data: {
      contactoId: data.contactoId,
      tipo: data.tipo,
      contenido: data.contenido,
      autorId: usuario!.id,
    },
  });

  // Tocamos "updatedAt" del contacto para que suba en las listas ordenadas
  // por actividad reciente.
  await db.crmContacto.update({ where: { id: data.contactoId }, data: {} });

  return NextResponse.json({ ok: true, actividad });
}
