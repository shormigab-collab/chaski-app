-- Nombre y cargo del contacto en Senales. Pegar y ejecutar en Supabase -> SQL Editor, una sola vez.
ALTER TABLE "SenalEmpresa" ADD COLUMN IF NOT EXISTS "contactoNombre" TEXT;
ALTER TABLE "SenalEmpresa" ADD COLUMN IF NOT EXISTS "contactoCargo" TEXT;
