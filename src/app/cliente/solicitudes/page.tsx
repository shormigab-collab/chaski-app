import { redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import NuevaSolicitudForm from "./NuevaSolicitudForm";
import CategoryIcon from "@/components/CategoryIcon";
import CalificarProveedor from "./CalificarProveedor";
import { nombreCategoria } from "@/lib/categoriasEn";

export default async function MisSolicitudes({
  searchParams,
}: {
  searchParams: { categoria?: string; lang?: string };
}) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "CLIENTE") redirect("/login");
  const lang = searchParams.lang === "en" ? "en" : "es";

  const [categorias, solicitudes, resenas] = await Promise.all([
    prisma.categoria.findMany({ orderBy: { nombre: "asc" } }),
    prisma.solicitud.findMany({
      where: { clienteId: usuario.id },
      include: {
        categoria: true,
        desbloqueos: { include: { proveedor: { include: { user: true } } } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.resena.findMany({ where: { autorId: usuario.id } }),
  ]);

  const resenasPorProveedor = new Map(
    resenas.map((r) => [r.proveedorId, { puntuacion: r.puntuacion, comentario: r.comentario }])
  );

  const t =
    lang === "en"
      ? {
          nuevaTitulo: "Post a new request",
          nuevaSub: "Three quick steps, always free.",
          misTitulo: "My requests",
          vacio: "You haven't posted any requests yet.",
          abierta: "Open",
          cerrada: "Closed",
        }
      : {
          nuevaTitulo: "Publica una nueva solicitud",
          nuevaSub: "Tres pasos rápidos, gratis siempre.",
          misTitulo: "Mis solicitudes",
          vacio: "Aún no has publicado ninguna solicitud.",
          abierta: "Abierta",
          cerrada: "Cerrada",
        };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-ink mb-1">{t.nuevaTitulo}</h1>
      <p className="text-ink/50 mb-6">{t.nuevaSub}</p>
      <NuevaSolicitudForm
        categorias={categorias}
        usuario={{ telefono: usuario.telefono, ciudad: usuario.ciudad }}
        categoriaInicial={searchParams.categoria}
        lang={lang}
      />

      <h2 className="text-xl font-bold text-ink mt-14 mb-4">{t.misTitulo}</h2>
      {solicitudes.length === 0 && <p className="text-ink/50">{t.vacio}</p>}
      <div className="space-y-4">
        {solicitudes.map((s) => (
          <div key={s.id} className="border border-black/5 bg-white rounded-2xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-wide text-brand-500 font-semibold inline-flex items-center gap-1.5">
                  <CategoryIcon slug={s.categoria.slug} className="w-3.5 h-3.5" />
                  {nombreCategoria(s.categoria, lang)}
                </span>
                <h3 className="font-semibold text-lg text-ink">{s.titulo}</h3>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.estado === "ABIERTA" ? "bg-brand-50 text-brand-600" : "bg-black/5 text-ink/50"}`}>
                {s.estado === "ABIERTA" ? t.abierta : t.cerrada}
              </span>
            </div>
            <p className="text-ink/60 text-sm mt-2">{s.descripcion}</p>
            <p className="text-sm text-ink/40 mt-3">
              {lang === "en"
                ? `${s.desbloqueos.length} professional${s.desbloqueos.length === 1 ? "" : "s"} contacted you`
                : `${s.desbloqueos.length} profesional${s.desbloqueos.length === 1 ? "" : "es"} te ha${
                    s.desbloqueos.length === 1 ? "" : "n"
                  } contactado`}
            </p>
            {s.desbloqueos.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 items-start">
                {s.desbloqueos.map((d) => (
                  <div key={d.id} className="flex flex-col items-start">
                    <span className="flex items-center gap-1.5 text-xs bg-coral-50 text-coral-600 pl-1 pr-2.5 py-1 rounded-full font-medium">
                      {d.proveedor.fotoUrl ? (
                        <img src={d.proveedor.fotoUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-coral-100 flex items-center justify-center text-[10px]">
                          {d.proveedor.user.nombre.charAt(0).toUpperCase()}
                        </span>
                      )}
                      {d.proveedor.user.nombre}
                    </span>
                    <div className="mt-1 pl-1">
                      <CalificarProveedor
                        proveedorId={d.proveedorId}
                        proveedorNombre={d.proveedor.user.nombre}
                        resenaInicial={resenasPorProveedor.get(d.proveedorId) ?? null}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
