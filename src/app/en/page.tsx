import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import HeroSearch from "@/components/HeroSearch";
import HeroMockup from "@/components/HeroMockup";
import Reveal from "@/components/Reveal";
import CategoriasHome from "@/components/CategoriasHome";
import ProfesionalesDestacados from "@/components/ProfesionalesDestacados";
import Beneficios from "@/components/Beneficios";
import Confianza from "@/components/Confianza";
import LeadForm from "./LeadForm";

export const metadata: Metadata = {
  title: "Hire Freelance Talent from Latin America | chaski",
  description:
    "Post your project free and get contacted directly by vetted freelance designers, developers, marketers and more from Latin America. No agency fees.",
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
            <h1 className="text-[2.25rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] font-extrabold text-ink mb-5 tracking-tight">
              Don&apos;t search for talent.{" "}
              <span className="bg-gradient-to-r from-brand-500 to-coral-500 bg-clip-text text-transparent">
                Let it find you.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-ink/60 mb-8 max-w-md mx-auto md:mx-0">
              Post your project free and get direct proposals from experts in design, development, marketing,
              accounting and more — from Latin America. No back-and-forth quoting.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href="#interesado"
                className="min-h-[44px] flex items-center justify-center bg-brand-500 text-cream px-7 py-3.5 rounded-full font-semibold hover:bg-brand-600 transition-colors shadow-sm shadow-brand-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Post your project free
              </a>
              <Link
                href="/profesionales"
                className="min-h-[44px] flex items-center justify-center bg-white border border-black/10 text-ink px-7 py-3.5 rounded-full font-semibold hover:border-brand-500 hover:text-brand-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Explore professionals
              </Link>
            </div>

            <div className="mt-8">
              <HeroSearch
                categorias={categorias.map((c) => ({ id: c.id, nombre: c.nombre, slug: c.slug, icono: c.icono }))}
                lang="en"
              />
            </div>
          </div>

          <div className="hidden md:block">
            <HeroMockup lang="en" />
          </div>
        </div>
      </section>

      <CategoriasHome categorias={categorias} lang="en" />

      <ProfesionalesDestacados profesionales={profesionales} lang="en" />

      {/* HOW IT WORKS */}
      <section className="bg-brand-50/40 border-y border-black/5">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <Reveal>
            <div className="relative max-w-md mx-auto md:mx-0">
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-coral-100/60 rounded-[2rem] -z-10" />
              <div className="absolute -top-6 -left-6 w-1/2 h-1/2 bg-gold-400/15 rounded-[2rem] -z-10" />
              <div className="rounded-[2rem] overflow-hidden shadow-xl shadow-black/10 aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Professional working on their computer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-10">How it works</h2>
            </Reveal>

            <div className="relative space-y-8">
              <div className="absolute left-6 top-3 bottom-3 w-px bg-black/10" aria-hidden="true" />
              {[
                {
                  n: 1,
                  t: "Describe what you need",
                  d: "Tell us what you're looking for, free and in under 2 minutes.",
                  color: "bg-brand-500",
                },
                {
                  n: 2,
                  t: "Get proposals",
                  d: "Interested professionals contact you directly.",
                  color: "bg-coral-500",
                },
                {
                  n: 3,
                  t: "Compare and choose",
                  d: "Review profiles and decide who to work with, no commitment.",
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
              <a
                href="#interesado"
                className="inline-flex items-center justify-center min-h-[44px] bg-brand-500 text-cream px-7 py-3.5 rounded-full font-semibold hover:bg-brand-600 transition-colors mt-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Post your project free
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <Beneficios lang="en" />

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
                Post it free and start hearing from vetted Latin American professionals — often within days.
              </p>
              <a
                href="#interesado"
                className="inline-flex items-center justify-center min-h-[44px] bg-cream text-brand-600 px-7 py-3.5 rounded-full font-semibold hover:bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                Get started — it&apos;s free
              </a>
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
