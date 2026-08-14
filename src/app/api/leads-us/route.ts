import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const esquema = z.object({
  nombre: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  empresa: z.string().trim().max(100).optional(),
  mensaje: z.string().trim().min(5).max(1000),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  await prisma.leadUS.create({ data: parsed.data });

  return NextResponse.json({ ok: true });
}
