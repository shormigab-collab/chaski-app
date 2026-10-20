import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { limitarPorIp } from "@/lib/rateLimit";
import { verificarTurnstile, ipDeSolicitud } from "@/lib/turnstile";

const esquema = z.object({
  nombre: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  empresa: z.string().trim().max(100).optional(),
  mensaje: z.string().trim().min(5).max(1000),
});

export async function POST(req: Request) {
  if (!limitarPorIp(`leads:${ipDeSolicitud(req) ?? "anon"}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }
  const body = await req.json();
  if (body?.sitioWeb) return NextResponse.json({ ok: true });
  if (!(await verificarTurnstile(body?.turnstileToken, ipDeSolicitud(req)))) {
    return NextResponse.json({ error: "Could not verify you are human. Reload the page and try again." }, { status: 400 });
  }
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  await prisma.leadUS.create({ data: parsed.data });

  return NextResponse.json({ ok: true });
}
