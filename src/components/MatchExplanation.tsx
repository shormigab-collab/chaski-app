import type { NivelCompatibilidad } from "@/lib/matching";

const ESTILOS: Record<NivelCompatibilidad, { label: string; classes: string }> = {
  alta: { label: "Alta compatibilidad", classes: "bg-brand-50 text-brand-700 border-brand-200" },
  media: { label: "Compatibilidad media", classes: "bg-gold-50 text-gold-600 border-gold-100" },
  insuficiente: { label: "Información insuficiente", classes: "bg-black/5 text-ink/50 border-black/10" },
};

// Muestra el nivel de compatibilidad (nunca un porcentaje falsamente
// preciso) y hasta 2 razones concretas. El calculo real vive en
// lib/matching.ts, esto solo lo presenta.
export default function MatchExplanation({
  nivel,
  razones,
}: {
  nivel: NivelCompatibilidad;
  razones: string[];
}) {
  const estilo = ESTILOS[nivel];
  return (
    <div className={`rounded-xl border px-3.5 py-3 text-xs ${estilo.classes}`}>
      <p className="font-semibold mb-1">{estilo.label}</p>
      <ul className="space-y-0.5">
        {razones.slice(0, 2).map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
