// Conector con la API publica de Get on Board (bolsa de empleo tech de
// LatAm). Endpoint verificado contra la API real:
//   GET https://www.getonbrd.com/api/v0/search/jobs?query=...&per_page=...&expand=["company"]
// Respuesta: { data: [ { id, attributes: { title, category_name, published_at
// (unix), countries, company: { data: { id, attributes: { name, web, country } } } },
// links: { public_url } } ], meta }.
//
// Principio: nunca inventar ni suavizar. Si la API falla, se devuelve el
// error real (codigo HTTP + texto), no un mensaje generico.

import { clasificarVacante, type CategoriaSenal } from "./categorias";

const BASE = "https://www.getonbrd.com/api/v0/search/jobs";

// Busquedas que lanzamos. Get on Board busca tambien en la descripcion, asi
// que despues filtramos nosotros por titulo/categoria (ver categorias.ts).
const CONSULTAS = [
  "diseñador",
  "designer",
  "marketing",
  "community manager",
  "asistente virtual",
  "customer support",
  "contador",
  "redactor",
  "desarrollador",
];

// Paises de LatAm (codigo ISO) en que buscamos empresas.
const PAISES_LATAM = new Set([
  "AR", "BO", "BR", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GT", "HN",
  "MX", "NI", "PA", "PY", "PE", "PR", "UY", "VE",
]);

export type VacanteSenal = {
  fuenteId: string;
  empresa: string;
  empresaWeb: string | null;
  empresaPais: string | null;
  titulo: string;
  url: string;
  publicadaEn: Date | null;
  categoria: CategoriaSenal;
};

export type ResultadoFuente = {
  ok: boolean;
  mensaje: string; // exito o el error real de la API
  vacantes: VacanteSenal[];
};

type TrabajoApi = {
  id?: string;
  attributes?: {
    title?: string;
    category_name?: string;
    published_at?: number | null;
    company?: { data?: { id?: string; attributes?: { name?: string; web?: string; country?: string } } };
  };
  links?: { public_url?: string };
};

async function consultar(query: string): Promise<TrabajoApi[]> {
  const url = `${BASE}?query=${encodeURIComponent(query)}&per_page=50&expand=${encodeURIComponent('["company"]')}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });
  if (!res.ok) {
    const cuerpo = (await res.text().catch(() => "")).slice(0, 300);
    throw new Error(`Get on Board respondió HTTP ${res.status} ${res.statusText} para la búsqueda "${query}". ${cuerpo}`.trim());
  }
  const json = (await res.json()) as { data?: TrabajoApi[] };
  if (!json || !Array.isArray(json.data)) {
    throw new Error(`Get on Board devolvió una respuesta sin el campo "data" para la búsqueda "${query}".`);
  }
  return json.data;
}

export async function obtenerVacantesGetOnBoard(): Promise<ResultadoFuente> {
  const resultados = await Promise.allSettled(CONSULTAS.map((q) => consultar(q)));

  const errores: string[] = [];
  const vistos = new Map<string, VacanteSenal>();
  let totalLeidas = 0;

  for (const r of resultados) {
    if (r.status === "rejected") {
      errores.push(r.reason instanceof Error ? r.reason.message : String(r.reason));
      continue;
    }
    for (const t of r.value) {
      totalLeidas++;
      const id = t.id;
      const titulo = t.attributes?.title;
      const url = t.links?.public_url;
      const empresaAttr = t.attributes?.company?.data?.attributes;
      if (!id || !titulo || !url || !empresaAttr?.name) continue;

      const pais = (empresaAttr.country ?? "").toUpperCase();
      if (!PAISES_LATAM.has(pais)) continue; // solo empresas de LatAm

      const categoria = clasificarVacante(titulo, t.attributes?.category_name ?? "");
      if (!categoria) continue; // no encaja con ninguna categoria de chaski

      if (vistos.has(id)) continue;
      vistos.set(id, {
        fuenteId: id,
        empresa: empresaAttr.name,
        empresaWeb: empresaAttr.web || null,
        empresaPais: pais || null,
        titulo,
        url,
        publicadaEn: t.attributes?.published_at ? new Date(t.attributes.published_at * 1000) : null,
        categoria,
      });
    }
  }

  const vacantes = Array.from(vistos.values());

  if (vacantes.length === 0 && errores.length === CONSULTAS.length) {
    return { ok: false, mensaje: errores[0], vacantes: [] };
  }

  const partes = [
    `Se leyeron ${totalLeidas} vacantes en ${CONSULTAS.length - errores.length} de ${CONSULTAS.length} búsquedas; ${vacantes.length} son de empresas de LatAm y encajan con una categoría de chaski.`,
  ];
  if (errores.length > 0) partes.push(`Errores reales de la API: ${Array.from(new Set(errores)).join(" | ")}`);

  return { ok: errores.length === 0, mensaje: partes.join(" "), vacantes };
}
