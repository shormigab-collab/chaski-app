import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProfesionalCard from "@/components/ProfesionalCard";
import { slugificarCiudad } from "@/lib/ciudad";

// Pagina programatica de SEO: "Contratar {categoria} freelance en
// {ciudad}". A proposito NO se generan estas paginas para cualquier
// combinacion inventada de ciudad+categoria — solo existen (y solo se
// puede llegar a ellas) cuando hay al menos un profesional real que
// coincide. Si no hay resultados, se devuelve 404 en vez de mostrar una
// pagina vacia: Google penaliza sitios con muchas paginas "delgadas"
// (thin content / doorway pages), asi que es mejor no tener la pagina a
// tener una vacia. A medida que se sumen mas profesionales, mas de
// estas combinaciones se activan solas, sin tocar codigo.
const BASE_URL = "https://www.usechaski.com";

async function buscarDatos(categoriaSlug: string, ciudadSlug: string) {
  const categoria = await prisma.categoria.findUnique({ where: { slug: categoriaSlug } });
  if (!categoria) return null;

  const candidatos = await prisma.proveedor.findMany({
    where: { categorias: { some: { slug: categoriaSlug } } },
    include: { user: true, categorias: true },
    orderBy: { createdAt: "desc" },
  });

  const coincidencias = candidatos.filter(
    (p) => p.user.ciudad && slugificarCiudad(p.user.ciudad) === ciudadSlug
  );

  if (coincidencias.length === 0) return null;

  const ciudadDisplay = coincidencias[0].user.ciudad as string;
  const pais = coincidencias[0].user.pais;

  return { categoria, coincidencias, ciudadDisplay, pais };
}

export async function generateMetadata({
  params,
}: {
  params: { categoria: string; ciudad: string };
}): Promise<Metadata> {
  const datos = await buscarDatos(params.categoria, params.ciudad);
  if (!datos) return {};

  const titulo = `Contratar ${datos.categoria.nombre.toLowerCase()} freelance en ${datos.ciudadDisplay} | chaski`;
  const descripcion = `Encuentra profesionales independientes de ${datos.categoria.nombre.toLowerCase()} en ${datos.ciudadDisplay}. Publica tu proyecto gratis en chaski y recibe propuestas directas, sin comisiones.`;

  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: `/profesionales/${params.categoria}/${params.ciudad}` },
    openGraph: { title: titulo, description: descripcion },
  };
}

export default async function CategoriaCiudadPage({
  params,
}: {
  params: { categoria: string; ciudad: string };
}) {
  const datos = await buscarDatos(params.categoria, params.ciudad);
  if (!datos) notFound();

  const { categoria, coincidencias, ciudadDisplay, pais } = datos;
  const nombreCategoriaMin = categoria.nombre.toLowerCase();

  const items = coincidencias.map((p) => ({
    id: p.id,
    nombre: p.user.nombre,
    fotoUrl: p.fotoUrl,
    ciudad: p.user.ciudad,
    pais: p.user.pais,
    aniosExperiencia: p.aniosExperiencia,
    tarifaAproximada: p.tarifaAproximada,
    tarifaTipo: p.tarifaTipo,
    categorias: p.categorias.map((c) => ({ id: c.id, nombre: c.nombre, slug: c.slug })),
    memberSince: p.createdAt,
    calificacionProm: p.calificacionProm,
    totalResenas: p.totalResenas,
    verificado: p.verificado,
  }));

  const paginaJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Contratar ${nombreCategoriaMin} freelance en ${ciudadDisplay}`,
    url: `${BASE_URL}/profesionales/${params.categoria}/${params.ciudad}`,
    isPartOf: { "@type": "WebSite", name: "chaski", url: BASE_URL },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(paginaJsonLd) }}
      />

      <Link href="/profesionales" className="text-sm text-ink/50 hover:text-ink transition-colors">
        ← Todos los profesionales
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-ink mt-4 mb-2">
        Contratar {nombreCategoriaMin} freelance en {ciudadDisplay}
      </h1>
      <p className="text-ink/55 mb-10 max-w-lg">
        {coincidencias.length === 1
          ? `${coincidencias[0].user.nombre} es profesional de ${nombreCategoriaMin} en ${ciudadDisplay}, ${pais}.`
          : `${coincidencias.length} profesionales de ${nombreCategoriaMin} en ${ciudadDisplay}, ${pais}.`}{" "}
        Publica tu proyecto gratis y quienes les interese te contactarán directamente — sin comisiones ni
        intermediarios.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {items.map((p) => (
          <ProfesionalCard key={p.id} p={p} />
        ))}
      </div>

      <div className="border border-black/5 bg-brand-50 rounded-2xl p-6 text-center max-w-md mx-auto">
        <p className="text-ink font-semibold mb-3">
          ¿Necesitas contratar {nombreCategoriaMin} en {ciudadDisplay}?
        </p>
        <Link
          href="/registro/cliente"
          className="inline-block bg-brand-500 text-cream px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors min-h-[44px]"
        >
          Publica tu proyecto gratis
        </Link>
      </div>
    </div>
  );
}
