import { prisma } from "@/lib/db";
import NuevoProspectoForm from "./NuevoProspectoForm";
import TablaProspectos from "./TablaProspectos";

// "as any": ver nota en /api/crm/contactos/route.ts
const db = prisma as any;

export default async function ProspeccionPage() {
  const prospectos = await db.crmContacto.findMany({
    where: { etapa: { in: ["NUEVO", "CONTACTADO"] } },
    orderBy: { updatedAt: "asc" },
  });

  const sinContactar = prospectos.filter((p: any) => p.etapa === "NUEVO").length;
  const enSeguimiento = prospectos.filter((p: any) => p.etapa === "CONTACTADO").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Prospección</h1>
        <p className="text-sm text-gray-500">
          Agrega gente que encuentres en LinkedIn o por correo, y mándales el primer mensaje directo desde aquí.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-2xl font-bold tabular-nums">{prospectos.length}</p>
          <p className="text-xs text-gray-500 mt-0.5">Prospectos activos</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-2xl font-bold tabular-nums">{sinContactar}</p>
          <p className="text-xs text-gray-500 mt-0.5">Sin contactar</p>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <p className="text-2xl font-bold tabular-nums">{enSeguimiento}</p>
          <p className="text-xs text-gray-500 mt-0.5">En seguimiento</p>
        </div>
      </div>

      <NuevoProspectoForm />

      <TablaProspectos
        prospectos={prospectos.map((p: any) => ({
          id: p.id,
          nombre: p.nombre,
          email: p.email,
          etapa: p.etapa,
          origen: p.origen,
          notas: p.notas,
          updatedAt: p.updatedAt.toISOString(),
        }))}
      />
    </div>
  );
}
