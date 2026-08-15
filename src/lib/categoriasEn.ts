// Traduccion de nombres de categoria para la experiencia en ingles.
// Las categorias viven en la base de datos solo en espanol (un campo
// "nombre"), asi que esto es un diccionario cliente-side por slug para
// mostrar la etiqueta correcta sin necesitar otro campo en el schema.
export const NOMBRES_CATEGORIA_EN: Record<string, string> = {
  "asistente-virtual": "Virtual assistant",
  psicologia: "Psychology / therapy",
  nutricion: "Nutrition",
  "diseno-web": "Web design",
  impuestos: "Tax preparation",
  "teneduria-libros": "Bookkeeping",
  "marketing-redes": "Social media marketing",
  seo: "SEO / Google ranking",
  "apps-moviles": "Mobile app development",
  "consultoria-rrhh": "HR consulting",
  "consultoria-empresarial": "Business consulting",
  coaching: "Business & professional coaching",
  "diseno-grafico": "Graphic design",
  contabilidad: "Accounting",
  "agencias-marketing": "Marketing agencies",
  "desarrollo-web": "Web development",
  "desarrollo-software": "Software development",
  "publicidad-digital": "Digital advertising",
  copywriting: "Copywriting",
  traduccion: "Translation",
  transcripcion: "Transcription",
  "clases-idiomas": "Language lessons",
  "soporte-tecnico": "Technical support",
  "diseno-logos": "Logo design",
  branding: "Branding & brand identity",
  animacion: "Animation",
  "modelado-3d": "3D modeling / CAD",
};

export function nombreCategoria(cat: { nombre: string; slug: string }, lang: "es" | "en") {
  if (lang === "en") return NOMBRES_CATEGORIA_EN[cat.slug] ?? cat.nombre;
  return cat.nombre;
}
