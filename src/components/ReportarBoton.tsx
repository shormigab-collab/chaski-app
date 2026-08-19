"use client";

import { useState } from "react";
import { Flag } from "lucide-react";

// Botón discreto de "Reportar" reutilizable en perfiles de proveedores y en
// solicitudes de clientes. Al hacer clic despliega un textarea pequeño para
// explicar el motivo; el reporte queda pendiente de revisión en el panel admin.
export default function ReportarBoton({
  tipo,
  objetivoId,
  etiqueta = "Reportar",
}: {
  tipo: "PERFIL" | "SOLICITUD";
  objetivoId: string;
  etiqueta?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  async function enviar() {
    if (motivo.trim().length < 5) {
      setError("Cuéntanos un poco más (mínimo 5 caracteres)");
      return;
    }
    setError("");
    setEnviando(true);
    const res = await fetch("/api/reportes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, objetivoId, motivo: motivo.trim() }),
    });
    setEnviando(false);
    if (res.ok) {
      setEnviado(true);
      setAbierto(false);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "No se pudo enviar el reporte");
    }
  }

  if (enviado) {
    return <p className="text-xs text-ink/40">Gracias, revisaremos este reporte.</p>;
  }

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="inline-flex items-center gap-1 text-xs text-ink/35 hover:text-coral-500 transition-colors"
      >
        <Flag className="w-3 h-3" strokeWidth={1.75} />
        {etiqueta}
      </button>
    );
  }

  return (
    <div className="border border-black/10 rounded-xl p-3 max-w-sm">
      <p className="text-xs text-ink/50 mb-2">¿Qué está mal? Ej. datos falsos, pide pagos fuera de Chaski, etc.</p>
      <textarea
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
        rows={2}
        maxLength={500}
        className="w-full border border-black/10 rounded-lg px-2.5 py-2 text-xs outline-none focus:border-coral-400 transition-colors resize-none"
        placeholder="Describe brevemente el problema"
      />
      {error && <p className="text-xs text-coral-600 mt-1">{error}</p>}
      <div className="flex items-center gap-2 mt-2">
        <button
          type="button"
          onClick={enviar}
          disabled={enviando}
          className="text-xs font-semibold bg-coral-500 text-white px-3 py-1.5 rounded-lg hover:bg-coral-600 transition-colors disabled:opacity-60"
        >
          {enviando ? "Enviando..." : "Enviar reporte"}
        </button>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          className="text-xs text-ink/40 hover:text-ink/70"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
