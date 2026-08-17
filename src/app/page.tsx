import Link from "next/link";
import { DollarSign, MessageSquare, ShieldCheck, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import HeroPhoto from "@/components/HeroPhoto";
import HeroSearch from "@/components/HeroSearch";
import Reveal from "@/components/Reveal";
import ComoFunciona from "@/components/ComoFunciona";
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
            <span className="inline-block text-xs font-bold tracking-widest text-brand-600 bg-brand-50 px-4 py-2 rounded-full mb-5">
              MARKETPLACE PROFESIONAL DE LATINOAMÉRICA
            </span>
            <h1
              className="font-extrabold text-brand-500 mb-5"
              style={{
                fontSize: "clamp(2.4rem, 4.4vw, 3.75rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              Muestra tu <span className="text-coral-500">talento.</span> Conecta con{" "}
              <span className="text-coral-500">clientes.</span>
            </h1>
            <p className="text-lg text-ink/60 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              Crea tu perfil y comparte tus proyectos con personas que buscan tus servicios.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-4">
              <Link
                href="/registro/proveedor"
                className="min-h-[44px] flex items-center justify-center bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors shadow-sm shadow-brand-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
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
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors mb-6"
            >
              Quiero encontrar talento
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>

            <div className="mt-4 mb-6">
              <HeroSearch categorias={categorias} />
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-sm text-ink/60">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-ink/40" strokeWidth={1.75} />
                Gratis
              </span>
              <span className="hidden sm:inline text-ink/20">|</span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-ink/40" strokeWidth={1.75} />
                Contacto directo
              </span>
              <span className="hidden sm:inline text-ink/20">|</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-ink/40" strokeWidth={1.75} />
                Sin comisiones
              </span>
            </div>
          </div>

          <div>
            <HeroPhoto />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Fila compacta: categorías / talento en acción / comunidad, lado a lado en desktop */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_1.3fr_1fr] gap-5 items-stretch">
            <CategoriasHome categorias={categorias} />
            <TalentoEnAccion />
            <ComunidadPreview />
          </div>
        </Reveal>
      </section>

      <ProfesionalesDestacados profesionales={profesionales} />

      <ComoFunciona />

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
