import Link from "next/link";
import { BookOpenText } from "lucide-react";
import { POSTS } from "@/lib/blog";

export const metadata = {
  title: "Blog",
  description:
    "Guías y consejos para contratar profesionales freelance en Colombia y Latinoamérica, y para independientes que quieren conseguir más clientes.",
};

function formatearFecha(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndex() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-cream to-cream">
      <div className="absolute -top-20 -right-24 w-80 h-80 rounded-full bg-brand-100/40 blur-3xl" />
      <div className="absolute top-40 -left-24 w-72 h-72 rounded-full bg-coral-100/40 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-20">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-brand-500 text-cream text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <BookOpenText className="w-3.5 h-3.5" />
            Blog de chaski
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
            Guías para contratar y trabajar freelance
          </h1>
          <p className="text-ink/55 max-w-lg mx-auto">
            Consejos prácticos para contratar profesionales freelance en Latinoamérica, y para independientes que
            quieren conseguir más clientes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto sm:max-w-none">
          {POSTS.map((post) => {
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm shadow-black/[0.03] hover:shadow-lg hover:shadow-brand-500/10 hover:-translate-y-1 transition-all"
              >
                <div className="relative h-36 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imagen}
                    alt={post.imagenAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                      {post.categoria}
                    </span>
                    <span className="text-xs text-ink/40">{formatearFecha(post.fecha)}</span>
                  </div>
                  <h2 className="text-lg font-bold text-ink mb-2 leading-snug group-hover:text-brand-600 transition-colors">
                    {post.titulo}
                  </h2>
                  <p className="text-sm text-ink/60 leading-relaxed line-clamp-3">{post.extracto}</p>
                  <span className="inline-block mt-4 text-sm font-semibold text-brand-600">Leer más →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
