import Link from "next/link";
import { Check, FileText, Search, User, Users, LayoutGrid, Shuffle, Target, Clock, Receipt } from "lucide-react";
import Reveal from "@/components/Reveal";
import { LogoMark } from "@/components/Logo";

// Comparacion honesta: solo afirmamos cosas que la plataforma realmente
// hace hoy (gratis publicar, contacto directo, sin comision). No se
// inventan ventajas ni se exagera lo que ofrecen las alternativas.
const FILAS = [
  {
    Icono: FileText,
    label: "PUBLICACIÓN",
    chaski: "Gratis",
    IconoTrad: Receipt,
    tradicional: "Puede incluir costos",
  },
  {
    Icono: Search,
    label: "BÚSQUEDA",
    chaski: "Recibes propuestas",
    IconoTrad: User,
    tradicional: "Contactas uno por uno",
  },
  {
    Icono: User,
    label: "CONTACTO",
    chaski: "Directo con el profesional",
    IconoTrad: Users,
    tradicional: "Puede haber intermediarios",
  },
  {
    Icono: LayoutGrid,
    label: "COMPARACIÓN",
    chaski: "Perfiles en un solo lugar",
    IconoTrad: Shuffle,
    tradicional: "Información dispersa",
  },
  {
    Icono: Target,
    label: "DECISIÓN",
    chaski: "Tú eliges, sin compromiso",
    IconoTrad: Clock,
    tradicional: "Proceso más manual",
  },
];

const FILAS_EN = [
  {
    Icono: FileText,
    label: "POSTING",
    chaski: "Free",
    IconoTrad: Receipt,
    tradicional: "May include costs",
  },
  {
    Icono: Search,
    label: "SEARCH",
    chaski: "You receive proposals",
    IconoTrad: User,
    tradicional: "You contact one by one",
  },
  {
    Icono: User,
    label: "CONTACT",
    chaski: "Direct with the professional",
    IconoTrad: Users,
    tradicional: "May involve middlemen",
  },
  {
    Icono: LayoutGrid,
    label: "COMPARISON",
    chaski: "Profiles in one place",
    IconoTrad: Shuffle,
    tradicional: "Scattered information",
  },
  {
    Icono: Target,
    label: "DECISION",
    chaski: "You choose, no commitment",
    IconoTrad: Clock,
    tradicional: "More manual process",
  },
];

export default function Comparacion({ lang = "es" }: { lang?: "es" | "en" }) {
  const filas = lang === "en" ? FILAS_EN : FILAS;

  const t =
    lang === "en"
      ? {
          eyebrow: "WHY CHASKI",
          h2a: "More options. Fewer ",
          h2b: "middlemen.",
          sub: "Post once, receive proposals, and choose with more context.",
          badgeDirecta: "THE DIRECT OPTION",
          tituloTrad: "Traditional search",
          cta: "Post my project for free",
          trust: "No commissions",
          trust2: "Direct contact",
        }
      : {
          eyebrow: "POR QUÉ CHASKI",
          h2a: "Más opciones. Menos ",
          h2b: "intermediarios.",
          sub: "Publica una vez, recibe propuestas y elige con mayor contexto.",
          badgeDirecta: "LA OPCIÓN DIRECTA",
          tituloTrad: "Búsqueda tradicional",
          cta: "Publicar mi proyecto gratis",
          trust: "Sin comisiones",
          trust2: "Contacto directo",
        };

  return (
    <section className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
      <Reveal>
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-xs font-bold tracking-widest text-brand-600 bg-brand-50 px-4 py-2 rounded-full mb-5">
            {t.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-500 tracking-tight mb-3">
            {t.h2a}
            <span className="text-coral-500">{t.h2b}</span>
          </h2>
          <p className="text-ink/55 max-w-md mx-auto">{t.sub}</p>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5 items-start">
        {/* chaski: la opcion directa */}
        <Reveal>
          <div className="h-full rounded-3xl border border-brand-200 bg-white overflow-hidden shadow-sm">
            <div className="flex items-center justify-between gap-3 p-5 sm:p-6 border-b border-border">
              <span className="inline-flex items-center gap-2">
                <LogoMark size={30} />
                <span className="font-heading font-extrabold text-ink text-lg">chaski</span>
              </span>
              <span className="text-[10px] font-bold tracking-wide text-white bg-coral-500 px-3 py-1.5 rounded-full whitespace-nowrap">
                {t.badgeDirecta}
              </span>
            </div>

            <div className="divide-y divide-brand-100/70 bg-lavender/30">
              {filas.map((f) => (
                <div key={f.label} className="flex items-center gap-3.5 px-5 sm:px-6 py-4">
                  <span className="w-10 h-10 rounded-xl bg-white text-brand-600 flex items-center justify-center shrink-0 shadow-sm">
                    <f.Icono className="w-[18px] h-[18px]" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold tracking-wide text-brand-500/70 mb-0.5">{f.label}</div>
                    <div className="text-sm font-bold text-ink truncate">{f.chaski}</div>
                  </div>
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* busqueda tradicional */}
        <Reveal delay={100}>
          <div className="h-full rounded-3xl border border-border bg-white overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-border">
              <span className="font-heading font-bold text-ink text-lg">{t.tituloTrad}</span>
            </div>

            <div className="divide-y divide-border">
              {filas.map((f) => (
                <div key={f.label} className="flex items-center gap-3.5 px-5 sm:px-6 py-4">
                  <span className="w-10 h-10 rounded-xl bg-black/5 text-ink/35 flex items-center justify-center shrink-0">
                    <f.IconoTrad className="w-[18px] h-[18px]" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold tracking-wide text-ink/35 mb-0.5">{f.label}</div>
                    <div className="text-sm font-semibold text-ink/70 truncate">{f.tradicional}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="text-center mt-10 sm:mt-12">
          <Link
            href={lang === "en" ? "/registro/cliente?lang=en" : "/registro/cliente"}
            className="inline-flex items-center justify-center min-h-[44px] bg-brand-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors shadow-sm shadow-brand-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {t.cta}
          </Link>
          <p className="mt-4 text-sm text-ink/45">
            {t.trust} · {t.trust2}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
