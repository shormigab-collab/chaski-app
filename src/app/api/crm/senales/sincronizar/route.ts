import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual, esEquipoCrm } from "@/lib/auth";
import { obtenerVacantesGetOnBoard } from "@/lib/senales/getonboard";
import { calcularPrioridad, construirBorrador } from "@/lib/senales/borrador";

// "as any": modelos nuevos de Prisma; ver nota en /api/crm/contactos/route.ts
const db = prisma as any;

// Las 9 busquedas se hacen en paralelo, pero damos margen por si la fuente
// responde lento.
export const maxDuration = 60;

export async function POST() {
  const usuario = await obtenerUsuarioActual();
  if (!esEquipoCrm(usuario)) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  let resultado;
  try {
    resultado = await obtenerVacantesGetOnBoard();
  } catch (err) {
    const mensaje = err instanceof Error ? err.message : String(err);
    await db.senalSync.create({ data: { fuente: "GETONBOARD", ok: false, mensaje, nuevas: 0 } }).catch(() => {});
    return NextResponse.json({ ok: false, mensaje }, { status: 200 });
  }

  // Vacantes por empresa, para la prioridad
  const porEmpresa = new Map<string, number>();
  for (const v of resultado.vacantes) porEmpresa.set(v.empresa, (porEmpresa.get(v.empresa) ?? 0) + 1);

  let nuevas = 0;
  try {
    for (const v of resultado.vacantes) {
      const existente = await db.senalEmpresa.findUnique({
        where: { fuente_fuenteId: { fuente: "GETONBOARD", fuenteId: v.fuenteId } },
        select: { id: true },
      });
      const { prioridad, razon } = calcularPrioridad({
        publicadaEn: v.publicadaEn,
        vacantesDeLaEmpresa: porEmpresa.get(v.empresa) ?? 1,
      });

      if (existente) {
        // solo refresca la prioridad; no toca borrador, notas ni estado
        await db.senalEmpresa.update({ where: { id: existente.id }, data: { prioridad, razon } });
        continue;
      }

      await db.senalEmpresa.create({
        data: {
          fuente: "GETONBOARD",
          fuenteId: v.fuenteId,
          empresa: v.empresa,
          empresaWeb: v.empresaWeb,
          empresaPais: v.empresaPais,
          titulo: v.titulo,
          url: v.url,
          categoriaSlug: v.categoria.slug,
          categoriaNombre: v.categoria.nombre,
          publicadaEn: v.publicadaEn,
          prioridad,
          razon,
          borrador: construirBorrador({
            empresa: v.empresa,
            titulo: v.titulo,
            categoriaNombre: v.categoria.nombre,
            argumento: v.categoria.argumento,
          }),
        },
      });
      nuevas++;
    }
  } catch (err) {
    const mensaje = `Error al guardar en la base de datos: ${err instanceof Error ? err.message : String(err)}`;
    await db.senalSync.create({ data: { fuente: "GETONBOARD", ok: false, mensaje, nuevas } }).catch(() => {});
    return NextResponse.json({ ok: false, mensaje }, { status: 200 });
  }

  const mensaje = `${resultado.mensaje} Señales nuevas guardadas: ${nuevas}.`;
  await db.senalSync.create({ data: { fuente: "GETONBOARD", ok: resultado.ok, mensaje, nuevas } }).catch(() => {});
  return NextResponse.json({ ok: resultado.ok, mensaje, nuevas });
}
