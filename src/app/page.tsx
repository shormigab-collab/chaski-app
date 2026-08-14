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
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-100/40 blur-3xl" />
        <div className="absolute top-40 -left-24 w-72 h-72 rounded-full bg-coral-100/30 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 pt-14 sm:pt-16 pb-16 sm:pb-20 grid md:grid-cols-2 gap-12 md:gap-14 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-[2.25rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] font-extrabold text-ink mb-5 tracking-tight">
              Publica lo que necesitas. Recibe propuestas de expertos verificados en LatAm.
            </h1>
            <p className="text-base sm:text-lg text-ink/60 mb-8 max-w-md mx-auto md:mx-0">
              Compara perfiles, experiencia y propuestas sin buscar uno por uno. Publicar es gratis y toma menos de
              2 minutos.
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
      <section className="max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-4">¿Eres profesional independiente o agencia?</h2>
          <p className="text-ink/60 mb-8 max-w-xl mx-auto">
            Crea tu perfil gratis, recibe créditos de bienvenida y empieza a contactar clientes que buscan justo lo
            que ofreces.
          </p>
          <Link
            href="/registro/proveedor"
            className="inline-flex items-center justify-center min-h-[44px] bg-ink text-cream px-7 py-3.5 rounded-full font-semibold hover:bg-brand-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
          >
            Crear mi perfil profesional
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
