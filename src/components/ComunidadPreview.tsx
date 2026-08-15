import { Heart, MessageCircle, Sparkles } from "lucide-react";

// Vista previa de la futura funcion de comunidad (fase 2, todavia no
// construida). Es una maqueta ilustrativa, NO una publicacion real: el
// avatar es generico, el nombre es un placeholder literal ("Tu nombre")
// y no se muestran contadores de reacciones/comentarios inventados —
// solo los iconos, sin numeros. Se marca explicitamente como
// "Próximamente" y no lleva link de "ver más" (todavía no hay nada real
// que mostrar) para no generar expectativas de una funcion que hoy no
// esta disponible.
export default function ComunidadPreview({ lang = "es" }: { lang?: "es" | "en" }) {
  const t =
    lang === "en"
      ? {
          badge: "Coming soon",
          titulo: "De la comunidad",
          placeholderNombre: "Your name",
          placeholderRol: "Your specialty",
          placeholderTexto: "This is what a project update could look like on your profile.",
          cta: "Request services",
        }
      : {
          badge: "Próximamente",
          titulo: "De la comunidad",
          placeholderNombre: "Tu nombre",
          placeholderRol: "Tu especialidad",
          placeholderTexto: "Así se podría ver una actualización de proyecto en tu perfil.",
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
          <span className="w-8 h-8 rounded-full bg-lavender flex items-center justify-center text-brand-400 font-semibold text-sm shrink-0">
            ?
          </span>
          <div className="leading-tight min-w-0">
            <div className="text-xs font-semibold text-ink/70 truncate">{t.placeholderNombre}</div>
            <div className="text-[11px] text-ink/40 truncate">{t.placeholderRol}</div>
          </div>
        </div>
        <p className="px-3 pb-2 text-xs text-ink/60 leading-relaxed">{t.placeholderTexto}</p>
        <div className="aspect-[16/9] bg-lavender relative flex-1">
          <img
            src="/images/equipo-reunion.webp"
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
        </div>
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3 text-ink/35">
            <Heart className="w-4 h-4" strokeWidth={1.75} />
            <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
          </div>
          <span className="text-[11px] font-semibold text-white bg-brand-400 px-2.5 py-1 rounded-lg">{t.cta}</span>
        </div>
      </div>
    </div>
  );
}
