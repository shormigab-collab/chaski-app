export default function HeroPhoto() {
  return (
    <div className="relative w-full max-w-md mx-auto md:mx-0">
      {/* forma decorativa detrás */}
      <div className="absolute -top-6 -right-6 w-full h-full bg-coral-100 rounded-[2rem] -z-10" />
      <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 bg-gold-400/20 rounded-[2rem] -z-10" />

      {/* foto principal */}
      <div className="rounded-[2rem] overflow-hidden shadow-xl shadow-black/10 aspect-[4/5]">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
          alt="Profesional trabajando en un proyecto"
          className="w-full h-full object-cover"
        />
      </div>

      {/* tarjeta flotante: verificacion */}
      <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl shadow-black/15 px-4 py-3 flex items-center gap-2.5 animate-float">
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

      {/* tarjeta flotante: avatares + contador */}
      <div
        className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl shadow-black/15 px-3.5 py-3 flex items-center gap-2 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <div className="flex -space-x-2">
          <img src="https://i.pravatar.cc/60?img=12" className="w-7 h-7 rounded-full border-2 border-white object-cover" alt="" />
          <img src="https://i.pravatar.cc/60?img=32" className="w-7 h-7 rounded-full border-2 border-white object-cover" alt="" />
          <img src="https://i.pravatar.cc/60?img=47" className="w-7 h-7 rounded-full border-2 border-white object-cover" alt="" />
        </div>
        <span className="text-xs font-semibold text-ink/70">profesionales activos</span>
      </div>
    </div>
  );
}
