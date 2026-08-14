import { MapPin, CheckCircle2 } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";

// Vista previa ilustrativa del producto (no son perfiles reales) que
// muestra cómo se ven las tarjetas de profesionales dentro de chaski.
const EJEMPLOS = [
  { foto: "https://i.pravatar.cc/80?img=32", nombre: "Ana G.", categoriaSlug: "diseno-grafico", categoria: "Diseño gráfico", ciudad: "Bogotá, Colombia", anios: 6 },
  { foto: "https://i.pravatar.cc/80?img=12", nombre: "Luis M.", categoriaSlug: "desarrollo-web", categoria: "Desarrollo web", ciudad: "CDMX, México", anios: 4 },
  { foto: "https://i.pravatar.cc/80?img=47", nombre: "Paula R.", categoriaSlug: "contabilidad", categoria: "Contabilidad", ciudad: "Lima, Perú", anios: 8 },
];

export default function HeroMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto md:mx-0">
      <div className="absolute -top-6 -right-6 w-full h-full bg-coral-100/70 rounded-[2rem] -z-20" />
      <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 bg-gold-400/15 rounded-[2rem] -z-20" />

      {/* foto decorativa que asoma detrás del mockup — solo ambiente visual,
          no representa a una persona real de la plataforma */}
      <div className="absolute -top-9 -left-9 w-32 h-40 sm:w-40 sm:h-48 rounded-2xl overflow-hidden shadow-xl shadow-black/20 ring-4 ring-cream -rotate-6 -z-10">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="rounded-[1.75rem] overflow-hidden shadow-2xl shadow-black/15 bg-white border border-black/5">
        {/* barra tipo navegador, deja claro que es una vista previa del producto */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 bg-cream/60">
          <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
          <span className="w-2.5 h-2.5 rounded-full bg-black/10" />
          <span className="ml-2 text-[11px] text-ink/35 font-medium">Vista previa · usechaski.com/profesionales</span>
        </div>

        <div className="p-4 space-y-3">
          {EJEMPLOS.map((p) => (
            <div key={p.nombre} className="flex items-center gap-3 border border-black/5 rounded-xl p-3">
              <img
                src={p.foto}
                alt=""
                className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-white"
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-ink truncate">{p.nombre}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-brand-500 font-medium">
                  <CategoryIcon slug={p.categoriaSlug} className="w-3 h-3 shrink-0" />
                  <span className="truncate">{p.categoria}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-ink/40 mt-0.5">
                  <MapPin className="w-3 h-3 shrink-0" strokeWidth={1.75} />
                  <span className="truncate">{p.ciudad}</span>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-brand-500 bg-brand-50 rounded-full px-2.5 py-1 shrink-0">
                Ver perfil
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* tarjeta flotante: confirma qué es real (gratis publicar) */}
      <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl shadow-black/15 px-4 py-3 flex items-center gap-2.5 animate-float">
        <span className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4 text-brand-500" strokeWidth={2} />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-bold text-ink">Publicar es gratis</div>
          <div className="text-[11px] text-ink/45">toma menos de 2 minutos</div>
        </div>
      </div>
    </div>
  );
}
