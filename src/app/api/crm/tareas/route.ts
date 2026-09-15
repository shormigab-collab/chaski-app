import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual, esEquipoCrm } from "@/lib/auth";

// "as any": ver nota en /api/crm/contactos/route.ts
const db = prisma as any;

const esquemaCrear = z.object({
  contactoId: z.string().trim().min(1),
  titulo: z.string().trim().min(2),
  fechaLimite: z.string().trim().optional().or(z.literal("")),
});

// Vista global de tareas (todas las pendientes, de todos los contactos),
// para la pagina /crm/tareas.
export async function GET() {
  const usuario = await obtenerUsuarioActual();
  if (!esEquipoCrm(usuario)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const tareas = await db.crmTarea.findMany({
    where: { completada: false },
    include: { contacto: true },
    orderBy: [{ fechaLimite: "asc" }, { createdAt: "asc" }],
  });

  return NextResponse.json({ tareas });
}

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

  const tarea = await db.crmTarea.create({
    data: {
      contactoId: data.contactoId,
      titulo: data.titulo,
      fechaLimite: data.fechaLimite ? new Date(data.fechaLimite) : undefined,
    },
  });

  return NextResponse.json({ ok: true, tarea });
}
