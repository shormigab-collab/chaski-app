import { redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import NuevaSolicitudForm from "./NuevaSolicitudForm";

export default async function MisSolicitudes({
  searchParams,
}: {
  searchParams: { categoria?: string };
}) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "CLIENTE") redirect("/login");

  const [categorias, solicitudes] = await Promise.all([
    prisma.categoria.findMany({ orderBy: { nombre: "asc" } }),
    prisma.solicitud.findMany({
      where: { clienteId: usuario.id },
      include: {
        categoria: true,
        desbloqueos: { include: { proveedor: { include: { user: true } } } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-ink mb-1">Publica una nueva solicitud</h1>
      <p className="text-ink/50 mb-6">Tres pasos rápidos, gratis siempre.</p>
      <NuevaSolicitudForm
        categorias={categorias}
        usuario={{ telefono: usuario.telefono, ciudad: usuario.ciudad }}
        categoriaInicial={searchParams.categoria}
      />

      <h2 className="text-xl font-bold text-ink mt-14 mb-4">Mis solicitudes</h2>
      {solicitudes.length === 0 && (
        <p className="text-ink/50">Aún no has publicado ninguna solicitud.</p>
      )}
      <div className="space-y-4">
        {solicitudes.map((s) => (
          <div key={s.id} className="border border-black/5 bg-white rounded-2xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs uppercase tracking-wide text-brand-500 font-semibold">
                  {s.categoria.icono} {s.categoria.nombre}
                </span>
                <h3 className="font-semibold text-lg text-ink">{s.titulo}</h3>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.estado === "ABIERTA" ? "bg-brand-50 text-brand-600" : "bg-black/5 text-ink/50"}`}>
                {s.estado === "ABIERTA" ? "Abierta" : "Cerrada"}
              </span>
            </div>
            <p className="text-ink/60 text-sm mt-2">{s.descripcion}</p>
            <p className="text-sm text-ink/40 mt-3">
              {s.desbloqueos.length} profesional{s.desbloqueos.length === 1 ? "" : "es"} te ha
              {s.desbloqueos.length === 1 ? "" : "n"} contactado
            </p>
            {s.desbloqueos.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {s.desbloqueos.map((d) => (
                  <span key={d.id} className="flex items-center gap-1.5 text-xs bg-coral-50 text-coral-600 pl-1 pr-2.5 py-1 rounded-full font-medium">
                    {d.proveedor.fotoUrl ? (
                      <img src={d.proveedor.fotoUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-coral-100 flex items-center justify-center text-[10px]">
                        {d.proveedor.user.nombre.charAt(0).toUpperCase()}
                      </span>
                    )}
                    {d.proveedor.user.nombre}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
