"use client";

import { useState } from "react";
import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";

type Categoria = { id: string; nombre: string; slug: string; icono: string };

// Un color distinto por posicion, con los hex tomados directamente del
// mockup de referencia (muestreados pixel a pixel de los iconos de
// categoria) para que coincidan exactamente en vez de aproximarse con
// la paleta por defecto de Tailwind.
// Nota de contraste: gold/teal/green son fondos claros donde un icono
// blanco casi no se ve (ratio menor a 3:1), asi que en esos tres uso el
// icono en tono oscuro. El color de fondo en si es identico al mockup.
const ACENTOS = [
  { bg: "bg-[#7048CD]", text: "text-white" },
  { bg: "bg-[#4F7CEA]", text: "text-white" },
  { bg: "bg-[#F76249]", text: "text-white" },
  { bg: "bg-[#F9BC1E]", text: "text-ink" },
  { bg: "bg-[#3DB875]", text: "text-ink" },
  { bg: "bg-[#F358B5]", text: "text-white" },
  { bg: "bg-[#1AC2CA]", text: "text-ink" },
  { bg: "bg-[#9874E1]", text: "text-white" },
];

// Foto ilustrativa por categoria (banco de fotos reales de uso libre,
// vinculadas por palabra clave — no son fotos de trabajos de la
// comunidad, solo imagenes de ambiente para que la tarjeta se vea mas
// visual que un simple icono). Si una categoria no esta en el mapa
// (las que aparecen solo al abrir "Ver todas") usa una foto generica.
const FOTOS: Record<string, string> = {
  "diseno-grafico": "https://loremflickr.com/300/300/graphicdesign,design",
  "desarrollo-web": "https://loremflickr.com/300/300/coding,programming",
  "marketing-redes": "https://loremflickr.com/300/300/marketing,socialmedia",
  copywriting: "https://loremflickr.com/300/300/writing,notebook",
  "consultoria-empresarial": "https://loremflickr.com/300/300/business,office",
  animacion: "https://loremflickr.com/300/300/videocamera,film",
  seo: "https://loremflickr.com/300/300/analytics,chart",
  "soporte-tecnico": "https://loremflickr.com/300/300/support,headset",
};
const FOTO_GENERICA = "https://loremflickr.com/300/300/freelancer,remotework";

// Categorias curadas para la vista inicial (etiquetas mas cortas y
// agrupadas para la portada). El enlace sigue apuntando a la categoria
// real de la base de datos, asi que el flujo de registro no cambia.
const CURADAS: { slug: string; etiqueta: string }[] = [
  { slug: "diseno-grafico", etiqueta: "Diseño y UX" },
  { slug: "desarrollo-web", etiqueta: "Desarrollo" },
  { slug: "marketing-redes", etiqueta: "Marketing" },
  { slug: "copywriting", etiqueta: "Redacción" },
  { slug: "consultoria-empresarial", etiqueta: "Negocios" },
  { slug: "animacion", etiqueta: "Video y Animación" },
  { slug: "seo", etiqueta: "SEO" },
  { slug: "soporte-tecnico", etiqueta: "Soporte y Admin" },
];

const CURATED_EN: { slug: string; etiqueta: string }[] = [
  { slug: "diseno-grafico", etiqueta: "Design & UX" },
  { slug: "desarrollo-web", etiqueta: "Development" },
  { slug: "marketing-redes", etiqueta: "Marketing" },
  { slug: "copywriting", etiqueta: "Copywriting" },
  { slug: "consultoria-empresarial", etiqueta: "Business" },
  { slug: "animacion", etiqueta: "Animation" },
  { slug: "seo", etiqueta: "SEO" },
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
              <span className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-border">
                <img
                  src={FOTOS[cat.slug] ?? FOTO_GENERICA}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className={`absolute bottom-1 right-1 w-5 h-5 rounded-md ${ac.bg} ${ac.text} flex items-center justify-center shadow-sm`}
                >
                  <CategoryIcon slug={cat.slug} className="w-3 h-3" />
                </span>
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
