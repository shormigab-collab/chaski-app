import Link from "next/link";
import { prisma } from "@/lib/db";
import ProfesionalCard from "@/components/ProfesionalCard";
import { slugificarCiudad } from "@/lib/ciudad";

export const metadata = {
  title: "Profesionales | chaski",
  description: "Explora perfiles reales de profesionales independientes en chaski, listos para ayudarte con tu proyecto.",
};

export default async function ProfesionalesPage() {
  const proveedores = await prisma.proveedor.findMany({
    include: { user: true, categorias: true },
    orderBy: { createdAt: "desc" },
  });

  const items = proveedores.map((p) => ({
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

  // Combinaciones reales de categoria+ciudad (derivadas de los
  // proveedores que ya se cargaron arriba, sin otra consulta a la BD).
  // Sirven de enlaces internos hacia /profesionales/[categoria]/[ciudad]
  // para que Google las descubra al rastrear el sitio, no solo via
  // sitemap. Solo aparecen combinaciones con profesionales reales.
  const comboVistos = new Set<string>();
  const combos: { categoriaSlug: string; categoriaNombre: string; ciudadSlug: string; ciudadDisplay: string }[] = [];
  for (const p of items) {
    if (!p.ciudad) continue;
    const ciudadSlug = slugificarCiudad(p.ciudad);
    if (!ciudadSlug) continue;
    for (const c of p.categorias) {
      const clave = `${c.slug}__${ciudadSlug}`;
      if (comboVistos.has(clave)) continue;
      comboVistos.add(clave);
      combos.push({ categoriaSlug: c.slug, categoriaNombre: c.nombre, ciudadSlug, ciudadDisplay: p.ciudad });
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-2">Profesionales en chaski</h1>
      <p className="text-ink/55 mb-10 max-w-lg">
        Explora perfiles reales antes de publicar tu proyecto. Para hablar directamente con uno de ellos, publica tu
        solicitud y los que estén interesados te contactarán.
      </p>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((p) => (
            <ProfesionalCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <div className="text-center border border-black/5 rounded-2xl py-16 px-6 max-w-md mx-auto">
          <p className="text-ink/60 font-medium mb-4">
            La comunidad de profesionales está creciendo — sé de los primeros en crear tu perfil.
          </p>
          <Link
            href="/registro/proveedor"
            className="inline-block bg-brand-500 text-cream px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors min-h-[44px]"
          >
            Crear mi perfil profesional
          </Link>
        </div>
      )}

      {combos.length > 0 && (
        <div className="mt-16 pt-8 border-t border-black/5">
          <h2 className="text-sm font-semibold text-ink/60 mb-3">Explora por especialidad y ciudad</h2>
          <div className="flex flex-wrap gap-2">
            {combos.map((c) => (
              <Link
                key={`${c.categoriaSlug}__${c.ciudadSlug}`}
                href={`/profesionales/categoria/${c.categoriaSlug}/${c.ciudadSlug}`}
                className="text-xs font-medium text-ink/55 bg-black/[0.03] hover:bg-brand-50 hover:text-brand-600 px-3 py-1.5 rounded-full transition-colors"
              >
                {c.categoriaNombre} en {c.ciudadDisplay}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
