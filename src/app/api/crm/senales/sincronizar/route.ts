import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual, esEquipoCrm } from "@/lib/auth";
import { obtenerVacantesGetOnBoard, type ResultadoFuente } from "@/lib/senales/getonboard";
import { obtenerVacantesAdzuna } from "@/lib/senales/adzuna";
import { calcularPrioridad, construirBorrador } from "@/lib/senales/borrador";

// "as any": modelos nuevos de Prisma; ver nota en /api/crm/contactos/route.ts
const db = prisma as any;

// Las busquedas se hacen en paralelo, pero damos margen por si la fuente
// responde lento.
export const maxDuration = 60;

const NOMBRE_EN_BORRADOR: Record<string, string> = {
  GETONBOARD: "Get on Board",
  ADZUNA: "una bolsa de empleo en línea",
};

async function procesarFuente(fuente: string, obtener: () => Promise<ResultadoFuente>) {
  let resultado: ResultadoFuente;
  try {
    resultado = await obtener();
  } catch (err) {
    const mensaje = err instanceof Error ? err.message : String(err);
    await db.senalSync.create({ data: { fuente, ok: false, mensaje, nuevas: 0 } }).catch(() => {});
    return { ok: false, mensaje, nuevas: 0 };
  }

  // Vacantes por empresa, para la prioridad
  const porEmpresa = new Map<string, number>();
  for (const v of resultado.vacantes) porEmpresa.set(v.empresa, (porEmpresa.get(v.empresa) ?? 0) + 1);

  let nuevas = 0;
  try {
    for (const v of resultado.vacantes) {
      const existente = await db.senalEmpresa.findUnique({
        where: { fuente_fuenteId: { fuente, fuenteId: v.fuenteId } },
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
          fuente,
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
            fuenteNombre: NOMBRE_EN_BORRADOR[fuente],
          }),
        },
      });
      nuevas++;
    }
  } catch (err) {
    const mensaje = `Error al guardar en la base de datos: ${err instanceof Error ? err.message : String(err)}`;
    await db.senalSync.create({ data: { fuente, ok: false, mensaje, nuevas } }).catch(() => {});
    return { ok: false, mensaje, nuevas };
  }

  const mensaje = `${resultado.mensaje} Señales nuevas guardadas: ${nuevas}.`;
  await db.senalSync.create({ data: { fuente, ok: resultado.ok, mensaje, nuevas } }).catch(() => {});
  return { ok: resultado.ok, mensaje, nuevas };
}

export async function POST() {
  const usuario = await obtenerUsuarioActual();
  if (!esEquipoCrm(usuario)) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const gob = await procesarFuente("GETONBOARD", obtenerVacantesGetOnBoard);
  // Adzuna solo corre si las llaves estan configuradas en Vercel.
  // Si faltan, se deja un aviso visible en pantalla (no se salta en silencio).
  const adz = await procesarFuente("ADZUNA", obtenerVacantesAdzuna);

  return NextResponse.json({
    ok: gob.ok && (adz ? adz.ok : true),
    mensaje: [gob.mensaje, adz?.mensaje].filter(Boolean).join(" || "),
    nuevas: gob.nuevas + (adz?.nuevas ?? 0),
  });
}
