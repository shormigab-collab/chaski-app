import Link from "next/link";
import { Heart, MessageCircle, Sparkles, UserPlus } from "lucide-react";
import { prisma } from "@/lib/db";
import { tiempoRelativo } from "@/lib/tiempoRelativo";

// NOTA: este post es un ejemplo ilustrativo (nombre, texto, reacciones,
// foto de avatar y comentarios inventados) que replica el mockup de
// referencia — no existe todavia la funcion de comunidad real (fase 2,
// ver conversacion). El avatar y la miniatura del articulo son fotos de
// stock (pravatar.cc / Lorem Picsum, ambos bancos de fotos reales de
// uso libre), no de la persona mencionada. Se marca explicitamente como
// ejemplo en el pie de la tarjeta. Reemplazar por publicaciones reales
// en cuanto la fase 2 este lista.
// Muestra las publicaciones REALES mas recientes de profesionales. Si aun no
// hay ninguna (o la tabla todavia no existe), cae al ejemplo ilustrativo de
// abajo para que la seccion nunca se vea rota.
export default async function ComunidadPreview({ lang = "es" }: { lang?: "es" | "en" }) {
  let reales: Awaited<ReturnType<typeof cargarPublicaciones>> = [];
  try {
    reales = await cargarPublicaciones();
  } catch {
    reales = [];
  }
  if (reales.length === 0) return <EjemploIlustrativo lang={lang} />;

  const en = lang === "en";
  return (
    <div className="bg-white border border-border rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-ink">{en ? "Community" : "Comunidad"}</h2>
      </div>

      <div className="space-y-3">
        {reales.map((p) => (
          <div key={p.id} className="rounded-xl border border-border overflow-hidden flex flex-col">
            <div className="flex items-center gap-2.5 p-3">
              {p.fotoUrl ? (
                <img src={p.fotoUrl} alt={p.nombre} loading="lazy" className="w-8 h-8 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0">
                  {p.nombre.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="leading-tight min-w-0">
                <div className="text-xs font-semibold text-ink/80 truncate">{p.nombre}</div>
                <div className="text-[11px] text-ink/40 truncate">
                  {[p.categoria, tiempoRelativo(p.createdAt)].filter(Boolean).join(" · ")}
                </div>
              </div>
            </div>
            <p className="px-3 pb-3 text-xs text-ink/65 leading-relaxed whitespace-pre-line line-clamp-5">{p.texto}</p>
            {p.enlaceUrl && (
              <a
                href={p.enlaceUrl}
                target="_blank"
                rel="noopener noreferrer nofollow ugc"
                className="mx-3 mb-3 rounded-lg border border-border px-2.5 py-2 text-[11px] font-semibold text-brand-600 truncate hover:bg-brand-50/40"
              >
                {p.enlaceTitulo || p.enlaceUrl}
              </a>
            )}
            <div className="flex justify-end p-3 pt-0">
              <Link
                href={`/profesionales/${p.proveedorId}`}
                className="text-[11px] font-semibold text-white bg-brand-500 px-2.5 py-1.5 rounded-lg hover:bg-brand-600"
              >
                {en ? "Request services" : "Solicitar sus servicios"}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/registro/proveedor"
        className="mt-3 text-center text-xs text-brand-600 font-semibold hover:text-brand-700"
      >
        {en ? "Create my profile and share your work" : "Crea tu perfil y comparte tu trabajo"} →
      </Link>
    </div>
  );
}

async function cargarPublicaciones() {
  const filas = await prisma.publicacion.findMany({
    orderBy: { createdAt: "desc" },
    take: 2,
    include: {
      proveedor: {
        include: { user: { select: { nombre: true } }, categorias: { select: { nombre: true }, take: 1 } },
      },
    },
  });
  return filas.map((f) => ({
    id: f.id,
    proveedorId: f.proveedorId,
    nombre: f.proveedor.user.nombre,
    fotoUrl: f.proveedor.fotoUrl,
    categoria: f.proveedor.categorias[0]?.nombre ?? "",
    texto: f.texto,
    enlaceUrl: f.enlaceUrl,
    enlaceTitulo: f.enlaceTitulo,
    createdAt: f.createdAt,
  }));
}

function EjemploIlustrativo({ lang = "es" }: { lang?: "es" | "en" }) {
  const t =
    lang === "en"
      ? {
          badge: "Coming soon",
          titulo: "Community",
          nombre: "María José G.",
          rol: "Estratega de Contenido",
          tiempo: "3 h",
          texto:
            "I just published an article about how to build a content strategy that really connects with your audience. Would love to hear your thoughts! 👋",
          articuloTitulo: "Content strategy that drives real impact",
          articuloTiempo: "8 min read",
          cta: "Request services",
          ctaRellenoTitulo: "Want to be one of the first here?",
          ctaRellenoTexto: "Create your professional profile for free",
          ctaRellenoLink: "Create my profile",
        }
      : {
          badge: "Próximamente",
          titulo: "Comunidad",
          nombre: "María José G.",
          rol: "Estratega de Contenido",
          tiempo: "3 h",
          texto:
            "Acabo de publicar un artículo sobre cómo crear una estrategia de contenido que conecte de verdad con tu audiencia. ¡Me encantaría saber qué opinan! 👋",
          articuloTitulo: "Estrategia de contenido que genera impacto",
          articuloTiempo: "8 min de lectura",
          cta: "Solicitar sus servicios",
          ctaRellenoTitulo: "¿Quieres ser de los primeros aquí?",
          ctaRellenoTexto: "Crea tu perfil profesional gratis",
          ctaRellenoLink: "Crear mi perfil",
        };

  return (
    <div className="bg-white border border-border rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-ink">{t.titulo}</h2>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-brand-600 bg-brand-50 px-2 py-1 rounded-full shrink-0">
          <Sparkles className="w-3 h-3" strokeWidth={1.75} />
          {t.badge}
        </span>
      </div>

      <div className="rounded-xl border border-border overflow-hidden flex flex-col">
        <div className="flex items-center gap-2.5 p-3">
          <img
            src="https://i.pravatar.cc/60?img=47"
            alt={t.nombre}
            loading="lazy"
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
          <div className="leading-tight min-w-0">
            <div className="text-xs font-semibold text-ink/80 truncate">{t.nombre}</div>
            <div className="text-[11px] text-ink/40 truncate">
              {t.rol} · {t.tiempo}
            </div>
          </div>
        </div>
        <p className="px-3 pb-3 text-xs text-ink/65 leading-relaxed">{t.texto}</p>
        <div className="mx-3 mb-3 rounded-lg border border-border overflow-hidden flex items-center gap-2.5">
          <img
            src="https://picsum.photos/seed/chaski-articulo-contenido/120/120"
            alt=""
            loading="lazy"
            className="w-9 h-9 object-cover shrink-0"
          />
          <div className="leading-tight min-w-0 py-2 pr-2">
            <div className="text-[11px] font-semibold text-ink/80 truncate">{t.articuloTitulo}</div>
            <div className="text-[10px] text-ink/40">{t.articuloTiempo}</div>
          </div>
        </div>
        <div className="flex items-center justify-between p-3 pt-0">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] font-medium text-ink/50">
              <Heart className="w-3.5 h-3.5 fill-coral-500 text-coral-500" strokeWidth={1.75} />
              24
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-ink/50">
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.75} />7
            </span>
          </div>
          <span className="text-[11px] font-semibold text-white bg-brand-500 px-2.5 py-1.5 rounded-lg">{t.cta}</span>
        </div>
        <p className="px-3 pb-2.5 text-[10px] text-ink/35 italic">
          {lang === "en"
            ? "Illustrative example, not a real person."
            : "Ejemplo ilustrativo, aún no es una persona real."}
        </p>
      </div>

      {/* relleno para que el panel no se vea vacio junto a sus vecinos —
          invita a crear un perfil profesional en vez de dejar un hueco */}
      <Link
        href="/registro/proveedor"
        className="flex-1 min-h-[90px] mt-3 flex flex-col items-center justify-center gap-1.5 text-center rounded-xl border-2 border-dashed border-border hover:border-brand-300 hover:bg-brand-50/30 transition-colors p-4"
      >
        <UserPlus className="w-5 h-5 text-brand-400" strokeWidth={1.75} />
        <span className="text-sm font-semibold text-ink/70">{t.ctaRellenoTitulo}</span>
        <span className="text-xs text-ink/45">{t.ctaRellenoTexto}</span>
        <span className="text-xs text-brand-600 font-medium mt-0.5">{t.ctaRellenoLink} →</span>
      </Link>
    </div>
  );
}
