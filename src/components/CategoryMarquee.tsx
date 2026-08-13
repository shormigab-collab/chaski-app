import CategoryIcon from "@/components/CategoryIcon";

type Categoria = { id: string; nombre: string; slug: string; icono: string };

export default function CategoryMarquee({ categorias }: { categorias: Categoria[] }) {
  const dobles = [...categorias, ...categorias];

  return (
    <div className="overflow-hidden bg-ink py-4">
      <div className="flex w-max animate-marquee gap-3">
        {dobles.map((cat, i) => (
          <span
            key={`${cat.id}-${i}`}
            className="flex items-center gap-2 bg-white/5 text-cream/80 text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap"
          >
            <CategoryIcon slug={cat.slug} className="w-3.5 h-3.5 text-cream/60" />
            {cat.nombre}
          </span>
        ))}
      </div>
    </div>
  );
}
