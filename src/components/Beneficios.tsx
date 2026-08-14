import { Clock, ListChecks, Handshake } from "lucide-react";
import Reveal from "@/components/Reveal";

const BENEFICIOS = [
  {
    Icono: Clock,
    titulo: "Ahorra tiempo",
    texto: "Recibe propuestas sin buscar profesionales uno por uno.",
  },
  {
    Icono: ListChecks,
    titulo: "Compara mejor",
    texto: "Revisa experiencia, ubicación y especialidad antes de elegir.",
  },
  {
    Icono: Handshake,
    titulo: "Contrata directamente",
    texto: "Contacta al profesional sin comisión sobre lo que le pagues.",
  },
];

export default function Beneficios() {
  return (
    <section className="bg-white border-y border-black/5">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid sm:grid-cols-3 gap-5">
          {BENEFICIOS.map((b, i) => (
            <Reveal key={b.titulo} delay={i * 100}>
              <div className="h-full border border-black/5 rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
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
