import { UserCheck, Briefcase, FileText, MessageSquare } from "lucide-react";
import Reveal from "@/components/Reveal";

// Importante: este texto describe unicamente lo que la plataforma hace
// hoy (datos requeridos al crear el perfil). No afirma un proceso de
// verificacion manual de identidad ni revision de portafolio, porque
// ese proceso todavia no existe en el producto — evitamos prometer
// algo que no es cierto.
const PUNTOS = [
  {
    Icono: UserCheck,
    titulo: "Identidad",
    texto: "Cada profesional se registra con su nombre real y un número de contacto directo.",
  },
  {
    Icono: Briefcase,
    titulo: "Experiencia",
    texto: "Indica sus años de experiencia y las categorías en las que trabaja.",
  },
  {
    Icono: FileText,
    titulo: "Perfil completo",
    texto: "Cuenta con una bio, ciudad y, si quiere, una foto de perfil.",
  },
  {
    Icono: MessageSquare,
    titulo: "Contacto directo",
    texto: "Hablas directo con el profesional, sin intermediarios ni perfiles anónimos.",
  },
];

export default function Confianza() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 sm:py-20">
      <Reveal>
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink">Perfiles reales, no anónimos</h2>
          <p className="text-ink/55 mt-2 max-w-lg mx-auto">
            Para publicar un perfil en chaski, cada profesional debe completar esta información.
          </p>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-5">
        {PUNTOS.map((p, i) => (
          <Reveal key={p.titulo} delay={i * 80}>
            <div className="flex items-start gap-4 border border-black/5 bg-white rounded-2xl p-5">
              <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                <p.Icono className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-semibold text-ink mb-1">{p.titulo}</h3>
                <p className="text-sm text-ink/55 leading-relaxed">{p.texto}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
