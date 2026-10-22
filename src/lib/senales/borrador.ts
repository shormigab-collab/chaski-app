// Prioridad y borrador de mensaje. Todo es determinista y se basa solo en
// datos reales de la vacante (titulo, fuente, fecha). El borrador NO se
// envia solo: queda pendiente hasta que una persona lo edite, apruebe y
// marque como enviado.

export function calcularPrioridad(opts: {
  publicadaEn: Date | null;
  vacantesDeLaEmpresa: number;
}): { prioridad: number; razon: string } {
  let puntos = 1;
  const razones: string[] = ["encaja con una categoría de chaski"];

  if (opts.publicadaEn) {
    const dias = Math.floor((Date.now() - opts.publicadaEn.getTime()) / 86_400_000);
    if (dias <= 7) {
      puntos += 3;
      razones.push(`vacante publicada hace ${dias} día(s)`);
    } else if (dias <= 30) {
      puntos += 2;
      razones.push(`vacante publicada hace ${dias} días`);
    } else {
      razones.push(`vacante publicada hace ${dias} días (ya es antigua)`);
    }
  } else {
    razones.push("la fuente no informa la fecha de publicación");
  }

  if (opts.vacantesDeLaEmpresa >= 2) {
    puntos += 2;
    razones.push(`la empresa tiene ${opts.vacantesDeLaEmpresa} vacantes que encajan`);
  }

  return { prioridad: puntos, razon: razones.join("; ") };
}

export function construirBorrador(opts: {
  empresa: string;
  titulo: string;
  categoriaNombre: string;
  argumento: string;
  fuenteNombre?: string;
}): string {
  return `Hola equipo de ${opts.empresa},

Vi que publicaron la vacante «${opts.titulo}» en ${opts.fuenteNombre || "Get on Board"}. ${opts.argumento}

En chaski publican lo que necesitan gratis y profesionales independientes de Latinoamérica les escriben directamente, sin intermediarios. Es un marketplace abierto: ustedes revisan cada perfil y deciden con quién trabajar.

Aquí explicamos cómo funciona: https://www.usechaski.com/como-funciona

¿Les sirve que les cuente más?

Saludos,
`;
}
