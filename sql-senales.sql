-- Senales de prospeccion (CRM). Pegar y ejecutar en Supabase -> SQL Editor, una sola vez.
CREATE TABLE IF NOT EXISTS "SenalEmpresa" (
  "id" TEXT NOT NULL,
  "fuente" TEXT NOT NULL,
  "fuenteId" TEXT NOT NULL,
  "empresa" TEXT NOT NULL,
  "empresaWeb" TEXT,
  "empresaPais" TEXT,
  "titulo" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "categoriaSlug" TEXT NOT NULL,
  "categoriaNombre" TEXT NOT NULL,
  "publicadaEn" TIMESTAMP(3),
  "prioridad" INTEGER NOT NULL DEFAULT 1,
  "razon" TEXT,
  "detectadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "estado" TEXT NOT NULL DEFAULT 'NUEVA',
  "borrador" TEXT,
  "borradorAprobado" BOOLEAN NOT NULL DEFAULT false,
  "contactoEmail" TEXT,
  "enviadoEn" TIMESTAMP(3),
  "notas" TEXT,
  "seguimientoEn" TIMESTAMP(3),
  "seguimientoHecho" BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT "SenalEmpresa_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "SenalEmpresa_fuente_fuenteId_key" ON "SenalEmpresa"("fuente", "fuenteId");
CREATE INDEX IF NOT EXISTS "SenalEmpresa_empresa_idx" ON "SenalEmpresa"("empresa");

CREATE TABLE IF NOT EXISTS "SenalSync" (
  "id" TEXT NOT NULL,
  "fuente" TEXT NOT NULL,
  "ok" BOOLEAN NOT NULL,
  "mensaje" TEXT NOT NULL,
  "nuevas" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SenalSync_pkey" PRIMARY KEY ("id")
);
