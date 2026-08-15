// Portafolio de proyectos de un proveedor. Se guarda como texto JSON en
// Proveedor.portafolio (no como modelo relacional aparte) porque es una
// lista corta (max 6 items) que nunca se filtra ni se ordena a nivel de
// base de datos — un campo de texto es suficiente y evita el costo de
// generar un modelo nuevo de Prisma.

export type ProyectoPortafolio = {
  titulo: string;
  descripcion?: string;
  imagenUrl: string;
};

export const MAX_PROYECTOS_PORTAFOLIO = 6;

// Ciclo de acentos de color (marca / coral / dorado) para que las
// tarjetas de portafolio no se vean monocromáticas, tanto en el editor
// de perfil como en la vista pública.
export const ACENTOS_PORTAFOLIO = [
  { grad: "from-brand-500 to-brand-600", bg: "bg-brand-50", text: "text-brand-400" },
  { grad: "from-coral-500 to-coral-600", bg: "bg-coral-50", text: "text-coral-400" },
  { grad: "from-gold-500 to-gold-600", bg: "bg-gold-50", text: "text-gold-500" },
];

// Convierte el texto guardado en base de datos a un array validado.
// Cualquier dato corrupto o con forma incorrecta se descarta en vez de
// romper la página (mejor mostrar menos proyectos que un error 500).
export function parsePortafolio(raw: string | null | undefined): ProyectoPortafolio[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data
      .filter(
        (p): p is ProyectoPortafolio =>
          !!p &&
          typeof p === "object" &&
          typeof (p as ProyectoPortafolio).titulo === "string" &&
          typeof (p as ProyectoPortafolio).imagenUrl === "string" &&
          (p as ProyectoPortafolio).imagenUrl.length > 0
      )
      .slice(0, MAX_PROYECTOS_PORTAFOLIO);
  } catch {
    return [];
  }
}
