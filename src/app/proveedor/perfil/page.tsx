import { redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import PerfilForm from "./PerfilForm";

export default async function PerfilProveedor() {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) redirect("/login");

  const [categorias, proveedor] = await Promise.all([
    prisma.categoria.findMany({ orderBy: { nombre: "asc" } }),
    prisma.proveedor.findUnique({
      where: { id: usuario.proveedor.id },
      include: { categorias: true },
    }),
  ]);

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-ink mb-6">Mi perfil profesional</h1>
      <PerfilForm
        categorias={categorias}
        perfil={{
          bio: proveedor?.bio ?? "",
          fotoUrl: proveedor?.fotoUrl ?? "",
          categoriaIds: proveedor?.categorias.map((c) => c.id) ?? [],
          nombre: usuario.nombre,
          telefono: usuario.telefono ?? "",
          ciudad: usuario.ciudad ?? "",
          aniosExperiencia: proveedor?.aniosExperiencia ?? null,
          tarifaAproximada: proveedor?.tarifaAproximada ?? "",
          linkedinUrl: proveedor?.linkedinUrl ?? "",
        }}
      />
    </div>
  );
}
