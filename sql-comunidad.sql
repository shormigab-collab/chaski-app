-- Comunidad: tabla de publicaciones de profesionales.
-- Pegar y ejecutar en Supabase -> SQL Editor (una sola vez).
CREATE TABLE IF NOT EXISTS "Publicacion" (
  "id" TEXT NOT NULL,
  "proveedorId" TEXT NOT NULL,
  "texto" TEXT NOT NULL,
  "enlaceUrl" TEXT,
  "enlaceTitulo" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Publicacion_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Publicacion_proveedorId_fkey" FOREIGN KEY ("proveedorId")
    REFERENCES "Proveedor"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Publicacion_createdAt_idx" ON "Publicacion"("createdAt");
