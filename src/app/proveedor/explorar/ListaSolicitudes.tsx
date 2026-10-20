"use client";

import { useMemo, useState } from "react";
import SolicitudCard from "./SolicitudCard";

type SolicitudProps = React.ComponentProps<typeof SolicitudCard>["solicitud"];

export type ItemSolicitud = {
  solicitud: SolicitudProps;
  desbloqueada: boolean;
  creadaMs: number; // para ordenar por fecha
};

const TODAS = "__todas__";

// Filtro para que el profesional encuentre rapido las solicitudes de su
// especialidad. Todo ocurre en el navegador sobre la lista ya cargada, asi
// que es instantaneo y no toca la base de datos.
export default function ListaSolicitudes({ items }: { items: ItemSolicitud[] }) {
  const [categoria, setCategoria] = useState(TODAS);
  const [ciudad, setCiudad] = useState(TODAS);
  const [orden, setOrden] = useState<"recientes" | "presupuesto">("recientes");

  const categorias = useMemo(() => {
    const mapa = new Map<string, number>();
    items.forEach((i) => mapa.set(i.solicitud.categoriaNombre, (mapa.get(i.solicitud.categoriaNombre) ?? 0) + 1));
    return Array.from(mapa.entries()).sort((a, b) => b[1] - a[1]);
  }, [items]);

  const ciudades = useMemo(
    () => Array.from(new Set(items.map((i) => i.solicitud.ciudad).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [items]
  );

  const visibles = useMemo(() => {
    const lista = items.filter(
      (i) =>
        (categoria === TODAS || i.solicitud.categoriaNombre === categoria) &&
        (ciudad === TODAS || i.solicitud.ciudad === ciudad)
    );
    if (orden === "presupuesto") {
      const monto = (p: string | null) => Number((p ?? "").replace(/[^\d]/g, "")) || 0;
      return [...lista].sort((a, b) => monto(b.solicitud.presupuesto) - monto(a.solicitud.presupuesto));
    }
    return [...lista].sort((a, b) => b.creadaMs - a.creadaMs);
  }, [items, categoria, ciudad, orden]);

  const chip = (activo: boolean) =>
    `inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[36px] rounded-full border text-sm whitespace-nowrap transition-colors ${
      activo
        ? "bg-brand-600 border-brand-600 text-white"
        : "bg-white border-border text-ink/70 hover:border-brand-300"
    }`;
  const contador = (activo: boolean) =>
    `text-[11px] px-1.5 rounded-full ${activo ? "bg-white/20 text-white" : "bg-gray-100 text-ink/55"}`;

  const hayFiltros = categoria !== TODAS || ciudad !== TODAS;

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto sm:flex-wrap pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 mb-3">
        <button type="button" onClick={() => setCategoria(TODAS)} className={chip(categoria === TODAS)}>
          Todas <span className={contador(categoria === TODAS)}>{items.length}</span>
        </button>
        {categorias.map(([nombre, total]) => (
          <button key={nombre} type="button" onClick={() => setCategoria(nombre)} className={chip(categoria === nombre)}>
            {nombre} <span className={contador(categoria === nombre)}>{total}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-5">
        <select
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          aria-label="Filtrar por ciudad"
          className="flex-1 min-w-0 border border-border rounded-xl px-3 py-2.5 text-sm bg-white"
        >
          <option value={TODAS}>Todas las ciudades</option>
          {ciudades.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value as "recientes" | "presupuesto")}
          aria-label="Ordenar solicitudes"
          className="flex-1 min-w-0 border border-border rounded-xl px-3 py-2.5 text-sm bg-white"
        >
          <option value="recientes">Más recientes</option>
          <option value="presupuesto">Mayor presupuesto</option>
        </select>
      </div>

      <p className="text-sm text-ink/55 mb-4">
        {visibles.length} {visibles.length === 1 ? "solicitud" : "solicitudes"}
        {hayFiltros && (
          <button
            type="button"
            onClick={() => {
              setCategoria(TODAS);
              setCiudad(TODAS);
            }}
            className="ml-3 text-brand-600 font-semibold hover:text-brand-700"
          >
            Quitar filtros
          </button>
        )}
      </p>

      {visibles.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No hay solicitudes con esos filtros.</p>
      ) : (
        <div className="space-y-4">
          {visibles.map((i) => (
            <SolicitudCard key={i.solicitud.id} solicitud={i.solicitud} desbloqueada={i.desbloqueada} />
          ))}
        </div>
      )}
    </div>
  );
}
