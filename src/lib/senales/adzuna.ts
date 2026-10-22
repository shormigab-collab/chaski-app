// Conector con la API de Adzuna. Documentacion verificada:
//   GET https://api.adzuna.com/v1/api/jobs/{pais}/search/{pagina}?app_id=&app_key=&what=&results_per_page=
// Respuesta: { results: [ { id, title, created, redirect_url, category: { label },
// company: { display_name }, location: { display_name } } ] }.
//
// IMPORTANTE (terminos de Adzuna): la prospeccion / generacion de leads
// requiere acuerdo escrito de Adzuna. Hasta tenerlo, esto sirve para probar
// cobertura. Las llaves viven en variables de entorno (ADZUNA_APP_ID,
// ADZUNA_APP_KEY), nunca en el codigo.
//
// Principio: no inventar. Cada pais se consulta por separado y, si Adzuna no
// lo soporta o falla, se informa el error real de ese pais.

import { clasificarVacante } from "./categorias";
import type { ResultadoFuente, VacanteSenal } from "./getonboard";

// Paises que probamos. Que Adzuna los soporte NO esta confirmado: el resultado
// de cada uno aparece en el mensaje de sincronizacion.
// Verificado con la propia API (error UNSUPPORTED_COUNTRY): Adzuna solo cubre
// at, au, be, br, ca, ch, de, es, fr, gb, in, it, mx, nl, nz, pl, sg, us, za.
// En LatAm: solo Mexico y Brasil. Colombia, Argentina, Chile y Peru NO estan.
// Brasil se deja fuera por ahora: sus vacantes estan en portugues y los
// borradores son en español.
const PAISES: { codigo: string; iso: string; nombre: string }[] = [{ codigo: "mx", iso: "MX", nombre: "México" }];

const CONSULTAS = ["asistente virtual", "ventas", "community manager", "marketing digital", "diseñador gráfico", "contador"];

type TrabajoAdzuna = {
  id?: string | number;
  title?: string;
  created?: string;
  redirect_url?: string;
  category?: { label?: string };
  company?: { display_name?: string };
};

export function adzunaConfigurado(): boolean {
  return Boolean(process.env.ADZUNA_APP_ID && process.env.ADZUNA_APP_KEY);
}

async function consultar(pais: string, query: string): Promise<TrabajoAdzuna[]> {
  const params = new URLSearchParams({
    app_id: process.env.ADZUNA_APP_ID ?? "",
    app_key: process.env.ADZUNA_APP_KEY ?? "",
    results_per_page: "20",
    what: query,
    "content-type": "application/json",
  });
  const res = await fetch(`https://api.adzuna.com/v1/api/jobs/${pais}/search/1?${params.toString()}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });
  if (!res.ok) {
    const cuerpo = (await res.text().catch(() => "")).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").slice(0, 200);
    throw new Error(`HTTP ${res.status} ${res.statusText} ${cuerpo}`.trim());
  }
  const json = (await res.json()) as { results?: TrabajoAdzuna[] };
  if (!json || !Array.isArray(json.results)) throw new Error('respuesta sin el campo "results"');
  return json.results;
}

export async function obtenerVacantesAdzuna(): Promise<ResultadoFuente> {
  if (!adzunaConfigurado()) {
    return { ok: false, mensaje: "Adzuna no está configurado: faltan ADZUNA_APP_ID y ADZUNA_APP_KEY en Vercel.", vacantes: [] };
  }

  const vistos = new Map<string, VacanteSenal>();
  const resumen: string[] = [];
  let hayExito = false;

  // Un pais a la vez (las 6 consultas de cada pais en paralelo) para no
  // disparar demasiadas llamadas juntas y gastar la cuota de la prueba.
  for (const p of PAISES) {
    // Una busqueda a la vez con una pausa corta: en paralelo Adzuna responde
    // HTTP 429 (demasiadas peticiones).
    const res: PromiseSettledResult<TrabajoAdzuna[]>[] = [];
    for (const q of CONSULTAS) {
      try {
        res.push({ status: "fulfilled", value: await consultar(p.codigo, q) });
      } catch (reason) {
        res.push({ status: "rejected", reason });
      }
      await new Promise((r) => setTimeout(r, 700));
    }
    const errores = res.filter((r): r is PromiseRejectedResult => r.status === "rejected");
    const exitos = res.filter((r): r is PromiseFulfilledResult<TrabajoAdzuna[]> => r.status === "fulfilled");

    let leidas = 0;
    let guardadas = 0;
    for (const r of exitos) {
      for (const t of r.value) {
        leidas++;
        const id = t.id;
        const titulo = t.title;
        const url = t.redirect_url;
        const empresa = t.company?.display_name;
        if (!id || !titulo || !url || !empresa) continue;
        const categoria = clasificarVacante(titulo, t.category?.label ?? "");
        if (!categoria) continue;
        const clave = `${p.iso}:${id}`;
        if (vistos.has(clave)) continue;
        const fecha = t.created ? new Date(t.created) : null;
        vistos.set(clave, {
          fuenteId: clave,
          empresa,
          empresaWeb: null, // Adzuna no entrega el sitio de la empresa
          empresaPais: p.iso,
          titulo,
          url,
          publicadaEn: fecha && !isNaN(fecha.getTime()) ? fecha : null,
          categoria,
        });
        guardadas++;
      }
    }

    if (exitos.length > 0) hayExito = true;
    if (errores.length === CONSULTAS.length) {
      const motivo = errores[0].reason instanceof Error ? errores[0].reason.message : String(errores[0].reason);
      resumen.push(`${p.nombre}: error real de Adzuna (${motivo})`);
    } else {
      resumen.push(`${p.nombre}: ${leidas} leídas, ${guardadas} útiles${errores.length ? `, ${errores.length} búsquedas fallaron` : ""}`);
    }
  }

  return {
    ok: hayExito,
    mensaje: `Adzuna por país → ${resumen.join(" | ")}.`,
    vacantes: Array.from(vistos.values()),
  };
}
