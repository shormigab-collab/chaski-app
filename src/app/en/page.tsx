import type { Metadata } from "next";
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
import LeadForm from "./LeadForm";

export const metadata: Metadata = {
  title: "Hire Virtual Assistants & Freelance Talent from LatAm | chaski",
  description:
    "Find virtual assistants and freelance talent from Latin America (LatAm). Post your project free and get contacted directly by designers, developers, marketers, VAs and more. No agency fees.",
  keywords: [
    "virtual assistants LatAm",
    "hire virtual assistant Latin America",
    "LatAm talent",
    "remote talent Latin America",
    "hire freelancers Latin America",
  ],
  // Misma logica que en src/app/page.tsx (espejo): le dice a Google que
  // esta pagina y "/" son la misma oferta en dos idiomas, no contenido
  // duplicado.
  alternates: {
    canonical: "/en",
    languages: {
      es: "/",
      en: "/en",
      "x-default": "/",
    },
  },
};

export default async function EnglishLandingPage() {
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
                  tarifaTipo: p.tarifaTipo,
    categorias: p.categorias.map((c) => ({ id: c.id, nombre: c.nombre, slug: c.slug })),
    memberSince: p.createdAt,
    calificacionProm: p.calificacionProm,
    totalResenas: p.totalResenas,
    verificado: p.verificado,
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
              LATIN AMERICA&apos;S PROFESSIONAL MARKETPLACE
            </span>
            <h1
              className="font-extrabold text-brand-500 mb-5"
              style={{
                fontSize: "clamp(2.4rem, 4.4vw, 3.75rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              Show your <span className="text-coral-500">talent.</span> Connect with{" "}
              <span className="text-coral-500">clients.</span>
            </h1>
            <p className="text-lg text-ink/60 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              Create your profile and share your projects with people looking for your services.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-4">
              <Link
                href="/registro/proveedor?lang=en"
                className="min-h-[44px] flex items-center justify-center bg-brand-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors shadow-sm shadow-brand-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Create my free profile
              </Link>
              <Link
                href="/registro/cliente?lang=en"
                className="min-h-[44px] flex items-center justify-center bg-white border border-border text-ink px-7 py-3.5 rounded-xl font-semibold hover:border-brand-500 hover:text-brand-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Post a project
              </Link>
            </div>

            <Link
              href="/profesionales"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors mb-2"
            >
              I want to find talent
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
            <br />
            <Link
              href="/en/virtual-assistants"
              className="inline-block mb-6 text-sm text-ink/45 hover:text-brand-500 underline decoration-dotted underline-offset-4 transition-colors"
            >
              Looking specifically for a Virtual Assistant?
            </Link>

            <div className="mt-4 mb-6">
              <HeroSearch categorias={categorias} lang="en" />
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-sm text-ink/60">
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-ink/40" strokeWidth={1.75} />
                Free
              </span>
              <span className="hidden sm:inline text-ink/20">|</span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-ink/40" strokeWidth={1.75} />
                Direct contact
              </span>
              <span className="hidden sm:inline text-ink/20">|</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-ink/40" strokeWidth={1.75} />
                No commissions
              </span>
            </div>
          </div>

          <div>
            <HeroPhoto lang="en" />
          </div>
        </div>
      </section>

      <TrustBar lang="en" />

      {/* Fila compacta: categorias / talento en accion / comunidad, lado a lado en desktop */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <Reveal>
          <div className="grid lg:grid-cols-[1fr_1.3fr_1fr] gap-5 items-stretch">
            <CategoriasHome categorias={categorias} lang="en" />
            <TalentoEnAccion lang="en" />
            <ComunidadPreview lang="en" />
          </div>
        </Reveal>
      </section>

      <ProfesionalesDestacados profesionales={profesionales} lang="en" />

      <ComoFunciona lang="en" />

      <Beneficios lang="en" />

      <Comparacion lang="en" />

      <Confianza lang="en" />

      {/* CTA FINAL + LEAD FORM */}
      <section className="max-w-6xl mx-auto px-4 pb-16 sm:pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-500 to-coral-600 px-6 py-16 sm:py-20 text-center">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-gold-400/20 blur-2xl" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-cream mb-4">Have a project in mind?</h2>
              <p className="text-cream/75 mb-8 max-w-xl mx-auto">
                Post it free and start hearing directly from Latin American professionals — often within days.
              </p>
              <Link
                href="/registro/cliente?lang=en"
                className="inline-flex items-center justify-center min-h-[44px] bg-cream text-brand-600 px-7 py-3.5 rounded-xl font-semibold hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                Get started — it&apos;s free
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="max-w-lg mx-auto px-4 pb-20">
        <Reveal>
          <LeadForm />
          <p className="text-center text-xs text-ink/35 mt-6">
            chaski is a young, growing marketplace based in Latin America. We&apos;re personally reviewing every
            request right now to make sure you get matched with the right person.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
