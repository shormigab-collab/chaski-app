import { prisma } from "@/lib/db";
import NuevoContactoForm from "./NuevoContactoForm";

// "as any": ver nota en /api/crm/contactos/route.ts
const db = prisma as any;

export default async function NuevoContactoPage() {
  const empresas = await db.crmEmpresa.findMany({ orderBy: { nombre: "asc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Nuevo contacto</h1>
      <NuevoContactoForm empresas={empresas} />
    </div>
  );
}
