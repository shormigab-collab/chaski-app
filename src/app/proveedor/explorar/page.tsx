import { redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { enmascararTelefono, enmascararCorreo } from "@/lib/contacto";
import { tiempoRelativo } from "@/lib/tiempoRelativo";
import SolicitudCard from "./SolicitudCard";

export default async function ExplorarSolicitudes() {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) redirect("/login");

  // Nota de producto: antes esto se filtraba solo a las categorias del
  // proveedor. Por decision explicita de Sebas se muestran TODAS las
  // solicitudes abiertas a todos los proveedores, sin filtrar por categoria.
  const [solicitudes, desbloqueos] = await Promise.all([
    prisma.solicitud.findMany({
      where: { estado: "ABIERTA" },
      include: {
        categoria: true,
        cliente: true,
        _count: { select: { desbloqueos: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.desbloqueo.findMany({ where: { proveedorId: usuario.proveedor.id } }),
  ]);

  const idsDesbloqueados = new Set(desbloqueos.map((d) => d.solicitudId));

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Solicitudes para ti</h1>
        <span className="text-sm bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full font-medium tabular-nums">
          {usuario.proveedor.creditos} créditos disponibles
        </span>
      </div>

      {solicitudes.length === 0 && (
        <p className="text-gray-500">
          Todavía no hay solicitudes abiertas. Vuelve pronto.
        </p>
      )}

      <div className="space-y-4">
        {solicitudes.map((s) => {
          const desbloqueada = idsDesbloqueados.has(s.id);
          return (
            <SolicitudCard
              key={s.id}
              solicitud={{
                id: s.id,
                titulo: s.titulo,
                descripcion: s.descripcion,
                ciudad: s.ciudad,
                presupuesto: s.presupuesto,
                presupuestoMoneda: s.presupuestoMoneda,
                categoriaNombre: s.categoria.nombre,
                categoriaSlug: s.categoria.slug,
                nombreCliente: s.cliente.nombre,
                telefonoMostrar: desbloqueada ? s.telefonoContacto : enmascararTelefono(s.telefonoContacto),
                correoMostrar: desbloqueada ? s.cliente.email : enmascararCorreo(s.cliente.email),
                preferenciaContacto: s.preferenciaContacto,
                totalDesbloqueos: s._count.desbloqueos,
                tiempoTexto: tiempoRelativo(s.createdAt),
              }}
              desbloqueada={desbloqueada}
            />
          );
        })}
      </div>
    </div>
  );
}
