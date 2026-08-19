import { NextResponse } from "next/server";
import { z } from "zod";
import { llamarAsistenteSoporte } from "@/lib/chatSoporte";

const esquema = z.object({
  mensajes: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      })
    )
    .min(1)
    .max(20),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 });
  }

  try {
    const respuesta = await llamarAsistenteSoporte(parsed.data.mensajes);
    return NextResponse.json({ respuesta });
  } catch (err) {
    console.error("[api/chat-soporte] error:", err);
    return NextResponse.json(
      { error: "El asistente no está disponible en este momento. Escríbenos directamente." },
      { status: 500 }
    );
  }
}
