import Link from "next/link";
import { Coffee, Smartphone, Globe } from "lucide-react";
import { prisma } from "@/lib/db";
import CategoryIcon from "@/components/CategoryIcon";
import { parsePortafolio, ACENTOS_PORTAFOLIO } from "@/lib/portafolio";

// "Talento en accion": muestra proyectos REALES del portafolio de
// proveedores registrados (ver lib/portafolio.ts). Si todavia no hay
// ninguno (caso actual: 0 proveedores con portafolio cargado), se
// muestran 3 ejemplos ilustrativos en su lugar — marcados con la
// etiqueta "Ejemplo" y sin link a un perfil real — para que la seccion
// no se vea vacia mientras la comunidad real crece. En cuanto haya
// proyectos reales, estos ejemplos dejan de mostrarse automaticamente.
const EJEMPLOS = [
  {
    titulo: "Identidad de marca HolaCoffee",
    autor: "Andrés M.",
    categoriaLabel: "Diseño de marca",
    Icono: Coffee,
    grad: "from-brand-500 to-brand-700",
  },
  {
    titulo: "App móvil de finanzas personales",
    autor: "Camila R.",
    categoriaLabel: "Desarrollo",
    Icono: Smartphone,
    grad: "from-coral-500 to-coral-700",
  },
  {
    titulo: "Sitio web para SaaS educativo",
    autor: "Valeria S.",
    categoriaLabel: "Desarrollo web",
    Icono: Globe,
    grad: "from-gold-500 to-gold-600",
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
      ? { titulo: "Work that speaks for itself", verTodos: "See all projects" }
      : { titulo: "Trabajo que habla por ti", verTodos: "Ver todos los proyectos" };

  const [destacado, ...resto] = trabajos;

  function Tarjeta({ trabajo, i, alto }: { trabajo: TrabajoReal | TrabajoEjemplo; i: number; alto?: boolean }) {
    const acento = ACENTOS_PORTAFOLIO[i % ACENTOS_PORTAFOLIO.length];
    const contenido =
      trabajo.tipo === "real" ? (
        <img
          src={trabajo.imagenUrl}
          alt={trabajo.titulo}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${trabajo.grad} flex items-center justify-center`}>
          <trabajo.Icono className="w-8 h-8 text-white/40" strokeWidth={1.5} />
        </div>
      );

    const cuerpo = (
      <>
        {contenido}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
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
          <h3 className={`font-semibold text-white leading-snug ${alto ? "text-sm" : "text-xs"}`}>
            {trabajo.titulo}
          </h3>
          <span className="text-[11px] font-medium text-white/75">por {trabajo.autor}</span>
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
      </div>
    </div>
  );
}
