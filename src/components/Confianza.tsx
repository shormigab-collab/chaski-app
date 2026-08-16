import Link from "next/link";
import { MapPin, Briefcase, FileText, MessageSquare, Check, Info, ExternalLink, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

// Importante: este texto describe unicamente lo que la plataforma pide
// hoy al crear un perfil (nombre, ubicacion, experiencia, bio, contacto
// directo). No afirma un proceso de verificacion manual de identidad,
// porque ese proceso todavia no existe en el producto.
const PUNTOS = [
  { Icono: MapPin, texto: "Nombre y ubicación" },
  { Icono: Briefcase, texto: "Experiencia y especialidades" },
  { Icono: FileText, texto: "Bio y portafolio" },
  { Icono: MessageSquare, texto: "Contacto directo" },
];

const POINTS_EN = [
  { Icono: MapPin, texto: "Name and location" },
  { Icono: Briefcase, texto: "Experience and specialties" },
  { Icono: FileText, texto: "Bio and portfolio" },
  { Icono: MessageSquare, texto: "Direct contact" },
];

export default function Confianza({ lang = "es" }: { lang?: "es" | "en" }) {
  const puntos = lang === "en" ? POINTS_EN : PUNTOS;
  const t =
    lang === "en"
      ? {
          eyebrow: "PROFILES WITH CONTEXT",
          h2a: "Know the profile ",
          h2b: "before you reach out.",
          sub: "Review the information each professional shares and decide with more context.",
          cta: "Explore professionals",
          nota: "This information is provided by each professional.",
          badge: "Example profile",
          rol: "UX/UI design professional",
          ciudad: "Bogotá, Colombia",
          experiencia: "5 years of experience",
          tag1: "Product design",
          tag2: "UX research",
          portafolio: "Portfolio",
          verPortafolio: "View portfolio",
          contactar: "Contact",
        }
      : {
          eyebrow: "PERFILES CON CONTEXTO",
          h2a: "Conoce el perfil ",
          h2b: "antes de contactar.",
          sub: "Revisa la información que cada profesional comparte y decide con mayor contexto.",
          cta: "Explorar profesionales",
          nota: "La información es proporcionada por cada profesional.",
          badge: "Perfil de ejemplo",
          rol: "Profesional de diseño UX/UI",
          ciudad: "Bogotá, Colombia",
          experiencia: "5 años de experiencia",
          tag1: "Diseño de producto",
          tag2: "Investigación UX",
          portafolio: "Portafolio",
          verPortafolio: "Ver portafolio",
          contactar: "Contactar",
        };

  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20">
      <div className="relative max-w-6xl mx-auto px-4 grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-10 items-center">
        {/* columna izquierda: checklist */}
        <Reveal>
          <span className="block text-xs font-bold tracking-widest text-brand-600 mb-4">{t.eyebrow}</span>
          <h2
            className="font-extrabold text-ink mb-4"
            style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)", lineHeight: 1.12, letterSpacing: "-0.02em" }}
          >
            {t.h2a}
            <span className="text-coral-600">{t.h2b}</span>
          </h2>
          <p className="text-ink/55 max-w-sm mb-7 leading-relaxed">{t.sub}</p>

          <div className="divide-y divide-border border-y border-border mb-7">
            {puntos.map((p) => (
              <div key={p.texto} className="flex items-center gap-3 py-3.5">
                <span className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <p.Icono className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <span className="font-semibold text-ink flex-1">{p.texto}</span>
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/profesionales"
            className="inline-flex items-center justify-center gap-2 min-h-[48px] w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm shadow-brand-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 mb-4"
          >
            {t.cta}
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>

          <p className="flex items-center gap-1.5 text-xs text-ink/40">
            <Info className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
            {t.nota}
          </p>
        </Reveal>

        {/* columna derecha: tarjeta de perfil de ejemplo */}
        <Reveal delay={120}>
          <div className="relative">
            {/* linea decorativa punteada, mismo motivo de marca */}
            <svg
              className="hidden lg:block absolute -top-8 -right-4 w-40 h-[420px] text-border pointer-events-none"
              viewBox="0 0 160 420"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M60 20 C120 20, 140 40, 140 80 L140 320 C140 360, 120 380, 80 400"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="1 8"
                strokeLinecap="round"
              />
              <path d="M45 12 L63 20 L45 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M132 190 L140 208 L148 190" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M65 392 L83 400 L65 410" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="relative bg-white border border-border rounded-2xl shadow-lg shadow-brand-900/5 p-6 sm:p-7">
              <span className="inline-block text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-5">
                {t.badge}
              </span>

              <div className="flex items-center gap-4 mb-5">
                <span className="w-20 h-20 rounded-full overflow-hidden bg-lavender shrink-0">
                  <img
                    src="/images/ejemplos/avatar-perfil-ejemplo.webp"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-ink text-lg leading-snug mb-1.5">{t.rol}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-ink/55">
                    <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                    {t.ciudad}
                  </p>
                  <p className="flex items-center gap-1.5 text-sm text-ink/55">
                    <Briefcase className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                    {t.experiencia}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {[t.tag1, t.tag2].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 bg-brand-50 px-3 py-1.5 rounded-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="border-t border-border pt-5 mb-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-ink">{t.portafolio}</h4>
                  <span className="flex items-center gap-1 text-xs font-semibold text-brand-600">
                    {t.verPortafolio}
                    <ExternalLink className="w-3 h-3" strokeWidth={2} />
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {/* miniaturas ilustrativas (formas, no fotos reales de
                      proyectos) para el ejemplo de portafolio */}
                  <div className="aspect-square rounded-lg bg-lavender p-2 flex gap-1.5">
                    <div className="w-1/3 h-full rounded bg-brand-400" />
                    <div className="flex-1 flex flex-col gap-1 justify-center">
                      <div className="h-1.5 rounded-full bg-brand-200 w-full" />
                      <div className="h-1.5 rounded-full bg-brand-200 w-2/3" />
                      <div className="h-1.5 rounded-full bg-coral-300 w-1/2" />
                    </div>
                  </div>
                  <div className="aspect-square rounded-lg bg-gradient-to-b from-brand-100 to-brand-300 relative overflow-hidden">
                    <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-coral-500" />
                    <span className="absolute -bottom-2 -left-2 w-14 h-10 bg-brand-500/70 rounded-tr-[100%]" />
                    <span className="absolute -bottom-3 left-6 w-14 h-12 bg-brand-600/60 rounded-tr-[100%]" />
                  </div>
                  <div className="aspect-square rounded-lg bg-lavender p-2 flex flex-col gap-1.5">
                    <div className="flex-1 rounded bg-brand-400" />
                    <div className="h-1.5 rounded-full bg-brand-200 w-2/3" />
                    <div className="flex-1 flex items-center justify-center">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{
                          background: "conic-gradient(#7048CD 0 40%, #FF6B5F 40% 70%, #E7E2EF 70% 100%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full min-h-[46px] flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
              >
                <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
                {t.contactar}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
