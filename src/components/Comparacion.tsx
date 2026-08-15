import { Check, X } from "lucide-react";
import Reveal from "@/components/Reveal";

// Comparacion honesta: solo afirmamos cosas que la plataforma realmente
// hace hoy (gratis publicar, contacto directo, sin comision). No se
// inventan ventajas ni se exagera lo que ofrecen las alternativas.
const A_FAVOR = [
  "Publicar tu proyecto es 100% gratis",
  "Recibes varias propuestas sin buscar una por una",
  "Hablas directo con el profesional, sin intermediarios",
  "Perfiles con nombre real, categoría y ciudad antes de contactar",
  "Tú eliges con quién trabajar, sin compromiso",
];

const EN_CONTRA = [
  "Cotizar con cada profesional toma tiempo, uno por uno",
  "Depende de a quién conozcas o qué tan buena sea tu red",
  "Las agencias suelen cobrar comisión por intermediar",
  "Pocas opciones reales para comparar antes de decidir",
];

const A_FAVOR_EN = [
  "Posting your project is 100% free",
  "Get multiple proposals without searching one by one",
  "Talk directly to the professional, no middleman",
  "Real name, category and city shown before you reach out",
  "You choose who to work with, no commitment",
];

const EN_CONTRA_EN = [
  "Getting quotes one by one takes real time",
  "Depends on who you know or how good your network is",
  "Agencies usually charge a commission to intermediate",
  "Few real options to compare before deciding",
];

export default function Comparacion({ lang = "es" }: { lang?: "es" | "en" }) {
  const favor = lang === "en" ? A_FAVOR_EN : A_FAVOR;
  const contra = lang === "en" ? EN_CONTRA_EN : EN_CONTRA;

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 sm:py-20">
      <Reveal>
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            {lang === "en" ? "chaski vs. the traditional way" : "chaski vs. la forma tradicional"}
          </h2>
          <p className="text-ink/55 mt-2 max-w-md mx-auto">
            {lang === "en"
              ? "Searching on your own or going through an agency both work — this is what's different."
              : "Buscar por tu cuenta o pasar por una agencia también funciona — esto es lo que cambia."}
          </p>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5">
        <Reveal>
          <div className="h-full rounded-3xl border-2 border-brand-500 bg-white shadow-xl shadow-brand-500/10 p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-100/50 blur-2xl" />
            <div className="relative">
              <span className="inline-block text-xs font-bold text-cream bg-brand-500 px-3 py-1 rounded-full mb-4">
                chaski
              </span>
              <ul className="space-y-3.5">
                {favor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-500 text-cream flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="h-full rounded-3xl border border-black/10 bg-cream/60 p-6 sm:p-8">
            <span className="inline-block text-xs font-bold text-ink/50 bg-black/5 px-3 py-1 rounded-full mb-4">
              {lang === "en" ? "On your own / agency" : "Por tu cuenta / agencia"}
            </span>
            <ul className="space-y-3.5">
              {contra.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink/50">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-black/10 text-ink/50 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
