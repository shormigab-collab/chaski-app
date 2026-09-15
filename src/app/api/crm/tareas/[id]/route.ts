import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual, esEquipoCrm } from "@/lib/auth";

// "as any": ver nota en /api/crm/contactos/route.ts
const db = prisma as any;

const esquemaEditar = z.object({
  completada: z.boolean().optional(),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const usuario = await obtenerUsuarioActual();
  if (!esEquipoCrm(usuario)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = params;

  const body = await req.json();
  const parsed = esquemaEditar.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const tarea = await db.crmTarea.update({
    where: { id },
    data: { ...(parsed.data.completada !== undefined ? { completada: parsed.data.completada } : {}) },
  });

  return NextResponse.json({ ok: true, tarea });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const usuario = await obtenerUsuarioActual();
  if (!esEquipoCrm(usuario)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = params;

  await db.crmTarea.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
