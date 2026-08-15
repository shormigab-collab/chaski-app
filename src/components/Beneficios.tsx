import { Clock, ListChecks, Handshake } from "lucide-react";
import Reveal from "@/components/Reveal";

const BENEFICIOS = [
  {
    Icono: Clock,
    titulo: "Ahorra tiempo",
    texto: "Recibe propuestas sin buscar profesionales uno por uno.",
    grad: "from-brand-500 to-brand-600",
  },
  {
    Icono: ListChecks,
    titulo: "Compara mejor",
    texto: "Revisa experiencia, ubicación y especialidad antes de elegir.",
    grad: "from-coral-500 to-coral-600",
  },
  {
    Icono: Handshake,
    titulo: "Contrata directamente",
    texto: "Contacta al profesional sin comisión sobre lo que le pagues.",
    grad: "from-gold-500 to-gold-600",
  },
];

const BENEFITS_EN = [
  {
    Icono: Clock,
    titulo: "Save time",
    texto: "Get proposals without searching for professionals one by one.",
    grad: "from-brand-500 to-brand-600",
  },
  {
    Icono: ListChecks,
    titulo: "Compare easily",
    texto: "Review experience, location, and specialty before you choose.",
    grad: "from-coral-500 to-coral-600",
  },
  {
    Icono: Handshake,
    titulo: "Hire directly",
    texto: "Contact the professional with no commission on what you pay them.",
    grad: "from-gold-500 to-gold-600",
  },
];

export default function Beneficios({ lang = "es" }: { lang?: "es" | "en" }) {
  const items = lang === "en" ? BENEFITS_EN : BENEFICIOS;
  return (
    <section className="relative overflow-hidden bg-white border-y border-black/5">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-50/60 blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-coral-50/50 blur-3xl translate-y-1/2" />

      <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4">
              {lang === "en" ? "Why post on chaski" : "Por qué publicar en chaski"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">
              {lang === "en" ? "Built to make hiring easier" : "Diseñado para que contratar sea más fácil"}
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-5">
          {items.map((b, i) => (
            <Reveal key={b.titulo} delay={i * 100}>
              <div className="group relative h-full bg-white border border-black/5 rounded-2xl p-7 overflow-hidden hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 transition-all">
                <span className="absolute -top-2 -right-1 text-6xl font-extrabold text-ink/[0.04] select-none leading-none">
                  {`0${i + 1}`}
                </span>
                <div
                  className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${b.grad} text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <b.Icono className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="relative font-semibold text-ink mb-1.5">{b.titulo}</h3>
                <p className="relative text-sm text-ink/55 leading-relaxed">{b.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
