import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categorias = [
  { nombre: "Diseño web", slug: "diseno-web", icono: "🌐" },
  { nombre: "Preparación de impuestos", slug: "impuestos", icono: "🧾" },
  { nombre: "Bookkeeping / Teneduría de libros", slug: "teneduria-libros", icono: "📒" },
  { nombre: "Marketing en redes sociales", slug: "marketing-redes", icono: "📱" },
  { nombre: "SEO / Posicionamiento en Google", slug: "seo", icono: "🔍" },
  { nombre: "Desarrollo de aplicaciones móviles", slug: "apps-moviles", icono: "📲" },
  { nombre: "Consultoría de Recursos Humanos", slug: "consultoria-rrhh", icono: "🧑‍💼" },
  { nombre: "Consultoría empresarial", slug: "consultoria-empresarial", icono: "💼" },
  { nombre: "Coaching empresarial y profesional", slug: "coaching", icono: "🎯" },
  { nombre: "Diseño gráfico", slug: "diseno-grafico", icono: "🎨" },
  { nombre: "Contabilidad", slug: "contabilidad", icono: "📊" },
  { nombre: "Agencias de marketing", slug: "agencias-marketing", icono: "📣" },
  { nombre: "Desarrollo web", slug: "desarrollo-web", icono: "💻" },
  { nombre: "Desarrollo de software", slug: "desarrollo-software", icono: "🖥️" },
  { nombre: "Publicidad digital / Media Buying", slug: "publicidad-digital", icono: "📈" },
  { nombre: "Copywriting / Redacción publicitaria", slug: "copywriting", icono: "✍️" },
  { nombre: "Traducción", slug: "traduccion", icono: "🌍" },
  { nombre: "Transcripción", slug: "transcripcion", icono: "🎙️" },
  { nombre: "Clases de idiomas", slug: "clases-idiomas", icono: "🗣️" },
  { nombre: "Soporte técnico", slug: "soporte-tecnico", icono: "🛠️" },
  { nombre: "Diseño de logos", slug: "diseno-logos", icono: "🖋️" },
  { nombre: "Branding / Identidad de marca", slug: "branding", icono: "🏷️" },
  { nombre: "Animación", slug: "animacion", icono: "🎬" },
  { nombre: "Modelado 3D / CAD", slug: "modelado-3d", icono: "🧊" },
];

const paquetes = [
  { nombre: "Paquete Inicial", creditos: 5, precioCOP: 25000 },
  { nombre: "Paquete Profesional", creditos: 15, precioCOP: 60000 },
  { nombre: "Paquete Negocio", creditos: 40, precioCOP: 140000 },
];

async function main() {
  // Elimina categorias antiguas que ya no aplican (si vienes de una version anterior)
  const slugsNuevos = categorias.map((c) => c.slug);
  await prisma.categoria.deleteMany({ where: { slug: { notIn: slugsNuevos } } });

  for (const c of categorias) {
    await prisma.categoria.upsert({
      where: { slug: c.slug },
      update: { nombre: c.nombre, icono: c.icono },
      create: c,
    });
  }

  for (const p of paquetes) {
    const existente = await prisma.paqueteCreditos.findFirst({ where: { nombre: p.nombre } });
    if (!existente) {
      await prisma.paqueteCreditos.create({ data: p });
    }
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@chaski.co";
  const adminPassword = process.env.ADMIN_PASSWORD || "CambiaEstaClave123";
  const adminExistente = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!adminExistente) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    await prisma.user.create({
      data: {
        nombre: "Administrador",
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
        telefono: "0000000000",
      },
    });
    console.log(`Usuario admin creado: ${adminEmail} / ${adminPassword} (cambia la clave despues de tu primer login)`);
  }

  console.log("Datos de ejemplo creados: categorias, paquetes de creditos y cuenta admin.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
