import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProfesionalCard, { type ProfesionalCardData } from "@/components/ProfesionalCard";

// Muestra profesionales reales de la plataforma. Si todavia no hay
// suficientes perfiles, no se inventan perfiles ni calificaciones de
// ejemplo: se explica honestamente que la comunidad esta creciendo.
export default function ProfesionalesDestacados({
  profesionales,
  lang = "es",
}: {
  profesionales: ProfesionalCardData[];
  lang?: "es" | "en";
}) {
  return (
    <section className="bg-white border-y border-black/5">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <Reveal>
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink">
                {lang === "en" ? "Experts ready to help" : "Expertos listos para ayudarte"}
              </h2>
              <p className="text-ink/55 mt-1.5">
                {lang === "en"
                  ? "Real professionals, with a complete profile on chaski."
                  : "Profesionales reales, con perfil completo en chaski."}
              </p>
            </div>
            <Link
              href={lang === "en" ? "/profesionales" : "/profesionales"}
              className="hidden sm:inline-block text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors shrink-0"
            >
              {lang === "en" ? "View all →" : "Ver todos →"}
            </Link>
          </div>
        </Reveal>

        {profesionales.length > 0 ? (
          <>
            <div className="flex sm:grid sm:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:pb-0">
              {profesionales.map((p, i) => (
                <Reveal key={p.id} delay={i * 80} className="min-w-[260px] sm:min-w-0 snap-start shrink-0 sm:shrink">
                  <ProfesionalCard p={p} lang={lang} />
                </Reveal>
              ))}
            </div>
            <div className="sm:hidden mt-6 text-center">
              <Link href="/profesionales" className="text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors">
                {lang === "en" ? "View all →" : "Ver todos →"}
              </Link>
            </div>
          </>
        ) : lang === "en" ? (
          <Reveal>
            <div className="text-center border border-black/5 rounded-2xl py-14 px-6 max-w-md mx-auto">
              <p className="text-ink/60 font-medium">
                We&apos;re onboarding our first professionals right now — check back soon, or tell us what you need
                below and we&apos;ll personally match you.
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="text-center border border-black/5 rounded-2xl py-14 px-6 max-w-md mx-auto">
              <p className="text-ink/60 font-medium mb-4">
                La comunidad de profesionales está creciendo — sé de los primeros en crear tu perfil.
              </p>
              <Link
                href="/registro/proveedor"
                className="inline-block bg-brand-500 text-cream px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors min-h-[44px]"
              >
                Crear mi perfil profesional
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
