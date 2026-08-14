import type { Metadata } from "next";
import { Globe2, ShieldCheck, Zap, DollarSign } from "lucide-react";
import LeadForm from "./LeadForm";

export const metadata: Metadata = {
  title: "Hire Freelance Talent from Latin America | chaski",
  description:
    "Post your project free and get contacted directly by vetted freelance designers, developers, marketers and more from Latin America. No agency fees.",
  alternates: { canonical: "/en" },
};

const SKILLS = [
  "Web & app development",
  "Graphic design & branding",
  "Digital marketing & SEO",
  "Bookkeeping & accounting",
  "Virtual assistance",
  "Copywriting & translation",
];

export default function EnglishLandingPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-cream to-cream">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-100/50 blur-3xl" />
        <div className="absolute top-40 -left-24 w-72 h-72 rounded-full bg-coral-100/40 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 pt-16 sm:pt-20 pb-16 text-center">
          <span className="inline-flex items-center gap-1.5 bg-brand-100 text-brand-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <Globe2 className="w-3.5 h-3.5" />
            Now connecting US businesses with LatAm talent
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight leading-tight mb-5">
            Hire skilled freelancers from{" "}
            <span className="bg-gradient-to-r from-brand-500 to-coral-500 bg-clip-text text-transparent">
              Latin America
            </span>
          </h1>
          <p className="text-lg text-ink/60 max-w-xl mx-auto mb-8">
            Post your project for free and get contacted directly by vetted independent professionals — designers,
            developers, marketers, accountants and more. No agency, no middleman, no fees to post.
          </p>
          <a
            href="#interesado"
            className="inline-flex items-center justify-center min-h-[44px] bg-brand-500 text-cream px-7 py-3.5 rounded-full font-semibold hover:bg-brand-600 transition-colors shadow-sm"
          >
            Get started — it&apos;s free
          </a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-14 sm:py-16">
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <ValueProp
            icon={<DollarSign className="w-5 h-5" />}
            title="Better rates"
            body="LatAm talent typically costs a fraction of US rates, without sacrificing quality or communication."
          />
          <ValueProp
            icon={<Zap className="w-5 h-5" />}
            title="Direct contact"
            body="No agency layer. Professionals reach out to you directly so you can talk, share details, and get moving fast."
          />
          <ValueProp
            icon={<ShieldCheck className="w-5 h-5" />}
            title="Free to post"
            body="Publishing your project costs nothing. You only move forward with people who are genuinely interested."
          />
        </div>

        <div className="text-center mb-10">
          <h2 className="text-xl font-bold text-ink mb-3">The kind of talent you&apos;ll find</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {SKILLS.map((s) => (
              <span
                key={s}
                className="text-sm font-medium text-brand-600 bg-brand-50 rounded-full px-4 py-2"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-lg mx-auto">
          <LeadForm />
        </div>

        <p className="text-center text-xs text-ink/35 mt-8 max-w-md mx-auto">
          chaski is a young, growing marketplace based in Latin America. We&apos;re personally reviewing every request
          right now to make sure you get matched with the right person.
        </p>
      </section>
    </div>
  );
}

function ValueProp({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="border border-black/5 bg-white rounded-2xl p-6">
      <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="font-semibold text-ink mb-1.5">{title}</h3>
      <p className="text-sm text-ink/55 leading-relaxed">{body}</p>
    </div>
  );
}
