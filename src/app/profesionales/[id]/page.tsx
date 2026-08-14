import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Briefcase } from "lucide-react";
import { prisma } from "@/lib/db";
import CategoryIcon from "@/components/CategoryIcon";

export default async function PerfilProfesionalPage({ params }: { params: { id: string } }) {
  const proveedor = await prisma.proveedor.findUnique({
    where: { id: params.id },
    include: { user: true, categorias: true },
  });

  if (!proveedor) notFound();

  const inicial = proveedor.user.nombre.trim().charAt(0).toUpperCase() || "?";
  const ubicacion = [proveedor.user.ciudad, proveedor.user.pais].filter(Boolean).join(", ");

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
      <Link href="/profesionales" className="text-sm text-ink/50 hover:text-ink transition-colors">
        ← Todos los profesionales
      </Link>

      <div className="mt-6 border border-black/5 bg-white rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-5">
          {proveedor.fotoUrl ? (
            <img src={proveedor.fotoUrl} alt="" className="w-16 h-16 rounded-full object-cover shrink-0" />
          ) : (
            <span className="w-16 h-16 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center font-bold text-2xl shrink-0">
              {inicial}
            </span>
          )}
          <div>
            <h1 className="text-xl font-bold text-ink">{proveedor.user.nombre}</h1>
            {ubicacion && (
              <div className="flex items-center gap-1.5 text-sm text-ink/50 mt-0.5">
                <MapPin className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                {ubicacion}
              </div>
            )}
          </div>
        </div>

        {proveedor.categorias.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {proveedor.categorias.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 bg-brand-50 rounded-full px-3 py-1.5"
              >
                <CategoryIcon slug={c.slug} className="w-3.5 h-3.5" />
                {c.nombre}
              </span>
            ))}
          </div>
        )}

        {!!proveedor.aniosExperiencia && (
          <div className="flex items-center gap-1.5 text-sm text-ink/60 mb-5">
            <Briefcase className="w-4 h-4 shrink-0" strokeWidth={1.75} />
            {proveedor.aniosExperiencia} {proveedor.aniosExperiencia === 1 ? "año" : "años"} de experiencia
          </div>
        )}

        {proveedor.bio && <p className="text-ink/70 leading-relaxed">{proveedor.bio}</p>}

        <div className="mt-8 border-t border-black/5 pt-6">
          <p className="text-sm text-ink/55 mb-3">
            Para hablar con {proveedor.user.nombre.split(" ")[0]}, publica tu proyecto — si le interesa, te
            contactará directamente.
          </p>
          <Link
            href="/registro/cliente"
            className="inline-block bg-brand-500 text-cream px-6 py-3 rounded-full font-semibold hover:bg-brand-600 transition-colors min-h-[44px]"
          >
            Publicar un proyecto gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
