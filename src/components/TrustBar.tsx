import { BadgeCheck, ShieldCheck, Zap, Globe2 } from "lucide-react";

const ITEMS = [
  { Icono: BadgeCheck, texto: "Publicar es 100% gratis" },
  { Icono: ShieldCheck, texto: "Perfiles con nombre real" },
  { Icono: Zap, texto: "Contacto directo, sin intermediarios" },
  { Icono: Globe2, texto: "Profesionales en toda LatAm" },
];

export default function TrustBar() {
  return (
    <div className="border-y border-border bg-white/60">
      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {ITEMS.map((item) => (
          <div key={item.texto} className="flex items-center gap-2.5 justify-center sm:justify-start">
            <item.Icono className="w-[18px] h-[18px] text-brand-500 shrink-0" strokeWidth={1.75} />
            <span className="text-sm font-medium text-ink/60 leading-tight">{item.texto}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
