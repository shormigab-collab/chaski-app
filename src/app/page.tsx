import Link from "next/link";
import { prisma } from "@/lib/db";
import HeroSearch from "@/components/HeroSearch";
import HeroPhoto from "@/components/HeroPhoto";
import Reveal from "@/components/Reveal";
import TrustBar from "@/components/TrustBar";
import CategoriasHome from "@/components/CategoriasHome";
import TalentoEnAccion from "@/components/TalentoEnAccion";
import ProfesionalesDestacados from "@/components/ProfesionalesDestacados";
import ComunidadPreview from "@/components/ComunidadPreview";
import Beneficios from "@/components/Beneficios";
import Comparacion from "@/components/Comparacion";
import Confianza from "@/components/Confianza";

export default async function HomePage() {
  const [categorias, proveedores] = await Promise.all([
    prisma.categoria.findMany({ orderBy: { nombre: "asc" } }),
    prisma.proveedor.findMany({
      include: { user: true, categorias: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const profesionales = proveedores.map((p) => ({
    id: p.id,
    nombre: p.user.nombre,
    fotoUrl: p.fotoUrl,
    ciudad: p.user.ciudad,
    pais: p.user.pais,
    aniosExperiencia: p.aniosExperiencia,
    tarifaAproximada: p.tarifaAproximada,
    categorias: p.categorias.map((c) => ({ id: c.id, nombre: c.nombre, slug: c.slug })),
    memberSince: p.createdAt,
    calificacionProm: p.calificacionProm,
    totalResenas: p.totalResenas,
  }));

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-cream to-cream">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="absolute top-40 -left-24 w-72 h-72 rounded-full bg-coral-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-gold-100/40 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 pt-14 sm:pt-16 pb-16 sm:pb-20 grid md:grid-cols-2 gap-12 md:gap-14 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block text-xs font-semibold text-coral-600 bg-coral-50 px-3 py-1 rounded-full mb-4">
              Una red profesional en Latinoamérica
            </span>
            <h1
              className="font-extrabold text-ink mb-5"
              style={{
                fontSize: "clamp(2.6rem, 4.6vw, 4.5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
              }}
            >
              El talento de{" "}
              <span className="text-coral-600">Latinoamérica,</span> en movimiento.
            </h1>
            <p className="text-lg text-ink/60 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              Conecta, demuestra lo que sabes y encuentra oportunidades reales.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/registro/proveedor"
                className="min-h-[44px] flex items-center justify-center bg-brand-500 text-cream px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-600 transition-colors shadow-sm shadow-brand-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Crear mi perfil gratis
              </Link>
              <Link
                href="/registro/cliente"
                className="min-h-[44px] flex items-center justify-center bg-white border border-border text-ink px-7 py-3.5 rounded-xl font-semibold hover:border-brand-500 hover:text-brand-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Publicar un proyecto
              </Link>
            </div>

            <Link
              href="/profesionales"
              className="inline-block mt-4 text-sm text-ink/45 hover:text-brand-500 underline decoration-dotted underline-offset-4 transition-colors"
            >
              Explorar profesionales
            </Link>

            <div className="mt-8">
              <HeroSearch
                categorias={categorias.map((c) => ({ id: c.id, nombre: c.nombre, slug: c.slug, icono: c.icono }))}
              />
            </div>
          </div>

          <div className="hidden md:block">
            <HeroPhoto />
          </div>
        </div>
      </section>

      <TrustBar />

      <CategoriasHome categorias={categorias} />

      <TalentoEnAccion />

      <ProfesionalesDestacados profesionales={profesionales} />

      {/* COMO FUNCIONA */}
      <section className="bg-lavender/40 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div className="relative max-w-md mx-auto md:mx-0">
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-coral-100/60 rounded-[2rem] -z-10" />
              <div className="absolute -top-6 -left-6 w-1/2 h-1/2 bg-gold-400/15 rounded-[2rem] -z-10" />
              <div className="rounded-[2rem] overflow-hidden shadow-xl shadow-black/10 aspect-[4/5]">
                <img
                  src="/images/equipo-reunion.webp"
                  alt="Equipo de profesionales colaborando en un proyecto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-10">Cómo funciona</h2>
            </Reveal>

            <div className="relative space-y-8">
              <div className="absolute left-6 top-3 bottom-3 w-px bg-border" aria-hidden="true" />
              {[
                {
                  n: 1,
                  t: "Describe tu necesidad",
                  d: "Cuéntanos qué buscas, gratis y en menos de 2 minutos.",
                  color: "bg-brand-500",
                },
                {
                  n: 2,
                  t: "Recibe propuestas",
                  d: "Profesionales interesados te contactan directamente.",
                  color: "bg-coral-500",
                },
                {
                  n: 3,
                  t: "Compara y elige",
                  d: "Revisa perfiles y decide con quién trabajar, sin compromiso.",
                  color: "bg-gold-500",
                },
              ].map((paso, i) => (
                <Reveal key={paso.n} delay={i * 120}>
                  <div className="relative flex gap-5">
                    <div
                      className={`relative z-10 w-12 h-12 rounded-full ${paso.color} text-cream font-bold text-lg flex items-center justify-center shrink-0 ring-4 ring-brand-50`}
                    >
                      {paso.n}
                    </div>
                    <div className="pt-1.5">
                      <h3 className="font-semibold text-ink mb-1">{paso.t}</h3>
                      <p className="text-sm text-ink/55">{paso.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={400}>
              <Link
                href="/registro/cliente"
                className="inline-flex items-center justify-center min-h-[44px] bg-brand-500 text-cream px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-600 transition-colors mt-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Publicar un proyecto gratis
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <ComunidadPreview />

      <Beneficios />

      <Comparacion />

      <Confianza />

      {/* CTA FINAL */}
      <section className="max-w-6xl mx-auto px-4 pb-16 sm:pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-500 to-coral-600 px-6 py-16 sm:py-20 text-center">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-gold-400/20 blur-2xl" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-cream mb-4">
                ¿Eres profesional independiente o agencia?
              </h2>
              <p className="text-cream/75 mb-8 max-w-xl mx-auto">
                Crea tu perfil gratis, recibe 5 créditos de bienvenida y empieza a contactar clientes que buscan
                justo lo que ofreces.
              </p>
              <Link
                href="/registro/proveedor"
                className="inline-flex items-center justify-center min-h-[44px] bg-cream text-brand-600 px-7 py-3.5 rounded-xl font-semibold hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                Crear mi perfil profesional
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
