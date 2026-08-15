import { NextResponse } from "next/server";
import { obtenerUsuarioActual } from "@/lib/auth";
import { getSupabaseAdmin, BUCKET_AVATARES } from "@/lib/supabaseAdmin";

// Sube una foto de un proyecto de portafolio a Supabase Storage. Usa el
// mismo bucket que las fotos de perfil (BUCKET_AVATARES) pero con un
// prefijo "portafolio/" para no mezclarlas, asi no hace falta crear ni
// configurar un bucket nuevo en Supabase.
const TAMANO_MAXIMO_BYTES = 2 * 1024 * 1024;
const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "image/gif"];

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

  const file = formData.get("imagen");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió ninguna imagen" }, { status: 400 });
  }
  if (!TIPOS_PERMITIDOS.includes(file.type)) {
    return NextResponse.json({ error: "Formato de imagen no permitido" }, { status: 400 });
  }
  if (file.size > TAMANO_MAXIMO_BYTES) {
    return NextResponse.json({ error: "La imagen supera el tamaño máximo (2MB)" }, { status: 400 });
  }

  const extension = file.type.split("/")[1] || "jpg";
  const ruta = `portafolio/${usuario.proveedor.id}-${Date.now()}.${extension}`;

  try {
    const supabase = getSupabaseAdmin();
    const bytes = new Uint8Array(await file.arrayBuffer());
    const { error } = await supabase.storage.from(BUCKET_AVATARES).upload(ruta, bytes, {
      contentType: file.type,
      upsert: true,
    });

    if (error) {
      console.error("Error subiendo foto de portafolio a Supabase Storage:", error);
      return NextResponse.json({ error: "No se pudo subir la imagen" }, { status: 500 });
    }

    const { data } = supabase.storage.from(BUCKET_AVATARES).getPublicUrl(ruta);
    return NextResponse.json({ url: data.publicUrl });
  } catch (err) {
    console.error("Error de configuración de Storage:", err);
    return NextResponse.json({ error: "Almacenamiento no configurado" }, { status: 500 });
  }
}
