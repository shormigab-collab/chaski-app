"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Botón genérico de acción para el panel admin (aprobar/rechazar
// verificación, marcar reporte como revisado, etc.): hace POST a `url`
// con `body` y refresca la página del servidor al terminar.
export default function AdminBotonAccion({
  url,
  body,
  etiqueta,
  variante = "brand",
}: {
  url: string;
  body: Record<string, unknown>;
  etiqueta: string;
  variante?: "brand" | "coral" | "gray";
}) {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  const colores: Record<string, string> = {
    brand: "bg-brand-500 hover:bg-brand-600 text-white",
    coral: "bg-coral-500 hover:bg-coral-600 text-white",
    gray: "bg-gray-100 hover:bg-gray-200 text-gray-700",
  };

  async function onClick() {
    setCargando(true);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setCargando(false);
    if (res.ok) router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={cargando}
      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 ${colores[variante]}`}
    >
      {cargando ? "..." : etiqueta}
    </button>
  );
}
