import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";
import { siguienteTurnoCopiloto } from "@/lib/copiloto";

const esquemaMensaje = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(1000),
});

// Maximo 12 mensajes en la conversacion: mas que suficiente para el texto
// inicial + hasta 4 preguntas/respuestas, evita abusos del endpoint.
const esquema = z.object({
  mensajes: z.array(esquemaMensaje).min(1).max(12),
});

export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "CLIENTE") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Cuéntanos un poco más sobre tu proyecto" }, { status: 400 });
  }

  const categorias = await prisma.categoria.findMany({ select: { id: true, nombre: true, slug: true } });
  const listaCategorias = categorias.map((c) => `${c.slug} (${c.nombre})`).join(", ");

  try {
    const turno = await siguienteTurnoCopiloto(parsed.data.mensajes, listaCategorias);

    if (turno.tipo === "pregunta") {
      return NextResponse.json({ ok: true, tipo: "pregunta", pregunta: turno.pregunta });
    }

    const categoriaCoincidente = categorias.find((c) => c.slug === turno.brief.categoriaSlug);
    return NextResponse.json({
      ok: true,
      tipo: "brief",
      brief: turno.brief,
      categoriaId: categoriaCoincidente?.id ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message.includes("no esta configurado")
            ? err.message
            : "El Copiloto no está disponible en este momento. Puedes completar tu solicitud manualmente.",
      },
      { status: 500 }
    );
  }
}
