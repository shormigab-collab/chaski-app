"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CategoryIcon from "@/components/CategoryIcon";
import { nombreCategoria } from "@/lib/categoriasEn";

type Categoria = { id: string; nombre: string; slug: string; icono: string };

export default function HeroSearch({
  categorias,
  lang = "es",
}: {
  categorias: Categoria[];
  lang?: "es" | "en";
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState(0);

  const resultados = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categorias.slice(0, 6);
    return categorias.filter((c) => nombreCategoria(c, lang).toLowerCase().includes(q)).slice(0, 6);
  }, [query, categorias, lang]);

  function irACategoria(cat: Categoria) {
    setAbierto(false);
    const params = new URLSearchParams({ categoria: cat.slug });
    if (lang === "en") params.set("lang", "en");
    router.push(`/registro/cliente?${params.toString()}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActivo((a) => Math.min(a + 1, resultados.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActivo((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (resultados[activo]) irACategoria(resultados[activo]);
    } else if (e.key === "Escape") {
      setAbierto(false);
    }
  }

  return (
    <div className="relative max-w-md mx-auto md:mx-0">
      <p className="text-xs font-medium text-ink/40 mb-1.5 px-1">
        {lang === "en" ? "or search directly for a specialty" : "o busca directamente una especialidad"}
      </p>
      <div className="flex items-center bg-white border border-black/10 rounded-full shadow-sm shadow-black/5 pl-4 pr-1.5 py-1 focus-within:border-brand-300 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-ink/35 shrink-0">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActivo(0);
            setAbierto(true);
          }}
          onFocus={() => setAbierto(true)}
          onBlur={() => setTimeout(() => setAbierto(false), 150)}
          onKeyDown={onKeyDown}
          placeholder={lang === "en" ? "E.g: logo design, SEO, bookkeeper..." : "Ej: diseño de logo, SEO, contador..."}
          className="flex-1 px-3 py-2.5 text-sm outline-none bg-transparent placeholder:text-ink/35 min-h-[44px]"
        />
        <button
          onClick={() => resultados[0] && irACategoria(resultados[0])}
          className="text-brand-500 text-sm font-semibold px-4 rounded-full hover:bg-brand-50 transition-colors shrink-0 min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          {lang === "en" ? "Search" : "Buscar"}
        </button>
      </div>

      {abierto && resultados.length > 0 && (
        <div className="absolute z-30 mt-2 w-full bg-white border border-black/10 rounded-2xl shadow-lg shadow-black/10 overflow-hidden text-left">
          {resultados.map((cat, i) => (
            <button
              key={cat.id}
              onMouseDown={() => irACategoria(cat)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                i === activo ? "bg-brand-50 text-brand-600" : "hover:bg-black/[0.03]"
              }`}
            >
              <span className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                <CategoryIcon slug={cat.slug} className="w-4 h-4" />
              </span>
              <span className="font-medium">{nombreCategoria(cat, lang)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
