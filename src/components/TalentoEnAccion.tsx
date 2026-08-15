import Link from "next/link";
import { prisma } from "@/lib/db";
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
      ? { titulo: "Work that speaks for itself", verTodos: "See all projects" }
      : { titulo: "Trabajo que habla por ti", verTodos: "Ver todos los proyectos" };

  const [destacado, ...resto] = trabajos;

  function Tarjeta({ trabajo, i, alto }: { trabajo: (typeof trabajos)[number]; i: number; alto?: boolean }) {
    const acento = ACENTOS_PORTAFOLIO[i % ACENTOS_PORTAFOLIO.length];
    return (
      <Link
        href={`/profesionales/${trabajo.proveedorId}`}
        className={`group relative block rounded-xl overflow-hidden border border-border ${alto ? "aspect-[16/8]" : "aspect-[16/10]"}`}
      >
        <img
          src={trabajo.proyecto.imagenUrl}
          alt={trabajo.proyecto.titulo}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        {trabajo.categoria && (
          <span
            className={`absolute top-2.5 left-2.5 inline-flex items-center gap-1 text-[10px] font-semibold text-white bg-gradient-to-br ${acento.grad} px-2 py-0.5 rounded-full`}
          >
            <CategoryIcon slug={trabajo.categoria.slug} className="w-2.5 h-2.5" />
            {trabajo.categoria.nombre}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className={`font-semibold text-white leading-snug ${alto ? "text-sm" : "text-xs"}`}>
            {trabajo.proyecto.titulo}
          </h3>
          <span className="text-[11px] font-medium text-white/75">por {trabajo.proveedorNombre}</span>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white border border-border rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-ink">{t.titulo}</h2>
        <Link href="/profesionales" className="text-xs font-semibold text-brand-600 hover:text-brand-700 shrink-0">
          {t.verTodos}
        </Link>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <Tarjeta trabajo={destacado} i={0} alto />
        {resto.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {resto.map((trabajo, i) => (
              <Tarjeta key={`${trabajo.proveedorId}-${i}`} trabajo={trabajo} i={i + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
