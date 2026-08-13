"use client";

import { useState } from "react";

type Paquete = { id: string; nombre: string; creditos: number; precioCOP: number };

export default function ComprarCreditos({ paquetes }: { paquetes: Paquete[] }) {
  const [cargandoId, setCargandoId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function comprar(paqueteId: string) {
    setError("");
    setCargandoId(paqueteId);
    const res = await fetch("/api/creditos/comprar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paqueteId }),
    });
    const data = await res.json();
    setCargandoId(null);
    if (res.ok && data.initPoint) {
      window.location.href = data.initPoint;
    } else {
      setError(data.error || "No se pudo iniciar el pago");
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg p-3">
          {error}
        </p>
      )}
      <div className="grid sm:grid-cols-3 gap-4">
        {paquetes.map((p) => (
          <div key={p.id} className="border rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-brand-600 tabular-nums">{p.creditos}</div>
            <div className="text-sm text-gray-500 mb-3">créditos</div>
            <div className="font-semibold mb-4 tabular-nums">
              ${p.precioCOP.toLocaleString("es-CO")} COP
            </div>
            <button
              onClick={() => comprar(p.id)}
              disabled={cargandoId === p.id}
              className="w-full bg-brand-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-brand-600 disabled:opacity-50"
            >
              {cargandoId === p.id ? "Redirigiendo..." : "Comprar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
