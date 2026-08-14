import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashPassword, crearSesion } from "@/lib/auth";
import { generarCodigoReferido } from "@/lib/referidos";

const esquemaBase = z.object({
  role: z.enum(["CLIENTE", "PROVEEDOR"]),
  nombre: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  telefono: z.string().min(6),
  ciudad: z.string().min(2),
  bio: z.string().optional(),
  categoriaIds: z.array(z.string()).optional(),
  ref: z.string().trim().max(60).optional(), // codigo de referido, opcional
});

const CREDITOS_BASE = 5; // impulso de lanzamiento para los primeros proveedores (normalmente 3)
const CREDITOS_REFERIDO = 7; // bono si viene invitado por otro proveedor
const CREDITOS_BONO_REFERENTE = 3; // bono para quien invito

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = esquemaBase.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const data = parsed.data;

  const existente = await prisma.user.findUnique({ where: { email: data.email } });
  if (existente) {
    return NextResponse.json({ error: "Ya existe una cuenta con ese correo" }, { status: 409 });
  }

  if (data.role === "PROVEEDOR" && (!data.categoriaIds || data.categoriaIds.length === 0)) {
    return NextResponse.json({ error: "Selecciona al menos una categoría" }, { status: 400 });
  }

  const passwordHash = await hashPassword(data.password);

  // Si viene con un codigo de referido valido, el nuevo proveedor recibe un
  // bono de bienvenida mas alto.
  let referente: { id: string } | null = null;
  if (data.role === "PROVEEDOR" && data.ref) {
    referente = await prisma.proveedor.findUnique({
      where: { codigoReferido: data.ref },
      select: { id: true },
    });
  }

  const codigoReferidoPropio = data.role === "PROVEEDOR" ? await generarCodigoReferido(data.nombre) : undefined;

  const user = await prisma.user.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      passwordHash,
      telefono: data.telefono,
      ciudad: data.ciudad,
      role: data.role,
      ...(data.role === "PROVEEDOR"
        ? {
            proveedor: {
              create: {
                bio: data.bio,
                creditos: referente ? CREDITOS_REFERIDO : CREDITOS_BASE,
                codigoReferido: codigoReferidoPropio,
                referidoPorId: referente?.id,
                categorias: { connect: data.categoriaIds!.map((id) => ({ id })) },
              },
            },
          }
        : {}),
    },
  });

  // Premia a quien invito, ahora que el nuevo proveedor ya quedo creado.
  if (referente) {
    await prisma.proveedor.update({
      where: { id: referente.id },
      data: { creditos: { increment: CREDITOS_BONO_REFERENTE } },
    });
  }

  await crearSesion({ userId: user.id, role: user.role as "CLIENTE" | "PROVEEDOR" | "ADMIN" });

  return NextResponse.json({ ok: true, role: user.role });
}
