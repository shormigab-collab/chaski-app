import { Check, X } from "lucide-react";
import Reveal from "@/components/Reveal";

const PUNTOS_CHASKI = [
  "Publicar tu proyecto es gratis y toma 2 minutos",
  "Recibes propuestas de varios profesionales interesados",
  "Perfiles organizados por categoría, ciudad y experiencia",
  "Comparas antes de decidir con quién trabajar",
  "Sin comisión sobre lo que le pagues al profesional",
  "Profesionales en toda Latinoamérica, no solo tu círculo",
];

const PUNTOS_SIN_CHASKI = [
  "Buscas uno por uno entre contactos y redes sociales",
  "Dependes de a quién conozcas o te recomienden",
  "Buscas a ciegas en Google sin poder comparar perfiles",
  "Contratas al primero que encuentras, sin opciones",
  "Agencias tradicionales cobran comisiones altas",
  "Limitado a tu ciudad o círculo cercano",
];

export default function Comparativa() {
  return (
    <section className="bg-white border-y border-black/5">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">
              ¿Por qué no buscar por tu cuenta?
            </h2>
            <p className="text-ink/55 mt-2 max-w-md mx-auto">
              Podrías, pero así es como se compara con publicar tu proyecto en Chaski.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5">
          <Reveal>
            <div className="relative h-full rounded-2xl border-2 border-brand-500 bg-brand-50/40 p-6 sm:p-7">
              <span className="absolute -top-3 left-6 bg-brand-500 text-cream text-xs font-semibold px-3 py-1 rounded-full">
                Con Chaski
              </span>
              <ul className="space-y-4 mt-3">
                {PUNTOS_CHASKI.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-brand-500 text-cream flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-ink/80 leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-black/10 p-6 sm:p-7">
              <span className="inline-block text-ink/40 text-xs font-semibold px-3 py-1 rounded-full border border-black/10 mb-3">
                Buscando por tu cuenta
              </span>
              <ul className="space-y-4 mt-3">
                {PUNTOS_SIN_CHASKI.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-black/5 text-ink/40 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-ink/50 leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
