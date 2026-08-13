import Link from "next/link";
import { prisma } from "@/lib/db";
import { LogoMark } from "@/components/Logo";
import HeroSearch from "@/components/HeroSearch";
import HeroPhoto from "@/components/HeroPhoto";
import Reveal from "@/components/Reveal";
import TrustBar from "@/components/TrustBar";
import CategoryMarquee from "@/components/CategoryMarquee";
import Testimonials from "@/components/Testimonials";
import CategoryIcon from "@/components/CategoryIcon";
import Comparativa from "@/components/Comparativa";
import ActividadReciente from "@/components/ActividadReciente";

export default async function HomePage() {
  const [categorias, solicitudesRecientes] = await Promise.all([
    prisma.categoria.findMany({ orderBy: { nombre: "asc" } }),
    prisma.solicitud.findMany({
      where: { estado: "ABIERTA" },
      include: { categoria: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-100/40 blur-3xl" />
        <div className="absolute top-40 -left-24 w-72 h-72 rounded-full bg-coral-100/30 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-20 grid md:grid-cols-2 gap-14 items-center">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-brand-50 text-brand-500 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
              <LogoMark size={16} /> Marketplace de servicios profesionales para LatAm
            </span>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink mb-5 tracking-tight leading-[1.08]">
              Encuentra al experto que tu negocio necesita
            </h1>
            <p className="text-lg text-ink/60 mb-8 max-w-md mx-auto md:mx-0">
              Publica tu proyecto gratis y recibe propuestas de diseñadores, desarrolladores,
              contadores y consultores verificados. Sin intermediarios.
            </p>

            <HeroSearch
              categorias={categorias.map((c) => ({ id: c.id, nombre: c.nombre, slug: c.slug, icono: c.icono }))}
            />

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mt-7">
              <Link
                href="/registro/cliente"
                className="bg-brand-500 text-cream px-7 py-3.5 rounded-full font-semibold hover:bg-brand-600 transition-colors shadow-sm shadow-brand-500/20"
              >
                Publicar un proyecto — gratis
              </Link>
              <Link
                href="/registro/proveedor"
                className="bg-white border border-black/10 text-ink px-7 py-3.5 rounded-full font-semibold hover:border-brand-500 hover:text-brand-500 transition-colors"
              >
                Soy profesional
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <HeroPhoto />
          </div>
        </div>
      </section>

      <TrustBar />
      <CategoryMarquee categorias={categorias.map((c) => ({ id: c.id, nombre: c.nombre, slug: c.slug, icono: c.icono }))} />

      {/* CATEGORIAS */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">Categorías destacadas</h2>
            <span className="text-sm text-ink/50 hidden sm:block">{categorias.length} especialidades disponibles</span>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categorias.map((cat, i) => (
            <Reveal key={cat.id} delay={(i % 8) * 40}>
              <Link
                href={`/registro/cliente?categoria=${cat.slug}`}
                className="group border border-black/5 bg-white rounded-2xl p-5 hover:border-brand-500 hover:shadow-md hover:shadow-brand-500/5 hover:-translate-y-0.5 transition-all block"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-3 group-hover:bg-brand-500 group-hover:text-cream transition-colors">
                  <CategoryIcon slug={cat.slug} className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-ink/80 group-hover:text-brand-500 transition-colors leading-snug">
                  {cat.nombre}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-white border-y border-black/5">
        <div className="max-w-5xl mx-auto px-4 py-20">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink text-center mb-14">Cómo funciona</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-10 text-center">
            {[
              { n: 1, t: "Publica tu proyecto", d: "Cuéntanos qué necesitas, gratis y en menos de 2 minutos." },
              { n: 2, t: "Recibe propuestas", d: "Profesionales verificados e interesados te contactan directamente." },
              { n: 3, t: "Elige y trabaja", d: "Compara perfiles y elige con quién trabajar, sin compromiso." },
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
        </div>
      </section>

      <Comparativa />

      <ActividadReciente
        items={solicitudesRecientes.map((s) => ({
          id: s.id,
          titulo: s.titulo,
          ciudad: s.ciudad,
          categoriaSlug: s.categoria.slug,
          categoriaNombre: s.categoria.nombre,
          createdAt: s.createdAt,
        }))}
      />

      <Testimonials />

      {/* CTA FINAL */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-4">¿Eres profesional independiente o agencia?</h2>
          <p className="text-ink/60 mb-8 max-w-xl mx-auto">
            Crea tu perfil gratis, recibe créditos de bienvenida y empieza a contactar
            clientes que buscan justo lo que ofreces.
          </p>
          <Link
            href="/registro/proveedor"
            className="inline-block bg-ink text-cream px-7 py-3.5 rounded-full font-semibold hover:bg-brand-500 transition-colors"
          >
            Crear mi perfil profesional
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
