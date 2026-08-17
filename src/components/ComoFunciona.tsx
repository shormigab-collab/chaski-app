import Link from "next/link";
import { PenLine, MessageSquare, SlidersHorizontal, FileText, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const PASOS_ES = [
  {
    n: 1,
    t: "Describe tu necesidad",
    d: "Cuéntanos qué buscas, gratis y en menos de 2 minutos.",
    circle: "bg-brand-500",
    iconBg: "bg-brand-50",
    iconColor: "text-brand-600",
    Icono: PenLine,
  },
  {
    n: 2,
    t: "Recibe propuestas",
    d: "Profesionales interesados te contactan directamente.",
    circle: "bg-coral-500",
    iconBg: "bg-coral-50",
    iconColor: "text-coral-500",
    Icono: MessageSquare,
  },
  {
    n: 3,
    t: "Compara y elige",
    d: "Revisa perfiles y decide con quién trabajar.",
    circle: "bg-gold-500",
    iconBg: "bg-gold-50",
    iconColor: "text-gold-600",
    Icono: SlidersHorizontal,
  },
];

const PASOS_EN = [
  {
    n: 1,
    t: "Describe what you need",
    d: "Tell us what you're looking for, free and in under 2 minutes.",
    circle: "bg-brand-500",
    iconBg: "bg-brand-50",
    iconColor: "text-brand-600",
    Icono: PenLine,
  },
  {
    n: 2,
    t: "Get proposals",
    d: "Interested professionals contact you directly.",
    circle: "bg-coral-500",
    iconBg: "bg-coral-50",
    iconColor: "text-coral-500",
    Icono: MessageSquare,
  },
  {
    n: 3,
    t: "Compare and choose",
    d: "Review profiles and decide who to work with.",
    circle: "bg-gold-500",
    iconBg: "bg-gold-50",
    iconColor: "text-gold-600",
    Icono: SlidersHorizontal,
  },
];

export default function ComoFunciona({ lang = "es" }: { lang?: "es" | "en" }) {
  const pasos = lang === "en" ? PASOS_EN : PASOS_ES;

  const t =
    lang === "en"
      ? {
          eyebrow: "HOW IT WORKS",
          h2a: "From project to the right professional, in",
          h2b: "3 steps.",
          sub: "Post for free, get proposals, and compare profiles before deciding.",
          fotoAlt: "Team of professionals reviewing a project together",
          card1: "Project posted",
          card2: "Proposals received",
          cta: "Post a project for free",
          explorar: "Explore professionals",
          trust: "No commissions",
          trust2: "Direct contact",
          hrefCta: "/registro/cliente?lang=en",
        }
      : {
          eyebrow: "CÓMO FUNCIONA",
          h2a: "Del proyecto al profesional ideal, en",
          h2b: "3 pasos.",
          sub: "Publica gratis, recibe propuestas y compara perfiles antes de decidir.",
          fotoAlt: "Equipo de profesionales revisando un proyecto juntos",
          card1: "Proyecto publicado",
          card2: "Propuestas recibidas",
          cta: "Publicar un proyecto gratis",
          explorar: "Explorar profesionales",
          trust: "Sin comisiones",
          trust2: "Contacto directo",
          hrefCta: "/registro/cliente",
        };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-lavender/60 via-cream to-cream border-y border-border">
      <div className="absolute top-0 right-0 w-[28rem] h-[28rem] rounded-full bg-brand-100/30 blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <Reveal>
          <div className="text-center mb-12 sm:mb-14">
            <span className="inline-block text-xs font-bold tracking-widest text-brand-600 bg-brand-50 px-4 py-2 rounded-full mb-5">
              {t.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-500 tracking-tight mb-3">
              {t.h2a} <span className="text-coral-500">{t.h2b}</span>
            </h2>
            <p className="text-ink/55 max-w-md mx-auto">{t.sub}</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <Reveal>
            <div className="relative max-w-lg mx-auto md:mx-0">
              <div className="rounded-[2rem] overflow-hidden shadow-lg shadow-brand-900/10 aspect-[3/2]">
                <img src="/images/hero-mesa-equipo.webp" alt={t.fotoAlt} className="w-full h-full object-cover" />
              </div>

              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 bg-white rounded-2xl shadow-lg shadow-black/10 px-3.5 py-2.5 flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-ink whitespace-nowrap">{t.card1}</span>
              </div>

              <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 bg-white rounded-2xl shadow-lg shadow-black/10 px-3.5 py-2.5 flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-lg bg-coral-50 text-coral-500 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-ink whitespace-nowrap">{t.card2}</span>
              </div>
            </div>
          </Reveal>

          <div>
            <div className="relative space-y-3.5">
              <div className="absolute left-[22px] top-6 bottom-6 w-px bg-border" aria-hidden="true" />

              {pasos.map((p, i) => (
                <Reveal key={p.n} delay={i * 120}>
                  <div className="relative flex items-start gap-4">
                    <div
                      className={`relative z-10 w-11 h-11 rounded-full ${p.circle} text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      {p.n}
                    </div>
                    <div className="flex-1 min-w-0 bg-white rounded-2xl border border-border p-4 sm:p-5 flex items-center gap-3.5 shadow-sm">
                      <span
                        className={`w-11 h-11 rounded-xl ${p.iconBg} ${p.iconColor} flex items-center justify-center shrink-0`}
                      >
                        <p.Icono className="w-5 h-5" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-bold text-ink">{p.t}</h3>
                        <p className="text-sm text-ink/55">{p.d}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={400}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">
                <Link
                  href={t.hrefCta}
                  className="inline-flex items-center justify-center min-h-[44px] bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors shadow-sm shadow-brand-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  {t.cta}
                </Link>
                <Link
                  href="/profesionales"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  {t.explorar}
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </Link>
              </div>
              <p className="text-sm text-ink/45 mt-3">
                {t.trust} · {t.trust2}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
