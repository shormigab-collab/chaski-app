import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin", "/cliente/", "/proveedor/", "/login"],
      },
    ],
    sitemap: "https://www.usechaski.com/sitemap.xml",
  };
}
