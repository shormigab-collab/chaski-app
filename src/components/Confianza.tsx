import { UserCheck, Briefcase, FileText, MessageSquare, ShieldCheck } from "lucide-react";
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
    grad: "from-brand-500 to-brand-600",
  },
  {
    Icono: Briefcase,
    titulo: "Experiencia",
    texto: "Indica sus años de experiencia y las categorías en las que trabaja.",
    grad: "from-coral-500 to-coral-600",
  },
  {
    Icono: FileText,
    titulo: "Perfil completo",
    texto: "Cuenta con una bio, ciudad y, si quiere, una foto de perfil.",
    grad: "from-gold-500 to-gold-600",
  },
  {
    Icono: MessageSquare,
    titulo: "Contacto directo",
    texto: "Hablas directo con el profesional, sin intermediarios ni perfiles anónimos.",
    grad: "from-brand-500 to-coral-500",
  },
];

// Misma nota de honestidad aplica a la version en ingles: solo describe
// lo que el producto realmente pide hoy al crear un perfil.
const POINTS_EN = [
  {
    Icono: UserCheck,
    titulo: "Identity",
    texto: "Every professional registers with their real name and a direct contact number.",
    grad: "from-brand-500 to-brand-600",
  },
  {
    Icono: Briefcase,
    titulo: "Experience",
    texto: "They list their years of experience and the categories they work in.",
    grad: "from-coral-500 to-coral-600",
  },
  {
    Icono: FileText,
    titulo: "Complete profile",
    texto: "They have a bio, city, and, if they choose, a profile photo.",
    grad: "from-gold-500 to-gold-600",
  },
  {
    Icono: MessageSquare,
    titulo: "Direct contact",
    texto: "You talk directly with the professional — no middleman, no anonymous profiles.",
    grad: "from-brand-500 to-coral-500",
  },
];

export default function Confianza({ lang = "es" }: { lang?: "es" | "en" }) {
  const puntos = lang === "en" ? POINTS_EN : PUNTOS;
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-cream to-cream py-16 sm:py-20">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-brand-100/40 blur-3xl" />
      <div className="absolute top-10 -right-24 w-80 h-80 rounded-full bg-coral-100/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-gold-100/40 blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 bg-brand-500 text-cream text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              {lang === "en" ? "Verified trust" : "Confianza verificada"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-ink tracking-tight">
              {lang === "en" ? "Real profiles, not anonymous" : "Perfiles reales, no anónimos"}
            </h2>
            <p className="text-ink/55 mt-3 max-w-lg mx-auto">
              {lang === "en"
                ? "To publish a profile on chaski, every professional has to complete this information."
                : "Para publicar un perfil en chaski, cada profesional debe completar esta información."}
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          {puntos.map((p, i) => (
            <Reveal key={p.titulo} delay={i * 80}>
              <div className="group relative flex items-start gap-4 border border-black/5 bg-white rounded-2xl p-5 shadow-sm shadow-black/[0.03] hover:shadow-lg hover:shadow-brand-500/10 hover:-translate-y-1 hover:border-black/10 transition-all">
                <span className="absolute top-3 right-4 text-3xl font-extrabold text-ink/[0.05] select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${p.grad} text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <p.Icono className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <div className="relative">
                  <h3 className="font-semibold text-ink mb-1">{p.titulo}</h3>
                  <p className="text-sm text-ink/55 leading-relaxed">{p.texto}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
