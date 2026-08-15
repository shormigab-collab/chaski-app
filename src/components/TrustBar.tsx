import { Users, BadgeCheck, Handshake } from "lucide-react";

// NOTA: el numero "+28" y los avatares son contenido de ejemplo (no
// hay 28 miembros reales todavia). El usuario pidio explicitamente
// replicar el mockup de referencia tal cual mientras la comunidad
// real crece, con la intencion de reemplazarlo por datos reales mas
// adelante (ver conversacion). No usar como referencia de copy en
// otras partes del sitio sin la misma autorizacion explicita.
const AVATARES_EJEMPLO = [
  "https://i.pravatar.cc/60?img=32",
  "https://i.pravatar.cc/60?img=12",
  "https://i.pravatar.cc/60?img=47",
  "https://i.pravatar.cc/60?img=25",
  "https://i.pravatar.cc/60?img=5",
];

const BENEFICIOS = [
  { Icono: Users, texto: "Perfiles reales de toda Latinoamérica" },
  { Icono: BadgeCheck, texto: "Talento recomendado" },
  { Icono: Handshake, texto: "Trato directo y sin comisiones" },
];

export default function TrustBar() {
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
            <span className="w-9 h-9 rounded-full border-2 border-cream bg-brand-100 text-brand-700 text-[11px] font-bold flex items-center justify-center">
              +28
            </span>
          </div>
          <p className="text-sm font-semibold text-ink/70">
            Una comunidad profesional que está comenzando a crecer
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {BENEFICIOS.map((item) => (
            <div key={item.texto} className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
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
