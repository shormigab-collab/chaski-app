import Link from "next/link";
import { prisma } from "@/lib/db";
import Reveal from "@/components/Reveal";
import CategoryIcon from "@/components/CategoryIcon";
import { parsePortafolio, ACENTOS_PORTAFOLIO } from "@/lib/portafolio";

// "Talento en accion": muestra proyectos REALES del portafolio de
// proveedores registrados (ver lib/portafolio.ts). No hay datos de
// ejemplo ni proyectos inventados — si todavia no hay ningun proveedor
// con portafolio cargado, la seccion completa no se renderiza (mejor
// omitirla que mostrar contenido falso).
export default async function TalentoEnAccion({ lang = "es" }: { lang?: "es" | "en" }) {
  const proveedores = await prisma.proveedor.findMany({
    where: { portafolio: { not: null } },
    include: { user: true, categorias: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const trabajos = proveedores
    .flatMap((p) =>
      parsePortafolio(p.portafolio).map((proyecto) => ({
        proyecto,
        proveedorId: p.id,
        proveedorNombre: p.user.nombre,
        categoria: p.categorias[0] ?? null,
      }))
    )
    .slice(0, 6);

  if (trabajos.length === 0) return null;

  const t =
    lang === "en"
      ? { badge: "Talent in action", titulo: "Real work from real people", cta: "View profile" }
      : { badge: "Talento en acción", titulo: "Trabajo real de personas reales", cta: "Ver perfil" };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
      <Reveal>
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4">
            {t.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink">{t.titulo}</h2>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trabajos.map((trabajo, i) => {
          const acento = ACENTOS_PORTAFOLIO[i % ACENTOS_PORTAFOLIO.length];
          return (
            <Reveal key={`${trabajo.proveedorId}-${i}`} delay={i * 80}>
              <Link
                href={`/profesionales/${trabajo.proveedorId}`}
                className="group block rounded-2xl overflow-hidden border border-border bg-white hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={trabajo.proyecto.imagenUrl}
                    alt={trabajo.proyecto.titulo}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {trabajo.categoria && (
                    <span
                      className={`absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-gradient-to-br ${acento.grad} px-2.5 py-1 rounded-full shadow-sm`}
                    >
                      <CategoryIcon slug={trabajo.categoria.slug} className="w-3 h-3" />
                      {trabajo.categoria.nombre}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-ink text-sm mb-1 leading-snug">{trabajo.proyecto.titulo}</h3>
                  {trabajo.proyecto.descripcion && (
                    <p className="text-xs text-ink/55 leading-relaxed mb-2 line-clamp-2">
                      {trabajo.proyecto.descripcion}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-xs font-medium text-ink/60">{trabajo.proveedorNombre}</span>
                    <span className="text-xs font-semibold text-brand-600 group-hover:text-brand-700">{t.cta} →</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
