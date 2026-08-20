// "Chaski Copiloto": convierte una conversacion corta (texto libre + hasta 4
// preguntas de seguimiento) en un brief de proyecto estructurado y editable.
// Reutiliza la misma integracion con Claude que el resto de la app
// (lib/anthropic.ts) — no agrega un proveedor de IA nuevo.
import { preguntarClaudeConversacion, type MensajeClaude } from "./anthropic";

export type MensajeCopiloto = MensajeClaude;

export type BriefCopiloto = {
  categoriaSlug: string;
  titulo: string;
  resumen: string;
  entregables: string[];
  presupuestoEstimado: string;
  presupuestoMoneda: "COP" | "USD" | "EUR";
  ciudad: string;
  criteriosExito: string;
};

export type TurnoCopiloto =
  | { tipo: "pregunta"; pregunta: string }
  | { tipo: "brief"; brief: BriefCopiloto };

// Maximo de preguntas de seguimiento antes de forzar el brief final. El
// spec original pedia "entre 3 y 5"; nos quedamos en 4 como punto medio.
export const MAX_PREGUNTAS_COPILOTO = 4;

function construirSystemPrompt(listaCategorias: string, preguntasHechas: number): string {
  const debeFinalizar = preguntasHechas >= MAX_PREGUNTAS_COPILOTO;
  return `Eres "Chaski Copiloto", un asistente que ayuda a clientes de chaski (marketplace de profesionales independientes en Latinoamérica) a convertir una idea contada en sus propias palabras en un proyecto publicable.

Categorías disponibles (usa exactamente uno de estos slugs): ${listaCategorias}

Ya le has hecho ${preguntasHechas} pregunta(s) de seguimiento. Puedes hacer un MÁXIMO de ${MAX_PREGUNTAS_COPILOTO} preguntas en total.
${
  debeFinalizar
    ? "Ya alcanzaste el máximo de preguntas permitidas: AHORA DEBES responder con el brief final (tipo brief). No hagas mas preguntas aunque falte informacion; usa tu mejor criterio para completar los campos que falten."
    : "Si falta información clave para el brief (objetivo, entregables concretos, presupuesto, ciudad o si el trabajo puede ser remoto, fecha deseada), puedes hacer UNA pregunta mas a la vez. Si ya tienes suficiente informacion, responde con el brief final ahora mismo, sin seguir preguntando."
}

Reglas:
- Nunca repitas una pregunta sobre algo que el usuario ya conto.
- Cada pregunta debe ser corta, concreta, y en el mismo idioma en el que escribio el usuario.
- Todo el texto del brief (titulo, resumen, entregables, criteriosExito) debe estar en el MISMO idioma en el que escribio el usuario (si escribio en ingles, el brief va en ingles).
- No inventes datos que el usuario no menciono.
- El presupuesto y el cronograma del brief son siempre estimaciones orientativas, nunca garantias ni compromisos.

Responde UNICAMENTE con un objeto JSON valido, sin texto adicional ni markdown, con UNA de estas dos formas exactas:

Si necesitas mas informacion:
{"tipo":"pregunta","pregunta":"..."}

Si ya tienes suficiente informacion (o llegaste al maximo de preguntas):
{"tipo":"brief","brief":{"categoriaSlug":"uno de los slugs de arriba","titulo":"titulo breve de maximo 70 caracteres","resumen":"resumen de 2-3 frases de lo que el cliente necesita","entregables":["entregable concreto 1","entregable concreto 2"],"presupuestoEstimado":"monto aproximado solo en numeros, ej 800000, o vacio si no se menciono","presupuestoMoneda":"COP, USD o EUR segun lo que dijo el usuario (COP por defecto)","ciudad":"ciudad mencionada, o 'Remoto' si el trabajo puede ser remoto","criteriosExito":"1-2 frases de como se veria el exito del proyecto, o vacio si no aplica"}}`;
}

export async function siguienteTurnoCopiloto(
  mensajes: MensajeCopiloto[],
  listaCategorias: string
): Promise<TurnoCopiloto> {
  const preguntasHechas = mensajes.filter((m) => m.role === "assistant").length;
  const systemPrompt = construirSystemPrompt(listaCategorias, preguntasHechas);
  const respuesta = await preguntarClaudeConversacion(systemPrompt, mensajes, 800);
  const limpio = respuesta.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "");

  let data: unknown;
  try {
    data = JSON.parse(limpio);
  } catch {
    throw new Error("Respuesta invalida del Copiloto");
  }

  if (!data || typeof data !== "object") throw new Error("Respuesta invalida del Copiloto");
  const obj = data as Record<string, unknown>;

  if (obj.tipo === "pregunta") {
    if (typeof obj.pregunta !== "string" || !obj.pregunta.trim()) {
      throw new Error("Pregunta invalida del Copiloto");
    }
    return { tipo: "pregunta", pregunta: obj.pregunta.trim().slice(0, 300) };
  }

  if (obj.tipo === "brief") {
    const b = obj.brief as Partial<BriefCopiloto> | undefined;
    if (!b || typeof b.titulo !== "string" || typeof b.resumen !== "string" || !Array.isArray(b.entregables)) {
      throw new Error("Brief invalido del Copiloto");
    }
    const monedaValida = b.presupuestoMoneda === "USD" || b.presupuestoMoneda === "EUR" ? b.presupuestoMoneda : "COP";
    return {
      tipo: "brief",
      brief: {
        categoriaSlug: String(b.categoriaSlug || ""),
        titulo: String(b.titulo).slice(0, 100),
        resumen: String(b.resumen).slice(0, 500),
        entregables: b.entregables.slice(0, 8).map((e) => String(e).slice(0, 150)),
        presupuestoEstimado: String(b.presupuestoEstimado || "").slice(0, 40),
        presupuestoMoneda: monedaValida,
        ciudad: String(b.ciudad || "").slice(0, 80),
        criteriosExito: String(b.criteriosExito || "").slice(0, 300),
      },
    };
  }

  throw new Error("Tipo de respuesta desconocido del Copiloto");
}
