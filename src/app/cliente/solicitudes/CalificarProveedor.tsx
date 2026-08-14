"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type Props = {
  proveedorId: string;
  proveedorNombre: string;
  resenaInicial: { puntuacion: number; comentario: string | null } | null;
};

export default function CalificarProveedor({ proveedorId, proveedorNombre, resenaInicial }: Props) {
  const [abierto, setAbierto] = useState(false);
  const [puntuacion, setPuntuacion] = useState(resenaInicial?.puntuacion ?? 0);
  const [hover, setHover] = useState(0);
  const [comentario, setComentario] = useState(resenaInicial?.comentario ?? "");
  const [enviando, setEnviando] = useState(false);
  const [guardada, setGuardada] = useState<{ puntuacion: number; comentario: string | null } | null>(
    resenaInicial
  );
  const [error, setError] = useState("");

  async function enviar() {
    if (puntuacion < 1) {
      setError("Selecciona al menos una estrella");
      return;
    }
    setError("");
    setEnviando(true);
    const res = await fetch("/api/resenas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proveedorId, puntuacion, comentario: comentario.trim() || undefined }),
    });
    setEnviando(false);
    if (res.ok) {
      setGuardada({ puntuacion, comentario: comentario.trim() || null });
      setAbierto(false);
    } else {
      const data = await res.json();
      setError(data.error || "No se pudo guardar tu calificación");
    }
  }

  if (guardada && !abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="inline-flex items-center gap-1 text-xs text-ink/50 hover:text-brand-600 transition-colors"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            className={`w-3.5 h-3.5 ${n <= guardada.puntuacion ? "fill-gold-500 text-gold-500" : "text-black/15"}`}
          />
        ))}
        <span className="ml-1 underline decoration-dotted">editar</span>
      </button>
    );
  }

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="text-xs font-semibold text-brand-600 hover:text-brand-700 underline decoration-dotted"
      >
        Calificar
      </button>
    );
  }

  return (
    <div className="mt-2 w-full bg-cream border border-black/5 rounded-xl p-3">
      <p className="text-xs text-ink/60 mb-2">¿Cómo te fue con {proveedorNombre.split(" ")[0]}?</p>
      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setPuntuacion(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            className="p-0.5"
            aria-label={`${n} estrella${n === 1 ? "" : "s"}`}
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                n <= (hover || puntuacion) ? "fill-gold-500 text-gold-500" : "text-black/15"
              }`}
            />
          </button>
        ))}
      </div>
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Cuéntanos cómo fue tu experiencia (opcional)"
        rows={2}
        maxLength={500}
        className="w-full text-sm border border-black/10 rounded-lg px-3 py-2 outline-none focus:border-brand-500 transition-colors bg-white"
      />
      {error && <p className="text-coral-600 text-xs mt-1.5">{error}</p>}
      <div className="flex gap-2 mt-2">
        <button
          type="button"
          disabled={enviando}
          onClick={enviar}
          className="text-xs font-semibold bg-brand-500 text-cream px-4 py-2 rounded-full hover:bg-brand-600 transition-colors disabled:opacity-50"
        >
          {enviando ? "Guardando..." : "Enviar calificación"}
        </button>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          className="text-xs font-medium text-ink/50 px-3 py-2 hover:text-ink transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
