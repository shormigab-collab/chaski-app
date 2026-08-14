import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";
import { preguntarClaude } from "@/lib/anthropic";

const esquema = z.object({
  texto: z.string().trim().min(10).max(1000),
});

export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "CLIENTE") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Cuéntanos un poco más sobre lo que necesitas" }, { status: 400 });
  }

  const categorias = await prisma.categoria.findMany({ select: { nombre: true, slug: true } });
  const listaCategorias = categorias.map((c) => `${c.slug} (${c.nombre})`).join(", ");

  const systemPrompt = `Ayudas a clientes de chaski, un marketplace de profesionales independientes en Latinoamérica, a convertir una descripción informal de lo que necesitan en una solicitud clara.

Categorías disponibles (usa exactamente uno de estos slugs): ${listaCategorias}

Responde ÚNICAMENTE con un objeto JSON válido, sin texto adicional ni markdown, con este formato exacto:
{"categoriaSlug": "uno de los slugs de arriba", "titulo": "título breve de máximo 70 caracteres", "descripcion": "descripción clara de 2-4 frases basada solo en lo que el usuario contó, sin inventar detalles que no mencionó"}`;

  try {
    const respuesta = await preguntarClaude(systemPrompt, parsed.data.texto);
    const limpio = respuesta.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "");
    const resultado = JSON.parse(limpio) as { categoriaSlug: string; titulo: string; descripcion: string };

    const categoriaValida = categorias.some((c) => c.slug === resultado.categoriaSlug);
    if (!categoriaValida || !resultado.titulo || !resultado.descripcion) {
      throw new Error("Respuesta incompleta del asistente");
    }

    return NextResponse.json({ ok: true, ...resultado });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message.includes("no esta configurado")
            ? err.message
            : "No pudimos generar la solicitud automáticamente. Completa los campos manualmente.",
      },
      { status: 500 }
    );
  }
}
