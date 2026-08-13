import { redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import SolicitudCard from "./SolicitudCard";

export default async function ExplorarSolicitudes() {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) redirect("/login");

  const proveedor = await prisma.proveedor.findUnique({
    where: { id: usuario.proveedor.id },
    include: { categorias: true },
  });
  const categoriaIds = proveedor?.categorias.map((c) => c.id) ?? [];

  const [solicitudes, desbloqueos] = await Promise.all([
    prisma.solicitud.findMany({
      where: { categoriaId: { in: categoriaIds }, estado: "ABIERTA" },
      include: { categoria: true, cliente: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.desbloqueo.findMany({ where: { proveedorId: usuario.proveedor.id } }),
  ]);

  const idsDesbloqueados = new Set(desbloqueos.map((d) => d.solicitudId));

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Solicitudes para ti</h1>
        <span className="text-sm bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full font-medium">
          {usuario.proveedor.creditos} créditos disponibles
        </span>
      </div>

      {solicitudes.length === 0 && (
        <p className="text-gray-500">
          Todavía no hay solicitudes abiertas en tus categorías. Vuelve pronto.
        </p>
      )}

      <div className="space-y-4">
        {solicitudes.map((s) => (
          <SolicitudCard
            key={s.id}
            solicitud={{
              id: s.id,
              titulo: s.titulo,
              descripcion: s.descripcion,
              ciudad: s.ciudad,
              presupuesto: s.presupuesto,
              categoriaNombre: s.categoria.nombre,
              categoriaSlug: s.categoria.slug,
              nombreCliente: s.cliente.nombre,
              telefonoContacto: s.telefonoContacto,
              createdAt: s.createdAt.toISOString(),
            }}
            desbloqueada={idsDesbloqueados.has(s.id)}
          />
        ))}
      </div>
    </div>
  );
}
