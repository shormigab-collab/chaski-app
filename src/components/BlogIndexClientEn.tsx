"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BookOpenText, ArrowRight } from "lucide-react";
import { POSTS_EN, type CategoriaBlogEn } from "@/lib/blogEn";

function formatearFecha(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type Filtro = "todos" | CategoriaBlogEn;

const FILTROS: { id: Filtro; etiqueta: string }[] = [
  { id: "todos", etiqueta: "All" },
  { id: "Guide for freelancers", etiqueta: "For freelancers" },
  { id: "Guide for clients", etiqueta: "For clients" },
];

export default function BlogIndexClientEn() {
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const posts = useMemo(
    () => (filtro === "todos" ? POSTS_EN : POSTS_EN.filter((p) => p.categoria === filtro)),
    [filtro]
  );
  const [destacado, ...recientes] = posts;

  return (
    <div className="relative overflow-hidden bg-cream">
      {/* mismo motivo decorativo que en /blog */}
      <svg
        className="hidden sm:block absolute -top-2 right-4 w-40 h-56 text-border pointer-events-none"
        viewBox="0 0 140 220"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 10 L110 100 L20 190"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M60 10 L150 100 L60 190"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
      </svg>

      <div className="relative max-w-3xl mx-auto px-4 py-14 sm:py-16">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 mb-4">
          <BookOpenText className="w-4 h-4" strokeWidth={1.75} />
          The chaski Blog
        </span>
        <h1
          className="font-extrabold text-brand-600 mb-3"
          style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
        >
          Ideas for hiring and <span className="text-coral-600">working smarter.</span>
        </h1>
        <p className="text-ink/55 max-w-md mb-8">
          Practical guides for US businesses hiring in Latin America, and for LatAm professionals working with
          clients abroad.
        </p>

        {/* filtro por audiencia */}
        <div className="flex items-center gap-2 flex-wrap mb-10">
          {FILTROS.map((f) => {
            const activo = filtro === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFiltro(f.id)}
                className={`text-sm font-semibold px-4 py-2 rounded-full border transition-colors ${
                  activo
                    ? "bg-brand-600 border-brand-600 text-white"
                    : "bg-white border-border text-ink/70 hover:border-brand-300"
                }`}
              >
                {f.etiqueta}
              </button>
            );
          })}
        </div>

        {!destacado && <p className="text-sm text-ink/45 italic">No guides in this category yet.</p>}

        {destacado && (
          <Link
            href={`/en/blog/${destacado.slug}`}
            className="group block bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:shadow-brand-500/10 transition-all mb-10"
          >
            <div className="relative h-56 sm:h-72 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={destacado.imagen}
                alt={destacado.imagenAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 sm:p-7">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                  {destacado.categoria}
                </span>
                <span className="text-xs text-ink/40">{destacado.minutosLectura} min read</span>
              </div>
              <h2 className="text-2xl font-bold text-ink mb-2 leading-snug group-hover:text-brand-600 transition-colors">
                {destacado.titulo}
              </h2>
              <p className="text-ink/60 leading-relaxed mb-4">{destacado.extracto}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                Read guide
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </span>
            </div>
          </Link>
        )}

        {recientes.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-ink mb-4">Recent guides</h2>
            <div className="flex flex-col gap-4">
              {recientes.map((post) => (
                <Link
                  key={post.slug}
                  href={`/en/blog/${post.slug}`}
                  className="group flex gap-4 bg-white border border-border rounded-2xl p-3 hover:border-brand-300 hover:shadow-sm transition-all"
                >
                  <div className="relative w-28 h-24 sm:w-36 sm:h-28 rounded-xl overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.imagen}
                      alt={post.imagenAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 py-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                        {post.categoria}
                      </span>
                      <span className="text-xs text-ink/40">{post.minutosLectura} min read</span>
                    </div>
                    <h3 className="font-bold text-ink leading-snug group-hover:text-brand-600 transition-colors">
                      {post.titulo}
                    </h3>
                    <span className="text-xs text-ink/40">{formatearFecha(post.fecha)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
