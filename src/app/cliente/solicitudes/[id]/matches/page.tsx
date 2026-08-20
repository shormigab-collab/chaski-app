import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { calcularCompatibilidad, type ProveedorParaMatch } from "@/lib/matching";
import { parsePortafolio } from "@/lib/portafolio";
import ProfesionalCard from "@/components/ProfesionalCard";
import MatchExplanation from "@/components/MatchExplanation";
import { CheckCircle2 } from "lucide-react";

export const metadata = { title: "Profesionales recomendados | chaski" };

export default async function MatchesSolicitud({ params }: { params: { id: string } }) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "CLIENTE") redirect("/login");

  const solicitud = await prisma.solicitud.findUnique({
    where: { id: params.id },
    include: { categoria: true },
  });
  if (!solicitud || solicitud.clienteId !== usuario.id) notFound();

  const proveedores = await prisma.proveedor.findMany({
    include: { user: true, categorias: true },
  });

  const matches = proveedores
    .map((p) => {
      const datosMatch: ProveedorParaMatch = {
        id: p.id,
        categoriaIds: p.categorias.map((c) => c.id),
        ciudad: p.user.ciudad,
        bio: p.bio,
        portafolioTexto: parsePortafolio(p.portafolio)
          .map((proy) => `${proy.titulo} ${proy.descripcion || ""}`)
          .join(" "),
        aniosExperiencia: p.aniosExperiencia,
        verificado: p.verificado,
        calificacionProm: p.calificacionProm,
        totalResenas: p.totalResenas,
      };
      const resultado = calcularCompatibilidad(datosMatch, {
        categoriaId: solicitud.categoriaId,
        ciudad: solicitud.ciudad,
        titulo: solicitud.titulo,
        descripcion: solicitud.descripcion,
      });
      return { proveedor: p, resultado };
    })
    .sort((a, b) => b.resultado.puntaje - a.resultado.puntaje)
    .slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-brand-600 mb-2">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-semibold">Solicitud publicada</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink">Profesionales que podrían ayudarte</h1>
        <p className="text-ink/55 mt-1 max-w-xl">
          Basado en «{solicitud.titulo}». Estas recomendaciones son orientativas — tú decides con quién hablar.
          Los profesionales interesados también verán tu solicitud y podrán contactarte directamente.
        </p>
      </div>

      {matches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {matches.map(({ proveedor: p, resultado }) => (
            <div key={p.id} className="flex flex-col gap-3">
              <ProfesionalCard
                p={{
                  id: p.id,
                  nombre: p.user.nombre,
                  fotoUrl: p.fotoUrl,
                  ciudad: p.user.ciudad,
                  pais: p.user.pais,
                  aniosExperiencia: p.aniosExperiencia,
                  tarifaAproximada: p.tarifaAproximada,
                  tarifaTipo: p.tarifaTipo,
                  categorias: p.categorias.map((c) => ({ id: c.id, nombre: c.nombre, slug: c.slug })),
                  memberSince: p.createdAt,
                  calificacionProm: p.calificacionProm,
                  totalResenas: p.totalResenas,
                  verificado: p.verificado,
                }}
              />
              <MatchExplanation nivel={resultado.nivel} razones={resultado.razones} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center border border-black/5 rounded-2xl py-16 px-6 max-w-md mx-auto">
          <p className="text-ink/60 font-medium">
            La comunidad de profesionales está creciendo — todavía no hay perfiles para recomendarte, pero tu
            solicitud ya es visible para todos los que se unan.
          </p>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/cliente/solicitudes"
          className="inline-flex items-center justify-center bg-brand-500 text-cream px-5 py-2.5 rounded-xl font-semibold hover:bg-brand-600 transition-colors min-h-[44px]"
        >
          Ver mis solicitudes
        </Link>
        <Link
          href="/profesionales"
          className="inline-flex items-center justify-center border border-black/10 text-ink px-5 py-2.5 rounded-xl font-semibold hover:border-black/30 transition-colors min-h-[44px]"
        >
          Explorar todos los profesionales
        </Link>
      </div>
    </div>
  );
}
