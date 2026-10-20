"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PublicarForm() {
  const router = useRouter();
  const [texto, setTexto] = useState("");
  const [enlaceUrl, setEnlaceUrl] = useState("");
  const [enlaceTitulo, setEnlaceTitulo] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setCargando(true);
    const res = await fetch("/api/comunidad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto, enlaceUrl, enlaceTitulo }),
    });
    setCargando(false);
    if (res.ok) {
      setTexto("");
      setEnlaceUrl("");
      setEnlaceTitulo("");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "No se pudo publicar. Inténtalo de nuevo.");
    }
  }

  const inputClass =
    "w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors bg-white text-sm";

  return (
    <form onSubmit={onSubmit} className="bg-white border border-border rounded-2xl p-5 space-y-3">
      <div>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={4}
          maxLength={500}
          required
          placeholder="Cuéntale a la comunidad en qué estás trabajando, un artículo que escribiste o un proyecto que terminaste."
          className={inputClass}
        />
        <div className="text-right text-xs text-ink/40 mt-1">{texto.length}/500</div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          value={enlaceUrl}
          onChange={(e) => setEnlaceUrl(e.target.value)}
          type="url"
          placeholder="Enlace (opcional) https://..."
          className={inputClass}
        />
        <input
          value={enlaceTitulo}
          onChange={(e) => setEnlaceTitulo(e.target.value)}
          maxLength={80}
          placeholder="Título del enlace (opcional)"
          className={inputClass}
        />
      </div>
      {error && <p className="text-coral-600 text-sm">{error}</p>}
      <button
        disabled={cargando}
        className="min-h-[44px] bg-brand-600 text-white px-6 rounded-xl font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50"
      >
        {cargando ? "Publicando..." : "Publicar"}
      </button>
    </form>
  );
}
