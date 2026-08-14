import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";

export type ProfesionalCardData = {
  id: string;
  nombre: string;
  fotoUrl: string | null;
  ciudad: string | null;
  pais: string | null;
  aniosExperiencia: number | null;
  categorias: { id: string; nombre: string; slug: string }[];
  memberSince: Date;
};

const MESES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

export default function ProfesionalCard({ p }: { p: ProfesionalCardData }) {
  const categoriaPrincipal = p.categorias[0];
  const inicial = p.nombre.trim().charAt(0).toUpperCase() || "?";
  const ubicacion = [p.ciudad, p.pais].filter(Boolean).join(", ");
  const miembroDesde = `${MESES[p.memberSince.getMonth()]} ${p.memberSince.getFullYear()}`;

  return (
    <div className="h-full flex flex-col border border-black/5 bg-white rounded-2xl p-5 hover:border-brand-200 hover:shadow-md hover:shadow-black/5 transition-all">
      <div className="flex items-center gap-3 mb-3">
        {p.fotoUrl ? (
          <img
            src={p.fotoUrl}
            alt=""
            className="w-12 h-12 rounded-full object-cover shrink-0"
          />
        ) : (
          <span className="w-12 h-12 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center font-bold text-lg shrink-0">
            {inicial}
          </span>
        )}
        <div className="min-w-0">
          <div className="font-semibold text-ink truncate">{p.nombre}</div>
          {categoriaPrincipal && (
            <div className="flex items-center gap-1.5 text-xs text-brand-500 font-medium">
              <CategoryIcon slug={categoriaPrincipal.slug} className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{categoriaPrincipal.nombre}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-1.5 mb-4 flex-1">
        {ubicacion && (
          <div className="flex items-center gap-1.5 text-xs text-ink/50">
            <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
            <span className="truncate">{ubicacion}</span>
          </div>
        )}
        {!!p.aniosExperiencia && (
          <div className="flex items-center gap-1.5 text-xs text-ink/50">
            <Briefcase className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
            <span>
              {p.aniosExperiencia} {p.aniosExperiencia === 1 ? "año" : "años"} de experiencia
            </span>
          </div>
        )}
        <div className="text-[11px] text-ink/35">Miembro desde {miembroDesde}</div>
      </div>

      <Link
        href={`/profesionales/${p.id}`}
        className="block text-center text-sm font-semibold bg-brand-50 text-brand-600 rounded-full py-2.5 hover:bg-brand-500 hover:text-cream transition-colors min-h-[44px] flex items-center justify-center"
      >
        Ver perfil
      </Link>
    </div>
  );
}
