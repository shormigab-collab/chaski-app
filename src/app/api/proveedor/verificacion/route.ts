import { NextResponse } from "next/server";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getSupabaseAdmin, BUCKET_VERIFICACIONES } from "@/lib/supabaseAdmin";

// Sube la foto del documento de identidad (cédula/DNI/pasaporte) de un
// proveedor a un bucket PRIVADO de Supabase Storage y marca su verificación
// como "PENDIENTE" para que el admin la revise. No se genera URL pública:
// solo se guarda la ruta interna del archivo.
const TAMANO_MAXIMO_BYTES = 5 * 1024 * 1024;
const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"];

export async function POST(req: Request) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const file = formData.get("documento");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
  }
  if (!TIPOS_PERMITIDOS.includes(file.type)) {
    return NextResponse.json({ error: "Formato no permitido. Sube una foto (JPG/PNG) o PDF" }, { status: 400 });
  }
  if (file.size > TAMANO_MAXIMO_BYTES) {
    return NextResponse.json({ error: "El archivo supera el tamaño máximo (5MB)" }, { status: 400 });
  }

  const extension = file.type.split("/")[1] || "jpg";
  const ruta = `${usuario.proveedor.id}-${Date.now()}.${extension}`;

  try {
    const supabase = getSupabaseAdmin();
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { error } = await supabase.storage.from(BUCKET_VERIFICACIONES).upload(ruta, bytes, {
      contentType: file.type,
      upsert: true,
    });

    if (error) {
      console.error("Error subiendo documento a Supabase Storage:", error);
      return NextResponse.json({ error: "No se pudo subir el archivo" }, { status: 500 });
    }

    await prisma.proveedor.update({
      where: { id: usuario.proveedor.id },
      data: {
        documentoVerificacionPath: ruta,
        estadoVerificacion: "PENDIENTE",
      } as any,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error de configuración de Storage:", err);
    return NextResponse.json({ error: "Almacenamiento no configurado" }, { status: 500 });
  }
}
