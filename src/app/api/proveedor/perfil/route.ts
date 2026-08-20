import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";
import { MAX_PROYECTOS_PORTAFOLIO } from "@/lib/portafolio";

const proyectoEsquema = z.object({
  titulo: z.string().trim().min(2).max(80),
  descripcion: z.string().trim().max(200).optional(),
  imagenUrl: z.string().trim().min(1),
});

const esquema = z.object({
  nombre: z.string().min(2),
  telefono: z.string().min(6),
  ciudad: z.string().min(2),
  bio: z.string().optional(),
  fotoUrl: z.string().optional(),
  categoriaIds: z.array(z.string()).min(1),
  aniosExperiencia: z.coerce.number().int().min(0).max(60).optional(),
  tarifaAproximada: z.string().trim().max(60).optional(),
  tarifaTipo: z.enum(["HORA", "PROYECTO", "MES"]).optional(),
  linkedinUrl: z.string().trim().max(200).optional(),
  portafolio: z.array(proyectoEsquema).max(MAX_PROYECTOS_PORTAFOLIO).optional(),
});

export async function PUT(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = esquema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisa los campos" }, { status: 400 });
  }
  const data = parsed.data;

  await prisma.user.update({
    where: { id: usuario.id },
    data: { nombre: data.nombre, telefono: data.telefono, ciudad: data.ciudad },
  });

  // "as any": tarifaTipo es un campo nuevo que aun no esta reflejado en el
  // tipo generado de Prisma en este entorno de desarrollo (ver lib/tarifa.ts).
  await prisma.proveedor.update({
    where: { id: usuario.proveedor.id },
    data: {
      bio: data.bio,
      fotoUrl: data.fotoUrl,
      aniosExperiencia: data.aniosExperiencia,
      tarifaAproximada: data.tarifaAproximada,
      tarifaTipo: data.tarifaTipo,
      linkedinUrl: data.linkedinUrl,
      portafolio: data.portafolio ? JSON.stringify(data.portafolio) : undefined,
      categorias: { set: data.categoriaIds.map((id) => ({ id })) },
    } as any,
  });

  return NextResponse.json({ ok: true });
}
