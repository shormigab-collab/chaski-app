import { prisma } from "@/lib/db";

// Genera un codigo de invitacion legible a partir del nombre (ej. "Ana Gómez" -> "ana-x7k2").
// Reintenta si por casualidad ya existe (muy poco probable con el sufijo aleatorio).
const DIACRITICOS = new RegExp("[̀-ͯ]", "g");

function slugBase(nombre: string) {
  return (
    nombre
      .normalize("NFD")
      .replace(DIACRITICOS, "") // quita tildes
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 20) || "chaski"
  );
}

function sufijoAleatorio() {
  return Math.random().toString(36).slice(2, 6);
}

export async function generarCodigoReferido(nombre: string): Promise<string> {
  for (let intento = 0; intento < 5; intento++) {
    const codigo = `${slugBase(nombre)}-${sufijoAleatorio()}`;
    const existente = await prisma.proveedor.findUnique({ where: { codigoReferido: codigo } });
    if (!existente) return codigo;
  }
  // fallback extremo, practicamente nunca deberia llegar aqui
  return `chaski-${Date.now().toString(36)}`;
}

// Para proveedores creados antes de que existiera este sistema: genera y
// guarda el codigo la primera vez que lo necesiten, en vez de requerir una
// migracion de datos aparte.
export async function obtenerOCrearCodigoReferido(proveedorId: string, nombre: string): Promise<string> {
  const proveedor = await prisma.proveedor.findUnique({ where: { id: proveedorId } });
  if (proveedor?.codigoReferido) return proveedor.codigoReferido;

  const codigo = await generarCodigoReferido(nombre);
  await prisma.proveedor.update({ where: { id: proveedorId }, data: { codigoReferido: codigo } });
  return codigo;
}
