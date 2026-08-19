import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase para usar SOLO en el servidor (API routes). Usa
// la "service role key", que tiene permiso para escribir en Storage.
// Nunca debe importarse desde un componente de cliente ni exponerse
// con el prefijo NEXT_PUBLIC_.
export const BUCKET_AVATARES = "avatares";
// Bucket PRIVADO (sin acceso público) donde se guardan las fotos del
// documento de identidad subido para verificación. Nunca generar una URL
// pública de este bucket; solo URLs firmadas y de corta duración, y solo
// para que el equipo de Chaski (admin) las revise.
export const BUCKET_VERIFICACIONES = "verificaciones";

export function getSupabaseAdmin() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Faltan las variables de entorno SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY para subir archivos."
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
