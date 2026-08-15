import { Heart, MessageCircle, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";

// Vista previa de la futura funcion de comunidad (fase 2, todavia no
// construida). Es una maqueta ilustrativa, NO una publicacion real: el
// avatar es generico, el nombre es un placeholder literal ("Tu nombre")
// y no se muestran contadores de reacciones/comentarios inventados —
// solo los iconos, sin numeros — para no aparentar actividad que no
// existe. Se marca explicitamente como "Próximamente" para no generar
// expectativas de una funcion que hoy no esta disponible.
export default function ComunidadPreview({ lang = "es" }: { lang?: "es" | "en" }) {
  const t =
    lang === "en"
      ? {
          badge: "Coming soon",
          titulo: "De la comunidad",
          sub: "Soon, every professional will be able to share project updates directly on Chaski — and clients will be able to reach out right from the post.",
          placeholderNombre: "Your name",
          placeholderRol: "Your specialty",
          placeholderTexto: "This is what a project update could look like on your profile.",
          cta: "Request services",
        }
      : {
          badge: "Próximamente",
          titulo: "De la comunidad",
          sub: "Pronto cada profesional podrá compartir avances de proyectos directamente en Chaski — y los clientes podrán escribirle desde la misma publicación.",
          placeholderNombre: "Tu nombre",
          placeholderRol: "Tu especialidad",
          placeholderTexto: "Así se podría ver una actualización de proyecto en tu perfil.",
          cta: "Solicitar sus servicios",
        };

  return (
    <section className="bg-lavender/40 border-y border-border">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
              {t.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-4">{t.titulo}</h2>
            <p className="text-ink/60 leading-relaxed max-w-md">{t.sub}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="relative max-w-sm mx-auto">
            <div className="absolute -top-4 -right-4 bg-coral-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm z-10">
              {t.badge}
            </div>
            <div className="rounded-2xl border border-border bg-white shadow-xl shadow-black/5 overflow-hidden">
              <div className="flex items-center gap-3 p-4">
                <span className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center text-brand-400 font-semibold shrink-0">
                  ?
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-ink/70">{t.placeholderNombre}</div>
                  <div className="text-xs text-ink/40">{t.placeholderRol}</div>
                </div>
              </div>
              <div className="px-4 pb-3 text-sm text-ink/60">{t.placeholderTexto}</div>
              <div className="aspect-[16/10] bg-lavender">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=70"
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4 text-ink/35">
                  <Heart className="w-[18px] h-[18px]" strokeWidth={1.75} />
                  <MessageCircle className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-semibold text-white bg-brand-400 px-3 py-1.5 rounded-full">
                  {t.cta}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
