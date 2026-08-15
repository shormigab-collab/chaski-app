"use client";

import { useState } from "react";
import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";

type Categoria = { id: string; nombre: string; slug: string; icono: string };

// Ciclo de acentos de color para que la grilla de categorías no se vea
// monocromática. Se aplica por posición, no por categoría específica.
const ACENTOS = [
  { bg: "bg-brand-500", text: "text-white" },
  { bg: "bg-brand-400", text: "text-white" },
  { bg: "bg-coral-500", text: "text-white" },
  { bg: "bg-gold-500", text: "text-white" },
  { bg: "bg-brand-600", text: "text-white" },
];

// Categorias curadas para la vista inicial (etiquetas mas cortas y
// agrupadas para la portada). El enlace sigue apuntando a la categoria
// real de la base de datos, asi que el flujo de registro no cambia.
const CURADAS: { slug: string; etiqueta: string }[] = [
  { slug: "marketing-redes", etiqueta: "Marketing" },
  { slug: "diseno-grafico", etiqueta: "Diseño y UX" },
  { slug: "desarrollo-web", etiqueta: "Desarrollo" },
  { slug: "contabilidad", etiqueta: "Contabilidad" },
  { slug: "soporte-tecnico", etiqueta: "Soporte y Admin" },
  { slug: "consultoria-empresarial", etiqueta: "Negocios" },
];

const CURATED_EN: { slug: string; etiqueta: string }[] = [
  { slug: "asistente-virtual", etiqueta: "Virtual assistant" },
  { slug: "marketing-redes", etiqueta: "Marketing" },
  { slug: "diseno-grafico", etiqueta: "Design & UX" },
  { slug: "desarrollo-web", etiqueta: "Development" },
  { slug: "contabilidad", etiqueta: "Accounting" },
  { slug: "soporte-tecnico", etiqueta: "Support & Admin" },
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
  const visibles = verTodas ? [...curadas, ...otras] : curadas;

  return (
    <div className="bg-white border border-border rounded-2xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-ink">
          {lang === "en" ? "Discover talent by specialty" : "Descubre talento por especialidad"}
        </h2>
        {otras.length > 0 && (
          <button
            type="button"
            onClick={() => setVerTodas((v) => !v)}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 shrink-0"
          >
            {verTodas
              ? lang === "en"
                ? "Show less"
                : "Ver menos"
              : lang === "en"
              ? "See all"
              : "Ver todas"}
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {visibles.map((cat, i) => {
          const ac = ACENTOS[i % ACENTOS.length];
          const etiqueta: string = "etiqueta" in cat && typeof cat.etiqueta === "string" ? cat.etiqueta : cat.nombre;
          return (
            <Link
              key={cat.id}
              href={`/registro/cliente?categoria=${cat.slug}${lang === "en" ? "&lang=en" : ""}`}
              className="group flex flex-col items-center text-center gap-2 rounded-xl border border-border p-3 hover:border-brand-500 hover:shadow-sm transition-all"
            >
              <span className={`w-10 h-10 rounded-xl ${ac.bg} ${ac.text} flex items-center justify-center shrink-0`}>
                <CategoryIcon slug={cat.slug} className="w-5 h-5" />
              </span>
              <span className="text-xs font-semibold text-ink/75 group-hover:text-brand-600 transition-colors leading-snug">
                {etiqueta}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
