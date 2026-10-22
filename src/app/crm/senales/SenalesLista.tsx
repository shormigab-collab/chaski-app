"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { construirMailto } from "../prospeccion/plantillas";

export type SenalUI = {
  id: string;
  titulo: string;
  url: string;
  fuente: string;
  categoriaNombre: string;
  publicadaEn: string | null;
  razon: string | null;
  estado: string;
  borrador: string;
  borradorAprobado: boolean;
  contactoEmail: string;
  contactoNombre: string;
  contactoCargo: string;
  notas: string;
  seguimientoEn: string;
  seguimientoHecho: boolean;
  enviadoEn: string | null;
};

export type GrupoEmpresa = {
  empresa: string;
  web: string | null;
  pais: string | null;
  prioridad: number;
  senales: SenalUI[];
};

const NOMBRE_FUENTE: Record<string, string> = { GETONBOARD: "Get on Board" };

async function actualizar(id: string, cuerpo: Record<string, unknown>) {
  const res = await fetch(`/api/crm/senales/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cuerpo),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `HTTP ${res.status}`);
  }
}

function Senal({ s, empresa }: { s: SenalUI; empresa: string }) {
  const router = useRouter();
  const [borrador, setBorrador] = useState(s.borrador);
  const [email, setEmail] = useState(s.contactoEmail);
  const [nombre, setNombre] = useState(s.contactoNombre);
  const [cargo, setCargo] = useState(s.contactoCargo);
  const [notas, setNotas] = useState(s.notas);
  const [fecha, setFecha] = useState(s.seguimientoEn);
  const [error, setError] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [ocupado, setOcupado] = useState(false);

  async function accion(cuerpo: Record<string, unknown>) {
    setError("");
    setOcupado(true);
    try {
      await actualizar(s.id, cuerpo);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
    setOcupado(false);
  }

  const cambioBorrador = borrador !== s.borrador;
  const aprobado = s.borradorAprobado && !cambioBorrador;
  const dias = s.publicadaEn ? Math.floor((Date.now() - new Date(s.publicadaEn).getTime()) / 86_400_000) : null;
  const vencido = s.seguimientoEn && !s.seguimientoHecho && new Date(s.seguimientoEn) < new Date(new Date().toDateString());

  const asunto = `Apoyo freelance para ${empresa}`;

  return (
    <div className={`border rounded-xl p-4 bg-white ${s.estado === "DESCARTADA" ? "opacity-60" : ""}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:underline">
            {s.titulo}
          </a>
          <p className="text-xs text-gray-500 mt-0.5">
            {NOMBRE_FUENTE[s.fuente] ?? s.fuente} · {s.categoriaNombre}
            {dias !== null && ` · publicada hace ${dias} día(s)`}
          </p>
          {s.razon && <p className="text-[11px] text-gray-400 mt-0.5">Prioridad: {s.razon}</p>}
        </div>
        <span
          className={`text-[11px] font-semibold px-2 py-1 rounded-full ${
            s.estado === "ENVIADA" ? "bg-emerald-100 text-emerald-800" : s.estado === "DESCARTADA" ? "bg-gray-100 text-gray-600" : "bg-amber-100 text-amber-800"
          }`}
        >
          {s.estado === "ENVIADA" ? "Enviada" : s.estado === "DESCARTADA" ? "Descartada" : "Pendiente"}
        </span>
      </div>

      {s.estado !== "DESCARTADA" && (
        <div className="mt-3 space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-600">Borrador del mensaje (pendiente de tu aprobación)</label>
            <textarea
              value={borrador}
              onChange={(e) => setBorrador(e.target.value)}
              rows={9}
              disabled={s.estado === "ENVIADA"}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onBlur={() => nombre !== s.contactoNombre && accion({ contactoNombre: nombre })}
              placeholder="Nombre del contacto"
              className="flex-1 min-w-[160px] border rounded-lg px-3 py-2 text-sm"
            />
            <input
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              onBlur={() => cargo !== s.contactoCargo && accion({ contactoCargo: cargo })}
              placeholder="Cargo (ej. Reclutadora)"
              className="flex-1 min-w-[160px] border rounded-lg px-3 py-2 text-sm"
            />
            {s.estado === "NUEVA" && nombre.trim() && /^Hola equipo de /.test(borrador) && (
              <button
                type="button"
                onClick={() => setBorrador(borrador.replace(/^Hola equipo de [^\n]*,/, `Hola ${nombre.trim().split(/\s+/)[0]},`))}
                className="text-xs font-semibold border px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                Saludar por su nombre
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => email !== s.contactoEmail && accion({ contactoEmail: email })}
              placeholder="Correo de contacto (lo buscas tú)"
              className="flex-1 min-w-[200px] border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {s.estado === "NUEVA" && (
            <div className="flex flex-wrap items-center gap-2">
              {!aprobado ? (
                <button
                  disabled={ocupado}
                  onClick={() => accion({ borrador, borradorAprobado: true })}
                  className="text-sm font-semibold bg-brand-600 text-white px-3.5 py-2 rounded-lg hover:bg-brand-700 disabled:opacity-50"
                >
                  {cambioBorrador ? "Guardar y aprobar borrador" : "Aprobar borrador"}
                </button>
              ) : (
                <>
                  <span className="text-xs font-semibold text-emerald-700">Borrador aprobado</span>
                  {email && (
                    <a
                      href={construirMailto(email, asunto, borrador)}
                      className="text-sm font-semibold border px-3.5 py-2 rounded-lg hover:bg-gray-50"
                    >
                      Abrir en mi correo
                    </a>
                  )}
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(borrador);
                      setCopiado(true);
                      setTimeout(() => setCopiado(false), 1500);
                    }}
                    className="text-sm font-semibold border px-3.5 py-2 rounded-lg hover:bg-gray-50"
                  >
                    {copiado ? "Copiado" : "Copiar mensaje"}
                  </button>
                  <button
                    disabled={ocupado}
                    onClick={() => accion({ estado: "ENVIADA" })}
                    className="text-sm font-semibold bg-ink text-white px-3.5 py-2 rounded-lg hover:bg-ink/90 disabled:opacity-50"
                  >
                    Marcar como enviado
                  </button>
                </>
              )}
              <button
                disabled={ocupado}
                onClick={() => accion({ estado: "DESCARTADA" })}
                className="text-sm text-gray-500 hover:text-gray-800 px-2 py-2"
              >
                Descartar
              </button>
            </div>
          )}

          {s.estado === "ENVIADA" && s.enviadoEn && (
            <p className="text-xs text-gray-500">Marcada como enviada el {new Date(s.enviadoEn).toLocaleDateString("es-CO")}.</p>
          )}

          <div>
            <label className="text-xs font-semibold text-gray-600">Notas</label>
            <textarea
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              onBlur={() => notas !== s.notas && accion({ notas })}
              rows={2}
              className="w-full border rounded-lg px-3 py-2 text-sm mt-1"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs font-semibold text-gray-600">Seguimiento</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              onBlur={() => fecha !== s.seguimientoEn && accion({ seguimientoEn: fecha })}
              className="border rounded-lg px-2 py-1.5 text-sm"
            />
            {s.seguimientoEn && !s.seguimientoHecho && (
              <button
                disabled={ocupado}
                onClick={() => accion({ seguimientoHecho: true })}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${vencido ? "border-red-300 text-red-700 bg-red-50" : "hover:bg-gray-50"}`}
              >
                {vencido ? "Vencido: marcar seguimiento como hecho" : "Marcar seguimiento como hecho"}
              </button>
            )}
            {s.seguimientoEn && s.seguimientoHecho && <span className="text-xs text-emerald-700 font-semibold">Seguimiento hecho</span>}
          </div>
        </div>
      )}

      {s.estado === "DESCARTADA" && (
        <button disabled={ocupado} onClick={() => accion({ estado: "NUEVA" })} className="mt-2 text-xs text-brand-700 font-semibold">
          Restaurar
        </button>
      )}

      {error && <p className="text-xs text-red-700 mt-2">{error}</p>}
    </div>
  );
}

export default function SenalesLista({ grupos }: { grupos: GrupoEmpresa[] }) {
  const [verDescartadas, setVerDescartadas] = useState(false);

  if (grupos.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-8 text-center text-sm text-gray-500">
        Todavía no hay señales. Pulsa «Buscar señales ahora». Si no aparece nada, el resultado de la búsqueda (con el
        error real, si lo hubo) queda en la franja de arriba.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" checked={verDescartadas} onChange={(e) => setVerDescartadas(e.target.checked)} />
        Mostrar descartadas
      </label>

      {grupos.map((g) => {
        const visibles = g.senales.filter((s) => verDescartadas || s.estado !== "DESCARTADA");
        if (visibles.length === 0) return null;
        return (
          <section key={g.empresa} className="bg-gray-50 border rounded-2xl p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <div>
                <h2 className="text-lg font-bold">{g.empresa}</h2>
                <p className="text-xs text-gray-500">
                  {g.pais ?? "País no informado"} ·{" "}
                  {g.web ? (
                    <a href={g.web} target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">
                      {g.web.replace(/^https?:\/\//, "")}
                    </a>
                  ) : (
                    "sin sitio web informado"
                  )}
                </p>
              </div>
              <span className="text-xs font-semibold bg-white border rounded-full px-2.5 py-1">Prioridad {g.prioridad}</span>
            </div>
            <div className="space-y-3">
              {visibles.map((s) => (
                <Senal key={s.id} s={s} empresa={g.empresa} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
