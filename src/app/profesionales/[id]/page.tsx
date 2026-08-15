import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Briefcase, Star, DollarSign, Linkedin } from "lucide-react";
import { prisma } from "@/lib/db";
import CategoryIcon from "@/components/CategoryIcon";
import { parsePortafolio, ACENTOS_PORTAFOLIO } from "@/lib/portafolio";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const proveedor = await prisma.proveedor.findUnique({
    where: { id: params.id },
    include: { user: true, categorias: true },
  });

  if (!proveedor) return { title: "Profesional no encontrado" };

  const categoriaPrincipal = proveedor.categorias[0]?.nombre;
  const ubicacion = [proveedor.user.ciudad, proveedor.user.pais].filter(Boolean).join(", ");
  const titulo = categoriaPrincipal
    ? `${proveedor.user.nombre} — ${categoriaPrincipal}${ubicacion ? ` en ${ubicacion}` : ""}`
    : proveedor.user.nombre;
  const descripcion =
    proveedor.bio?.slice(0, 155) ||
    `Contacta a ${proveedor.user.nombre} en chaski, el marketplace de profesionales independientes en LatAm.`;

  return {
    title: titulo,
    description: descripcion,
    openGraph: { title: titulo, description: descripcion },
  };
}

export default async function PerfilProfesionalPage({ params }: { params: { id: string } }) {
  const proveedor = await prisma.proveedor.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      categorias: true,
      resenasRecibidas: {
        where: { comentario: { not: null } },
        include: { autor: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!proveedor) notFound();

  const inicial = proveedor.user.nombre.trim().charAt(0).toUpperCase() || "?";
  const ubicacion = [proveedor.user.ciudad, proveedor.user.pais].filter(Boolean).join(", ");
  const proyectosPortafolio = parsePortafolio(proveedor.portafolio);

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
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-ink">{proveedor.user.nombre}</h1>
              {proveedor.totalResenas > 0 && (
                <span className="inline-flex items-center gap-1 text-sm font-medium text-ink/60">
                  <Star className="w-4 h-4 fill-gold-500 text-gold-500" />
                  {proveedor.calificacionProm.toFixed(1)}
                  <span className="text-ink/35">
                    ({proveedor.totalResenas} {proveedor.totalResenas === 1 ? "reseña" : "reseñas"})
                  </span>
                </span>
              )}
            </div>
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

        {(!!proveedor.aniosExperiencia || proveedor.tarifaAproximada || proveedor.linkedinUrl) && (
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink/60 mb-5">
            {!!proveedor.aniosExperiencia && (
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                {proveedor.aniosExperiencia} {proveedor.aniosExperiencia === 1 ? "año" : "años"} de experiencia
              </span>
            )}
            {proveedor.tarifaAproximada && (
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                {proveedor.tarifaAproximada}
              </span>
            )}
            {proveedor.linkedinUrl && (
              <a
                href={proveedor.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-1.5 text-brand-600 hover:text-brand-700"
              >
                <Linkedin className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                LinkedIn
              </a>
            )}
          </div>
        )}

        {proveedor.bio && <p className="text-ink/70 leading-relaxed">{proveedor.bio}</p>}

        {proyectosPortafolio.length > 0 && (
          <div className="mt-8 border-t border-black/5 pt-6">
            <h2 className="text-sm font-semibold text-ink mb-4">Portafolio</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {proyectosPortafolio.map((p, i) => {
                const acento = ACENTOS_PORTAFOLIO[i % ACENTOS_PORTAFOLIO.length];
                return (
                  <div
                    key={i}
                    className="group relative rounded-2xl overflow-hidden border border-black/5 bg-white hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 transition-all"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={p.imagenUrl}
                        alt={p.titulo}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
                      <span
                        className={`absolute top-3 left-3 w-7 h-7 rounded-full bg-gradient-to-br ${acento.grad} flex items-center justify-center text-white text-xs font-bold shadow-sm`}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-ink text-sm mb-1">{p.titulo}</h3>
                      {p.descripcion && <p className="text-xs text-ink/55 leading-relaxed">{p.descripcion}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {proveedor.resenasRecibidas.length > 0 && (
          <div className="mt-8 border-t border-black/5 pt-6">
            <h2 className="text-sm font-semibold text-ink mb-3">Lo que dicen sus clientes</h2>
            <div className="space-y-4">
              {proveedor.resenasRecibidas.map((r) => (
                <div key={r.id} className="bg-cream rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          className={`w-3.5 h-3.5 ${n <= r.puntuacion ? "fill-gold-500 text-gold-500" : "text-black/15"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-ink/50">{r.autor.nombre.split(" ")[0]}</span>
                  </div>
                  <p className="text-sm text-ink/70">{r.comentario}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 border-t border-black/5 pt-6">
          <p className="text-sm text-ink/55 mb-3">
            Para hablar con {proveedor.user.nombre.split(" ")[0]}, publica tu proyecto — si le interesa, te
            contactará directamente.
          </p>
          <Link
            href="/registro/cliente"
            className="inline-block bg-brand-500 text-cream px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors min-h-[44px]"
          >
            Publicar un proyecto gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
