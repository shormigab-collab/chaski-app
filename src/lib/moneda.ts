// Monedas soportadas para el presupuesto de una solicitud.
export const MONEDAS = ["COP", "USD", "EUR"] as const;
export type Moneda = (typeof MONEDAS)[number];

export const SIMBOLO_MONEDA: Record<Moneda, string> = {
  COP: "$",
  USD: "US$",
  EUR: "€",
};

// Formatea un presupuesto ingresado como texto libre + su moneda, ej.
// "500.000 COP" o "US$500". No fuerza formato numérico porque el campo
// original es texto libre (puede incluir rangos como "500-800").
export function formatearPresupuesto(presupuesto: string, moneda: string): string {
  const simbolo = SIMBOLO_MONEDA[moneda as Moneda];
  if (!simbolo) return `${presupuesto} ${moneda}`;
  return `${simbolo}${presupuesto} ${moneda}`;
}
