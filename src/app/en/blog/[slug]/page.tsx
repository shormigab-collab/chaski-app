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
    title: post.tituloSeo ?? post.titulo,
    description: post.descripcionMeta,
    alternates: { canonical: `/en/blog/${post.slug}` },
    openGraph: {
      title: post.tituloSeo ?? post.titulo,
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

const BASE_URL = "https://www.usechaski.com";

// Articulos relacionados por tema, empezando por los que ya reciben
// impresiones en Google (costos, pagos, asistentes virtuales).
const RELACIONADOS: Record<string, string[]> = {
  "employee-vs-freelancer-real-cost": [
    "hire-latin-america-freelancers-cost-guide",
    "how-to-pay-latam-freelancers-guide",
    "nearshore-vs-offshore-latin-america-us-businesses",
  ],
  "how-to-pay-latam-freelancers-guide": [
    "hire-latin-america-freelancers-cost-guide",
    "employee-vs-freelancer-real-cost",
    "how-to-onboard-a-latam-freelancer",
  ],
  "hire-latin-america-freelancers-cost-guide": [
    "employee-vs-freelancer-real-cost",
    "hire-virtual-assistant-latin-america",
    "how-to-vet-a-latam-freelancer",
  ],
  "hire-virtual-assistant-latin-america": [
    "hire-latin-america-freelancers-cost-guide",
    "how-to-vet-a-latam-freelancer",
    "how-to-write-a-project-brief-for-a-freelancer",
  ],
};

export default function PostBlogEnPage({ params }: { params: { slug: string } }) {
  const post = obtenerPostEn(params.slug);
  if (!post) notFound();

  // Enlaces internos entre articulos del mismo tema (ayuda a Google a
  // entender la relacion y mantiene al lector en el sitio). Si un articulo
  // no tiene lista propia, se muestran los mas recientes.
  const idsRelacionados = RELACIONADOS[post.slug] ?? [];
  const relacionados = [
    ...idsRelacionados.map((s) => obtenerPostEn(s)),
    ...POSTS_EN.filter((p) => p.slug !== post.slug && !idsRelacionados.includes(p.slug)),
  ]
    .filter((p): p is NonNullable<typeof p> => !!p && p.slug !== post.slug)
    .slice(0, 3);

  const articuloJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.descripcionMeta,
    image: `${BASE_URL}${post.imagen}`,
    datePublished: post.fecha,
    dateModified: post.fecha,
    author: { "@type": "Organization", name: "chaski", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "chaski",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/icons/icon-512.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/en/blog/${post.slug}` },
  };

  return (
    <article>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articuloJsonLd) }}
      />
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
          <p className="text-sm text-ink/55 mt-4">
            Looking for admin or operations help?{" "}
            <Link href="/en/virtual-assistants" className="text-brand-600 font-semibold hover:text-brand-700">
              Hire a virtual assistant from Latin America
            </Link>
          </p>
        </div>

        {relacionados.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-ink mb-4">Keep reading</h2>
            <div className="space-y-3">
              {relacionados.map((r) => (
                <Link
                  key={r.slug}
                  href={`/en/blog/${r.slug}`}
                  className="block border border-black/5 bg-white rounded-xl p-4 hover:border-brand-300 transition-colors"
                >
                  <span className="text-sm font-semibold text-ink">{r.tituloSeo ?? r.titulo}</span>
                  <span className="block text-xs text-ink/45 mt-1">{r.minutosLectura} min read</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
