import { BadgeCheck, ShieldCheck, Handshake } from "lucide-react";

// Nunca se publican totales de miembros inventados: mientras la
// comunidad esta arrancando, el mensaje es honesto sobre eso en vez de
// mostrar un contador falso.
const BENEFICIOS = [
  { Icono: BadgeCheck, texto: "Perfiles completos" },
  { Icono: ShieldCheck, texto: "Sin comisiones" },
  { Icono: Handshake, texto: "Trato directo" },
];

export default function TrustBar() {
  return (
    <div className="border-y border-border bg-cream">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <p className="text-sm font-semibold text-ink/70 text-center sm:text-left">
          Una comunidad profesional que está comenzando a crecer
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {BENEFICIOS.map((item) => (
            <div key={item.texto} className="flex items-center gap-2">
              <item.Icono className="w-[18px] h-[18px] text-brand-500 shrink-0" strokeWidth={1.75} />
              <span className="text-sm font-medium text-ink/60 leading-tight whitespace-nowrap">{item.texto}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
