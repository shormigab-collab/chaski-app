// Integracion con la API de Claude (Anthropic) para el asistente de IA.
// Necesitas ANTHROPIC_API_KEY en tu .env (la obtienes en https://console.anthropic.com).
// Mientras no la configures, esta funcion lanza un error controlado y el
// formulario simplemente avisa que el asistente no esta disponible, sin romper
// el resto de la pagina.

export type MensajeClaude = { role: "user" | "assistant"; content: string };

// Funcion base: acepta una conversacion completa (varios turnos). La usa el
// widget de chat de soporte, que necesita mantener el hilo de la charla.
export async function preguntarClaudeConversacion(
  systemPrompt: string,
  mensajes: MensajeClaude[],
  maxTokens = 500
) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("El asistente de IA no esta configurado todavia. Agrega ANTHROPIC_API_KEY en tu archivo .env");
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: mensajes,
    }),
  });

  if (!res.ok) {
    const detalle = await res.text();
    throw new Error(`Error llamando a Claude: ${detalle}`);
  }

  const data = (await res.json()) as { content: { type: string; text: string }[] };
  const texto = data.content.find((b) => b.type === "text")?.text || "";
  return texto;
}

// Atajo para un solo intercambio (pregunta -> respuesta), usado por el
// asistente de redaccion de solicitudes.
export async function preguntarClaude(systemPrompt: string, mensajeUsuario: string) {
  return preguntarClaudeConversacion(systemPrompt, [{ role: "user", content: mensajeUsuario }]);
}
