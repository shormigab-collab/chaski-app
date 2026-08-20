// Como cobra un proveedor: por hora, por proyecto completo, o una tarifa
// mensual recurrente. El monto sigue siendo texto libre (igual que antes)
// para no forzar estructura numerica ni moneda; solo agregamos la unidad.
export const TARIFAS_TIPO = ["HORA", "PROYECTO", "MES"] as const;
export type TarifaTipo = (typeof TARIFAS_TIPO)[number];

export const ETIQUETA_TARIFA_TIPO: Record<TarifaTipo, string> = {
  HORA: "por hora",
  PROYECTO: "por proyecto",
  MES: "por mes",
};

export const ETIQUETA_TARIFA_TIPO_SELECTOR: Record<TarifaTipo, string> = {
  HORA: "Por hora",
  PROYECTO: "Monto total del proyecto",
  MES: "Tarifa mensual",
};

// Combina el monto libre con la unidad para mostrarlo, ej. "$50.000 COP / hora".
export function formatearTarifa(tarifaAproximada: string | null | undefined, tarifaTipo: string): string {
  if (!tarifaAproximada || !tarifaAproximada.trim()) return "";
  const etiqueta = ETIQUETA_TARIFA_TIPO[tarifaTipo as TarifaTipo];
  if (!etiqueta) return tarifaAproximada;
  return `${tarifaAproximada} ${etiqueta}`;
}
