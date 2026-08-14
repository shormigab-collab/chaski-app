import type { Metadata } from "next";
import Link from "next/link";
import { Search, Send, CheckCircle2, UserPlus, ListFilter, Coins, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "Publica tu proyecto gratis y recibe propuestas de profesionales, o crea tu perfil y encuentra clientes. Así funciona chaski, el marketplace de profesionales en LatAm.",
};

const PASOS_CLIENTE = [
  { Icono: Search, t: "Publica gratis", d: "Describe qué necesitas y en qué ciudad estás. Toma menos de 2 minutos." },
  { Icono: Send, t: "Recibe propuestas", d: "Los profesionales interesados te contactan directamente, sin intermediarios." },
  { Icono: CheckCircle2, t: "Elige sin compromiso", d: "Compara perfiles, experiencia y ubicación, y decide con quién trabajar." },
];

const PASOS_PROVEEDOR = [
  { Icono: UserPlus, t: "Crea tu perfil", d: "Gratis. Agrega tu categoría, experiencia, ciudad y una bio." },
  { Icono: ListFilter, t: "Explora solicitudes", d: "Filtra por tu especialidad y revisa lo que están buscando los clientes." },
  { Icono: Coins, t: "Desbloquea contactos", d: "Usa créditos (1 por solicitud) para hablar directo con quien te interese." },
];

export default function ComoFunciona() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-cream to-cream">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-coral-100/40 blur-3xl" />
        <div className="absolute top-24 -left-20 w-64 h-64 rounded-full bg-gold-100/40 blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 pt-16 sm:pt-20 pb-14 text-center">
          <Reveal>
            <span className="inline-block text-xs font-semibold text-coral-600 bg-coral-50 px-3 py-1 rounded-full mb-4">
              Guía rápida
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">Cómo funciona chaski</h1>
            <p className="text-ink/60 text-base sm:text-lg max-w-xl mx-auto">
              Un marketplace simple: publicas o exploras, se contactan directo, tú decides. Sin comisiones sobre lo
              que pagues.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="h-full flex flex-col border border-black/5 bg-white rounded-[1.75rem] p-7 sm:p-8">
              <span className="inline-block text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full w-fit mb-5">
                Si buscas un servicio
              </span>
              <div className="space-y-6 flex-1">
                {PASOS_CLIENTE.map((paso, i) => (
                  <div key={paso.t} className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0 font-bold text-sm">
                      <paso.Icono className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink mb-1">
                        {i + 1}. {paso.t}
                      </h3>
                      <p className="text-sm text-ink/55 leading-relaxed">{paso.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/registro/cliente"
                className="mt-8 inline-flex items-center justify-center gap-2 min-h-[44px] bg-brand-500 text-cream px-6 py-3 rounded-full font-semibold hover:bg-brand-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
              >
                Publicar un proyecto gratis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full flex flex-col border border-black/5 bg-white rounded-[1.75rem] p-7 sm:p-8">
              <span className="inline-block text-xs font-bold text-coral-600 bg-coral-50 px-3 py-1 rounded-full w-fit mb-5">
                Si eres profesional
              </span>
              <div className="space-y-6 flex-1">
                {PASOS_PROVEEDOR.map((paso, i) => (
                  <div key={paso.t} className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center shrink-0 font-bold text-sm">
                      <paso.Icono className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-ink mb-1">
                        {i + 1}. {paso.t}
                      </h3>
                      <p className="text-sm text-ink/55 leading-relaxed">{paso.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-ink/40 mt-6">
                Los créditos se compran en paquetes desde tu panel de proveedor.
              </p>
              <Link
                href="/registro/proveedor"
                className="mt-4 inline-flex items-center justify-center gap-2 min-h-[44px] bg-coral-500 text-cream px-6 py-3 rounded-full font-semibold hover:bg-coral-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
              >
                Crear mi perfil profesional
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-500 to-coral-600 px-6 py-12 sm:py-14 text-center mt-8">
            <div className="absolute -top-14 -right-14 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-14 -left-14 w-56 h-56 rounded-full bg-gold-400/20 blur-2xl" />
            <div className="relative">
              <h2 className="text-xl sm:text-2xl font-bold text-cream mb-2">¿Listo para empezar?</h2>
              <p className="text-cream/75 mb-6 max-w-md mx-auto text-sm">
                Publicar y crear tu perfil son gratis. Sin tarjetas ni compromisos por adelantado.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/registro/cliente"
                  className="inline-flex items-center justify-center min-h-[44px] bg-cream text-brand-600 px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors"
                >
                  Publicar un proyecto
                </Link>
                <Link
                  href="/registro/proveedor"
                  className="inline-flex items-center justify-center min-h-[44px] bg-white/10 text-cream border border-white/30 px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors"
                >
                  Crear perfil profesional
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
