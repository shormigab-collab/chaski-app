// Contenido del blog. Se guarda como datos estaticos (no hay CMS ni tabla
// en base de datos todavia) porque el volumen de articulos es bajo al
// principio y esto evita construir infraestructura que no se necesita aun.
// Cuando el blog crezca a un ritmo que lo justifique, esto se puede migrar
// a una tabla de Prisma sin cambiar la forma en que se renderiza.

export type BloqueContenido =
  | { tipo: "parrafo"; texto: string }
  | { tipo: "titulo"; texto: string }
  | { tipo: "lista"; items: string[] };

export type CategoriaBlog = "Guía para clientes" | "Guía para freelancers";

export type PostBlog = {
  slug: string;
  titulo: string;
  categoria: CategoriaBlog;
  descripcionMeta: string;
  extracto: string;
  fecha: string; // ISO
  contenido: BloqueContenido[];
};

export const POSTS: PostBlog[] = [
  {
    slug: "como-contratar-freelance-colombia",
    titulo: "Cómo contratar un profesional freelance en Colombia: guía rápida",
    categoria: "Guía para clientes",
    descripcionMeta:
      "Guía práctica para contratar freelancers en Colombia: cómo definir el alcance del trabajo, qué revisar antes de pagar y señales de alerta para evitar fraudes.",
    extracto:
      "Cada vez más personas y negocios en Colombia contratan freelancers directamente en vez de pasar por una agencia. Esta guía cubre los pasos para hacerlo bien, desde definir lo que necesitas hasta detectar señales de alerta antes de pagar.",
    fecha: "2026-08-15",
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Cada vez más personas y negocios en Colombia contratan profesionales independientes directamente, en vez de pasar por una agencia. Tiene sentido: suele ser más rápido, más económico y permite hablar directo con quien va a hacer el trabajo. Pero contratar freelance también tiene sus riesgos si no sabes qué revisar antes de comprometerte. Esta guía cubre los pasos básicos para hacerlo bien.",
      },
      {
        tipo: "titulo",
        texto: "Antes de buscar: define bien lo que necesitas",
      },
      {
        tipo: "parrafo",
        texto:
          "El error más común al contratar un freelancer es empezar a buscar sin tener claro qué se necesita. Antes de contactar a nadie, escribe (aunque sea en un párrafo corto) qué quieres lograr, qué entregables esperas, para cuándo lo necesitas y cuánto estás dispuesto a invertir. Entre más claro esto, más rápido vas a encontrar a la persona correcta y menos espacio hay para malentendidos después.",
      },
      {
        tipo: "titulo",
        texto: "Dónde encontrar profesionales freelance en Colombia",
      },
      {
        tipo: "parrafo",
        texto:
          "Las recomendaciones de alguien de confianza siguen siendo la fuente más segura, pero no siempre hay alguien a la mano. Otras opciones comunes son buscar en LinkedIn por categoría y ciudad, grupos de Facebook o WhatsApp de freelancers, y plataformas especializadas en conectar clientes con profesionales independientes (como chaski, donde publicas lo que necesitas gratis y los profesionales interesados te contactan directamente).",
      },
      {
        tipo: "titulo",
        texto: "Qué revisar antes de contratar",
      },
      {
        tipo: "lista",
        items: [
          "Trabajo anterior o portafolio: pide ejemplos concretos, no solo una lista de servicios.",
          "Claridad en la comunicación: cómo responde tus primeras preguntas suele anticipar cómo va a ser trabajar con esa persona.",
          "Datos de contacto verificables: un profesional serio no tiene problema en darte un número de teléfono o correo directo.",
          "Opiniones o calificaciones previas, si la plataforma donde lo encontraste las tiene.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Cómo pactar el trabajo para evitar malentendidos",
      },
      {
        tipo: "parrafo",
        texto:
          "Antes de empezar, deja por escrito (así sea en un chat de WhatsApp) el alcance del trabajo, la forma y los plazos de pago, y la fecha de entrega. No hace falta un contrato formal para un proyecto pequeño, pero sí una conversación clara que ambas partes puedan consultar después si hay dudas.",
      },
      {
        tipo: "titulo",
        texto: "Señales de alerta",
      },
      {
        tipo: "lista",
        items: [
          "Pide el pago completo por adelantado sin haber mostrado trabajo previo ni acordado el alcance.",
          "Evita darte un número de contacto directo o insiste en comunicarse solo por un canal que no controlas.",
          "Cobra muy por debajo del rango normal para ese tipo de trabajo, sin ninguna explicación razonable.",
          "Es evasivo cuando le preguntas detalles específicos sobre cómo va a hacer el trabajo.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Ninguna de estas señales por sí sola significa que estás ante un fraude, pero varias juntas son motivo suficiente para buscar en otro lado. Si quieres empezar, puedes publicar gratis lo que necesitas en chaski y recibir propuestas directas de profesionales interesados en tu proyecto.",
      },
    ],
  },
];

export function obtenerPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
