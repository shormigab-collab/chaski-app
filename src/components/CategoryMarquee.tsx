type Categoria = { id: string; nombre: string; icono: string };

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
            <span>{cat.icono}</span>
            {cat.nombre}
          </span>
        ))}
      </div>
    </div>
  );
}
