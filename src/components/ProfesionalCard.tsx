import Link from "next/link";
import { MapPin, Briefcase, Star } from "lucide-react";
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
  calificacionProm?: number;
  totalResenas?: number;
};

const MESES = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic",
];

const MONTHS_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Bandas de color para el encabezado de la tarjeta. Se elige una de
// forma estable según el id del profesional, para que cada tarjeta se
// vea distinta sin depender de tener una foto real.
const BANDAS = [
  "from-brand-400 to-brand-600",
  "from-coral-400 to-coral-600",
  "from-gold-400 to-coral-500",
  "from-brand-400 to-coral-500",
];

function hashIndex(str: string, mod: number) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % mod;
}

export default function ProfesionalCard({ p, lang = "es" }: { p: ProfesionalCardData; lang?: "es" | "en" }) {
  const categoriaPrincipal = p.categorias[0];
  const inicial = p.nombre.trim().charAt(0).toUpperCase() || "?";
  const ubicacion = [p.ciudad, p.pais].filter(Boolean).join(", ");
  const meses = lang === "en" ? MONTHS_EN : MESES;
  const miembroDesde = `${meses[p.memberSince.getMonth()]} ${p.memberSince.getFullYear()}`;
  const banda = BANDAS[hashIndex(p.id, BANDAS.length)];

  return (
    <div className="h-full flex flex-col border border-black/5 bg-white rounded-2xl overflow-hidden hover:border-brand-200 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 transition-all">
      <div className={`relative h-16 bg-gradient-to-r ${banda}`}>
        <div className="absolute -bottom-7 left-5">
          {p.fotoUrl ? (
            <img
              src={p.fotoUrl}
              alt=""
              className="w-16 h-16 rounded-full object-cover shrink-0 ring-4 ring-white"
            />
          ) : (
            <span className="w-16 h-16 rounded-full bg-white/90 text-ink flex items-center justify-center font-bold text-xl shrink-0 ring-4 ring-white">
              {inicial}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 pt-9">
        <div className="mb-3">
          <div className="flex items-center gap-1.5">
            <div className="font-semibold text-ink truncate">{p.nombre}</div>
            {!!p.totalResenas && (
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-ink/60 shrink-0">
                <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                {p.calificacionProm?.toFixed(1)}
                <span className="text-ink/35">({p.totalResenas})</span>
              </span>
            )}
          </div>
          {categoriaPrincipal && (
            <div className="inline-flex items-center gap-1.5 text-xs text-brand-600 bg-brand-50 font-medium px-2 py-0.5 rounded-full mt-1">
              <CategoryIcon slug={categoriaPrincipal.slug} className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{categoriaPrincipal.nombre}</span>
            </div>
          )}
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
                {lang === "en"
                  ? `${p.aniosExperiencia} ${p.aniosExperiencia === 1 ? "year" : "years"} of experience`
                  : `${p.aniosExperiencia} ${p.aniosExperiencia === 1 ? "año" : "años"} de experiencia`}
              </span>
            </div>
          )}
          <div className="text-[11px] text-ink/35">
            {lang === "en" ? "Member since" : "Miembro desde"} {miembroDesde}
          </div>
        </div>

        <Link
          href={`/profesionales/${p.id}`}
          className="block text-center text-sm font-semibold bg-brand-50 text-brand-600 rounded-full py-2.5 hover:bg-brand-500 hover:text-cream transition-colors min-h-[44px] flex items-center justify-center"
        >
          {lang === "en" ? "View profile" : "Ver perfil"}
        </Link>
      </div>
    </div>
  );
}
