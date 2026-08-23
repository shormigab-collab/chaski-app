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
  // Foto de portada. Alt describe la escena, no afirma que sea "un cliente
  // real de chaski".
  imagen: string;
  imagenAlt: string;
  descripcionMeta: string;
  extracto: string;
  fecha: string; // ISO
  minutosLectura: number;
  contenido: BloqueContenido[];
};

export const POSTS: PostBlog[] = [
  {
    slug: "como-contratar-freelance-colombia",
    titulo: "Cómo contratar un profesional freelance en Colombia: guía rápida",
    categoria: "Guía para clientes",
    imagen: "/images/blog/como-contratar-freelance-colombia.webp",
    imagenAlt: "Cliente y profesional freelance revisando un proyecto juntos en una laptop",
    descripcionMeta:
      "Guía práctica para contratar freelancers en Colombia: cómo definir el alcance del trabajo, qué revisar antes de pagar y señales de alerta para evitar fraudes.",
    extracto:
      "Cada vez más personas y negocios en Colombia contratan freelancers directamente en vez de pasar por una agencia. Esta guía cubre los pasos para hacerlo bien, desde definir lo que necesitas hasta detectar señales de alerta antes de pagar.",
    fecha: "2026-08-15",
    minutosLectura: 5,
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
  {
    slug: "como-conseguir-clientes-freelancer-latinoamerica",
    titulo: "Cómo conseguir tus primeros clientes como freelancer en Latinoamérica",
    categoria: "Guía para freelancers",
    imagen: "/images/blog/como-conseguir-clientes-freelancer-latinoamerica.webp",
    imagenAlt: "Profesionales independientes revisando un proyecto y una propuesta en equipo",
    descripcionMeta:
      "Guía práctica para freelancers en Latinoamérica: cómo armar un perfil que genere confianza, dónde encontrar clientes y qué errores evitar al empezar.",
    extracto:
      "Empezar a trabajar por tu cuenta es más fácil que conseguir los primeros clientes que confíen en ti. Esta guía repasa cómo definir tu propuesta, armar un perfil que genere confianza y dónde buscar sin caer en la guerra de precios de las plataformas genéricas.",
    fecha: "2026-08-17",
    minutosLectura: 6,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Trabajar de forma independiente en Latinoamérica ya no es raro: cada vez más diseñadores, desarrolladores, contadores, redactores y consultores dejan la relación de dependencia para ofrecer sus servicios por su cuenta. La parte difícil no es decidirse, sino conseguir a los primeros clientes que confíen en alguien sin un historial largo todavía. Esta guía cubre cómo prepararte, dónde buscar y qué errores evitar en esa primera etapa.",
      },
      {
        tipo: "titulo",
        texto: "Antes de buscar clientes: define tu propuesta",
      },
      {
        tipo: "parrafo",
        texto:
          "El error más común al empezar es tratar de ofrecer un poco de todo con tal de no cerrarle la puerta a nadie. En la práctica pasa lo contrario: un perfil genérico genera menos confianza que uno específico. Define en una frase qué tipo de proyecto resuelves mejor y para qué tipo de cliente (por ejemplo, 'sitios web para negocios pequeños que están empezando a vender en línea' en vez de solo 'desarrollo web'). Esa claridad es la que después va a aparecer en tu perfil, en cómo te presentas y en el primer mensaje que le mandas a un cliente.",
      },
      {
        tipo: "titulo",
        texto: "Arma un perfil que genere confianza",
      },
      {
        tipo: "parrafo",
        texto:
          "Cuando un cliente no te conoce, tu perfil es lo único que tiene para decidir si te escribe o no. No necesitas años de experiencia para que se vea profesional: necesitas que sea claro y honesto. Una foto real (no un logo ni un ícono genérico), una bio corta que explique en qué te especializas y desde dónde trabajas, y ejemplos concretos de proyectos anteriores pesan más que una lista larga de servicios.",
      },
      {
        tipo: "lista",
        items: [
          "2 o 3 ejemplos de trabajo real, aunque sean proyectos pequeños o personales si estás empezando.",
          "Una bio corta y específica, no un resumen genérico de 'profesional con experiencia en...'.",
          "Un rango de tarifa aproximado, para que el cliente sepa si encaja con su presupuesto antes de escribirte.",
          "Una forma de contacto directa (teléfono, WhatsApp o correo), sin intermediarios.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Dónde buscar tus primeros clientes",
      },
      {
        tipo: "parrafo",
        texto:
          "Las recomendaciones de conocidos siguen siendo la forma más rápida de conseguir un primer cliente, así que vale la pena avisar en tu círculo cercano que estás disponible. Fuera de eso, las plataformas genéricas de freelancing internacional suelen forzarte a competir por precio contra cientos de perfiles similares en todo el mundo, lo cual es muy difícil cuando recién empiezas. Una alternativa es buscar en comunidades locales (grupos de LinkedIn, Facebook o WhatsApp de tu ciudad o industria) y en marketplaces enfocados en Latinoamérica, como chaski, donde creas tu perfil gratis y son los clientes que publican un proyecto los que te contactan directamente, sin subastas ni comisiones sobre lo que cobras.",
      },
      {
        tipo: "titulo",
        texto: "Cómo responder cuando un cliente te escribe",
      },
      {
        tipo: "parrafo",
        texto:
          "La velocidad y la claridad de tu primera respuesta suelen pesar tanto como el precio. Responde lo antes posible, haz un par de preguntas para entender bien lo que necesita antes de dar una cifra, y si todavía no puedes dar un precio exacto, da un rango razonable en vez de quedarte callado. Un cliente que siente que lo escuchaste antes de cotizar confía más que uno al que le mandaste una tarifa fija sin haber entendido su proyecto.",
      },
      {
        tipo: "titulo",
        texto: "Errores que alejan a los primeros clientes",
      },
      {
        tipo: "lista",
        items: [
          "Cobrar muy por debajo del mercado solo por conseguir el primer proyecto: suele atraer clientes que después son los más difíciles de complacer.",
          "Tardar días en responder un mensaje inicial.",
          "Tener un perfil sin ejemplos de trabajo o con ejemplos que no tienen que ver con lo que ofreces.",
          "Prometer plazos que sabes que van a ser difíciles de cumplir, solo para cerrar el trato.",
          "No tener ninguna forma de contacto directo, lo que hace que el cliente dude de que hay una persona real detrás del perfil.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Sobre tu primera tarifa",
      },
      {
        tipo: "parrafo",
        texto:
          "Antes de poner un precio, busca cuánto cobran otros profesionales con un nivel de experiencia parecido al tuyo en tu categoría y ciudad (o país, si trabajas remoto). No hace falta acertar desde el primer proyecto: es normal ajustar tu tarifa a medida que creces tu portafolio y ganas más confianza en lo que ofreces. Lo importante es no anclarte tan bajo al principio que después te cueste subir sin sentir que estás 'subiendo mucho' de golpe.",
      },
      {
        tipo: "parrafo",
        texto:
          "Conseguir los primeros clientes toma tiempo, pero cada perfil claro, cada respuesta rápida y cada proyecto bien entregado hace más fácil el siguiente. Si quieres empezar, puedes crear tu perfil profesional gratis en chaski y recibir 5 créditos de bienvenida para contactar a los primeros clientes que publiquen un proyecto que encaje contigo.",
      },
    ],
  },
  {
    slug: "como-fijar-tu-tarifa-freelance",
    titulo: "Cómo fijar tu tarifa como freelancer: ¿por hora, por proyecto o por mes?",
    categoria: "Guía para freelancers",
    imagen: "/images/blog/como-fijar-tu-tarifa-freelance.webp",
    imagenAlt: "Profesional independiente calculando su tarifa para un nuevo proyecto",
    descripcionMeta:
      "Guía práctica para freelancers en Latinoamérica: cómo elegir entre cobrar por hora, por proyecto o por mes, cómo calcular un rango justo y errores comunes al poner precio a tu trabajo.",
    extracto:
      "Poner precio a tu trabajo es una de las decisiones más difíciles al empezar como independiente. Esta guía explica cuándo cobrar por hora, por proyecto o por mes, cómo calcular un rango justo y los errores más comunes que hacen que un freelancer se quede cobrando poco por años.",
    fecha: "2026-08-23",
    minutosLectura: 6,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Uno de los momentos más incómodos al trabajar de forma independiente es cuando un cliente pregunta '¿cuánto cobras?' y no tienes una respuesta clara. No es solo cuestión de decir un número: también hay que decidir la unidad. ¿Por hora? ¿Por el proyecto completo? ¿Un monto fijo al mes? Cada una tiene sentido según el tipo de trabajo, y elegir mal puede hacer que termines trabajando de más por lo mismo dinero.",
      },
      {
        tipo: "titulo",
        texto: "Por hora, por proyecto o por mes: ¿cuándo usar cada una?",
      },
      {
        tipo: "parrafo",
        texto:
          "No hay una unidad 'correcta' para todos los casos — depende de qué tan definido está el trabajo y qué tan predecible es el esfuerzo que requiere.",
      },
      {
        tipo: "lista",
        items: [
          "Por hora: tiene sentido cuando el alcance no está totalmente definido, cuando es soporte o mantenimiento continuo, o cuando el cliente quiere flexibilidad para pedir más o menos trabajo según el mes.",
          "Por proyecto: funciona mejor cuando el entregable es claro desde el inicio (por ejemplo, un logo, un sitio web de 5 páginas, una campaña puntual). Le da certeza al cliente sobre el costo total y a ti te protege si trabajas más rápido de lo esperado.",
          "Por mes: es ideal para relaciones continuas donde el cliente necesita disponibilidad constante (por ejemplo, gestión de redes sociales, soporte técnico recurrente, contabilidad mensual). Te da ingresos predecibles en vez de depender de proyecto en proyecto.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "En chaski, cuando creas tu perfil profesional puedes indicar cuál de estas tres formas usas para cobrar, así el cliente sabe desde el primer momento cómo funciona tu tarifa antes de escribirte — sin necesidad de aclararlo en cada conversación.",
      },
      {
        tipo: "titulo",
        texto: "Cómo calcular un rango justo",
      },
      {
        tipo: "parrafo",
        texto:
          "Antes de poner cualquier número, investiga cuánto cobran otros profesionales con un nivel de experiencia similar al tuyo, en tu categoría y en tu país (o en el país del cliente, si trabajas para el exterior). Si vas a cobrar por proyecto, calcula primero cuántas horas te tomaría realistamente y multiplica por tu tarifa por hora ideal — así evitas subestimar el tiempo real que requiere el trabajo, algo que le pasa a casi todo freelancer al empezar.",
      },
      {
        tipo: "parrafo",
        texto:
          "Si vas a cobrar por mes, ten claro qué incluye exactamente ese monto (cuántas horas, cuántas revisiones, qué tan rápido respondes) y qué pasa si el cliente pide algo fuera de eso. Dejarlo por escrito desde el inicio evita que el 'apoyo puntual' se convierta en trabajo extra no pagado.",
      },
      {
        tipo: "titulo",
        texto: "Errores comunes al poner tu tarifa",
      },
      {
        tipo: "lista",
        items: [
          "Cobrar por hora en un proyecto con alcance claro: terminas 'penalizado' si trabajas rápido, porque ganas menos por ser eficiente.",
          "No incluir el tiempo que no es 'visible' para el cliente: reuniones, ajustes, comunicación, administración — todo eso cuenta y hay que reflejarlo en el precio.",
          "Anclarte tan bajo al principio que después sientes que subir la tarifa es 'mucho', cuando en realidad solo estás alcanzando un precio justo.",
          "No revisar tu tarifa nunca: es normal y saludable ajustarla cada 6-12 meses a medida que creces tu experiencia y portafolio.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Cuándo y cómo subir tu tarifa",
      },
      {
        tipo: "parrafo",
        texto:
          "Si llevas meses con la agenda llena y sigues aceptando todo lo que te llega, es una señal clara de que puedes subir tu tarifa sin perder clientes. Aplica el nuevo precio a los proyectos nuevos primero (no hace falta subírselo de golpe a clientes actuales), y comunícalo con seguridad: no necesitas justificarte de más, un simple 'a partir de este mes mi tarifa es X' es suficiente para la mayoría de clientes serios.",
      },
      {
        tipo: "parrafo",
        texto:
          "Al final, la tarifa correcta es la que te permite vivir bien de tu trabajo sin sentir que estás regalando tu tiempo. Si todavía no tienes perfil en chaski, puedes crear el tuyo gratis, elegir cómo prefieres cobrar (hora, proyecto o mes) y recibir 5 créditos de bienvenida para contactar a tus primeros clientes.",
      },
    ],
  },
];

export function obtenerPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
