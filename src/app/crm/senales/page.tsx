import { prisma } from "@/lib/db";
import SincronizarBoton from "./SincronizarBoton";
import AgregarManual from "./AgregarManual";
import SenalesLista, { type GrupoEmpresa } from "./SenalesLista";

export const dynamic = "force-dynamic";

const db = prisma as any;

export default async function SenalesPage() {
  let filas: any[] = [];
  let ultimaSync: any = null;
  let errorTabla = "";
  try {
    [filas, ultimaSync] = await Promise.all([
      db.senalEmpresa.findMany({ orderBy: [{ prioridad: "desc" }, { publicadaEn: "desc" }], take: 500 }),
      db.senalSync.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    ]);
  } catch (err) {
    errorTabla = err instanceof Error ? err.message : String(err);
  }

  // Ultima sincronizacion de cada fuente (la lista viene de la mas nueva a la mas vieja).
  const ultimasSync: any[] = [];
  for (const s of Array.isArray(ultimaSync) ? ultimaSync : []) {
    if (!ultimasSync.some((x) => x.fuente === s.fuente)) ultimasSync.push(s);
  }

  // Agrupa por empresa: la prioridad del grupo es la mayor de sus vacantes.
  const mapa = new Map<string, GrupoEmpresa>();
  for (const f of filas) {
    let g = mapa.get(f.empresa);
    if (!g) {
      g = { empresa: f.empresa, web: f.empresaWeb, pais: f.empresaPais, prioridad: 0, senales: [] };
      mapa.set(f.empresa, g);
    }
    g.prioridad = Math.max(g.prioridad, f.prioridad);
    g.senales.push({
      id: f.id,
      titulo: f.titulo,
      url: f.url,
      fuente: f.fuente,
      categoriaNombre: f.categoriaNombre,
      publicadaEn: f.publicadaEn ? f.publicadaEn.toISOString() : null,
      razon: f.razon,
      estado: f.estado,
      borrador: f.borrador ?? "",
      borradorAprobado: f.borradorAprobado,
      contactoEmail: f.contactoEmail ?? "",
      contactoNombre: f.contactoNombre ?? "",
      contactoCargo: f.contactoCargo ?? "",
      notas: f.notas ?? "",
      seguimientoEn: f.seguimientoEn ? f.seguimientoEn.toISOString().slice(0, 10) : "",
      seguimientoHecho: f.seguimientoHecho,
      enviadoEn: f.enviadoEn ? f.enviadoEn.toISOString() : null,
    });
  }
  const grupos = Array.from(mapa.values()).sort((a, b) => b.prioridad - a.prioridad);

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <div>
          <h1 className="text-2xl font-bold">Señales de empresas</h1>
          <p className="text-sm text-gray-500 max-w-2xl">
            Empresas de Latinoamérica que publicaron vacantes (Get on Board automático, más las que agregues tú a mano) en áreas donde chaski tiene freelancers.
            Es una señal de que podrían necesitar apoyo, no una confirmación. Nada se envía solo: tú revisas y apruebas
            cada mensaje.
          </p>
        </div>
        <SincronizarBoton />
      </div>

      {ultimasSync.map((s: any) => (
        <div
          key={s.fuente}
          className={`text-xs rounded-lg border px-3 py-2 mb-3 ${
            s.ok ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <span className="font-semibold">
            {s.fuente === "ADZUNA" ? "Adzuna" : s.fuente === "GETONBOARD" ? "Get on Board" : s.fuente} (
            {new Date(s.createdAt).toLocaleString("es-CO")}):
          </span>{" "}
          {s.mensaje}
        </div>
      ))}

      {errorTabla && (
        <div className="text-sm rounded-lg border border-red-200 bg-red-50 text-red-800 p-3 mb-5">
          No se pudo leer la tabla de señales. Si es la primera vez, ejecuta <code>sql-senales.sql</code> en Supabase.
          Error real: {errorTabla}
        </div>
      )}

      <AgregarManual />

      <SenalesLista grupos={grupos} />
    </div>
  );
}
