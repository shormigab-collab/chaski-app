import type { Metadata } from "next";
import Link from "next/link";
import { Clock, DollarSign, MessageSquare, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import Comparacion from "@/components/Comparacion";

export const metadata: Metadata = {
  title: "Contratar un asistente virtual en Latinoamérica",
  description:
    "Publica tu proyecto gratis y recibe contacto directo de asistentes virtuales de Latinoamérica. Sin comisiones de agencia, sin intermediarios y con horarios compatibles.",
  keywords: [
    "contratar un asistente virtual",
    "asistente virtual latinoamérica",
    "asistente virtual freelance",
    "asistente virtual remoto",
    "contratar asistente virtual Colombia",
  ],
  alternates: {
    canonical: "/asistentes-virtuales",
    languages: { es: "/asistentes-virtuales", en: "/en/virtual-assistants" },
  },
};

const FAQS = [
  {
    q: "¿En qué tareas me puede ayudar un asistente virtual?",
    a: "Las más comunes son gestión de correo y agenda, atención al cliente, digitación de datos, programación de citas, investigación, apoyo en redes sociales y otras tareas administrativas u operativas. Depende de la experiencia de cada persona y de las categorías en las que trabaja en chaski.",
  },
  {
    q: "¿Por qué contratar un asistente virtual en Latinoamérica?",
    a: "La mayoría de países de la región comparten total o parcialmente el horario laboral con Estados Unidos y otros países de América, lo que facilita trabajar en tiempo real. Además, muchos profesionales hablan español e inglés.",
  },
  {
    q: "¿Cómo funciona contratar a través de chaski?",
    a: "Publicas lo que necesitas, gratis. Los profesionales interesados y disponibles te contactan directamente: no hay un algoritmo que te asigne a alguien ni una agencia en medio. Tú revisas quién te escribe y decides con quién trabajar.",
  },
  {
    q: "¿Chaski verifica o certifica a los asistentes virtuales?",
    a: "No. Chaski es un marketplace abierto, no una agencia de personal, y cualquier persona puede crear un perfil. Algunos perfiles tienen una insignia de verificación de identidad, pero conviene revisar la experiencia y la comunicación de cada persona antes de decidir.",
  },
  {
    q: "¿Cuánto cuesta contratar un asistente virtual?",
    a: "Cada profesional define su propia tarifa, por hora, por proyecto o por mes, y la muestra en su perfil. Publicar tu solicitud en chaski es gratis para ti y puedes comparar las tarifas antes de decidir.",
  },
];

export default function AsistentesVirtualesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-cream to-cream">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="absolute top-40 -left-24 w-72 h-72 rounded-full bg-coral-100/40 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 pt-16 sm:pt-20 pb-16 sm:pb-20 text-center">
          <span className="inline-block text-xs font-semibold text-coral-600 bg-coral-50 px-3 py-1 rounded-full mb-4">
            Asistentes virtuales · Latinoamérica
          </span>
          <h1 className="text-[2.1rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] font-extrabold text-ink mb-5 tracking-tight">
            Contrata un asistente virtual en{" "}
            <span className="bg-gradient-to-r from-brand-500 to-coral-500 bg-clip-text text-transparent">
              Latinoamérica
            </span>
          </h1>
          <p className="text-base sm:text-lg text-ink/60 mb-8 max-w-xl mx-auto">
            Publica lo que necesitas gratis y recibe contacto directo de asistentes virtuales de toda la región, sin
            comisiones de agencia, sin intermediarios y sin procesos de selección largos.
          </p>
          <Link
            href="/registro/cliente?categoria=asistente-virtual"
            className="inline-flex items-center justify-center min-h-[44px] bg-brand-500 text-cream px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-600 transition-colors shadow-sm shadow-brand-500/20"
          >
            Publicar mi solicitud gratis
          </Link>
          <p className="mt-4 text-sm text-ink/45">
            ¿Prefieres ver perfiles primero?{" "}
            <Link href="/profesionales" className="text-brand-600 font-semibold hover:text-brand-700">
              Explora profesionales
            </Link>
          </p>
        </div>
      </section>

      {/* POR QUE LATAM */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink text-center mb-10">
            Por qué contratar en Latinoamérica
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              Icono: Clock,
              t: "Horarios compatibles",
              d: "La mayoría de la región comparte total o parcialmente el horario laboral de América, lo que facilita trabajar en tiempo real.",
            },
            {
              Icono: MessageSquare,
              t: "Talento bilingüe",
              d: "Muchos profesionales de la región hablan español e inglés.",
            },
            {
              Icono: DollarSign,
              t: "Sin comisión de agencia",
              d: "Publicas gratis y hablas directo con la persona: no hay un sobrecosto de agencia de personal en el medio.",
            },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 100}>
              <div className="h-full border border-black/5 bg-white rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
                  <b.Icono className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold text-ink mb-1.5">{b.t}</h3>
                <p className="text-sm text-ink/55 leading-relaxed">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Comparacion lang="es" />

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink text-center mb-10">Preguntas frecuentes</h2>
        </Reveal>
        <div className="space-y-5">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <div className="border border-black/5 bg-white rounded-2xl p-6">
                <h3 className="font-semibold text-ink mb-2 flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" strokeWidth={1.75} />
                  {f.q}
                </h3>
                <p className="text-sm text-ink/60 leading-relaxed pl-7">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-6xl mx-auto px-4 pb-16 sm:pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-500 to-coral-600 px-6 py-16 sm:py-20 text-center">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-gold-400/20 blur-2xl" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-cream mb-4">¿Listo para encontrar a tu asistente?</h2>
              <p className="text-cream/75 mb-8 max-w-xl mx-auto">
                Publica tu solicitud gratis y empieza a recibir mensajes de asistentes virtuales de Latinoamérica.
              </p>
              <Link
                href="/registro/cliente?categoria=asistente-virtual"
                className="inline-flex items-center justify-center min-h-[44px] bg-cream text-brand-600 px-7 py-3.5 rounded-xl font-semibold hover:bg-white transition-colors"
              >
                Empezar, es gratis
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
