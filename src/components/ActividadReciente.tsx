import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";
import Reveal from "@/components/Reveal";
import { tiempoRelativo } from "@/lib/tiempoRelativo";

type Item = {
  id: string;
  titulo: string;
  ciudad: string;
  categoriaSlug: string;
  categoriaNombre: string;
  createdAt: Date;
};

// Muestra solicitudes reales publicadas por clientes (nunca datos de
// ejemplo/inventados) para transmitir que la plataforma tiene actividad
// real. Si todavía no hay suficientes solicitudes, muestra un estado
// vacío honesto en vez de rellenar con contenido falso.
export default function ActividadReciente({ items }: { items: Item[] }) {
  return (
    <section className="bg-ink">
      <div className="max-w-5xl mx-auto px-4 py-20">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-white/5 text-cream/70 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              En vivo
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-cream">
              Esto está pasando ahora en Chaski
            </h2>
            <p className="text-cream/50 mt-2 max-w-md mx-auto">
              Solicitudes reales publicadas por clientes que buscan un profesional, sin inventos.
            </p>
          </div>
        </Reveal>

        {items.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-3">
            {items.map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 hover:bg-white/[0.07] transition-colors">
                  <span className="w-9 h-9 rounded-xl bg-brand-300/20 text-brand-300 flex items-center justify-center shrink-0">
                    <CategoryIcon slug={s.categoriaSlug} className="w-4 h-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-cream/90 font-medium truncate">{s.titulo}</p>
                    <p className="text-xs text-cream/40 truncate">
                      {s.categoriaNombre} · {s.ciudad}
                    </p>
                  </div>
                  <span className="text-xs text-cream/30 shrink-0 whitespace-nowrap">
                    {tiempoRelativo(s.createdAt)}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="text-center border border-white/10 rounded-2xl py-14 px-6 max-w-md mx-auto">
              <p className="text-cream/70 font-medium mb-4">
                Todavía no hay solicitudes publicadas — sé la primera persona en abrir un proyecto.
              </p>
              <Link
                href="/registro/cliente"
                className="inline-block bg-brand-500 text-cream px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors"
              >
                Publicar la primera solicitud
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
