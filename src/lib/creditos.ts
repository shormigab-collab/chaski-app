// Costo en creditos de destapar el contacto de una solicitud, segun su
// presupuesto. Antes era siempre 1 credito fijo; ahora escala 1/2/3 segun que
// tan grande sea el presupuesto (a mas presupuesto, mas vale la pena el lead
// para el proveedor, asi que cuesta mas destaparlo).
import type { Moneda } from "./moneda";

// Umbrales por moneda para pasar de "bajo" a "medio" y de "medio" a "alto".
// Calculados con el tipo de cambio de referencia de agosto 2026
// (~3.050 COP/USD, ~3.595 COP/EUR). Si el mercado o el tipo de cambio cambian
// mucho, ajustar estos numeros.
const UMBRALES: Record<Moneda, { medio: number; alto: number }> = {
  COP: { medio: 500_000, alto: 2_000_000 },
  USD: { medio: 150, alto: 650 },
  EUR: { medio: 140, alto: 550 },
};

// El campo presupuesto es texto libre (puede venir como "500.000",
// "1.500.000", "US$500", "500-800", etc). Esta funcion intenta sacar el
// primer numero razonable del texto. Si no logra interpretarlo, retorna null
// y se asume el nivel mas barato (1 credito) para no cobrar de mas por error.
function parsearPresupuesto(presupuesto: string): number | null {
  const match = presupuesto.match(/[\d.,]+/);
  if (!match) return null;
  let texto = match[0];

  const tienePunto = texto.includes(".");
  const tieneComa = texto.includes(",");

  if (tienePunto && tieneComa) {
    const decimalEsComa = texto.lastIndexOf(",") > texto.lastIndexOf(".");
    texto = decimalEsComa ? texto.replace(/\./g, "").replace(",", ".") : texto.replace(/,/g, "");
  } else if (tieneComa) {
    const partes = texto.split(",");
    const ultima = partes[partes.length - 1];
    texto = ultima.length === 2 ? texto.replace(",", ".") : texto.replace(/,/g, "");
  } else if (tienePunto) {
    const partes = texto.split(".");
    const ultima = partes[partes.length - 1];
    // "1.500.000" (miles) vs "500.50" (decimal) — si hay mas de un punto o el
    // ultimo grupo tiene 3 digitos, es separador de miles.
    if (partes.length > 2 || ultima.length === 3) {
      texto = texto.replace(/\./g, "");
    }
  }

  const numero = parseFloat(texto);
  return isNaN(numero) ? null : numero;
}

// Retorna 1, 2 o 3 creditos segun el presupuesto de la solicitud.
export function calcularCostoCreditos(
  presupuesto: string | null | undefined,
  moneda: string | null | undefined
): number {
  if (!presupuesto) return 1;
  const monto = parsearPresupuesto(presupuesto);
  if (monto === null) return 1;
  const umbral = UMBRALES[(moneda as Moneda) || "COP"] ?? UMBRALES.COP;
  if (monto >= umbral.alto) return 3;
  if (monto >= umbral.medio) return 2;
  return 1;
}
