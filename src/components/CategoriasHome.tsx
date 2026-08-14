"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CategoryIcon from "@/components/CategoryIcon";

type Categoria = { id: string; nombre: string; slug: string; icono: string };

// Ciclo de acentos de color para que la grilla de categorías no se vea
// monocromática. Se aplica por posición, no por categoría específica.
const ACENTOS = [
  { bg: "bg-brand-50", text: "text-brand-500", hover: "group-hover:bg-brand-500" },
  { bg: "bg-coral-50", text: "text-coral-500", hover: "group-hover:bg-coral-500" },
  { bg: "bg-gold-50", text: "text-gold-600", hover: "group-hover:bg-gold-500" },
];

// Categorias curadas para la vista inicial (etiquetas mas cortas y
// agrupadas para la portada). El enlace sigue apuntando a la categoria
// real de la base de datos, asi que el flujo de registro no cambia.
const CURADAS: { slug: string; etiqueta: string }[] = [
  { slug: "marketing-redes", etiqueta: "Marketing digital" },
  { slug: "diseno-grafico", etiqueta: "Diseño y branding" },
  { slug: "desarrollo-web", etiqueta: "Desarrollo web" },
  { slug: "contabilidad", etiqueta: "Contabilidad" },
  { slug: "soporte-tecnico", etiqueta: "Asistencia y operaciones" },
  { slug: "consultoria-empresarial", etiqueta: "Consultoría empresarial" },
];

// Fotos solo para las 6 categorias destacadas (no para el listado
// expandido "ver todas"), asi la grilla principal se ve mas atractiva
// sin sobrecargar la vista con fotos en las 24 categorias.
const FOTOS: Record<string, string> = {
  "marketing-redes": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=70",
  "diseno-grafico": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=70",
  "desarrollo-web": "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=400&q=70",
  contabilidad: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=70",
  "soporte-tecnico": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=70",
  "consultoria-empresarial": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=70",
};

export default function CategoriasHome({ categorias }: { categorias: Categoria[] }) {
  const [verTodas, setVerTodas] = useState(false);

  const porSlug = new Map(categorias.map((c) => [c.slug, c]));
  const curadas = CURADAS
    .map((c) => (porSlug.get(c.slug) ? { ...porSlug.get(c.slug)!, etiqueta: c.etiqueta } : null))
    .filter((c): c is Categoria & { etiqueta: string } => c !== null);

  const slugsCuradas = new Set(curadas.map((c) => c.slug));
  const otras = categorias.filter((c) => !slugsCuradas.has(c.slug));

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
      <Reveal>
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink">Explora por categoría</h2>
          <p className="text-ink/55 mt-2">Encuentra al profesional que necesitas por especialidad.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {curadas.map((cat, i) => {
          const ac = ACENTOS[i % ACENTOS.length];
          const foto = FOTOS[cat.slug];
          return (
            <Reveal key={cat.id} delay={i * 50}>
              <Link
                href={`/registro/cliente?categoria=${cat.slug}`}
                className="group border border-black/5 bg-white rounded-2xl overflow-hidden hover:border-brand-500 hover:shadow-md hover:shadow-brand-500/5 hover:-translate-y-0.5 transition-all block min-h-[44px]"
              >
                <div className={`relative h-24 sm:h-28 ${ac.bg}`}>
                  {foto && (
                    <img
                      src={foto}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
                  <span className={`absolute bottom-2.5 left-2.5 w-8 h-8 rounded-lg bg-white/95 ${ac.text} flex items-center justify-center`}>
                    <CategoryIcon slug={cat.slug} className="w-4 h-4" />
                  </span>
                </div>
                <div className="text-sm font-semibold text-ink/80 group-hover:text-brand-500 transition-colors leading-snug p-4">
                  {cat.etiqueta}
                </div>
              </Link>
            </Reveal>
          );
        })}

        {verTodas &&
          otras.map((cat, i) => {
            const ac = ACENTOS[i % ACENTOS.length];
            return (
              <Reveal key={cat.id} delay={(i % 8) * 40}>
                <Link
                  href={`/registro/cliente?categoria=${cat.slug}`}
                  className="group border border-black/5 bg-white rounded-2xl p-5 hover:border-brand-500 hover:shadow-md hover:shadow-brand-500/5 hover:-translate-y-0.5 transition-all block min-h-[44px]"
                >
                  <div className={`w-10 h-10 rounded-xl ${ac.bg} ${ac.text} flex items-center justify-center mb-3 ${ac.hover} group-hover:text-cream transition-colors`}>
                    <CategoryIcon slug={cat.slug} className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-semibold text-ink/80 group-hover:text-brand-500 transition-colors leading-snug">
                    {cat.nombre}
                  </div>
                </Link>
              </Reveal>
            );
          })}
      </div>

      {otras.length > 0 && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => setVerTodas((v) => !v)}
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full border border-black/10 text-sm font-semibold text-ink/70 hover:border-brand-500 hover:text-brand-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {verTodas ? "Ver menos categorías" : "Ver todas las categorías"}
          </button>
        </div>
      )}
    </section>
  );
}
