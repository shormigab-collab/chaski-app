import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase para usar SOLO en el servidor (API routes). Usa
// la "service role key", que tiene permiso para escribir en Storage.
// Nunca debe importarse desde un componente de cliente ni exponerse
// con el prefijo NEXT_PUBLIC_.
export const BUCKET_AVATARES = "avatares";

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
