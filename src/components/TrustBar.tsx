const ITEMS = [
  { icono: "✅", texto: "Publicar es 100% gratis" },
  { icono: "🔒", texto: "Perfiles verificados" },
  { icono: "⚡", texto: "Respuestas en horas, no días" },
  { icono: "🌎", texto: "Profesionales en toda LatAm" },
];

export default function TrustBar() {
  return (
    <div className="border-y border-black/5 bg-white/60">
      <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {ITEMS.map((item) => (
          <div key={item.texto} className="flex items-center gap-2.5 justify-center sm:justify-start">
            <span className="text-lg">{item.icono}</span>
            <span className="text-sm font-medium text-ink/60 leading-tight">{item.texto}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
