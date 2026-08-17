import Link from "next/link";
import { ImagePlus } from "lucide-react";
import { prisma } from "@/lib/db";
import CategoryIcon from "@/components/CategoryIcon";
import { parsePortafolio, ACENTOS_PORTAFOLIO } from "@/lib/portafolio";

// "Talento en accion": muestra proyectos REALES del portafolio de
// proveedores registrados (ver lib/portafolio.ts). Si todavia no hay
// ninguno (caso actual: 0 proveedores con portafolio cargado), se
// muestran 3 ejemplos ilustrativos en su lugar — con foto elegida a
// mano para que coincida con lo que describe cada titulo, marcados con
// la etiqueta "Ejemplo" y sin link a un perfil real. En cuanto haya
// proyectos reales, estos ejemplos dejan de mostrarse automaticamente.
const EJEMPLOS = [
  {
    titulo: "Identidad de marca HolaCoffee",
    autor: "Andrés M.",
    categoriaLabel: "Diseño de marca",
    imagenUrl: "/images/ejemplos/holacoffee.webp",
  },
  {
    titulo: "App móvil de finanzas personales",
    autor: "Camila R.",
    categoriaLabel: "Desarrollo",
    imagenUrl: "/images/ejemplos/fintech-app.webp",
  },
  {
    titulo: "Sitio web para SaaS educativo",
    autor: "Valeria S.",
    categoriaLabel: "Desarrollo web",
    imagenUrl: "/images/ejemplos/saas-web.webp",
  },
];

type TrabajoReal = {
  tipo: "real";
  titulo: string;
  descripcion?: string;
  autor: string;
  imagenUrl: string;
  proveedorId: string;
  categoriaSlug: string | null;
  categoriaNombre: string | null;
};
type TrabajoEjemplo = (typeof EJEMPLOS)[number] & { tipo: "ejemplo" };

export default async function TalentoEnAccion({ lang = "es" }: { lang?: "es" | "en" }) {
  const proveedores = await prisma.proveedor.findMany({
    where: { portafolio: { not: null } },
    include: { user: true, categorias: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const reales: TrabajoReal[] = proveedores
    .flatMap((p) =>
      parsePortafolio(p.portafolio).map((proyecto) => ({
        tipo: "real" as const,
        titulo: proyecto.titulo,
        descripcion: proyecto.descripcion,
        autor: p.user.nombre,
        imagenUrl: proyecto.imagenUrl,
        proveedorId: p.id,
        categoriaSlug: p.categorias[0]?.slug ?? null,
        categoriaNombre: p.categorias[0]?.nombre ?? null,
      }))
    )
    .slice(0, 3);

  const usaEjemplos = reales.length === 0;
  const trabajos: (TrabajoReal | TrabajoEjemplo)[] = usaEjemplos
    ? EJEMPLOS.map((e) => ({ ...e, tipo: "ejemplo" as const }))
    : reales;

  const t =
    lang === "en"
      ? {
          titulo: "Portfolios",
          verTodos: "See all projects",
          ctaTitulo: "Have projects to show?",
          ctaTexto: "Create your profile and add your portfolio for free",
          ctaLink: "Create my profile",
        }
      : {
          titulo: "Portafolios",
          verTodos: "Ver todos los proyectos",
          ctaTitulo: "¿Tienes proyectos para mostrar?",
          ctaTexto: "Crea tu perfil y agrega tu portafolio gratis",
          ctaLink: "Crear mi perfil",
        };

  const [destacado, ...resto] = trabajos;

  function Tarjeta({ trabajo, i, alto }: { trabajo: TrabajoReal | TrabajoEjemplo; i: number; alto?: boolean }) {
    const acento = ACENTOS_PORTAFOLIO[i % ACENTOS_PORTAFOLIO.length];
    const contenido = (
      <img
        src={trabajo.imagenUrl}
        alt={trabajo.titulo}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    );

    const cuerpo = (
      <>
        {contenido}
        {/* degradado mas fuerte y mas alto que antes: con titulos de 2
            lineas, la version anterior se aclaraba justo donde caia el
            texto y se perdia contra fotos claras (cielo, ventanas). */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/0" />
        <span
          className={`absolute top-2.5 left-2.5 inline-flex items-center gap-1 text-[10px] font-semibold text-white bg-gradient-to-br ${acento.grad} px-2 py-0.5 rounded-full`}
        >
          {trabajo.tipo === "real" && trabajo.categoriaSlug ? (
            <CategoryIcon slug={trabajo.categoriaSlug} className="w-2.5 h-2.5" />
          ) : null}
          {trabajo.tipo === "real" ? trabajo.categoriaNombre : trabajo.categoriaLabel}
        </span>
        {trabajo.tipo === "ejemplo" && (
          <span className="absolute top-2.5 right-2.5 text-[9px] font-semibold text-white/80 bg-black/25 px-1.5 py-0.5 rounded-full">
            Ejemplo
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3
            className={`font-semibold text-white leading-snug ${alto ? "text-sm" : "text-xs"}`}
            style={{ textShadow: "0 1px 4px rgba(0,0,0,0.85)" }}
          >
            {trabajo.titulo}
          </h3>
          <span className="text-[11px] font-medium text-white/85" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.85)" }}>
            por {trabajo.autor}
          </span>
        </div>
      </>
    );

    const clase = `group relative block rounded-xl overflow-hidden border border-border ${
      alto ? "aspect-[16/8]" : "aspect-[16/10]"
    }`;

    return trabajo.tipo === "real" ? (
      <Link href={`/profesionales/${trabajo.proveedorId}`} className={clase}>
        {cuerpo}
      </Link>
    ) : (
      <div className={clase}>{cuerpo}</div>
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
              <Tarjeta key={i} trabajo={trabajo} i={i + 1} />
            ))}
          </div>
        )}

        {/* relleno para que el panel no se vea vacio cuando hay menos
            proyectos que espacio disponible — invita a proveedores a
            sumar su portafolio, en vez de dejar un hueco en blanco */}
        {usaEjemplos && (
          <Link
            href="/registro/proveedor"
            className="flex-1 min-h-[100px] flex flex-col items-center justify-center gap-1.5 text-center rounded-xl border-2 border-dashed border-border hover:border-brand-300 hover:bg-brand-50/30 transition-colors p-4"
          >
            <ImagePlus className="w-5 h-5 text-brand-400" strokeWidth={1.75} />
            <span className="text-sm font-semibold text-ink/70">{t.ctaTitulo}</span>
            <span className="text-xs text-ink/45">{t.ctaTexto}</span>
            <span className="text-xs text-brand-600 font-medium mt-0.5">{t.ctaLink} →</span>
          </Link>
        )}
      </div>

      {usaEjemplos && (
        <p className="mt-3 text-[11px] text-ink/40 italic">
          {lang === "en"
            ? "Illustrative examples, not real people or projects yet."
            : "Ejemplos ilustrativos, aún no son personas ni proyectos reales."}
        </p>
      )}
    </div>
  );
}
