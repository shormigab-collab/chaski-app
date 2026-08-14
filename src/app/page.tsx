import Link from "next/link";
import { prisma } from "@/lib/db";
import HeroSearch from "@/components/HeroSearch";
import HeroMockup from "@/components/HeroMockup";
import Reveal from "@/components/Reveal";
import CategoriasHome from "@/components/CategoriasHome";
import ProfesionalesDestacados from "@/components/ProfesionalesDestacados";
import Beneficios from "@/components/Beneficios";
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
    categorias: p.categorias.map((c) => ({ id: c.id, nombre: c.nombre, slug: c.slug })),
    memberSince: p.createdAt,
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
              Marketplace de profesionales en LatAm
            </span>
            <h1 className="text-[2.25rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] font-extrabold text-ink mb-5 tracking-tight">
              No busques profesionales.{" "}
              <span className="bg-gradient-to-r from-brand-500 to-coral-500 bg-clip-text text-transparent">
                Deja que te encuentren a ti.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-ink/60 mb-8 max-w-md mx-auto md:mx-0">
              Publica tu proyecto gratis y recibe propuestas directas de expertos en diseño, desarrollo, marketing,
              contabilidad y más. Sin cotizar uno por uno.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/registro/cliente"
                className="min-h-[44px] flex items-center justify-center bg-brand-500 text-cream px-7 py-3.5 rounded-full font-semibold hover:bg-brand-600 transition-colors shadow-sm shadow-brand-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Publicar un proyecto gratis
              </Link>
              <Link
                href="/profesionales"
                className="min-h-[44px] flex items-center justify-center bg-white border border-black/10 text-ink px-7 py-3.5 rounded-full font-semibold hover:border-brand-500 hover:text-brand-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Explorar profesionales
              </Link>
            </div>

            <Link
              href="/registro/proveedor"
              className="inline-block mt-4 text-sm text-ink/45 hover:text-brand-500 underline decoration-dotted underline-offset-4 transition-colors"
            >
              ¿Eres profesional? Crea tu perfil
            </Link>

            <div className="mt-8">
              <HeroSearch
                categorias={categorias.map((c) => ({ id: c.id, nombre: c.nombre, slug: c.slug, icono: c.icono }))}
              />
            </div>
          </div>

          <div className="hidden md:block">
            <HeroMockup />
          </div>
        </div>
      </section>

      <CategoriasHome categorias={categorias} />

      <ProfesionalesDestacados profesionales={profesionales} />

      {/* COMO FUNCIONA */}
      <section className="bg-white border-y border-black/5">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink text-center mb-14">Cómo funciona</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-10 text-center">
            {[
              { n: 1, t: "Describe tu necesidad", d: "Cuéntanos qué buscas, gratis y en menos de 2 minutos." },
              { n: 2, t: "Recibe propuestas", d: "Profesionales interesados te contactan directamente." },
              { n: 3, t: "Compara y elige", d: "Revisa perfiles y decide con quién trabajar, sin compromiso." },
            ].map((paso, i) => (
              <Reveal key={paso.n} delay={i * 120}>
                <div>
                  <div className="w-12 h-12 rounded-full bg-brand-500 text-cream font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {paso.n}
                  </div>
                  <h3 className="font-semibold text-ink mb-2">{paso.t}</h3>
                  <p className="text-sm text-ink/55">{paso.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={360}>
            <div className="text-center mt-12">
              <Link
                href="/registro/cliente"
                className="inline-flex items-center justify-center min-h-[44px] bg-brand-500 text-cream px-7 py-3.5 rounded-full font-semibold hover:bg-brand-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Publicar un proyecto gratis
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Beneficios />

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
                Crea tu perfil gratis, recibe créditos de bienvenida y empieza a contactar clientes que buscan justo
                lo que ofreces.
              </p>
              <Link
                href="/registro/proveedor"
                className="inline-flex items-center justify-center min-h-[44px] bg-cream text-brand-600 px-7 py-3.5 rounded-full font-semibold hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
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
