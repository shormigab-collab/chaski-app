import { Suspense } from "react";
import { prisma } from "@/lib/db";
import RegistroClienteForm from "./RegistroClienteForm";

export default async function RegistroCliente() {
  const categorias = await prisma.categoria.findMany({ orderBy: { nombre: "asc" } });
  return (
    <Suspense fallback={null}>
      <RegistroClienteForm categorias={categorias} />
    </Suspense>
  );
}
