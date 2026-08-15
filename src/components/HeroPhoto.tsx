export default function HeroPhoto() {
  return (
    <div className="relative w-full max-w-lg mx-auto md:mx-0">
      {/* foto principal: recorte con fondo transparente, sin marco */}
      <img
        src="/images/hero-equipo.png"
        alt="Profesionales de Latinoamérica trabajando con laptop y tablet"
        width={820}
        height={546}
        className="w-full h-auto relative z-0"
      />

      {/* tarjeta flotante: contacto directo */}
      <div className="absolute bottom-8 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl shadow-black/10 px-4 py-3 flex items-center gap-2.5 animate-float">
        <span className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#3B2F8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="leading-tight">
          <div className="text-sm font-bold text-ink">Contacto directo</div>
          <div className="text-[11px] text-ink/45">sin intermediarios</div>
        </div>
      </div>

      {/* tarjeta flotante: disponibilidad */}
      <div
        className="absolute top-4 -right-2 sm:-right-6 bg-white rounded-2xl shadow-xl shadow-black/10 px-3.5 py-3 flex items-center gap-2 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-availability shrink-0" />
        <span className="text-xs font-semibold text-ink/70">Disponible</span>
      </div>
    </div>
  );
}
