import { NextResponse } from "next/server";
import { z } from "zod";
import { enviarCorreoEscalamientoSoporte } from "@/lib/email";

const esquema = z.object({
  nombre: z.string().trim().min(1).max(120),
  correo: z.string().trim().email(),
  mensaje: z.string().trim().min(3).max(2000),
  transcripcion: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(2000) }))
    .max(20)
    .default([]),
});

// Ruta publica (no requiere sesion): cualquiera que use el chat del sitio,
// logueado o no, puede escalar su caso a una persona real.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisa los campos del formulario" }, { status: 400 });
  }

  const resultado = await enviarCorreoEscalamientoSoporte(parsed.data);
  if (!resultado.ok) {
    return NextResponse.json({ error: "No se pudo enviar tu mensaje. Intenta de nuevo." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
