import { NextResponse } from "next/server";
import { z } from "zod";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";

const esquema = z.object({
  tipo: z.enum(["PERFIL", "SOLICITUD"]),
  objetivoId: z.string().min(1),
  motivo: z.string().trim().min(5, "Cuéntanos un poco más").max(500),
});

export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Datos inválidos" }, { status: 400 });
  }

  await prisma.reporte.create({
    data: {
      tipo: parsed.data.tipo,
      objetivoId: parsed.data.objetivoId,
      motivo: parsed.data.motivo,
      reporterUserId: usuario.id,
    },
  });

  return NextResponse.json({ ok: true });
}
