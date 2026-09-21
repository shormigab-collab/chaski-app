"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail } from "lucide-react";
import { plantillaEs, plantillaEn, construirMailto } from "./plantillas";

type Prospecto = {
  id: string;
  nombre: string;
  email: string | null;
  etapa: string;
  origen: string | null;
  notas: string | null;
  updatedAt: string;
};

const ETIQUETA_ETAPA: Record<string, string> = {
  NUEVO: "Nuevo",
  CONTACTADO: "Contactado",
  NEGOCIANDO: "Negociando",
  GANADO: "Ganado",
  PERDIDO: "Perdido",
};

const COLOR_ETAPA: Record<string, string> = {
  NUEVO: "bg-gray-100 text-gray-600",
  CONTACTADO: "bg-brand-50 text-brand-700",
  NEGOCIANDO: "bg-gold-50 text-gold-600",
  GANADO: "bg-emerald-50 text-emerald-700",
  PERDIDO: "bg-coral-50 text-coral-700",
};

export default function TablaProspectos({ prospectos }: { prospectos: Prospecto[] }) {
  const router = useRouter();
  const [cargandoId, setCargandoId] = useState<string | null>(null);

  async function marcarContactado(p: Prospecto, plantilla: "ES" | "EN") {
    setCargandoId(p.id);
    await fetch("/api/crm/actividades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contactoId: p.id,
        tipo: "CORREO",
        contenido: `Correo de prospección enviado (plantilla ${plantilla}).`,
      }),
    });
    if (p.etapa === "NUEVO") {
      await fetch(`/api/crm/contactos/${p.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ etapa: "CONTACTADO" }),
      });
    }
    setCargandoId(null);
    router.refresh();
  }

  if (prospectos.length === 0) {
    return (
      <div className="text-center py-16 border rounded-xl bg-white">
        <p className="text-gray-500">No hay prospectos activos. Agrega el primero arriba.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border rounded-xl overflow-hidden bg-white">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-3">Nombre</th>
            <th className="p-3">Nota / empresa</th>
            <th className="p-3">Fuente</th>
            <th className="p-3">Etapa</th>
            <th className="p-3">Actualizado</th>
            <th className="p-3">Enviar correo</th>
          </tr>
        </thead>
        <tbody>
          {prospectos.map((p) => {
            const es = plantillaEs(p.nombre);
            const en = plantillaEn(p.nombre);
            const tieneCorreo = !!p.email;
            return (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <Link href={`/crm/contactos/${p.id}`} className="font-medium text-ink hover:text-brand-600">
                    {p.nombre}
                  </Link>
                  {p.email && <p className="text-xs text-gray-400">{p.email}</p>}
                </td>
                <td className="p-3 text-gray-500 max-w-[220px] truncate" title={p.notas || ""}>
                  {p.notas || "—"}
                </td>
                <td className="p-3 text-gray-500">{p.origen || "—"}</td>
                <td className="p-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${COLOR_ETAPA[p.etapa]}`}>
                    {ETIQUETA_ETAPA[p.etapa] || p.etapa}
                  </span>
                </td>
                <td className="p-3 text-gray-500">{new Date(p.updatedAt).toLocaleDateString("es-CO")}</td>
                <td className="p-3">
                  {tieneCorreo ? (
                    <div className="flex items-center gap-2">
                      <a
                        href={construirMailto(p.email!, es.asunto, es.cuerpo)}
                        onClick={() => marcarContactado(p, "ES")}
                        className="flex items-center gap-1 text-xs font-medium border rounded-lg px-2 py-1.5 hover:bg-gray-100"
                      >
                        <Mail className="w-3.5 h-3.5" /> ES
                      </a>
                      <a
                        href={construirMailto(p.email!, en.asunto, en.cuerpo)}
                        onClick={() => marcarContactado(p, "EN")}
                        className="flex items-center gap-1 text-xs font-medium border rounded-lg px-2 py-1.5 hover:bg-gray-100"
                      >
                        <Mail className="w-3.5 h-3.5" /> EN
                      </a>
                      {cargandoId === p.id && <span className="text-xs text-gray-400">Registrando...</span>}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">Sin correo</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
