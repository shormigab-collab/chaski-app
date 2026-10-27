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
  {
    slug: "como-armar-portafolio-que-consiga-clientes",
    titulo: "Cómo armar un portafolio que te consiga clientes",
    categoria: "Guía para freelancers",
    imagen: "/images/blog/como-armar-portafolio-que-consiga-clientes.webp",
    imagenAlt: "Diseñadora independiente revisando su portafolio de proyectos en la laptop",
    descripcionMeta:
      "Guía práctica para freelancers en Latinoamérica: qué proyectos incluir en tu portafolio, cómo describirlos y errores comunes que hacen que un cliente no te contacte.",
    extracto:
      "Un portafolio bien armado hace la mitad del trabajo de conseguir un cliente antes de que te escriban. Esta guía explica qué proyectos mostrar, cómo describirlos y los errores más comunes que hacen que un portafolio no convierta.",
    fecha: "2026-09-01",
    minutosLectura: 5,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Antes de que un cliente te escriba, ya te evaluó. Revisó tu perfil, miró tus proyectos anteriores y decidió si vale la pena contactarte — todo eso pasa antes de la primera conversación. Un portafolio bien armado no es un detalle estético: es lo que convierte a alguien que está mirando perfiles en alguien que te escribe a ti y no al siguiente.",
      },
      {
        tipo: "titulo",
        texto: "Calidad antes que cantidad",
      },
      {
        tipo: "parrafo",
        texto:
          "No necesitas 15 proyectos, necesitas 3 o 4 buenos. En chaski, por ejemplo, el portafolio permite hasta 6 proyectos — y eso es suficiente para casi cualquier categoría. Un portafolio con muchos proyectos mediocres genera menos confianza que uno corto con trabajo que realmente demuestre lo que sabes hacer. Si estás empezando y no tienes trabajo pagado todavía, un proyecto personal bien ejecutado cuenta más que uno real hecho a medias.",
      },
      {
        tipo: "titulo",
        texto: "Elige proyectos que representen el trabajo que quieres seguir haciendo",
      },
      {
        tipo: "parrafo",
        texto:
          "Este es el error más común: mostrar todo lo que has hecho en vez de lo que quieres que te sigan pidiendo. Si hiciste un logo hace dos años pero ya no quieres hacer diseño de marca, no lo pongas — atrae exactamente al cliente equivocado. Tu portafolio debería ser un espejo de la categoría de trabajo en la que quieres que te encuentren, no un archivo histórico de todo lo que alguna vez hiciste.",
      },
      {
        tipo: "titulo",
        texto: "Cómo describir cada proyecto",
      },
      {
        tipo: "parrafo",
        texto:
          "Un título y una imagen no bastan. La descripción es donde realmente conviertes: cuenta brevemente cuál era el problema del cliente, qué hiciste tú específicamente (no 'participé en', sino 'diseñé' o 'desarrollé') y qué resultado tuvo si lo sabes (más visitas, más ventas, entrega a tiempo). Dos o tres frases son suficientes — no es un ensayo, es una prueba rápida de que sabes lo que haces.",
      },
      {
        tipo: "lista",
        items: [
          "Título claro y específico: 'Rediseño de tienda en línea para marca de ropa' en vez de solo 'Proyecto web'.",
          "Qué problema resolvías y qué hiciste tú exactamente en el proyecto.",
          "Un resultado concreto si lo tienes, aunque sea aproximado.",
          "Una sola imagen representativa por proyecto — no satures con capturas de pantalla de todo el proceso.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Las imágenes importan más de lo que crees",
      },
      {
        tipo: "parrafo",
        texto:
          "Una captura de pantalla pixelada o mal recortada le resta más credibilidad a tu trabajo que no tener imagen. Usa capturas nítidas, bien iluminadas si son fotos de producto físico, y si es posible, muestra el resultado final terminado, no un boceto o versión intermedia. Si tu trabajo es difícil de mostrar visualmente (por ejemplo, consultoría o contabilidad), usa una imagen simple y profesional del contexto — una reunión, un documento, un gráfico — en vez de dejarlo en blanco.",
      },
      {
        tipo: "titulo",
        texto: "Errores que alejan clientes",
      },
      {
        tipo: "lista",
        items: [
          "Portafolio vacío o con placeholders genéricos: para muchos clientes, esto pesa más que un perfil nuevo sin reseñas.",
          "Proyectos sin ningún contexto, solo una imagen y un título de una palabra.",
          "Mezclar categorías muy distintas sin explicar por qué (confunde sobre en qué te especializas realmente).",
          "Imágenes que no corresponden al proyecto descrito, o capturas genéricas bajadas de internet.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Un portafolio no tiene que ser perfecto para empezar a funcionar — tiene que ser honesto, claro y mostrar tu mejor trabajo real. Si todavía no has cargado el tuyo, puedes hacerlo gratis desde tu perfil en chaski y empezar a recibir contactos de clientes que ya vieron lo que sabes hacer antes de escribirte.",
      },
    ],
  },
  {
    slug: "que-preguntar-antes-de-contratar-freelancer",
    titulo: "Qué preguntar antes de contratar a un freelancer: señales de alerta",
    categoria: "Guía para clientes",
    imagen: "/images/blog/como-contratar-freelance-colombia.webp",
    imagenAlt: "Cliente en videollamada con un profesional independiente antes de contratarlo",
    descripcionMeta:
      "Guía práctica para evaluar a un freelancer antes de contratarlo en Colombia y Latinoamérica: qué preguntar, qué revisar y las señales de alerta que no debes ignorar.",
    extracto:
      "El precio y la disponibilidad son fáciles de comparar. Lo difícil es saber si puedes confiar en la persona antes de pagarle. Esta guía cubre qué preguntar, qué revisar y las señales de alerta más comunes antes de contratar a un freelancer.",
    fecha: "2026-09-07",
    minutosLectura: 5,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Comparar precios y disponibilidad es fácil. Lo difícil es saber si la persona que estás por contratar realmente va a cumplir — sobre todo si nunca has trabajado con ella antes. La buena noticia es que evaluar a un freelancer no es tan distinto a evaluar a cualquier proveedor: solo hay que ser un poco más deliberado en unas cuantas cosas puntuales antes de comprometerte.",
      },
      {
        tipo: "titulo",
        texto: "Empieza con una llamada, no solo mensajes de texto",
      },
      {
        tipo: "parrafo",
        texto:
          "Una videollamada de 15 minutos dice más que una semana de mensajes de WhatsApp. Ahí puedes notar dos cosas: si la persona entendió lo que realmente necesitas (no solo lo que escribiste en el mensaje) y si se comunica con claridad. Si alguien evita la llamada e insiste en seguir todo por texto, no es una razón automática para descartarlo, pero sí vale la pena tomarlo en cuenta.",
      },
      {
        tipo: "titulo",
        texto: "Pide contexto sobre proyectos anteriores, no solo el link del portafolio",
      },
      {
        tipo: "parrafo",
        texto:
          "Cualquiera puede mandar un link a un portafolio. Lo que es más difícil de improvisar es el contexto: pregunta cuál fue su rol exacto en un proyecto anterior, cuál era el objetivo del cliente y qué haría diferente ahora. Alguien que de verdad hizo el trabajo responde esto en segundos. Alguien que solo está mostrando trabajo ajeno o de un equipo generalmente no pasa la segunda pregunta de seguimiento.",
      },
      {
        tipo: "titulo",
        texto: "Consigue una forma directa de contactarlo",
      },
      {
        tipo: "parrafo",
        texto:
          "Un número de teléfono, WhatsApp o correo personal — algo fuera de la plataforma donde lo encontraste. Esto importa menos por seguridad y más como señal: los profesionales que planean quedarse trabajando a largo plazo normalmente no tienen problema en compartir esto. Si alguien es evasivo al respecto o insiste en que todo pase solo por un chat que podría abandonar mañana, es una alerta leve.",
      },
      {
        tipo: "titulo",
        texto: "Empieza con un proyecto pequeño y bien definido",
      },
      {
        tipo: "parrafo",
        texto:
          "Esta es la mejor forma de reducir el riesgo, y casi no cuesta nada. En vez de comprometerte a un proyecto de tres meses desde el primer día, define una tarea pequeña con un entregable claro — algo de una semana, con un final concreto. Vas a aprender más sobre cómo trabaja esa persona con un proyecto chico real que con cualquier cantidad de llamadas o revisiones de portafolio, y si algo no funciona, el riesgo queda contenido.",
      },
      {
        tipo: "titulo",
        texto: "Señales de alerta que sí debes tomar en serio",
      },
      {
        tipo: "lista",
        items: [
          "Pedir el pago completo por adelantado antes de acordar cualquier alcance o entregable.",
          "Respuestas vagas o evasivas cuando le preguntas algo específico sobre cómo va a hacer el trabajo.",
          "Cobrar muy por debajo del rango que ves en perfiles similares, sin ninguna razón clara.",
          "No tener ninguna forma verificable de contacto fuera de un solo chat.",
          "Presionarte para saltarte un proyecto de prueba pequeño e ir directo a un compromiso grande y largo.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Cuando la plataforma ya hace parte de esta verificación por ti",
      },
      {
        tipo: "parrafo",
        texto:
          "No todo tiene que ser manual. En chaski, los proveedores pueden verificar su identidad, y los perfiles verificados muestran una insignia visible en su página pública — no es garantía de calidad, pero sí confirma que la persona detrás del perfil es quien dice ser, lo que te quita una capa de incertidumbre incluso antes de la primera llamada.",
      },
      {
        tipo: "parrafo",
        texto:
          "Nada de esto toma más de una hora extra de trabajo, y aplica sin importar si contratas a alguien en tu misma ciudad o en otro país. Si estás listo para empezar, puedes publicar tu proyecto gratis en chaski y recibir contacto directo de profesionales verificados que encajan con lo que necesitas.",
      },
    ],
  },
  {
    slug: "freelance-o-agencia-que-te-conviene",
    titulo: "Freelance o agencia: qué te conviene según tu proyecto",
    categoria: "Guía para clientes",
    imagen: "/images/blog/freelance-o-agencia-que-te-conviene.webp",
    imagenAlt: "Un freelancer trabajando solo junto a un equipo de agencia colaborando en otra mesa",
    descripcionMeta:
      "Comparación práctica entre contratar un freelancer y contratar una agencia: costos, velocidad, control y en qué casos conviene cada opción.",
    extracto:
      "No hay una respuesta única — depende del proyecto. Esta guía compara costos, velocidad y nivel de control entre contratar un freelancer independiente y contratar una agencia, para que decidas con información real.",
    fecha: "2026-09-10",
    minutosLectura: 5,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Cuando necesitas contratar ayuda profesional, la primera decisión no es a quién contratar, sino qué tipo de proveedor: ¿un freelancer independiente o una agencia? Ambos pueden hacer buen trabajo, pero encajan mejor en situaciones distintas. Esta guía compara las diferencias reales para que decidas según tu proyecto, no según cuál suena más 'seguro'.",
      },
      {
        tipo: "titulo",
        texto: "Costo",
      },
      {
        tipo: "parrafo",
        texto:
          "Un freelancer casi siempre cuesta menos que una agencia por el mismo trabajo, porque no está cubriendo los gastos fijos de una oficina, un equipo de ventas o varios niveles de gerencia entre tú y quien hace el trabajo real. Una agencia puede cobrar 2 o 3 veces más por una tarea comparable — parte de eso paga procesos y garantías que un freelancer no ofrece, pero para un proyecto pequeño o mediano, ese costo extra no siempre se traduce en mejor resultado.",
      },
      {
        tipo: "titulo",
        texto: "Velocidad y comunicación",
      },
      {
        tipo: "parrafo",
        texto:
          "Con un freelancer hablas directamente con la persona que hace el trabajo — no hay intermediarios que filtren o retrasen la comunicación. Eso suele significar respuestas más rápidas y menos malentendidos, porque no hay que 'traducir' lo que pediste a través de un gerente de cuenta. Las agencias, a cambio, suelen tener procesos más estructurados de seguimiento, que ayudan en proyectos largos con muchas partes móviles.",
      },
      {
        tipo: "titulo",
        texto: "Capacidad y respaldo",
      },
      {
        tipo: "parrafo",
        texto:
          "Aquí es donde una agencia gana terreno: si tu proyecto necesita varias disciplinas a la vez (por ejemplo, diseño, desarrollo y redacción trabajando en paralelo) o si necesitas garantía de continuidad aunque una persona específica se enferme o renuncie, una agencia tiene más capacidad de absorber eso. Un freelancer, por definición, es una sola persona — si tu proyecto depende de mucho volumen simultáneo, puede quedarse corto.",
      },
      {
        tipo: "titulo",
        texto: "Flexibilidad",
      },
      {
        tipo: "parrafo",
        texto:
          "Los freelancers suelen ser más flexibles para proyectos pequeños, puntuales o de alcance cambiante — no hay contratos mínimos ni procesos de aprobación largos para ajustar el rumbo. Las agencias, especialmente las más grandes, funcionan mejor con alcances definidos desde el inicio y cambian de dirección más lento porque involucran a más gente en cada decisión.",
      },
      {
        tipo: "titulo",
        texto: "Cuándo conviene cada opción",
      },
      {
        tipo: "lista",
        items: [
          "Freelance: proyectos puntuales, presupuesto ajustado, necesitas hablar directo con quien hace el trabajo, o el alcance puede cambiar sobre la marcha.",
          "Agencia: proyectos grandes con varias disciplinas en paralelo, necesitas garantía de continuidad del equipo, o el proceso interno de tu empresa requiere un proveedor con estructura formal (facturación corporativa, contratos tipo, etc.).",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "No es una decisión de 'cuál es mejor' sino 'cuál encaja con lo que necesitas ahora'. Muchas empresas usan ambos según el proyecto: freelancers para tareas puntuales y agencias para iniciativas grandes y continuas. Si tu próximo proyecto encaja en el primer grupo, puedes publicarlo gratis en chaski y recibir contacto directo de profesionales independientes en Latinoamérica.",
      },
    ],
  },
  {
    slug: "como-recibir-pagos-internacionales-freelancer",
    titulo: "Cómo recibir pagos de clientes internacionales siendo freelancer en Latinoamérica",
    categoria: "Guía para freelancers",
    imagen: "/images/blog/como-recibir-pagos-internacionales-freelancer.webp",
    imagenAlt: "Freelancer latinoamericano revisando una transferencia internacional en su laptop",
    descripcionMeta:
      "Guía práctica para freelancers en Latinoamérica: qué plataforma conviene más para cobrar a clientes en EE.UU. o Europa (Wise, Payoneer, PayPal, transferencia bancaria), cuánto cobra cada una en comisión y qué es el formulario W-8BEN que probablemente te van a pedir.",
    extracto:
      "Si ya tienes o estás por conseguir tu primer cliente internacional, el momento de la verdad llega cuando toca decidir cómo te va a pagar. Esta guía compara las plataformas más usadas para cobrar desde Latinoamérica, cuánto se queda cada una en el camino y qué es ese formulario en inglés que probablemente te van a pedir firmar.",
    fecha: "2026-09-18",
    minutosLectura: 7,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Conseguir un cliente en Estados Unidos o Europa es una gran noticia, pero trae una pregunta que casi ningún freelancer resuelve bien la primera vez: ¿por dónde te van a pagar? No es un detalle menor — según la plataforma que elijas, puedes terminar perdiendo entre el 1% y el 5% de cada pago en comisiones y tipo de cambio, además de esperar días de más para ver la plata en tu cuenta. Esta guía compara las opciones más comunes para que decidas con información real, no adivinando.",
      },
      {
        tipo: "titulo",
        texto: "Las opciones más usadas para cobrar desde Latinoamérica",
      },
      {
        tipo: "lista",
        items: [
          "Wise: usa la tasa de cambio real (la misma que ves en Google), sin margen escondido. La comisión total suele quedar entre 0.5% y 2% dependiendo de la moneda y el país. Es, en la mayoría de los casos, la opción más barata para recibir dólares o euros y convertirlos a pesos, soles o el peso que uses.",
          "Payoneer: cobra alrededor de 1% por la transferencia más un margen cambiario de aproximadamente 0.5%, para un total cercano al 2%. Es muy usada porque muchas plataformas de freelance (Upwork, Fiverr) la tienen integrada directamente, así que si ya trabajas con esas plataformas probablemente ya tengas cuenta.",
          "PayPal: es la más conocida, pero también la más cara para Latinoamérica — el margen cambiario suele estar entre 3% y 4% por encima de la tasa real, más una comisión fija según el país. En varios países de la región además tiene restricciones para retirar directo a tu cuenta bancaria local, así que conviene revisar esto antes de pedirle a un cliente que te pague por ahí.",
          "Transferencia bancaria (wire transfer): funciona en cualquier país, pero suele tener comisiones fijas más altas (entre USD 15 y 50 por transferencia, a veces cobradas por ambos bancos) y tarda de 2 a 5 días hábiles. Tiene sentido para pagos grandes y puntuales, pero es caro si tu cliente te paga con frecuencia montos pequeños.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Como referencia rápida: si te pagan con frecuencia y en montos medianos, Wise suele ganar. Si tu cliente ya usa Payoneer porque contrata a través de una plataforma grande, tiene sentido simplemente usar esa. PayPal conviene solo si el cliente insiste y no hay otra opción — pero entonces vale la pena pedirle un poco más para compensar lo que se va a quedar en comisiones.",
      },
      {
        tipo: "titulo",
        texto: "El formulario que probablemente te van a pedir: W-8BEN",
      },
      {
        tipo: "parrafo",
        texto:
          "Si tu cliente es una empresa en Estados Unidos, es muy probable que en algún momento te pida firmar un formulario llamado W-8BEN. No es nada que debas temer: es simplemente la forma en que tu cliente le confirma al gobierno de EE.UU. que tú no eres una persona ni empresa estadounidense, y por lo tanto no le corresponde retenerte impuestos ni reportar el pago ante el IRS. El formulario lo guarda tu cliente en sus archivos — no lo envías tú directamente a ninguna autoridad, y es válido desde que lo firmas hasta el 31 de diciembre del tercer año siguiente.",
      },
      {
        tipo: "parrafo",
        texto:
          "Si un cliente en EE.UU. no te pide este formulario y no tiene ningún documento tuyo en regla, por defecto podría verse obligado a retenerte hasta un 30% del pago como impuesto — así que en realidad te conviene ser tú quien lo mencione primero. Puedes decir algo simple como: 'Para que no tengas que retenerme impuestos en EE.UU., te puedo firmar un W-8BEN, es un formulario corto y estándar para contratistas internacionales.' Eso solo ya te posiciona como alguien que sabe cómo funciona esto.",
      },
      {
        tipo: "titulo",
        texto: "Cómo evitar sorpresas con retenciones y bloqueos",
      },
      {
        tipo: "lista",
        items: [
          "Si vas a usar PayPal, verifica tu cuenta completamente (identidad, cuenta bancaria vinculada) antes de recibir tu primer pago grande — las cuentas nuevas o sin verificar son las que más sufren bloqueos temporales de fondos.",
          "Ten una cuenta en dólares o la moneda del cliente, aunque sea en Wise o Payoneer, en vez de convertir automáticamente todo a tu moneda local — así decides tú cuándo convertir, en vez de que la plataforma te dé la tasa del día que sea.",
          "Acuerda por escrito, antes de empezar el trabajo, quién asume el costo de la transferencia — en pagos internacionales es normal dividir la diferencia o que cada uno pague su lado de la comisión.",
          "Si el pago es grande (varios miles de dólares), compara el costo real de Wise vs. transferencia bancaria directa para ese monto específico — a veces la comisión fija de un wire se vuelve más barata en proporción cuando el monto es alto.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Saber cómo cobrar bien no solo te ahorra dinero en cada pago — también te hace ver más profesional frente a un cliente internacional, que es exactamente el tipo de detalle que hace que te vuelva a contratar. Si todavía no tienes perfil en chaski, puedes crear el tuyo gratis y empezar a recibir contacto directo de clientes, sin bidding wars ni comisión de la plataforma sobre lo que cobras.",
      },
    ],
  },
  {
    slug: "como-armar-contrato-servicios-freelance",
    titulo: "Cómo armar un contrato de servicios freelance: qué debe incluir y qué errores evitar",
    categoria: "Guía para freelancers",
    imagen: "/images/blog/como-armar-contrato-servicios-freelance.webp",
    imagenAlt: "Freelancer y cliente revisando y firmando un contrato de servicios en una mesa de trabajo",
    descripcionMeta:
      "Guía práctica para freelancers en Latinoamérica: qué cláusulas debe tener un contrato de servicios (alcance, pagos, revisiones, propiedad intelectual, terminación) y cómo evitar los problemas más comunes con clientes.",
    extracto:
      "Un contrato no es desconfianza, es claridad. Esta guía explica, en lenguaje simple, las cláusulas que debería tener cualquier acuerdo de trabajo freelance y los errores que más dolores de cabeza causan cuando algo sale mal.",
    fecha: "2026-10-07",
    minutosLectura: 7,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Muchos freelancers empiezan a trabajar con un 'dale, arrancamos' por WhatsApp y un precio acordado de palabra. Funciona hasta que el cliente pide algo que no estaba en el plan, se demora tres meses en pagar, o dice que lo que entregaste 'no era lo que imaginaba'. Un contrato escrito no es desconfianza: es la forma de que ambas partes tengan la misma idea de qué se va a hacer, cuánto cuesta y qué pasa si algo cambia. Y no tiene que ser un documento de veinte páginas con lenguaje de abogado — uno claro de una o dos páginas ya te protege mucho.",
      },
      {
        tipo: "titulo",
        texto: "Las cláusulas que no deberían faltar",
      },
      {
        tipo: "lista",
        items: [
          "Alcance del trabajo: qué vas a hacer, con el mayor detalle razonable. 'Diseñar un logo' es vago; 'diseñar un logo con 3 propuestas iniciales y entrega en formatos PNG, SVG y PDF' es claro. Lo que no está escrito se vuelve discusión después.",
          "Entregables y plazos: qué vas a entregar y para cuándo, y qué necesitas tú del cliente para cumplirlo (textos, accesos, aprobaciones). Aclara que si el cliente demora en responder, el plazo se corre en la misma proporción.",
          "Precio y forma de pago: monto total, moneda, método de pago y fechas. Para proyectos de varios días o semanas, lo más común es pedir un anticipo (por ejemplo, la mitad al inicio) y el resto contra entrega. Indica también qué pasa si un pago se atrasa.",
          "Revisiones incluidas: cuántas rondas de cambios están dentro del precio. Sin este límite, un proyecto puede alargarse indefinidamente. Lo que exceda ese número se cobra aparte.",
          "Propiedad intelectual: quién es dueño del trabajo final y desde cuándo. Lo habitual es que los derechos pasen al cliente una vez se complete el pago, no antes. También conviene aclarar si puedes mostrar el trabajo en tu portafolio.",
          "Confidencialidad: si vas a ver información sensible del negocio del cliente, es normal que te pida (o que tú ofrezcas) no compartirla con terceros.",
          "Terminación: cómo cualquiera de las dos partes puede dar por terminado el acuerdo, con cuánto aviso, y cómo se paga el trabajo ya realizado hasta ese punto.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Errores comunes que conviene evitar",
      },
      {
        tipo: "lista",
        items: [
          "Empezar a trabajar sin anticipo con un cliente nuevo: si no hay ningún pago de por medio, el riesgo de quedarte sin cobrar recae completamente en ti.",
          "Dejar el alcance abierto ('lo que haga falta'): es la causa número uno de proyectos que se vuelven más grandes que lo que cobraste.",
          "Aceptar cambios importantes por mensaje sin dejar registro: si el cliente cambia el alcance, confirma por escrito el nuevo precio y plazo antes de seguir.",
          "Copiar un contrato de internet sin leerlo: un modelo genérico puede incluir cláusulas que no aplican a tu caso o que te perjudican. Léelo completo y ajústalo.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Contratos con clientes de otro país",
      },
      {
        tipo: "parrafo",
        texto:
          "Si tu cliente está en otro país, vale la pena sumar dos puntos: en qué moneda y por qué medio se hará el pago (y quién asume las comisiones de la transferencia), y qué ley se aplicaría si hubiera un desacuerdo. No tienes que resolver esto como abogado, pero sí dejarlo escrito para que no sea una sorpresa. Una firma electrónica simple suele ser suficiente para este tipo de acuerdos entre contratistas independientes y clientes, aunque los requisitos exactos dependen de cada país.",
      },
      {
        tipo: "parrafo",
        texto:
          "Una aclaración importante: esta guía es informativa y no reemplaza asesoría legal. Si el proyecto es grande, involucra mucho dinero o propiedad intelectual de alto valor, vale la pena que un abogado revise tu modelo de contrato una vez — y luego lo reutilizas con ajustes menores en cada proyecto. Y si todavía no tienes perfil en chaski, puedes crear el tuyo gratis y recibir contacto directo de clientes, sin comisión de la plataforma sobre lo que cobras.",
      },
    ],
  },
  {
    slug: "como-contratar-asistente-virtual",
    titulo: "Cómo contratar un asistente virtual: qué tareas delegar, cuánto cuesta y cómo empezar",
    categoria: "Guía para clientes",
    imagen: "/images/blog/como-contratar-asistente-virtual.webp",
    imagenAlt: "Emprendedora organizando su agenda y delegando tareas a un asistente virtual por videollamada",
    descripcionMeta:
      "Guía para emprendedores y pequeños negocios: qué tareas puede hacer un asistente virtual, cómo definir qué delegar, qué revisar antes de contratar y cómo empezar con una prueba corta sin comprometerte de más.",
    extracto:
      "Si sientes que tu día se va en correos, agenda y tareas repetitivas, un asistente virtual puede devolverte horas. Esta guía explica qué tareas conviene delegar, qué preguntar antes de contratar y cómo arrancar sin riesgo.",
    fecha: "2026-10-07",
    minutosLectura: 6,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Un asistente virtual (o AV) es un profesional independiente que te ayuda de forma remota con tareas administrativas y operativas: desde ordenar tu agenda hasta responder correos o actualizar una hoja de cálculo. Para un emprendedor o un negocio pequeño, es una de las formas más accesibles de recuperar tiempo para lo que realmente mueve el negocio, sin tener que contratar a alguien de tiempo completo.",
      },
      {
        tipo: "titulo",
        texto: "Qué tareas se pueden delegar",
      },
      {
        tipo: "lista",
        items: [
          "Gestión de agenda y correo: coordinar reuniones, filtrar y responder mensajes rutinarios, enviar recordatorios.",
          "Atención al cliente básica: responder preguntas frecuentes por correo o chat siguiendo guías que tú le des.",
          "Tareas de datos: actualizar hojas de cálculo, cargar información en un CRM, organizar archivos y facturas.",
          "Redes sociales: programar publicaciones ya creadas, responder comentarios, hacer reportes simples.",
          "Investigación: buscar proveedores, comparar opciones, armar listas de contactos o de prospectos.",
          "Teneduría de libros básica y seguimiento de pagos, si el asistente tiene esa experiencia.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Cómo decidir qué delegar primero",
      },
      {
        tipo: "parrafo",
        texto:
          "Una manera sencilla de empezar: durante una semana, anota todo lo que haces y marca las tareas que son repetitivas, que no requieren tu criterio único y que te quitan energía. Esas son las candidatas ideales. Lo que sigue necesitando tu decisión directa (estrategia, precios, relaciones clave) sigue siendo tuyo. Delegar no es soltar el control: es dejar de gastar tu mejor tiempo en lo que otro puede hacer igual de bien con instrucciones claras.",
      },
      {
        tipo: "titulo",
        texto: "Qué revisar antes de contratar",
      },
      {
        tipo: "lista",
        items: [
          "Experiencia con las herramientas que usas: Google Workspace, Microsoft 365, tu CRM, tu herramienta de agenda. Pregunta directamente por ellas.",
          "Nivel de idioma: si tus clientes o tu comunicación son en inglés, haz una prueba corta de escritura o una llamada breve para evaluarlo.",
          "Zona horaria y disponibilidad: acuerda desde el inicio en qué horas va a estar disponible y cuánto tarda normalmente en responder.",
          "Referencias o trabajos previos: pide ejemplos concretos o contacto de un cliente anterior cuando sea posible.",
          "Cómo maneja la información sensible: si va a tener acceso a cuentas o datos de clientes, habla de confidencialidad y de cómo se compartirán los accesos de forma segura.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Cómo empezar sin riesgo",
      },
      {
        tipo: "parrafo",
        texto:
          "Lo más sensato es arrancar con una prueba corta y acotada: una o dos semanas con unas pocas tareas bien definidas, por escrito, con un pago acordado de antemano. Así ves cómo trabaja, qué tan bien sigue instrucciones y si la comunicación fluye, antes de comprometerte con algo más grande. Si va bien, amplías las tareas o las horas poco a poco; si no, el costo de haberlo probado fue pequeño.",
      },
      {
        tipo: "parrafo",
        texto:
          "Si estás listo para dar ese primer paso, en chaski puedes publicar lo que necesitas gratis y recibir contacto directo de profesionales de Latinoamérica interesados en ayudarte, sin comisiones ni intermediarios.",
      },
    ],
  },
  {
    slug: "como-escribir-brief-proyecto-freelancer",
    titulo: "Cómo escribir un brief de proyecto para un freelancer (con plantilla)",
    categoria: "Guía para clientes",
    imagen: "/images/blog/como-escribir-brief-proyecto-freelancer.webp",
    imagenAlt: "Un cliente y una diseñadora revisando un brief de proyecto con referencias visuales sobre la mesa",
    descripcionMeta:
      "Aprende a escribir un brief claro para contratar a un freelancer: qué debe incluir (objetivo, alcance, presupuesto, plazos), errores comunes y una plantilla simple para copiar y usar hoy.",
    extracto:
      "La mayoría de los proyectos que salen mal empiezan con una descripción vaga. Un buen brief ahorra tiempo, evita malentendidos y hace que los mejores profesionales quieran trabajar contigo. Aquí tienes qué incluir y una plantilla lista para usar.",
    fecha: "2026-10-13",
    minutosLectura: 6,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Un brief es el documento corto donde le explicas a un freelancer qué necesitas, para qué y bajo qué condiciones. No tiene que ser largo ni formal: con una página bien pensada ya reduces gran parte de los problemas típicos, como propuestas que no se ajustan a lo que querías, cotizaciones muy distintas entre sí o revisiones interminables. Además, los profesionales con más experiencia suelen preferir trabajar con clientes que saben explicar lo que buscan.",
      },
      {
        tipo: "titulo",
        texto: "Qué debe incluir un buen brief",
      },
      {
        tipo: "lista",
        items: [
          "Quién eres y a qué se dedica tu negocio: dos o tres frases bastan. Le da contexto al profesional para entender tu público y tu estilo.",
          "El objetivo del proyecto: qué quieres lograr, no solo qué quieres que hagan. 'Quiero más reservas desde mi página web' orienta mejor que 'quiero rediseñar mi página'.",
          "Alcance y entregables: qué debe estar listo al final (por ejemplo: 5 páginas web, 3 versiones de logo, 10 publicaciones). Cuanto más concreto, mejor.",
          "Referencias: ejemplos de trabajos o marcas que te gustan (y, si puedes, algo que no te gusta). Una imagen o un enlace dice más que un párrafo.",
          "Plazos: fecha límite deseada y si hay fechas intermedias importantes, como un lanzamiento o un evento.",
          "Presupuesto: un monto o un rango. Muchos clientes lo omiten por miedo a pagar de más, pero decirlo evita recibir propuestas fuera de tu alcance y ahorra tiempo a ambos.",
          "Qué vas a aportar tú: textos, logos, accesos, fotos y cuánto tardarás en responder. Los retrasos suelen venir de este lado.",
          "Cómo evaluarás propuestas: si te importa más el precio, la experiencia previa, el portafolio o la rapidez.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Errores comunes al escribir un brief",
      },
      {
        tipo: "lista",
        items: [
          "Ser demasiado vago ('necesito algo moderno y bonito'): cada persona interpreta eso de forma distinta.",
          "Mezclar varios proyectos en uno: si necesitas logo, página web y redes sociales, quizá convenga contratar por etapas o con distintos especialistas.",
          "No mencionar el presupuesto ni el plazo: obliga al profesional a adivinar y suele terminar en propuestas poco comparables.",
          "Cambiar el alcance sobre la marcha sin avisar: si algo cambia, díselo cuanto antes y acuerden de nuevo precio y fecha.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Plantilla simple para copiar",
      },
      {
        tipo: "lista",
        items: [
          "Sobre mi negocio: [qué hago, para quién].",
          "Objetivo del proyecto: [qué quiero lograr].",
          "Qué necesito que entregues: [lista concreta].",
          "Referencias: [enlaces o ejemplos].",
          "Fecha deseada de entrega: [fecha].",
          "Presupuesto aproximado: [monto o rango].",
          "Lo que yo voy a aportar: [materiales, accesos, tiempos de respuesta].",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Con esto listo, el siguiente paso es mucho más fácil. En chaski puedes publicar tu proyecto gratis y recibir contacto directo de profesionales de Latinoamérica interesados, sin comisiones ni intermediarios. Mientras más claro sea tu brief, mejores serán las propuestas que recibas.",
      },
    ],
  },
  {
    slug: "como-escribir-propuesta-que-gane-proyectos",
    titulo: "Cómo escribir una propuesta que gane proyectos como freelancer",
    categoria: "Guía para freelancers",
    imagen: "/images/blog/como-escribir-propuesta-que-gane-proyectos.webp",
    imagenAlt: "Freelancer preparando una propuesta en su laptop mientras conversa con un cliente por videollamada",
    descripcionMeta:
      "Guía para freelancers: cómo estructurar una propuesta comercial que convenza (entender el problema, tu enfoque, entregables, precio y siguiente paso) y errores que hacen que te descarten.",
    extracto:
      "Responder con una propuesta genérica es la forma más rápida de que te ignoren. Esta guía explica cómo armar una propuesta corta, clara y centrada en el cliente, y qué errores evitar.",
    fecha: "2026-10-13",
    minutosLectura: 6,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Cuando un cliente publica un proyecto, normalmente recibe varias respuestas. Muchas son casi idénticas: un saludo, una lista de habilidades y un 'quedo atento'. La propuesta que destaca no es necesariamente la de quien tiene más experiencia, sino la que demuestra que entendió lo que el cliente necesita y que sabe cómo resolverlo. La buena noticia es que eso se puede aprender con una estructura sencilla.",
      },
      {
        tipo: "titulo",
        texto: "Una estructura que funciona",
      },
      {
        tipo: "lista",
        items: [
          "Empieza por el cliente, no por ti: en una o dos frases, demuestra que leíste el proyecto. Menciona algo específico de lo que pidió, en vez de un saludo genérico.",
          "Resume el problema o el objetivo con tus propias palabras: así el cliente confirma que están en la misma página.",
          "Explica tu enfoque: cómo piensas abordarlo, en pasos cortos. No necesitas revelar todo, pero sí mostrar que tienes un plan.",
          "Muestra una prueba relevante: uno o dos trabajos parecidos al suyo (con enlace), mejor que una lista larga de proyectos sin relación.",
          "Define entregables, plazo y precio: claro y sin rodeos. Si hay opciones (básica y completa), puedes ofrecer dos paquetes.",
          "Cierra con un siguiente paso concreto: por ejemplo, proponer una llamada corta o hacer una pregunta que ayude a avanzar.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Errores que hacen que te descarten",
      },
      {
        tipo: "lista",
        items: [
          "Enviar el mismo texto a todos los clientes: se nota y transmite poco interés.",
          "Hablar solo de ti: el cliente quiere saber cómo vas a resolver su problema, no tu biografía completa.",
          "No mencionar el precio ni el plazo, o hacerlo de manera ambigua: genera desconfianza y alarga la conversación.",
          "Prometer más de lo razonable para ganar el proyecto: puede salirte caro cuando toque cumplir.",
          "Mensajes muy largos: la mayoría de las veces, una propuesta de entre 150 y 250 palabras se lee completa; una de varias páginas, no tanto.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Haz preguntas inteligentes",
      },
      {
        tipo: "parrafo",
        texto:
          "Una o dos preguntas bien pensadas pueden diferenciarte más que cualquier lista de habilidades: '¿Qué resultado esperas ver en los primeros 30 días?' o '¿Tienes ya una identidad de marca definida o hay que crearla?'. Muestran criterio profesional y, de paso, te ayudan a calcular mejor el esfuerzo antes de cotizar.",
      },
      {
        tipo: "parrafo",
        texto:
          "Y recuerda que no todos los proyectos valen la pena: si algo no encaja con tu experiencia o el presupuesto es claramente insuficiente, es mejor decir que no con amabilidad. Si todavía no tienes perfil en chaski, puedes crear el tuyo gratis y recibir contacto directo de clientes, sin comisión de la plataforma sobre lo que cobras.",
      },
    ],
  },
  {
    slug: "como-pedir-resenas-clientes-freelancer",
    titulo: "Cómo pedir reseñas a tus clientes siendo freelancer (y por qué importan tanto)",
    categoria: "Guía para freelancers",
    imagen: "/images/blog/como-pedir-resenas-clientes-freelancer.webp",
    imagenAlt: "Freelancer sonriendo al recibir una reseña de cinco estrellas de un cliente satisfecho",
    descripcionMeta:
      "Guía para freelancers: cuándo y cómo pedir reseñas a tus clientes, qué mensaje enviar, cómo responder a una reseña negativa y por qué las reseñas ayudan a conseguir más proyectos.",
    extracto:
      "Para quien no te conoce, una reseña de un cliente anterior pesa más que cualquier cosa que digas de ti mismo. Esta guía explica cuándo pedirla, cómo hacerlo sin incomodar y qué hacer si recibes una crítica.",
    fecha: "2026-10-20",
    minutosLectura: 5,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Cuando un cliente nuevo evalúa a varios freelancers, rara vez puede comprobar quién es mejor. Lo que sí puede ver es qué dicen otros clientes. Una reseña real funciona como una recomendación: reduce la duda de contratar a alguien desconocido. El problema es que muchos freelancers terminan un proyecto, cobran y nunca piden esa opinión, ya sea por pena o por olvido.",
      },
      {
        tipo: "titulo",
        texto: "Cuándo pedirla",
      },
      {
        tipo: "parrafo",
        texto:
          "El mejor momento es justo después de entregar el trabajo y de que el cliente exprese que está conforme: en ese punto el resultado está fresco y la relación es buena. Esperar semanas hace que el cliente olvide detalles o se sienta menos motivado. Si el proyecto fue largo, también puedes pedirla al cerrar una etapa importante.",
      },
      {
        tipo: "titulo",
        texto: "Cómo pedirla sin incomodar",
      },
      {
        tipo: "lista",
        items: [
          "Hazlo fácil: envía el enlace directo donde puede dejar la reseña y aclara que toma dos minutos.",
          "Sé específico con lo que ayudaría: 'me sirve mucho que cuentes cómo fue el proceso y el resultado'. Esto produce reseñas más útiles que un simple 'excelente'.",
          "Agradece primero: empieza por agradecer la confianza y el trabajo en conjunto, y luego haz la petición.",
          "No presiones ni ofrezcas descuentos a cambio de una reseña positiva: debe ser una opinión honesta, y las plataformas serias lo desaconsejan.",
          "Haz un recordatorio amable si pasan unos días: un solo mensaje de seguimiento es suficiente.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Un mensaje que puedes adaptar",
      },
      {
        tipo: "parrafo",
        texto:
          "'Hola [nombre], muchas gracias por confiar en mí para [proyecto]; fue un gusto trabajar contigo. Si quedaste conforme, me ayudaría mucho que dejaras una breve reseña sobre cómo fue la experiencia. Aquí tienes el enlace: [enlace]. Toma solo un par de minutos. ¡Gracias de nuevo!'",
      },
      {
        tipo: "titulo",
        texto: "Qué hacer si recibes una reseña negativa",
      },
      {
        tipo: "parrafo",
        texto:
          "No es el fin del mundo, y manejarla bien puede jugar a tu favor. Responde con calma, sin ponerte a la defensiva: agradece el comentario, reconoce lo que pueda ser cierto y explica brevemente qué harías distinto o cómo lo resolviste. Quien lea tu perfil verá a alguien profesional. Y si la reseña contiene información falsa o es abusiva, revisa si la plataforma tiene un mecanismo para reportarla.",
      },
      {
        tipo: "parrafo",
        texto:
          "Con el tiempo, las reseñas se acumulan y se vuelven uno de tus mejores argumentos de venta. En chaski, los clientes pueden calificar a los profesionales y esa calificación aparece en tu perfil público. Si todavía no tienes perfil, puedes crearlo gratis y empezar a construir tu reputación desde tu primer proyecto.",
      },
    ],
  },
  {
    slug: "cuanto-cuesta-un-asistente-virtual-latinoamerica",
    titulo: "Cuánto cuesta un asistente virtual en Latinoamérica (2026)",
    categoria: "Guía para clientes",
    imagen: "/images/blog/como-contratar-asistente-virtual.webp",
    imagenAlt: "Emprendedora revisando el presupuesto de un asistente virtual en su laptop",
    descripcionMeta:
      "Rangos de tarifas de asistentes virtuales en Latinoamérica en 2026, cómo se comparan con EE. UU. y Filipinas, qué hace subir o bajar el precio y los costos ocultos que conviene considerar.",
    extracto:
      "¿Cuánto se paga por un asistente virtual en Latinoamérica? Aquí van los rangos de referencia, qué los mueve, cómo se comparan con otras regiones y qué costos extra conviene tener en cuenta antes de contratar.",
    fecha: "2026-10-27",
    minutosLectura: 6,
    contenido: [
      {
        tipo: "parrafo",
        texto:
          "Una de las primeras preguntas al pensar en contratar un asistente virtual es cuánto va a costar. La respuesta corta es que depende, y los rangos son amplios. Antes de dar cifras, una advertencia importante: no existe una tarifa oficial ni un estándar de mercado. Los números que circulan vienen sobre todo de agencias y plataformas que venden estos servicios, y varían de una fuente a otra. Tómalos como referencias para orientarte, no como precios cerrados.",
      },
      {
        tipo: "titulo",
        texto: "Rangos de referencia por hora",
      },
      {
        tipo: "lista",
        items: [
          "Latinoamérica: las estimaciones suelen ubicarse entre US$8 y US$25 por hora, según la experiencia, el nivel de inglés y el tipo de tareas. Algunas fuentes sitúan el trabajo administrativo básico en la parte baja de ese rango y los perfiles bilingües con experiencia en la parte alta.",
          "Estados Unidos: las referencias van desde cerca de US$20 hasta más de US$60 por hora, según la especialidad. Una de las cifras más citadas ubica el promedio de un asistente virtual en EE. UU. alrededor de US$24 por hora.",
          "Filipinas: suele aparecer como la opción más económica, con estimaciones de entre US$5 y US$15 por hora.",
          "Agencias: cuando el asistente llega a través de una agencia, el precio suele ser mayor (una fuente habla de un recargo de entre 20 % y 40 % sobre la tarifa de un independiente) a cambio de selección previa y reemplazo si no funciona.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Para dar un ejemplo local: algunas agencias anuncian asistentes en Colombia desde unos US$8 por hora, mientras que las ofertas de empleo de tiempo completo en el país publican salarios mensuales de entre 1,5 y 2,5 millones de pesos. Son dos formas distintas de contratar y no se comparan directamente: la primera es un servicio independiente o de agencia, la segunda es un empleo formal con sus propias obligaciones.",
      },
      {
        tipo: "titulo",
        texto: "Qué hace subir o bajar el precio",
      },
      {
        tipo: "lista",
        items: [
          "Tipo de tareas: agenda y correo cuestan menos que gestión de clientes, contabilidad básica, atención al cliente o soporte de herramientas especializadas.",
          "Nivel de inglés: si necesitas que escriba y hable con fluidez con clientes de EE. UU., el rango sube.",
          "Experiencia y herramientas: dominar tu CRM, tu software de facturación o tus herramientas de proyectos tiene un valor real.",
          "Horas y continuidad: un acuerdo de varias horas fijas a la semana suele salir mejor por hora que tareas sueltas.",
          "Zona horaria: si necesitas disponibilidad en un horario específico, lo más probable es que influya en el precio.",
        ],
      },
      {
        tipo: "titulo",
        texto: "Costos que no siempre se mencionan",
      },
      {
        tipo: "parrafo",
        texto:
          "La tarifa por hora no es todo. Piensa también en el tiempo que tú inviertes en explicar y revisar, en las herramientas (gestor de contraseñas, software de gestión, licencias) y en el período de adaptación. Una de las fuentes que consultamos estima que el software, la incorporación y la gestión pueden sumar entre US$2.000 y US$6.000 al año, aunque esa cifra varía mucho según el tamaño y el tipo de negocio. Si eres tú quien contrata, haz una estimación simple de cuántas horas tuyas va a requerir al inicio.",
      },
      {
        tipo: "titulo",
        texto: "Si eres tú quien ofrece el servicio",
      },
      {
        tipo: "parrafo",
        texto:
          "Esto también sirve a la inversa. Si eres asistente virtual en Colombia o en otro país de la región, ten en cuenta que de tu tarifa salen impuestos, aportes de seguridad social si cotizas como independiente, comisiones de plataformas y costos de conexión o equipo. Calcula cuánto necesitas ganar neto y trabaja hacia atrás, en vez de copiar la tarifa de otra persona. Nuestra calculadora de tarifa freelance puede ayudarte con ese cálculo.",
      },
      {
        tipo: "titulo",
        texto: "Cómo evitar pagar de más (o de menos)",
      },
      {
        tipo: "lista",
        items: [
          "Define las tareas por escrito antes de pedir presupuestos: así los precios son comparables.",
          "Pide dos o tres propuestas y compara no solo la tarifa, sino la experiencia, la disponibilidad y la comunicación.",
          "Desconfía de las tarifas excepcionalmente bajas: pueden indicar poca experiencia o un servicio que no se mantiene en el tiempo.",
          "Empieza con una prueba corta y pagada antes de comprometerte con más horas.",
        ],
      },
      {
        tipo: "parrafo",
        texto:
          "Si quieres ver propuestas reales, en chaski puedes publicar lo que necesitas gratis y recibir contacto directo de asistentes virtuales y otros profesionales de Latinoamérica, sin comisiones ni intermediarios. Tú comparas perfiles y decides con quién trabajar.",
      },
    ],
  },
];

export function obtenerPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
