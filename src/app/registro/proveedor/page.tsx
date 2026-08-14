import { prisma } from "@/lib/db";
import ProveedorForm from "./ProveedorForm";

export default async function RegistroProveedor({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  const categorias = await prisma.categoria.findMany({ orderBy: { nombre: "asc" } });
  return <ProveedorForm categorias={categorias} refCode={searchParams.ref} />;
}
