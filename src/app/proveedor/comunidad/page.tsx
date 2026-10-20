import { redirect } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { tiempoRelativo } from "@/lib/tiempoRelativo";
import PublicarForm from "./PublicarForm";
import BorrarPublicacion from "./BorrarPublicacion";

export const dynamic = "force-dynamic";

export default async function ComunidadProveedor() {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) redirect("/login");

  const mias = await prisma.publicacion.findMany({
    where: { proveedorId: usuario.proveedor.id },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-1">Comunidad</h1>
      <p className="text-ink/55 mb-6">
        Comparte un artículo, un proyecto o una novedad. Tus últimas publicaciones aparecen en la página de inicio de
        Chaski, con un botón para que los clientes soliciten tus servicios.
      </p>

      <PublicarForm />

      <h2 className="font-bold mt-10 mb-3">Tus publicaciones</h2>
      {mias.length === 0 ? (
        <p className="text-ink/50 text-sm">Todavía no has publicado nada.</p>
      ) : (
        <div className="space-y-3">
          {mias.map((p) => (
            <div key={p.id} className="bg-white border border-border rounded-2xl p-4">
              <p className="text-sm text-ink/80 whitespace-pre-line">{p.texto}</p>
              {p.enlaceUrl && (
                <a
                  href={p.enlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow ugc"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
                >
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} />
                  {p.enlaceTitulo || p.enlaceUrl}
                </a>
              )}
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-ink/40">{tiempoRelativo(p.createdAt)}</span>
                <BorrarPublicacion id={p.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
