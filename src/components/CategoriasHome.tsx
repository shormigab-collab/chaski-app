"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CategoryIcon from "@/components/CategoryIcon";
import { nombreCategoria } from "@/lib/categoriasEn";

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

const CURATED_EN: { slug: string; etiqueta: string }[] = [
  { slug: "asistente-virtual", etiqueta: "Virtual assistant" },
  { slug: "marketing-redes", etiqueta: "Digital marketing" },
  { slug: "diseno-grafico", etiqueta: "Design & branding" },
  { slug: "desarrollo-web", etiqueta: "Web development" },
  { slug: "contabilidad", etiqueta: "Accounting" },
  { slug: "soporte-tecnico", etiqueta: "Support & operations" },
  { slug: "consultoria-empresarial", etiqueta: "Business consulting" },
];

export default function CategoriasHome({
  categorias,
  lang = "es",
}: {
  categorias: Categoria[];
  lang?: "es" | "en";
}) {
  const [verTodas, setVerTodas] = useState(false);

  const porSlug = new Map(categorias.map((c) => [c.slug, c]));
  const listaCurada = lang === "en" ? CURATED_EN : CURADAS;
  const curadas = listaCurada
    .map((c) => (porSlug.get(c.slug) ? { ...porSlug.get(c.slug)!, etiqueta: c.etiqueta } : null))
    .filter((c): c is Categoria & { etiqueta: string } => c !== null);

  const slugsCuradas = new Set(curadas.map((c) => c.slug));
  const otras = categorias.filter((c) => !slugsCuradas.has(c.slug));

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
      <Reveal>
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink">
            {lang === "en" ? "Discover talent by specialty" : "Descubre talento por especialidad"}
          </h2>
          <p className="text-ink/55 mt-2">
            {lang === "en"
              ? "Find the professional you need by specialty."
              : "Encuentra al profesional que necesitas por especialidad."}
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {curadas.map((cat, i) => {
          const ac = ACENTOS[i % ACENTOS.length];
          return (
            <Reveal key={cat.id} delay={i * 50}>
              <Link
                href={`/registro/cliente?categoria=${cat.slug}${lang === "en" ? "&lang=en" : ""}`}
                className="group border border-border bg-white rounded-2xl p-5 hover:border-brand-500 hover:shadow-md hover:shadow-brand-500/5 hover:-translate-y-0.5 transition-all block min-h-[44px]"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${ac.bg} ${ac.text} flex items-center justify-center mb-3 ${ac.hover} group-hover:text-cream transition-colors`}
                >
                  <CategoryIcon slug={cat.slug} className="w-5 h-5" />
                </div>
                <div className="text-sm font-semibold text-ink/80 group-hover:text-brand-500 transition-colors leading-snug">
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
                  href={`/registro/cliente?categoria=${cat.slug}${lang === "en" ? "&lang=en" : ""}`}
                  className="group border border-border bg-white rounded-2xl p-5 hover:border-brand-500 hover:shadow-md hover:shadow-brand-500/5 hover:-translate-y-0.5 transition-all block min-h-[44px]"
                >
                  <div className={`w-10 h-10 rounded-xl ${ac.bg} ${ac.text} flex items-center justify-center mb-3 ${ac.hover} group-hover:text-cream transition-colors`}>
                    <CategoryIcon slug={cat.slug} className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-semibold text-ink/80 group-hover:text-brand-500 transition-colors leading-snug">
                    {nombreCategoria(cat, lang)}
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
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-xl border border-border text-sm font-semibold text-ink/70 hover:border-brand-500 hover:text-brand-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
          >
            {lang === "en"
              ? verTodas
                ? "Show fewer categories"
                : "Show all categories"
              : verTodas
              ? "Ver menos categorías"
              : "Ver todas las categorías"}
          </button>
        </div>
      )}
    </section>
  );
}
