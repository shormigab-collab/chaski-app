// Clasifica una vacante en una categoria de chaski a partir de su titulo y
// de la categoria que le puso la fuente. Es una regla simple y visible (no
// una IA): si ninguna regla coincide, la vacante se descarta en vez de
// forzarla a una categoria.

export type CategoriaSenal = {
  slug: string; // slug de la categoria en chaski
  nombre: string;
  argumento: string; // argumento de venta sugerido
};

const REGLAS: { patron: RegExp; categoria: CategoriaSenal }[] = [
  {
    patron: /virtual assistant|asistente virtual|executive assistant|asistente administrativ|office/i,
    categoria: {
      slug: "asistente-virtual",
      nombre: "Asistente virtual / administrativo",
      argumento: "Pueden delegar tareas administrativas a un asistente virtual por proyecto o por horas, sin armar una contratación fija.",
    },
  },
  {
    patron: /customer (support|success|service)|soporte|atenci[oó]n al cliente|help ?desk/i,
    categoria: {
      slug: "soporte-tecnico",
      nombre: "Soporte técnico / atención",
      argumento: "Pueden cubrir picos de soporte o atención al cliente con profesionales independientes.",
    },
  },
  {
    patron: /account(ant|ing)|contab|bookkeep|tesorer/i,
    categoria: {
      slug: "contabilidad",
      nombre: "Contabilidad",
      argumento: "Pueden apoyar cierres, conciliaciones o impuestos con un contador independiente.",
    },
  },
  {
    patron: /copywrit|content (writer|creator)|redactor|escritor|contenido/i,
    categoria: {
      slug: "copywriting",
      nombre: "Copywriting / Redacción",
      argumento: "Pueden producir contenido o textos publicitarios con redactores freelance sin ampliar el equipo.",
    },
  },
  {
    patron: /\bsales\b|ventas|vendedor|\bsdr\b|\bbdr\b|business development|account executive|ejecutiv[oa] comercial|\bcomercial\b|desarrollo de negocio/i,
    categoria: {
      slug: "ventas",
      nombre: "Ventas / desarrollo de negocio",
      argumento: "Pueden sumar apoyo comercial (prospección, seguimiento, cierre) con profesionales independientes por proyecto o comisión, sin ampliar la nómina.",
    },
  },
  {
    patron: /design|dise[ñn]ad|ux|ui\b|gr[aá]fic|brand/i,
    categoria: {
      slug: "diseno-grafico",
      nombre: "Diseño gráfico / UX",
      argumento: "Pueden resolver piezas de diseño o branding con un freelance por proyecto mientras definen la vacante fija.",
    },
  },
  {
    patron: /marketing|community manager|social media|seo|growth|performance|media buy|ads\b|publicidad/i,
    categoria: {
      slug: "marketing-redes",
      nombre: "Marketing digital",
      argumento: "Pueden sumar campañas, redes o SEO con freelancers especializados sin esperar a cerrar la contratación.",
    },
  },
  {
    patron: /develop|engineer|programm|desarroll|software|front.?end|back.?end|full.?stack|mobile|\bqa\b|devops|data/i,
    categoria: {
      slug: "desarrollo-software",
      nombre: "Desarrollo de software",
      argumento: "Pueden cubrir proyectos puntuales de desarrollo con freelancers de LatAm mientras llega el perfil que buscan.",
    },
  },
];

export function clasificarVacante(titulo: string, categoriaFuente: string): CategoriaSenal | null {
  // Primero por titulo (lo mas confiable); si no, por la categoria de la fuente.
  for (const r of REGLAS) if (r.patron.test(titulo)) return r.categoria;
  for (const r of REGLAS) if (r.patron.test(categoriaFuente)) return r.categoria;
  return null;
}

// Lista para el selector de "Agregar señal manual".
export const CATEGORIAS_SENAL: CategoriaSenal[] = REGLAS.map((r) => r.categoria);

export function categoriaPorSlug(slug: string): CategoriaSenal | null {
  return REGLAS.find((r) => r.categoria.slug === slug)?.categoria ?? null;
}

export function argumentoPorSlug(slug: string): string {
  return REGLAS.find((r) => r.categoria.slug === slug)?.categoria.argumento ?? "";
}
