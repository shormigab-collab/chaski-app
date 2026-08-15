import { Heart, MessageCircle, Sparkles, FileText } from "lucide-react";

// NOTA: este post es un ejemplo ilustrativo (nombre, texto, reacciones
// y comentarios inventados) que replica el mockup de referencia — no
// existe todavia la funcion de comunidad real (fase 2, ver
// conversacion). El avatar usa iniciales en vez de una foto para que
// quede claro que es un ejemplo, no una persona real con foto propia.
// Reemplazar por publicaciones reales en cuanto la fase 2 este lista.
export default function ComunidadPreview({ lang = "es" }: { lang?: "es" | "en" }) {
  const t =
    lang === "en"
      ? {
          badge: "Coming soon",
          titulo: "De la comunidad",
          nombre: "María José G.",
          rol: "Estratega de Contenido",
          tiempo: "3 h",
          texto:
            "I just published an article about how to build a content strategy that really connects with your audience. Would love to hear your thoughts! 👋",
          articuloTitulo: "Content strategy that drives real impact",
          articuloTiempo: "8 min read",
          cta: "Request services",
        }
      : {
          badge: "Próximamente",
          titulo: "De la comunidad",
          nombre: "María José G.",
          rol: "Estratega de Contenido",
          tiempo: "3 h",
          texto:
            "Acabo de publicar un artículo sobre cómo crear una estrategia de contenido que conecte de verdad con tu audiencia. ¡Me encantaría saber qué opinan! 👋",
          articuloTitulo: "Estrategia de contenido que genera impacto",
          articuloTiempo: "8 min de lectura",
          cta: "Solicitar sus servicios",
        };

  return (
    <div className="bg-white border border-border rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-ink">{t.titulo}</h2>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-full shrink-0">
          <Sparkles className="w-3 h-3" strokeWidth={1.75} />
          {t.badge}
        </span>
      </div>

      <div className="rounded-xl border border-border overflow-hidden flex-1 flex flex-col">
        <div className="flex items-center gap-2.5 p-3">
          <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-[11px] font-bold shrink-0">
            MJ
          </span>
          <div className="leading-tight min-w-0">
            <div className="text-xs font-semibold text-ink/80 truncate">{t.nombre}</div>
            <div className="text-[11px] text-ink/40 truncate">
              {t.rol} · {t.tiempo}
            </div>
          </div>
        </div>
        <p className="px-3 pb-3 text-xs text-ink/65 leading-relaxed">{t.texto}</p>
        <div className="mx-3 mb-3 rounded-lg border border-border p-2.5 flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-md bg-lavender text-brand-500 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" strokeWidth={1.75} />
          </span>
          <div className="leading-tight min-w-0">
            <div className="text-[11px] font-semibold text-ink/80 truncate">{t.articuloTitulo}</div>
            <div className="text-[10px] text-ink/40">{t.articuloTiempo}</div>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between p-3 pt-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] font-medium text-ink/50">
              <Heart className="w-3.5 h-3.5 fill-coral-500 text-coral-500" strokeWidth={1.75} />
              24
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-ink/50">
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.75} />7
            </span>
          </div>
          <span className="text-[11px] font-semibold text-white bg-brand-500 px-2.5 py-1.5 rounded-lg">{t.cta}</span>
        </div>
      </div>
    </div>
  );
}
