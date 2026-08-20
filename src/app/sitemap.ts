import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { POSTS } from "@/lib/blog";
import { POSTS_EN } from "@/lib/blogEn";

const BASE_URL = "https://www.usechaski.com";

// Genera /sitemap.xml automaticamente. Incluye las paginas fijas mas
// una entrada por cada perfil de profesional real (no se inventan
// rutas ni se listan paginas que requieren inicio de sesion).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rutasEstaticas: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/como-funciona`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/profesionales`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/registro/cliente`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/registro/proveedor`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/en`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/en/virtual-assistants`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/en/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/ayuda`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/terminos`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE_URL}/privacidad`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const rutasBlog: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.fecha),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const rutasBlogEn: MetadataRoute.Sitemap = POSTS_EN.map((p) => ({
    url: `${BASE_URL}/en/blog/${p.slug}`,
    lastModified: new Date(p.fecha),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  let rutasProveedores: MetadataRoute.Sitemap = [];
  try {
    const proveedores = await prisma.proveedor.findMany({ select: { id: true, createdAt: true } });
    rutasProveedores = proveedores.map((p) => ({
      url: `${BASE_URL}/profesionales/${p.id}`,
      lastModified: p.createdAt,
      changeFrequency: "weekly",
      priority: 0.5,
    }));
  } catch {
    // Si la base de datos no responde al generar el sitemap, se
    // devuelven igual las rutas fijas en vez de romper el build.
  }

  return [...rutasEstaticas, ...rutasBlog, ...rutasBlogEn, ...rutasProveedores];
}
