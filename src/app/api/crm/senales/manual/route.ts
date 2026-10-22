import { NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual, esEquipoCrm } from "@/lib/auth";
import { categoriaPorSlug } from "@/lib/senales/categorias";
import { calcularPrioridad, construirBorrador } from "@/lib/senales/borrador";

// "as any": modelos nuevos de Prisma; ver nota en /api/crm/contactos/route.ts
const db = prisma as any;

const esquema = z.object({
  empresa: z.string().trim().min(2).max(120),
  titulo: z.string().trim().min(2).max(200),
  url: z.string().trim().url().max(500),
  fuente: z.string().trim().min(2).max(40),
  categoriaSlug: z.string().trim().min(1),
  empresaWeb: z.string().trim().max(200).optional().or(z.literal("")),
  empresaPais: z.string().trim().max(40).optional().or(z.literal("")),
  publicadaEn: z.string().trim().optional().or(z.literal("")),
  contactoEmail: z.string().trim().email().optional().or(z.literal("")),
});

// Senal cargada a mano: tu encuentras la vacante (Computrabajo, LinkedIn,
// Indeed...) y la pegas aqui. Asi no se raspa ningun sitio ajeno.
export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!esEquipoCrm(usuario)) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const parsed = esquema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Revisa los campos: empresa, título, enlace válido, fuente y categoría son obligatorios." }, { status: 400 });
  }
  const d = parsed.data;

  const categoria = categoriaPorSlug(d.categoriaSlug);
  if (!categoria) return NextResponse.json({ error: "Categoría no válida" }, { status: 400 });

  const duplicada = await db.senalEmpresa.findFirst({ where: { url: d.url }, select: { id: true } });
  if (duplicada) return NextResponse.json({ error: "Esa vacante (mismo enlace) ya está en la lista." }, { status: 409 });

  let publicadaEn: Date | null = null;
  if (d.publicadaEn) {
    const f = new Date(d.publicadaEn);
    if (!isNaN(f.getTime())) publicadaEn = f;
  }

  const otras = await db.senalEmpresa.count({ where: { empresa: d.empresa } });
  const { prioridad, razon } = calcularPrioridad({ publicadaEn, vacantesDeLaEmpresa: otras + 1 });

  const senal = await db.senalEmpresa.create({
    data: {
      fuente: d.fuente,
      fuenteId: randomUUID(),
      empresa: d.empresa,
      empresaWeb: d.empresaWeb || null,
      empresaPais: d.empresaPais || null,
      titulo: d.titulo,
      url: d.url,
      categoriaSlug: categoria.slug,
      categoriaNombre: categoria.nombre,
      publicadaEn,
      prioridad,
      razon: `${razon}; cargada manualmente`,
      contactoEmail: d.contactoEmail || null,
      borrador: construirBorrador({
        empresa: d.empresa,
        titulo: d.titulo,
        categoriaNombre: categoria.nombre,
        argumento: categoria.argumento,
        fuenteNombre: d.fuente,
      }),
    },
  });

  return NextResponse.json({ ok: true, id: senal.id });
}
