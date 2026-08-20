import { notFound } from "next/navigation";
import Link from "next/link";
import { POSTS_EN, obtenerPostEn } from "@/lib/blogEn";

export function generateStaticParams() {
  return POSTS_EN.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = obtenerPostEn(params.slug);
  if (!post) return {};
  return {
    title: `${post.titulo} | chaski`,
    description: post.descripcionMeta,
    openGraph: {
      title: post.titulo,
      description: post.descripcionMeta,
      type: "article",
    },
  };
}

function formatearFecha(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PostBlogEnPage({ params }: { params: { slug: string } }) {
  const post = obtenerPostEn(params.slug);
  if (!post) notFound();

  return (
    <article>
      <div className="relative h-56 sm:h-80 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.imagen} alt={post.imagenAlt} className="w-full h-full object-cover" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <Link href="/en/blog" className="text-sm text-brand-600 font-medium hover:text-brand-700">
          ← Blog
        </Link>

        <div className="flex items-center gap-2 mt-6 mb-2">
          <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
            {post.categoria}
          </span>
          <span className="text-xs text-ink/40">{formatearFecha(post.fecha)}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-8">{post.titulo}</h1>

        <div className="space-y-5 text-ink/70 leading-relaxed">
        {post.contenido.map((bloque, i) => {
          if (bloque.tipo === "titulo") {
            return (
              <h2 key={i} className="text-xl font-bold text-ink pt-3">
                {bloque.texto}
              </h2>
            );
          }
          if (bloque.tipo === "lista") {
            return (
              <ul key={i} className="list-disc pl-5 space-y-2">
                {bloque.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          }
          return <p key={i}>{bloque.texto}</p>;
        })}
        </div>

        <div className="mt-12 border border-black/5 bg-brand-50 rounded-2xl p-6 text-center">
          <p className="text-ink font-semibold mb-3">Need to hire a professional for your project?</p>
          <Link
            href="/registro/cliente?lang=en"
            className="inline-block bg-brand-500 text-cream px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors"
          >
            Post your project free on chaski
          </Link>
        </div>
      </div>
    </article>
  );
}
