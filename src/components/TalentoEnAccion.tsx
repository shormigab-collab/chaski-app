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
    .slice(0, 3);

  if (trabajos.length === 0) return null;

  const t =
    lang === "en"
      ? { badge: "Talent in action", titulo: "Work that speaks for itself", cta: "View profile" }
      : { badge: "Talento en acción", titulo: "Trabajo que habla por ti", cta: "Ver perfil" };

  const [destacado, ...resto] = trabajos;

  function Tarjeta({
    trabajo,
    i,
    alto,
  }: {
    trabajo: (typeof trabajos)[number];
    i: number;
    alto?: boolean;
  }) {
    const acento = ACENTOS_PORTAFOLIO[i % ACENTOS_PORTAFOLIO.length];
    return (
      <Link
        href={`/profesionales/${trabajo.proveedorId}`}
        className={`group relative block rounded-2xl overflow-hidden border border-border bg-white hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all ${
          alto ? "h-full" : ""
        }`}
      >
        <div className={`relative overflow-hidden ${alto ? "aspect-[4/5] sm:h-full" : "aspect-[16/9]"}`}>
          <img
            src={trabajo.proyecto.imagenUrl}
            alt={trabajo.proyecto.titulo}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          {trabajo.categoria && (
            <span
              className={`absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-gradient-to-br ${acento.grad} px-2.5 py-1 rounded-full shadow-sm`}
            >
              <CategoryIcon slug={trabajo.categoria.slug} className="w-3 h-3" />
              {trabajo.categoria.nombre}
            </span>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-semibold text-white text-sm sm:text-base mb-1 leading-snug">
              {trabajo.proyecto.titulo}
            </h3>
            <span className="text-xs font-medium text-white/75">{trabajo.proveedorNombre}</span>
          </div>
        </div>
      </Link>
    );
  }

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

      {resto.length === 0 ? (
        <div className="max-w-xl mx-auto">
          <Reveal>
            <Tarjeta trabajo={destacado} i={0} alto />
          </Reveal>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5 sm:h-[440px]">
          <Reveal>
            <Tarjeta trabajo={destacado} i={0} alto />
          </Reveal>
          <div className={`grid gap-5 h-full ${resto.length > 1 ? "grid-rows-2" : "grid-rows-1"}`}>
            {resto.map((trabajo, i) => (
              <Reveal key={`${trabajo.proveedorId}-${i}`} delay={(i + 1) * 80}>
                <Tarjeta trabajo={trabajo} i={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
