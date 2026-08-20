import { redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import CopilotoFlow from "./CopilotoFlow";

export const metadata = {
  title: "Chaski Copiloto | chaski",
  description: "Cuéntanos tu proyecto en tus palabras y arma tu proyecto con ayuda de IA.",
};

export default async function CopilotoPage() {
  const usuario = await obtenerUsuarioActual();
  if (!usuario) redirect("/login?next=/copiloto");
  if (usuario.role !== "CLIENTE") redirect("/cliente/solicitudes");

  const categorias = await prisma.categoria.findMany({ orderBy: { nombre: "asc" } });

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
      <CopilotoFlow
        categorias={categorias.map((c) => ({ id: c.id, nombre: c.nombre, slug: c.slug }))}
        usuario={{ telefono: usuario.telefono, ciudad: usuario.ciudad }}
      />
    </div>
  );
}
