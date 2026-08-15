import { CheckCircle2, Heart } from "lucide-react";

// NOTA: las 3 tarjetas flotantes usan un ejemplo ilustrativo ("Camila
// R.", "Cliente: HolaCoffee") replicando el mockup de referencia. No
// son datos reales — se marcan asi para poder reemplazarlas facil mas
// adelante cuando haya proyectos y clientes reales que mostrar.
export default function HeroPhoto() {
  return (
    <div className="relative w-full max-w-lg mx-auto md:mx-0 pt-20 pb-10">
      {/* foto principal: recorte con fondo transparente, sin marco. El
          degradado en la mascara difumina la parte de abajo (donde la
          foto original termina a media pierna) para que no se vea como
          un corte brusco, sino que se disuelve hacia el fondo. */}
      <img
        src="/images/hero-equipo.png"
        alt="Profesionales de Latinoamérica trabajando con laptop y tablet"
        width={820}
        height={546}
        className="w-full h-auto relative z-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 100%)",
        }}
      />

      {/* tarjeta flotante: proyecto de ejemplo */}
      <div className="absolute bottom-10 -left-4 sm:-left-10 w-40 bg-white rounded-2xl shadow-xl shadow-black/10 p-2.5 animate-float">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 text-[10px] font-bold flex items-center justify-center shrink-0">
            CR
          </span>
          <div className="leading-tight min-w-0">
            <div className="text-[11px] font-bold text-ink truncate">Camila R.</div>
            <div className="text-[9px] text-ink/45 truncate">Diseñadora UI/UX</div>
          </div>
        </div>
        <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 mb-1.5" />
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-ink/60">Diseño de app Fintech</span>
          <span className="flex items-center gap-0.5 text-[10px] font-semibold text-coral-600 shrink-0">
            <Heart className="w-2.5 h-2.5 fill-coral-500 text-coral-500" />
            24
          </span>
        </div>
      </div>

      {/* tarjeta flotante: disponibilidad — arriba de la foto (no encima
          de las caras) */}
      <div
        className="absolute top-0 left-[24%] bg-white rounded-2xl shadow-xl shadow-black/10 px-3.5 py-3 flex items-center gap-2 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-availability shrink-0" />
        <div className="leading-tight">
          <div className="text-xs font-semibold text-ink/70">Disponible</div>
          <div className="text-[10px] text-ink/40">Colaboraciones remotas</div>
        </div>
      </div>

      {/* tarjeta flotante: trabajo de ejemplo con cliente — arriba de la
          foto, a la derecha, sin tapar la cara */}
      <div
        className="absolute top-1 -right-2 sm:-right-8 w-48 bg-white rounded-2xl shadow-xl shadow-black/10 p-3 animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0" strokeWidth={2} />
          <span className="text-[10px] font-bold text-brand-600">Trabajo destacado</span>
        </div>
        <div className="text-xs font-semibold text-ink leading-snug mb-1">Estrategia de marca para e-commerce</div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-ink/45">Cliente: HolaCoffee</span>
          <span className="flex items-center gap-0.5 text-[10px] font-semibold text-coral-600 shrink-0">
            <Heart className="w-2.5 h-2.5 fill-coral-500 text-coral-500" />
            18
          </span>
        </div>
      </div>
    </div>
  );
}
