import { redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ComprarCreditos from "./ComprarCreditos";

export default async function CreditosPage({
  searchParams,
}: {
  searchParams: { estado?: string };
}) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) redirect("/login");

  const paquetes = await prisma.paqueteCreditos.findMany({ where: { activo: true }, orderBy: { creditos: "asc" } });

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-1">Comprar créditos</h1>
      <p className="text-gray-600 mb-6">
        Tienes <strong>{usuario.proveedor.creditos}</strong> créditos disponibles. Cada contacto
        desbloqueado cuesta 1 crédito.
      </p>

      {searchParams.estado === "exito" && (
        <p className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3">
          Pago recibido. Tus créditos se acreditarán en unos segundos.
        </p>
      )}
      {searchParams.estado === "fallo" && (
        <p className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
          El pago no se completó. Intenta de nuevo.
        </p>
      )}

      <ComprarCreditos paquetes={paquetes} />
    </div>
  );
}
