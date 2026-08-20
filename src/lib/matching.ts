// Motor de compatibilidad explicable entre un proveedor y una solicitud.
// A proposito NO es un modelo de IA/ML: es un puntaje por reglas, con pesos
// configurables, para que cada resultado se pueda explicar en una frase y
// auditar. La IA (si se usa) solo ayuda a redactar texto, nunca a decidir
// el puntaje.

export type NivelCompatibilidad = "alta" | "media" | "insuficiente";

export type ProveedorParaMatch = {
  id: string;
  categoriaIds: string[];
  ciudad: string | null;
  bio: string | null;
  portafolioTexto: string | null; // titulos + descripciones del portafolio, concatenados
  aniosExperiencia: number | null;
  verificado: boolean;
  calificacionProm: number;
  totalResenas: number;
};

export type SolicitudParaMatch = {
  categoriaId: string;
  ciudad: string;
  titulo: string;
  descripcion: string;
};

export type ResultadoMatch = {
  proveedorId: string;
  puntaje: number; // 0-100
  nivel: NivelCompatibilidad;
  razones: string[];
};

// Pesos configurables (suman 100). Ajustar aqui si se quiere afinar el
// balance entre señales.
export const PESOS_MATCHING = {
  categoria: 40,
  palabrasClave: 20,
  ciudad: 12,
  verificado: 10,
  experiencia: 10,
  resenas: 8,
};

const STOPWORDS = new Set([
  "de", "la", "el", "en", "y", "a", "que", "un", "una", "con", "para", "los", "las",
  "del", "se", "su", "mi", "lo", "es", "al", "por", "como", "mas", "pero", "sus",
  "le", "ya", "o", "este", "esta", "entre", "cuando", "muy", "sin", "sobre", "tambien",
  "hay", "donde", "quien", "desde", "todo", "nos", "durante", "todos", "uno", "les",
  "ni", "contra", "otros", "fue", "ese", "eso", "habia", "ante", "ellos", "e", "esto",
  "mi", "antes", "algunos", "que", "unos", "yo", "otro", "otras", "otra", "el", "tanto",
  "esa", "estos", "mucho", "quienes", "nada", "muchos", "cual", "poco", "ella", "estar",
  "estas", "algunas", "algo", "nosotros",
]);

const RANGO_DIACRITICOS = new RegExp("[\\u0300-\\u036f]", "g");

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(RANGO_DIACRITICOS, "")
    .replace(/[^a-z0-9\s]/g, " ");
}

function palabrasClave(texto: string): Set<string> {
  return new Set(
    normalizar(texto)
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOPWORDS.has(w))
  );
}

export function calcularCompatibilidad(
  proveedor: ProveedorParaMatch,
  solicitud: SolicitudParaMatch
): ResultadoMatch {
  let puntaje = 0;
  const razones: string[] = [];
  let datosSuficientes = false;

  // Categoria: la señal mas fuerte, es literalmente el area en la que
  // trabaja el proveedor.
  if (proveedor.categoriaIds.includes(solicitud.categoriaId)) {
    puntaje += PESOS_MATCHING.categoria;
    razones.push("Trabaja activamente en esta categoría.");
    datosSuficientes = true;
  }

  // Palabras clave del titulo/descripcion de la solicitud vs bio + portafolio.
  const palabrasSolicitud = palabrasClave(`${solicitud.titulo} ${solicitud.descripcion}`);
  const textoProveedor = `${proveedor.bio || ""} ${proveedor.portafolioTexto || ""}`.trim();
  if (textoProveedor && palabrasSolicitud.size > 0) {
    const palabrasProveedor = palabrasClave(textoProveedor);
    let coincidencias = 0;
    for (const w of palabrasSolicitud) if (palabrasProveedor.has(w)) coincidencias++;
    const proporcion = coincidencias / palabrasSolicitud.size;
    puntaje += Math.round(proporcion * PESOS_MATCHING.palabrasClave);
    if (coincidencias >= 2) {
      razones.push("Su perfil y portafolio mencionan temas relacionados con lo que pides.");
      datosSuficientes = true;
    }
  }

  // Ciudad (comparacion simple de texto, no hay geocodificacion).
  if (proveedor.ciudad && solicitud.ciudad) {
    const c1 = normalizar(proveedor.ciudad);
    const c2 = normalizar(solicitud.ciudad);
    if (c1 && c2 && (c1 === c2 || c1.includes(c2) || c2.includes(c1))) {
      puntaje += PESOS_MATCHING.ciudad;
      razones.push(`Está ubicado en ${proveedor.ciudad}, igual que tú.`);
    }
  }

  // Identidad verificada.
  if (proveedor.verificado) {
    puntaje += PESOS_MATCHING.verificado;
    razones.push("Tiene su identidad verificada por el equipo de chaski.");
  }

  // Experiencia.
  if (proveedor.aniosExperiencia && proveedor.aniosExperiencia > 0) {
    puntaje += Math.min(proveedor.aniosExperiencia * 2, PESOS_MATCHING.experiencia);
    if (proveedor.aniosExperiencia >= 2) {
      razones.push(
        `Cuenta con ${proveedor.aniosExperiencia} años de experiencia.`
      );
    }
  }

  // Resenas de clientes anteriores.
  if (proveedor.totalResenas > 0) {
    puntaje += Math.min(
      proveedor.calificacionProm * (PESOS_MATCHING.resenas / 5),
      PESOS_MATCHING.resenas
    );
    razones.push(
      `Tiene ${proveedor.totalResenas} reseña${proveedor.totalResenas === 1 ? "" : "s"} de clientes anteriores (${proveedor.calificacionProm.toFixed(1)}/5).`
    );
    datosSuficientes = true;
  }

  puntaje = Math.round(Math.min(puntaje, 100));

  let nivel: NivelCompatibilidad;
  if (puntaje >= 55 && datosSuficientes) {
    nivel = "alta";
  } else if (puntaje >= 25) {
    nivel = "media";
  } else {
    nivel = "insuficiente";
  }

  if (razones.length === 0) {
    razones.push("Todavía no hay suficiente información en su perfil para explicar mejor esta coincidencia.");
  }

  return { proveedorId: proveedor.id, puntaje, nivel, razones };
}
