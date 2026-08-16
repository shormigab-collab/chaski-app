import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import HeroSearch from "@/components/HeroSearch";
import HeroPhoto from "@/components/HeroPhoto";
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
  alternates: { canonical: "/en" },
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
              Marketplace for Latin American professionals
            </span>
            <div className="relative">
              {/* mismo halo suave que la version en espanol */}
              <div
                className="hidden md:block absolute -inset-x-6 -inset-y-8 bg-white/50 blur-3xl rounded-[3rem] -z-10"
                aria-hidden="true"
              />
              <h1
                className="font-extrabold text-brand-600 mb-5"
                style={{
                  fontSize: "clamp(2.6rem, 4.6vw, 4.5rem)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.035em",
                  textShadow: "0 1px 0 rgba(255,255,255,0.6), 0 14px 32px rgba(41,32,111,0.18)",
                }}
              >
                Don&apos;t search for talent.{" "}
                <span
                  className="bg-gradient-to-r from-gold-500 via-[#F58A2E] to-coral-600 bg-clip-text text-transparent"
                  style={{
                    textShadow: "none",
                    filter: "drop-shadow(0 6px 20px rgba(245,138,46,0.45))",
                  }}
                >
                  Let it find you.
                </span>
              </h1>
            </div>
            <p className="text-lg text-ink/60 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
              Post your project free and get direct proposals from experts in design, development, marketing,
              accounting and more — from Latin America. No back-and-forth quoting.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/registro/cliente?lang=en"
                className="min-h-[44px] flex items-center justify-center bg-brand-500 text-cream px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-600 transition-colors shadow-sm shadow-brand-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Post your project free
              </Link>
              <Link
                href="/profesionales"
                className="min-h-[44px] flex items-center justify-center bg-white border border-border text-ink px-7 py-3.5 rounded-xl font-semibold hover:border-brand-500 hover:text-brand-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Explore professionals
              </Link>
            </div>

            <Link
              href="/en/virtual-assistants"
              className="inline-block mt-4 text-sm text-ink/45 hover:text-brand-500 underline decoration-dotted underline-offset-4 transition-colors"
            >
              Looking specifically for a Virtual Assistant?
            </Link>

            <div className="mt-8">
              <HeroSearch
                categorias={categorias.map((c) => ({ id: c.id, nombre: c.nombre, slug: c.slug, icono: c.icono }))}
                lang="en"
              />
            </div>
          </div>

          <div className="hidden md:block">
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

      {/* HOW IT WORKS */}
      <section className="bg-lavender/40 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div className="relative max-w-md mx-auto md:mx-0">
              <div className="absolute -top-5 -left-5 w-2/3 h-2/3 bg-coral-100/50 rounded-[2rem] -z-10" />
              <div className="rounded-[2rem] overflow-hidden shadow-lg shadow-brand-900/10 aspect-[4/5]">
                <img
                  src="/images/equipo-reunion.webp"
                  alt="Team of professionals collaborating on a project"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <ComoFunciona lang="en" />
        </div>
      </section>

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
