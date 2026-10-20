import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";
import { limitarPorIp } from "@/lib/rateLimit";

const esquema = z.object({
  texto: z.string().trim().min(10, "Escribe al menos 10 caracteres").max(500, "Máximo 500 caracteres"),
  enlaceUrl: z.string().trim().max(300).optional().or(z.literal("")),
  enlaceTitulo: z.string().trim().max(80).optional().or(z.literal("")),
});

// Solo profesionales con sesion pueden publicar.
export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) {
    return NextResponse.json({ error: "Inicia sesión como profesional para publicar" }, { status: 401 });
  }

  // Maximo 5 publicaciones por profesional cada 24 horas.
  if (!limitarPorIp(`publicar:${usuario.proveedor.id}`, 5, 24 * 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Llegaste al límite de publicaciones de hoy. Vuelve mañana." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Datos inválidos" }, { status: 400 });
  }

  let enlaceUrl: string | null = null;
  if (parsed.data.enlaceUrl) {
    try {
      const u = new URL(parsed.data.enlaceUrl);
      if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error("protocolo");
      enlaceUrl = u.toString();
    } catch {
      return NextResponse.json({ error: "El enlace no es válido. Debe empezar con https://" }, { status: 400 });
    }
  }

  const pub = await prisma.publicacion.create({
    data: {
      proveedorId: usuario.proveedor.id,
      texto: parsed.data.texto,
      enlaceUrl,
      enlaceTitulo: enlaceUrl ? parsed.data.enlaceTitulo || null : null,
    },
  });

  return NextResponse.json({ ok: true, id: pub.id });
}
