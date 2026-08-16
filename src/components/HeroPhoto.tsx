import { CheckCircle2, Heart } from "lucide-react";

// NOTA: la tarjeta de proyectos y el badge "Disponible" usan un
// ejemplo ilustrativo ("Camila R.", "Cliente: HolaCoffee") replicando
// el mockup de referencia. No son datos reales — se marcan asi para
// poder reemplazarlos facil mas adelante cuando haya proyectos y
// clientes reales que mostrar.
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

      {/* tarjeta flotante: 2 proyectos de ejemplo en una sola tarjeta
          (antes eran 2 tarjetas separadas — se combinaron para que la
          composicion se sienta menos cargada) */}
      <div className="absolute bottom-10 -left-4 sm:-left-10 w-60 bg-white rounded-2xl shadow-xl shadow-black/10 p-3 animate-float">
        <div className="flex items-center gap-1.5 mb-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0" strokeWidth={2} />
          <span className="text-[10px] font-bold text-brand-600">Trabajo destacado</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src="/images/ejemplos/fintech-app.webp"
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-black/55 px-1.5 py-1">
              <span className="text-[9px] font-semibold text-white leading-none block truncate">App Fintech</span>
            </span>
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src="/images/ejemplos/holacoffee.webp"
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="absolute inset-x-0 bottom-0 bg-black/55 px-1.5 py-1">
              <span className="text-[9px] font-semibold text-white leading-none block truncate">Marca e-commerce</span>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] text-ink/45 truncate">Camila R. · HolaCoffee</span>
          <span className="flex items-center gap-0.5 text-[10px] font-semibold text-coral-600 shrink-0">
            <Heart className="w-2.5 h-2.5 fill-coral-500 text-coral-500" />
            42
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
    </div>
  );
}
