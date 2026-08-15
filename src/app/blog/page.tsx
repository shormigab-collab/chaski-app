import Link from "next/link";
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
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-2">Blog</h1>
      <p className="text-ink/55 mb-10">
        Guías prácticas para contratar profesionales freelance en Latinoamérica, y consejos para
        independientes que quieren conseguir más clientes.
      </p>

      <div className="space-y-6">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block border border-black/5 bg-white rounded-2xl p-6 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 transition-all"
          >
            <p className="text-xs text-ink/40 mb-2">{formatearFecha(post.fecha)}</p>
            <h2 className="text-lg font-bold text-ink mb-2">{post.titulo}</h2>
            <p className="text-sm text-ink/60 leading-relaxed">{post.extracto}</p>
            <span className="inline-block mt-3 text-sm font-semibold text-brand-600">Leer más →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
