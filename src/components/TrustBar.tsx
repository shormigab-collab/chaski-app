import { Users, Megaphone, Handshake } from "lucide-react";

// NOTA: los 3 avatares son contenido de ejemplo (fotos de stock, banco
// de uso libre) mientras la comunidad real crece — no representan
// miembros reales todavia. El usuario pidio explicitamente replicar el
// mockup de referencia tal cual (ver conversacion), sin el numero "+28"
// que se usaba antes, para no insinuar un conteo que no es real.
const AVATARES_EJEMPLO = [
  "https://i.pravatar.cc/60?img=12",
  "https://i.pravatar.cc/60?img=47",
  "https://i.pravatar.cc/60?img=33",
];

const BENEFICIOS = [
  { Icono: Users, texto: "Perfiles completos", bg: "bg-brand-50", color: "text-brand-500" },
  { Icono: Megaphone, texto: "Trabajo visible", bg: "bg-coral-50", color: "text-coral-500" },
  { Icono: Handshake, texto: "Trato directo", bg: "bg-brand-50", color: "text-brand-500" },
];

const BENEFITS_EN = [
  { Icono: Users, texto: "Complete profiles", bg: "bg-brand-50", color: "text-brand-500" },
  { Icono: Megaphone, texto: "Visible work", bg: "bg-coral-50", color: "text-coral-500" },
  { Icono: Handshake, texto: "Direct deals", bg: "bg-brand-50", color: "text-brand-500" },
];

export default function TrustBar({ lang = "es" }: { lang?: "es" | "en" }) {
  const beneficios = lang === "en" ? BENEFITS_EN : BENEFICIOS;
  const mensaje =
    lang === "en"
      ? "A professional community that's just getting started"
      : "Una comunidad profesional que está comenzando a crecer";

  return (
    <div className="border-y border-border bg-cream">
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5 shrink-0">
            {AVATARES_EJEMPLO.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className="w-9 h-9 rounded-full border-2 border-cream object-cover"
                style={{ zIndex: AVATARES_EJEMPLO.length - i }}
              />
            ))}
          </div>
          <p className="text-sm font-semibold text-ink/70">{mensaje}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {beneficios.map((item) => (
            <div key={item.texto} className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-lg ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                <item.Icono className="w-4 h-4" strokeWidth={1.75} />
              </span>
              <span className="text-sm font-medium text-ink/60 leading-tight whitespace-nowrap">{item.texto}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
