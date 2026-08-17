// NOTA: la tarjeta "Identidad de marca / Camila R." usa un ejemplo
// ilustrativo (mismo proyecto de ejemplo que en "Trabajo que habla por
// ti" — la miniatura es real, la atribucion a Camila R. es ilustrativa,
// no un proyecto real de esa persona). No son datos reales — se marcan
// asi para poder reemplazarlos facil mas adelante cuando haya
// proyectos y clientes reales que mostrar.
export default function HeroPhoto({ lang = "es" }: { lang?: "es" | "en" }) {
  const t =
    lang === "en"
      ? {
          alt: "Team of professionals working together on a project",
          disponible: "Available for projects",
          ejemplo: "Portfolio example",
          titulo: "Brand identity",
          autor: "Camila R.",
        }
      : {
          alt: "Equipo de profesionales trabajando juntos en un proyecto",
          disponible: "Disponible para proyectos",
          ejemplo: "Ejemplo de portafolio",
          titulo: "Identidad de marca",
          autor: "Camila R.",
        };

  return (
    <div className="relative w-full max-w-lg mx-auto md:mx-0">
      <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-brand-900/10">
        <img src="/images/hero-mesa-equipo.webp" alt={t.alt} className="w-full h-auto block" />

        {/* tarjeta: disponibilidad, arriba a la derecha */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white rounded-2xl shadow-lg shadow-black/10 px-3.5 py-2.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-availability shrink-0" />
          <span className="text-xs sm:text-sm font-semibold text-ink whitespace-nowrap">{t.disponible}</span>
        </div>

        {/* tarjeta: ejemplo de portafolio, abajo a la izquierda — con
            miniatura real, no un icono vacio */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white rounded-2xl shadow-lg shadow-black/10 p-2.5 sm:p-3 flex items-center gap-2.5 max-w-[240px]">
          <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden shrink-0">
            <img src="/images/ejemplos/holacoffee.webp" alt="" className="w-full h-full object-cover" />
          </span>
          <div className="min-w-0 leading-tight">
            <div className="text-[10px] text-ink/40 mb-0.5 truncate">{t.ejemplo}</div>
            <div className="text-sm font-bold text-ink truncate">{t.titulo}</div>
            <div className="text-xs text-ink/55 truncate">{t.autor}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
