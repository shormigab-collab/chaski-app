import { Clock, ListChecks, Handshake } from "lucide-react";
import Reveal from "@/components/Reveal";

const BENEFICIOS = [
  {
    Icono: Clock,
    titulo: "Ahorra tiempo",
    texto: "Recibe propuestas sin buscar profesionales uno por uno.",
    bg: "bg-brand-50",
    text: "text-brand-500",
  },
  {
    Icono: ListChecks,
    titulo: "Compara mejor",
    texto: "Revisa experiencia, ubicación y especialidad antes de elegir.",
    bg: "bg-coral-50",
    text: "text-coral-500",
  },
  {
    Icono: Handshake,
    titulo: "Contrata directamente",
    texto: "Contacta al profesional sin comisión sobre lo que le pagues.",
    bg: "bg-gold-50",
    text: "text-gold-600",
  },
];

const BENEFITS_EN = [
  {
    Icono: Clock,
    titulo: "Save time",
    texto: "Get proposals without searching for professionals one by one.",
    bg: "bg-brand-50",
    text: "text-brand-500",
  },
  {
    Icono: ListChecks,
    titulo: "Compare easily",
    texto: "Review experience, location, and specialty before you choose.",
    bg: "bg-coral-50",
    text: "text-coral-500",
  },
  {
    Icono: Handshake,
    titulo: "Hire directly",
    texto: "Contact the professional with no commission on what you pay them.",
    bg: "bg-gold-50",
    text: "text-gold-600",
  },
];

export default function Beneficios({ lang = "es" }: { lang?: "es" | "en" }) {
  const items = lang === "en" ? BENEFITS_EN : BENEFICIOS;
  return (
    <section className="bg-white border-y border-black/5">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid sm:grid-cols-3 gap-5">
          {items.map((b, i) => (
            <Reveal key={b.titulo} delay={i * 100}>
              <div className="h-full border border-black/5 rounded-2xl p-6 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 transition-all">
                <div className={`w-11 h-11 rounded-xl ${b.bg} ${b.text} flex items-center justify-center mb-4`}>
                  <b.Icono className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-semibold text-ink mb-1.5">{b.titulo}</h3>
                <p className="text-sm text-ink/55 leading-relaxed">{b.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
