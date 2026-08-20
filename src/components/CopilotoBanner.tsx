import Link from "next/link";
import { Sparkles, MessageSquare, FileText, Users, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";

const PASOS = [
  { icono: MessageSquare, texto: "Cuéntanos tu idea" },
  { icono: FileText, texto: "Recibe un brief claro" },
  { icono: Users, texto: "Conoce el talento ideal" },
  { icono: Rocket, texto: "Arma tu equipo" },
];

const SENALES = [
  "Tú tomas la decisión final",
  "Contacto directo",
  "Sin comisiones",
  "Recomendaciones explicables",
];

export default function CopilotoBanner() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
      <Reveal>
        <div className="border border-brand-100 bg-brand-50/50 rounded-[2rem] px-6 sm:px-10 py-12 sm:py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-brand-600 bg-white px-4 py-2 rounded-full mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              CON INTELIGENCIA ARTIFICIAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-4">
              Cuéntanos tu proyecto. Chaski arma el equipo.
            </h2>
            <p className="text-ink/60 leading-relaxed">
              Habla o escribe en tus palabras. Convertimos tu idea en un plan y encontramos profesionales
              latinoamericanos con experiencia relevante.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {PASOS.map((paso, i) => {
              const Icono = paso.icono;
              return (
                <div key={paso.texto} className="bg-white rounded-2xl p-4 text-center border border-black/5">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-2.5">
                    <Icono className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <p className="text-xs font-semibold text-ink/40 mb-0.5">Paso {i + 1}</p>
                  <p className="text-sm font-medium text-ink">{paso.texto}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              href="/copiloto"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 bg-brand-500 text-cream px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-600 transition-colors"
            >
              Describe tu proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/profesionales"
              className="min-h-[44px] inline-flex items-center justify-center bg-white border border-black/10 text-ink px-7 py-3.5 rounded-xl font-semibold hover:border-brand-500 hover:text-brand-500 transition-colors"
            >
              Explorar profesionales
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink/50">
            {SENALES.map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" strokeWidth={1.75} />
                {s}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
