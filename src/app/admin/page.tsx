import { redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getSupabaseAdmin, BUCKET_VERIFICACIONES } from "@/lib/supabaseAdmin";
import Link from "next/link";
import CategoryIcon from "@/components/CategoryIcon";
import AdminBotonAccion from "./AdminBotonAccion";
import AgregarMiembroForm from "./AgregarMiembroForm";

// Periodo del resumen: ultimas 24 horas, 7 dias, 30 dias o todo el tiempo
// (se elige con ?periodo=24h | 7 | 30 | todo). Menos "todo" se compara contra
// el periodo anterior de la misma duracion, para saber si el esfuerzo
// (buscar proveedores, ayudar a publicar solicitudes, etc.) esta dando
// resultado. En "todo" no hay comparacion.
type Periodo = "24h" | "7" | "30" | "todo";

function rangosPeriodo(periodo: Periodo) {
  if (periodo === "todo") return { desde: null as Date | null, anteriorDesde: null as Date | null };
  const dias = periodo === "30" ? 30 : periodo === "24h" ? 1 : 7;
  const ahora = new Date();
  const desde = new Date(ahora.getTime() - dias * 24 * 60 * 60 * 1000);
  const anteriorDesde = new Date(ahora.getTime() - 2 * dias * 24 * 60 * 60 * 1000);
  return { desde, anteriorDesde };
}

function tendencia(actual: number, anterior: number, etiqueta: string) {
  const diff = actual - anterior;
  if (diff > 0) return { texto: `+${diff} vs. ${etiqueta}`, color: "text-emerald-600" };
  if (diff < 0) return { texto: `${diff} vs. ${etiqueta}`, color: "text-coral-600" };
  return { texto: `igual que ${etiqueta}`, color: "text-gray-400" };
}

export default async function AdminPage({ searchParams }: { searchParams: { periodo?: string } }) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "ADMIN") redirect("/login");

  const periodo: Periodo = searchParams.periodo === "24h" || searchParams.periodo === "30" || searchParams.periodo === "todo" ? searchParams.periodo : "7";
  const { desde, anteriorDesde } = rangosPeriodo(periodo);
  const filtroActual = desde ? { gte: desde } : undefined;
  const filtroAnterior = desde && anteriorDesde ? { gte: anteriorDesde, lt: desde } : undefined;
  const etiquetaPeriodo =
    periodo === "todo"
      ? "todo el tiempo"
      : periodo === "30"
      ? "últimos 30 días"
      : periodo === "24h"
      ? "últimas 24 horas"
      : "últimos 7 días";
  const etiquetaAnterior =
    periodo === "30" ? "los 30 días anteriores" : periodo === "24h" ? "las 24 horas anteriores" : "la semana pasada";

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
    miembrosEquipo,
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
    prisma.user.count({ where: { role: "CLIENTE", createdAt: filtroActual } }),
    filtroAnterior ? prisma.user.count({ where: { role: "CLIENTE", createdAt: filtroAnterior } }) : Promise.resolve(0),
    prisma.user.count({ where: { role: "PROVEEDOR", createdAt: filtroActual } }),
    filtroAnterior ? prisma.user.count({ where: { role: "PROVEEDOR", createdAt: filtroAnterior } }) : Promise.resolve(0),
    prisma.solicitud.count({ where: { createdAt: filtroActual } }),
    filtroAnterior ? prisma.solicitud.count({ where: { createdAt: filtroAnterior } }) : Promise.resolve(0),
    prisma.desbloqueo.count({ where: { createdAt: filtroActual } }),
    filtroAnterior ? prisma.desbloqueo.count({ where: { createdAt: filtroAnterior } }) : Promise.resolve(0),
    prisma.user.findMany({ where: { role: "EQUIPO" }, orderBy: { createdAt: "desc" } }),
  ]);

  // Demanda del periodo: que piden los clientes y que contactos desbloquean
  // los proveedores. Importante: chaski no registra las busquedas que hacen
  // los proveedores, asi que el mejor indicador de "que estan buscando" es
  // a que solicitudes les gastan creditos (desbloqueos).
  const [solicitudesPorCategoria, desbloqueosPeriodo, solicitudesRecientes] = await Promise.all([
    prisma.solicitud.groupBy({
      by: ["categoriaId"],
      where: { createdAt: filtroActual },
      _count: { _all: true },
    }),
    prisma.desbloqueo.findMany({
      where: { createdAt: filtroActual },
      select: { solicitud: { select: { categoriaId: true } } },
    }),
    prisma.solicitud.findMany({
      where: { createdAt: filtroActual },
      include: { categoria: true, cliente: true, _count: { select: { desbloqueos: true } } },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
  ]);
  const solicitudesPorCat = new Map(solicitudesPorCategoria.map((g) => [g.categoriaId, g._count._all]));
  const desbloqueosPorCat = new Map<string, number>();
  for (const d of desbloqueosPeriodo) {
    const id = d.solicitud.categoriaId;
    desbloqueosPorCat.set(id, (desbloqueosPorCat.get(id) || 0) + 1);
  }
  const demandaPorCategoria = categorias
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      nombre: c.nombre,
      solicitudes: solicitudesPorCat.get(c.id) || 0,
      desbloqueos: desbloqueosPorCat.get(c.id) || 0,
    }))
    .filter((c) => c.solicitudes > 0 || c.desbloqueos > 0)
    .sort((a, b) => b.desbloqueos - a.desbloqueos || b.solicitudes - a.solicitudes);

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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Panel de administración</h1>
        <Link
          href="/crm"
          className="bg-ink text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Ir al CRM →
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
        <h2 className="text-xl font-bold">Resumen: {etiquetaPeriodo}</h2>
        <div className="inline-flex border rounded-lg overflow-hidden text-sm">
          {(
            [
              ["24h", "24 horas"],
              ["7", "7 días"],
              ["30", "30 días"],
              ["todo", "Todo el tiempo"],
            ] as const
          ).map(([valor, texto]) => (
            <Link
              key={valor}
              href={`/admin?periodo=${valor}`}
              className={`px-3 py-1.5 font-medium transition-colors ${
                periodo === valor ? "bg-ink text-white" : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {texto}
            </Link>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-3">Para saber si buscar proveedores y ayudar a publicar solicitudes está dando resultado.</p>
      <div className="grid sm:grid-cols-4 gap-4 mb-10">
        <WeeklyMetricCard label="Nuevos clientes" value={clientesEstaSemana} anterior={clientesSemanaAnterior} comparar={periodo !== "todo"} etiqueta={etiquetaAnterior} />
        <WeeklyMetricCard label="Nuevos proveedores" value={proveedoresEstaSemana} anterior={proveedoresSemanaAnterior} comparar={periodo !== "todo"} etiqueta={etiquetaAnterior} />
        <WeeklyMetricCard label="Solicitudes publicadas" value={solicitudesEstaSemana} anterior={solicitudesSemanaAnterior} comparar={periodo !== "todo"} etiqueta={etiquetaAnterior} />
        <WeeklyMetricCard label="Desbloqueos (contactos)" value={desbloqueosEstaSemana} anterior={desbloqueosSemanaAnterior} comparar={periodo !== "todo"} etiqueta={etiquetaAnterior} />
      </div>

      <h2 className="text-xl font-bold mb-1">Qué buscan los proveedores ({etiquetaPeriodo})</h2>
      <p className="text-sm text-gray-500 mb-3">
        chaski no guarda las búsquedas de los proveedores; el mejor indicador de lo que les interesa es a qué
        solicitudes les gastan créditos (desbloqueos). Ordenado por desbloqueos.
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Categoría</th>
              <th className="p-3">Solicitudes de clientes</th>
              <th className="p-3">Desbloqueos de proveedores</th>
            </tr>
          </thead>
          <tbody>
            {demandaPorCategoria.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">
                  <span className="inline-flex items-center gap-2">
                    <CategoryIcon slug={c.slug} className="w-4 h-4 text-brand-500" />
                    {c.nombre}
                  </span>
                </td>
                <td className="p-3 tabular-nums">{c.solicitudes}</td>
                <td className="p-3 tabular-nums">{c.desbloqueos}</td>
              </tr>
            ))}
            {demandaPorCategoria.length === 0 && (
              <tr>
                <td className="p-3 text-gray-500" colSpan={3}>Sin actividad en este periodo.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h3 className="font-semibold mb-2">Solicitudes recientes</h3>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Solicitud</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Ciudad</th>
              <th className="p-3">Presupuesto</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Correo</th>
              <th className="p-3">Teléfono</th>
              <th className="p-3">Desbloqueos</th>
              <th className="p-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {solicitudesRecientes.map((s) => (
              <tr key={s.id} className="border-t align-top">
                <td className="p-3 max-w-xs">{s.titulo}</td>
                <td className="p-3 whitespace-nowrap">{s.categoria.nombre}</td>
                <td className="p-3 whitespace-nowrap">{s.ciudad}</td>
                <td className="p-3 whitespace-nowrap">{s.presupuesto ? `${s.presupuesto} ${s.presupuestoMoneda}` : "—"}</td>
                <td className="p-3 whitespace-nowrap">{s.cliente.nombre}</td>
                <td className="p-3 whitespace-nowrap">
                  <a href={`mailto:${s.cliente.email}`} className="text-brand-600 hover:underline">
                    {s.cliente.email}
                  </a>
                </td>
                <td className="p-3 whitespace-nowrap">
                  {s.telefonoContacto ? (
                    <a
                      href={`https://wa.me/${s.telefonoContacto.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 hover:underline"
                    >
                      {s.telefonoContacto}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-3 tabular-nums">{s._count.desbloqueos}</td>
                <td className="p-3 whitespace-nowrap">{s.createdAt.toLocaleDateString("es-CO")}</td>
              </tr>
            ))}
            {solicitudesRecientes.length === 0 && (
              <tr>
                <td className="p-3 text-gray-500" colSpan={9}>Sin solicitudes en este periodo.</td>
              </tr>
            )}
          </tbody>
        </table>
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

      <h2 className="text-xl font-bold mb-1 mt-10">Equipo con acceso al CRM</h2>
      <p className="text-sm text-gray-500 mb-3">
        Crea una cuenta para cada persona que necesite entrar a{" "}
        <Link href="/crm" className="text-brand-600 hover:underline">/crm</Link>. Pueden cambiar la contraseña luego
        desde su perfil.
      </p>
      <div className="mb-4">
        <AgregarMiembroForm />
      </div>
      {miembrosEquipo.length > 0 && (
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Correo</th>
                <th className="p-3">Desde</th>
              </tr>
            </thead>
            <tbody>
              {miembrosEquipo.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="p-3">{m.nombre}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="p-3">{m.createdAt.toLocaleDateString("es-CO")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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

function WeeklyMetricCard({
  label,
  value,
  anterior,
  comparar,
  etiqueta,
}: {
  label: string;
  value: number;
  anterior: number;
  comparar: boolean;
  etiqueta: string;
}) {
  const t = tendencia(value, anterior, etiqueta);
  return (
    <div className="border rounded-xl p-5 text-center">
      <div className="text-3xl font-bold text-brand-600 tabular-nums">{value}</div>
      <div className="text-sm text-gray-500 mb-1.5">{label}</div>
      {comparar && <div className={`text-xs font-medium ${t.color}`}>{t.texto}</div>}
    </div>
  );
}
