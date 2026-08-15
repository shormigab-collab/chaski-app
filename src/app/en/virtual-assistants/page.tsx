import type { Metadata } from "next";
import Link from "next/link";
import { Clock, DollarSign, MessageSquare, ShieldCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import Comparacion from "@/components/Comparacion";

export const metadata: Metadata = {
  title: "Hire a Virtual Assistant from Latin America (LatAm) | chaski",
  description:
    "Post your project free and get contacted directly by virtual assistants from Latin America. Overlapping US time zones, no agency fees, no middleman.",
  keywords: [
    "hire virtual assistant latin america",
    "virtual assistants latam",
    "latam virtual assistant",
    "remote virtual assistant latin america",
  ],
  alternates: { canonical: "/en/virtual-assistants" },
};

const FAQS = [
  {
    q: "What can a virtual assistant from Latin America help with?",
    a: "Common tasks include inbox and calendar management, customer support, data entry, scheduling, research, social media support, and other administrative or operational work — depending on the person's background and the categories they work in on chaski.",
  },
  {
    q: "Why hire a virtual assistant from LatAm instead of other regions?",
    a: "Most of Latin America shares full or partial business-hour overlap with US time zones, which makes real-time collaboration easier than with far-away time zones. Many professionals across the region are also fluent in English and Spanish.",
  },
  {
    q: "How does hiring through chaski work?",
    a: "You post what you need for free. Professionals who are interested and available reach out to you directly — there's no algorithm assigning someone to you and no agency in between. You review who contacts you and decide who to work with.",
  },
  {
    q: "Does chaski vet or certify virtual assistants?",
    a: "No — chaski is an open marketplace, not a staffing agency. Anyone can create a profile. Review each person's profile, experience, and communication directly before you decide to work with them.",
  },
];

export default function VirtualAssistantsPage() {
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
            Virtual Assistants · Latin America
          </span>
          <h1 className="text-[2.1rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] font-extrabold text-ink mb-5 tracking-tight">
            Hire a Virtual Assistant from{" "}
            <span className="bg-gradient-to-r from-brand-500 to-coral-500 bg-clip-text text-transparent">
              Latin America
            </span>
          </h1>
          <p className="text-base sm:text-lg text-ink/60 mb-8 max-w-xl mx-auto">
            Post what you need free, and get contacted directly by virtual assistants across LatAm — no agency
            fees, no middleman, and no long hiring process.
          </p>
          <Link
            href="/registro/cliente?categoria=asistente-virtual&lang=en"
            className="inline-flex items-center justify-center min-h-[44px] bg-brand-500 text-cream px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-600 transition-colors shadow-sm shadow-brand-500/20"
          >
            Post your project free
          </Link>
        </div>
      </section>

      {/* WHY LATAM */}
      <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink text-center mb-10">Why hire from Latin America</h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            {
              Icono: Clock,
              t: "Overlapping time zones",
              d: "Most of LatAm shares full or partial business-hour overlap with the US, making real-time collaboration easier.",
            },
            {
              Icono: MessageSquare,
              t: "Bilingual talent",
              d: "Many professionals across the region are fluent in English and Spanish.",
            },
            {
              Icono: DollarSign,
              t: "No agency fees",
              d: "Post for free and talk directly with the person — there's no staffing agency markup in between.",
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

      <Comparacion lang="en" />

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink text-center mb-10">
            Frequently asked questions
          </h2>
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
              <h2 className="text-2xl sm:text-3xl font-bold text-cream mb-4">Ready to find your VA?</h2>
              <p className="text-cream/75 mb-8 max-w-xl mx-auto">
                Post your project free and start hearing directly from Latin American virtual assistants.
              </p>
              <Link
                href="/registro/cliente?categoria=asistente-virtual&lang=en"
                className="inline-flex items-center justify-center min-h-[44px] bg-cream text-brand-600 px-7 py-3.5 rounded-xl font-semibold hover:bg-white transition-colors"
              >
                Get started — it&apos;s free
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
