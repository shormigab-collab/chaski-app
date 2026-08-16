"use client";

import { useState } from "react";
import Link from "next/link";
import { PenLine, MessageSquare, ListChecks } from "lucide-react";
import Reveal from "@/components/Reveal";

const PASOS = [
  {
    n: 1,
    t: "Describe tu necesidad",
    d: "Cuéntanos qué buscas, gratis y en menos de 2 minutos.",
    color: "bg-brand-500",
    textColor: "text-brand-600",
    bgTint: "bg-brand-50/70",
    Icono: PenLine,
  },
  {
    n: 2,
    t: "Recibe propuestas",
    d: "Profesionales interesados te contactan directamente.",
    color: "bg-coral-500",
    textColor: "text-coral-600",
    bgTint: "bg-coral-50/70",
    Icono: MessageSquare,
  },
  {
    n: 3,
    t: "Compara y elige",
    d: "Revisa perfiles y decide con quién trabajar, sin compromiso.",
    color: "bg-gold-500",
    textColor: "text-gold-600",
    bgTint: "bg-gold-50/70",
    Icono: ListChecks,
  },
];

export default function ComoFunciona() {
  const [activo, setActivo] = useState(1);

  return (
    <div>
      <Reveal>
        <h2 className="text-2xl sm:text-3xl font-bold text-ink mb-10">Cómo funciona</h2>
      </Reveal>

      <div className="relative space-y-3">
        {/* linea base + linea de progreso que crece hasta el paso activo */}
        <div className="absolute left-6 top-3 bottom-3 w-px bg-border" aria-hidden="true" />
        <div
          className="absolute left-6 top-3 w-px bg-brand-400 transition-all duration-300 ease-out"
          style={{ height: `${((activo - 1) / (PASOS.length - 1)) * 100}%` }}
          aria-hidden="true"
        />

        {PASOS.map((paso, i) => {
          const esActivo = paso.n === activo;
          return (
            <Reveal key={paso.n} delay={i * 120}>
              <div className="relative flex gap-5">
                <div
                  className={`relative z-10 w-12 h-12 rounded-full ${paso.color} text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 ${
                    esActivo ? "scale-110" : ""
                  }`}
                >
                  {paso.n}
                </div>
                <button
                  type="button"
                  onClick={() => setActivo(paso.n)}
                  onMouseEnter={() => setActivo(paso.n)}
                  aria-pressed={esActivo}
                  className={`flex-1 text-left rounded-xl px-3 py-1.5 -mx-3 -my-1.5 transition-colors duration-200 ${
                    esActivo ? paso.bgTint : "hover:bg-white/60"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <paso.Icono
                      className={`w-4 h-4 transition-colors duration-200 ${esActivo ? paso.textColor : "text-ink/30"}`}
                      strokeWidth={1.75}
                    />
                    <h3 className="font-semibold text-ink">{paso.t}</h3>
                  </div>
                  <p className="text-sm text-ink/55">{paso.d}</p>
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={400}>
        <Link
          href="/registro/cliente"
          className="inline-flex items-center justify-center min-h-[44px] bg-brand-500 text-cream px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-600 transition-colors mt-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          Publicar un proyecto gratis
        </Link>
      </Reveal>
    </div>
  );
}
