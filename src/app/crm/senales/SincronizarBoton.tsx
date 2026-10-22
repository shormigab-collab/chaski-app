"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SincronizarBoton() {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function sincronizar() {
    setError("");
    setCargando(true);
    try {
      const res = await fetch("/api/crm/senales/sincronizar", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(`HTTP ${res.status}: ${data.error || data.mensaje || "la petición falló sin detalle"}`);
      }
    } catch (e) {
      setError(`No se pudo contactar al servidor: ${e instanceof Error ? e.message : String(e)}`);
    }
    setCargando(false);
    router.refresh(); // el resultado (o el error real) queda en la franja de "Última sincronización"
  }

  return (
    <div className="text-right">
      <button
        onClick={sincronizar}
        disabled={cargando}
        className="bg-ink text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-ink/90 disabled:opacity-50"
      >
        {cargando ? "Buscando señales..." : "Buscar señales ahora"}
      </button>
      {error && <p className="text-xs text-red-700 mt-2 max-w-xs">{error}</p>}
    </div>
  );
}
