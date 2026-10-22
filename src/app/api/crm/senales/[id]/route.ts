import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual, esEquipoCrm } from "@/lib/auth";

const db = prisma as any;

const esquema = z.object({
  borrador: z.string().max(4000).optional(),
  borradorAprobado: z.boolean().optional(),
  contactoEmail: z.string().trim().max(200).optional(),
  contactoNombre: z.string().trim().max(120).optional(),
  contactoCargo: z.string().trim().max(120).optional(),
  notas: z.string().max(4000).optional(),
  estado: z.enum(["NUEVA", "DESCARTADA", "ENVIADA"]).optional(),
  // fecha de seguimiento (YYYY-MM-DD) o "" para quitarla
  seguimientoEn: z.string().optional(),
  seguimientoHecho: z.boolean().optional(),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const usuario = await obtenerUsuarioActual();
  if (!esEquipoCrm(usuario)) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const parsed = esquema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  const d = parsed.data;

  const actual = await db.senalEmpresa.findUnique({ where: { id: params.id } });
  if (!actual) return NextResponse.json({ error: "No existe" }, { status: 404 });

  const data: Record<string, unknown> = {};

  if (d.borrador !== undefined) {
    data.borrador = d.borrador;
    // si se edita el texto, hay que volver a aprobarlo
    if (d.borrador !== actual.borrador) data.borradorAprobado = false;
  }
  if (d.borradorAprobado !== undefined && d.borrador === undefined) data.borradorAprobado = d.borradorAprobado;
  if (d.contactoEmail !== undefined) data.contactoEmail = d.contactoEmail || null;
  if (d.contactoNombre !== undefined) data.contactoNombre = d.contactoNombre || null;
  if (d.contactoCargo !== undefined) data.contactoCargo = d.contactoCargo || null;
  if (d.notas !== undefined) data.notas = d.notas || null;

  if (d.estado !== undefined) {
    // Regla clave: no se puede marcar como enviada sin haber aprobado el borrador.
    if (d.estado === "ENVIADA" && !(actual.borradorAprobado || data.borradorAprobado)) {
      return NextResponse.json({ error: "Aprueba el borrador antes de marcarlo como enviado" }, { status: 400 });
    }
    data.estado = d.estado;
    data.enviadoEn = d.estado === "ENVIADA" ? new Date() : null;
  }

  if (d.seguimientoEn !== undefined) {
    if (d.seguimientoEn === "") {
      data.seguimientoEn = null;
      data.seguimientoHecho = false;
    } else {
      const f = new Date(d.seguimientoEn);
      if (isNaN(f.getTime())) return NextResponse.json({ error: "Fecha inválida" }, { status: 400 });
      data.seguimientoEn = f;
      data.seguimientoHecho = false;
    }
  }
  // Boton explicito: nunca se deduce del texto de una nota.
  if (d.seguimientoHecho !== undefined) data.seguimientoHecho = d.seguimientoHecho;

  await db.senalEmpresa.update({ where: { id: params.id }, data });
  return NextResponse.json({ ok: true });
}
