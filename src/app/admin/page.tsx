import { redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getSupabaseAdmin, BUCKET_VERIFICACIONES } from "@/lib/supabaseAdmin";
import CategoryIcon from "@/components/CategoryIcon";
import AdminBotonAccion from "./AdminBotonAccion";

// Ventanas de tiempo para el resumen "Esta semana": los ultimos 7 dias
// comparados contra los 7 dias anteriores a esos, para saber si el
// esfuerzo diario (buscar proveedores, ayudar a publicar solicitudes,
// etc.) esta dando resultado semana a semana.
function rangosSemana() {
  const ahora = new Date();
  const haceUnaSemana = new Date(ahora.getTime() - 7 * 24 * 60 * 60 * 1000);
  const haceDosSemanas = new Date(ahora.getTime() - 14 * 24 * 60 * 60 * 1000);
  return { haceUnaSemana, haceDosSemanas };
}

function tendencia(actual: number, anterior: number) {
  const diff = actual - anterior;
  if (diff > 0) return { texto: `+${diff} vs. semana pasada`, color: "text-emerald-600" };
  if (diff < 0) return { texto: `${diff} vs. semana pasada`, color: "text-coral-600" };
  return { texto: "igual que la semana pasada", color: "text-gray-400" };
}

export default async function AdminPage() {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "ADMIN") redirect("/login");

  const { haceUnaSemana, haceDosSemanas } = rangosSemana();

  const [
    totalClientes,
    totalProveedores,
    totalSolicitudes,
    totalDesbloqueos,
    totalLeadsUS,
    transacciones,
    categorias,
    leadsUS,
    clientesEstaSemana,
    clientesSemanaAnterior,
    proveedoresEstaSemana,
    proveedoresSemanaAnterior,
    solicitudesEstaSemana,
    solicitudesSemanaAnterior,
    desbloqueosEstaSemana,
    desbloqueosSemanaAnterior,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENTE" } }),
    prisma.user.count({ where: { role: "PROVEEDOR" } }),
    prisma.solicitud.count(),
    prisma.desbloqueo.count(),
    prisma.leadUS.count(),
    prisma.transaccion.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
    prisma.categoria.findMany({
      include: { _count: { select: { proveedores: true, solicitudes: true } } },
      orderBy: { nombre: "asc" },
    }),
    prisma.leadUS.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.user.count({ where: { role: "CLIENTE", createdAt: { gte: haceUnaSemana } } }),
    prisma.user.count({ where: { role: "CLIENTE", createdAt: { gte: haceDosSemanas, lt: haceUnaSemana } } }),
    prisma.user.count({ where: { role: "PROVEEDOR", createdAt: { gte: haceUnaSemana } } }),
    prisma.user.count({ where: { role: "PROVEEDOR", createdAt: { gte: haceDosSemanas, lt: haceUnaSemana } } }),
    prisma.solicitud.count({ where: { createdAt: { gte: haceUnaSemana } } }),
    prisma.solicitud.count({ where: { createdAt: { gte: haceDosSemanas, lt: haceUnaSemana } } }),
    prisma.desbloqueo.count({ where: { createdAt: { gte: haceUnaSemana } } }),
    prisma.desbloqueo.count({ where: { createdAt: { gte: haceDosSemanas, lt: haceUnaSemana } } }),
  ]);

  const ingresosCOP = transacciones
    .filter((t) => t.estado === "APROBADA")
    .reduce((acc, t) => acc + t.montoCOP, 0);

  // Verificaciones de identidad pendientes de revisión.
  const proveedoresPendientes = await prisma.proveedor.findMany({
    where: { estadoVerificacion: "PENDIENTE" } as any,
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });
  const supabaseAdmin = getSupabaseAdmin();
  const pendientesVerificacion = await Promise.all(
    proveedoresPendientes.map(async (p) => {
      let urlDocumento: string | null = null;
      if (p.documentoVerificacionPath) {
        const { data } = await supabaseAdmin.storage
          .from(BUCKET_VERIFICACIONES)
          .createSignedUrl(p.documentoVerificacionPath, 600);
        urlDocumento = data?.signedUrl ?? null;
      }
      return { id: p.id, nombre: p.user.nombre, email: p.user.email, urlDocumento };
    })
  );

  // Reportes de perfiles/solicitudes sospechosas, pendientes de revisión.
  const reportesPendientes = await prisma.reporte.findMany({
    where: { estado: "PENDIENTE" },
    include: { reporterUser: true },
    orderBy: { createdAt: "desc" },
  });
  const idsPerfilReportados = reportesPendientes.filter((r) => r.tipo === "PERFIL").map((r) => r.objetivoId);
  const idsSolicitudReportados = reportesPendientes.filter((r) => r.tipo === "SOLICITUD").map((r) => r.objetivoId);
  const [proveedoresReportados, solicitudesReportadas] = await Promise.all([
    idsPerfilReportados.length
      ? prisma.proveedor.findMany({ where: { id: { in: idsPerfilReportados } }, include: { user: true } })
      : Promise.resolve([]),
    idsSolicitudReportados.length
      ? prisma.solicitud.findMany({ where: { id: { in: idsSolicitudReportados } } })
      : Promise.resolve([]),
  ]);
  const mapaProveedoresReportados = new Map(proveedoresReportados.map((p) => [p.id, p.user.nombre]));
  const mapaSolicitudesReportadas = new Map(solicitudesReportadas.map((s) => [s.id, s.titulo]));

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Panel de administración</h1>

      <h2 className="text-xl font-bold mb-1">Esta semana (últimos 7 días)</h2>
      <p className="text-sm text-gray-500 mb-3">Para saber si buscar proveedores y ayudar a publicar solicitudes está dando resultado.</p>
      <div className="grid sm:grid-cols-4 gap-4 mb-10">
        <WeeklyMetricCard label="Nuevos clientes" value={clientesEstaSemana} anterior={clientesSemanaAnterior} />
        <WeeklyMetricCard label="Nuevos proveedores" value={proveedoresEstaSemana} anterior={proveedoresSemanaAnterior} />
        <WeeklyMetricCard label="Solicitudes publicadas" value={solicitudesEstaSemana} anterior={solicitudesSemanaAnterior} />
        <WeeklyMetricCard label="Desbloqueos (contactos)" value={desbloqueosEstaSemana} anterior={desbloqueosSemanaAnterior} />
      </div>

      {(pendientesVerificacion.length > 0 || reportesPendientes.length > 0) && (
        <div className="mb-10 grid sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">
              Verificaciones pendientes {pendientesVerificacion.length > 0 && `(${pendientesVerificacion.length})`}
            </h2>
            <p className="text-sm text-gray-500 mb-3">Revisa el documento y aprueba o rechaza la insignia.</p>
            {pendientesVerificacion.length === 0 ? (
              <p className="text-sm text-gray-400">No hay nada pendiente.</p>
            ) : (
              <div className="space-y-3">
                {pendientesVerificacion.map((p) => (
                  <div key={p.id} className="border rounded-xl p-4">
                    <p className="font-medium text-sm">{p.nombre}</p>
                    <p className="text-xs text-gray-500 mb-2">{p.email}</p>
                    {p.urlDocumento ? (
                      <a
                        href={p.urlDocumento}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-600 hover:underline"
                      >
                        Ver documento subido →
                      </a>
                    ) : (
                      <p className="text-xs text-gray-400">No se encontró el archivo.</p>
                    )}
                    <div className="flex gap-2 mt-3">
                      <AdminBotonAccion
                        url={`/api/admin/verificacion/${p.id}`}
                        body={{ accion: "APROBAR" }}
                        etiqueta="Aprobar"
                        variante="brand"
                      />
                      <AdminBotonAccion
                        url={`/api/admin/verificacion/${p.id}`}
                        body={{ accion: "RECHAZAR" }}
                        etiqueta="Rechazar"
                        variante="gray"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold mb-1">
              Reportes pendientes {reportesPendientes.length > 0 && `(${reportesPendientes.length})`}
            </h2>
            <p className="text-sm text-gray-500 mb-3">Perfiles o solicitudes marcadas como sospechosas.</p>
            {reportesPendientes.length === 0 ? (
              <p className="text-sm text-gray-400">No hay nada pendiente.</p>
            ) : (
              <div className="space-y-3">
                {reportesPendientes.map((r) => {
                  const objetivoNombre =
                    r.tipo === "PERFIL"
                      ? mapaProveedoresReportados.get(r.objetivoId) || "(perfil eliminado)"
                      : mapaSolicitudesReportadas.get(r.objetivoId) || "(solicitud eliminada)";
                  return (
                    <div key={r.id} className="border rounded-xl p-4">
                      <p className="text-xs font-semibold text-coral-600 uppercase tracking-wide">{r.tipo}</p>
                      <p className="font-medium text-sm">{objetivoNombre}</p>
                      <p className="text-sm text-gray-600 mt-1">{r.motivo}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Reportado por {r.reporterUser?.nombre} · {r.createdAt.toLocaleDateString("es-CO")}
                      </p>
                      <div className="mt-3">
                        <AdminBotonAccion
                          url={`/api/admin/reportes/${r.id}`}
                          body={{}}
                          etiqueta="Marcar revisado"
                          variante="gray"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-3">Totales</h2>
      <div className="grid sm:grid-cols-5 gap-4 mb-10">
        <MetricCard label="Clientes" value={totalClientes} />
        <MetricCard label="Proveedores" value={totalProveedores} />
        <MetricCard label="Solicitudes" value={totalSolicitudes} />
        <MetricCard label="Desbloqueos" value={totalDesbloqueos} />
        <MetricCard label="Interesados EE.UU." value={totalLeadsUS} />
      </div>

      <div className="mb-10 border rounded-xl p-5">
        <h2 className="font-semibold mb-1">Ingresos totales (pagos aprobados)</h2>
        <p className="text-3xl font-bold text-brand-600 tabular-nums">${ingresosCOP.toLocaleString("es-CO")} COP</p>
      </div>

      <h2 className="text-xl font-bold mb-3">Categorías</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Categoría</th>
              <th className="p-3">Proveedores</th>
              <th className="p-3">Solicitudes</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">
                  <span className="inline-flex items-center gap-2">
                    <CategoryIcon slug={c.slug} className="w-4 h-4 text-brand-500" />
                    {c.nombre}
                  </span>
                </td>
                <td className="p-3 tabular-nums">{c._count.proveedores}</td>
                <td className="p-3 tabular-nums">{c._count.solicitudes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold mb-3">Interesados de EE.UU. (landing /en)</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Correo</th>
              <th className="p-3">Empresa</th>
              <th className="p-3">Mensaje</th>
              <th className="p-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {leadsUS.map((l) => (
              <tr key={l.id} className="border-t align-top">
                <td className="p-3 whitespace-nowrap">{l.nombre}</td>
                <td className="p-3 whitespace-nowrap">
                  <a href={`mailto:${l.email}`} className="text-brand-600 hover:underline">
                    {l.email}
                  </a>
                </td>
                <td className="p-3 whitespace-nowrap">{l.empresa || "—"}</td>
                <td className="p-3 max-w-xs">{l.mensaje}</td>
                <td className="p-3 whitespace-nowrap">{l.createdAt.toLocaleDateString("es-CO")}</td>
              </tr>
            ))}
            {leadsUS.length === 0 && (
              <tr>
                <td className="p-3 text-gray-500" colSpan={5}>Aún no hay interesados registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold mb-3">Últimas transacciones</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Usuario</th>
              <th className="p-3">Créditos</th>
              <th className="p-3">Monto</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {transacciones.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-3">{t.user.nombre}</td>
                <td className="p-3 tabular-nums">{t.creditos}</td>
                <td className="p-3 tabular-nums">${t.montoCOP.toLocaleString("es-CO")}</td>
                <td className="p-3">{t.estado}</td>
                <td className="p-3">{t.createdAt.toLocaleDateString("es-CO")}</td>
              </tr>
            ))}
            {transacciones.length === 0 && (
              <tr>
                <td className="p-3 text-gray-500" colSpan={5}>Aún no hay transacciones.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border rounded-xl p-5 text-center">
      <div className="text-3xl font-bold text-brand-600 tabular-nums">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function WeeklyMetricCard({ label, value, anterior }: { label: string; value: number; anterior: number }) {
  const t = tendencia(value, anterior);
  return (
    <div className="border rounded-xl p-5 text-center">
      <div className="text-3xl font-bold text-brand-600 tabular-nums">{value}</div>
      <div className="text-sm text-gray-500 mb-1.5">{label}</div>
      <div className={`text-xs font-medium ${t.color}`}>{t.texto}</div>
    </div>
  );
}
