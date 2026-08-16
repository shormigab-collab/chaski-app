import Link from "next/link";
import { Search, ListChecks, Handshake, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const TARJETAS_ES = [
  {
    Icono: Search,
    titulo: "Ahorra horas de búsqueda",
    texto: "Recibe propuestas sin revisar perfiles uno por uno.",
    grad: "from-brand-400 to-brand-600",
  },
  {
    Icono: ListChecks,
    titulo: "Compara con contexto",
    texto: "Evalúa experiencia, especialidad y ubicación antes de decidir.",
    grad: "from-coral-500 to-coral-600",
  },
  {
    Icono: Handshake,
    titulo: "Habla directamente",
    texto: "Acuerda alcance y condiciones sin intermediarios.",
    grad: "from-gold-500 to-gold-600",
  },
];

const TARJETAS_EN = [
  {
    Icono: Search,
    titulo: "Save hours of searching",
    texto: "Get proposals without reviewing profiles one by one.",
    grad: "from-brand-400 to-brand-600",
  },
  {
    Icono: ListChecks,
    titulo: "Compare with context",
    texto: "Evaluate experience, specialty, and location before deciding.",
    grad: "from-coral-500 to-coral-600",
  },
  {
    Icono: Handshake,
    titulo: "Talk directly",
    texto: "Agree on scope and terms with no middlemen.",
    grad: "from-gold-500 to-gold-600",
  },
];

export default function Beneficios({ lang = "es" }: { lang?: "es" | "en" }) {
  const tarjetas = lang === "en" ? TARJETAS_EN : TARJETAS_ES;
  const t =
    lang === "en"
      ? {
          eyebrow: "WHY POST ON CHASKI",
          h2a: "Hiring talent shouldn't feel like ",
          h2b: "another job.",
          sub: "Post what you need once and let relevant professionals come to you.",
          cta: "Post for free",
          trust: "No commissions · Direct contact",
          href: "/registro/cliente?lang=en",
        }
      : {
          eyebrow: "POR QUÉ PUBLICAR EN CHASKI",
          h2a: "Contratar talento no debería sentirse como ",
          h2b: "otro trabajo.",
          sub: "Publica lo que necesitas una sola vez y deja que profesionales relevantes lleguen a ti.",
          cta: "Publicar gratis",
          trust: "Sin comisiones · Contacto directo",
          href: "/registro/cliente",
        };

  return (
    <section className="bg-cream">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <Reveal>
          <div className="relative overflow-hidden bg-ink rounded-3xl p-8 sm:p-12 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-8 items-center">
            {/* linea tipo "camino" decorativa, muy sutil, mismo motivo de marca */}
            <svg
              className="hidden lg:block absolute -left-6 bottom-0 w-64 h-72 text-white/10 pointer-events-none"
              viewBox="0 0 200 240"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M40 10 C10 40, 90 55, 60 90 C25 128, 105 130, 80 170 C58 203, 100 210, 90 235"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="90" cy="235" r="5" stroke="currentColor" strokeWidth="2" />
            </svg>

            <div className="relative">
              <span className="block text-xs font-bold tracking-widest text-coral-400 mb-4">{t.eyebrow}</span>
              <h2
                className="font-extrabold text-white mb-4"
                style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", lineHeight: 1.15, letterSpacing: "-0.015em" }}
              >
                {t.h2a}
                <span className="text-coral-400">{t.h2b}</span>
              </h2>
              <p className="text-white/65 max-w-sm mb-7 leading-relaxed">{t.sub}</p>

              <Link
                href={t.href}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm shadow-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-400"
              >
                {t.cta}
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>

              <p className="text-sm text-white/45 mt-4">{t.trust}</p>
            </div>

            <div className="relative flex flex-col gap-4">
              {tarjetas.map((b, i) => (
                <Reveal key={b.titulo} delay={i * 100}>
                  <div className="flex items-center gap-4 bg-lavender rounded-2xl p-5">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${b.grad} text-white flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      <b.Icono className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-ink leading-snug">{b.titulo}</h3>
                      <p className="text-sm text-ink/60 leading-snug mt-0.5">{b.texto}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
