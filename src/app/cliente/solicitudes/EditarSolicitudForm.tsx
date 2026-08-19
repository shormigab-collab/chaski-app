"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Lock, Unlock } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import { nombreCategoria } from "@/lib/categoriasEn";
import { MONEDAS, type Moneda } from "@/lib/moneda";

type Categoria = { id: string; nombre: string; icono: string; slug: string };
type Solicitud = {
  id: string;
  categoriaId: string;
  titulo: string;
  descripcion: string;
  ciudad: string;
  presupuesto: string | null;
  presupuestoMoneda: string;
  telefonoContacto: string;
  preferenciaContacto: string;
  estado: string;
};

export default function EditarSolicitudForm({
  solicitud,
  categorias,
  lang = "es",
}: {
  solicitud: Solicitud;
  categorias: Categoria[];
  lang?: "es" | "en";
}) {
  const router = useRouter();
  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [cambiandoEstado, setCambiandoEstado] = useState(false);
  const [error, setError] = useState("");

  const [categoriaId, setCategoriaId] = useState(solicitud.categoriaId);
  const [titulo, setTitulo] = useState(solicitud.titulo);
  const [descripcion, setDescripcion] = useState(solicitud.descripcion);
  const [ciudad, setCiudad] = useState(solicitud.ciudad);
  const [presupuesto, setPresupuesto] = useState(solicitud.presupuesto ?? "");
  const [presupuestoMoneda, setPresupuestoMoneda] = useState<Moneda>(
    (solicitud.presupuestoMoneda as Moneda) || "COP"
  );
  const [telefonoContacto, setTelefonoContacto] = useState(solicitud.telefonoContacto);
  const [preferenciaContacto, setPreferenciaContacto] = useState<"TELEFONO" | "CORREO" | "AMBOS">(
    (solicitud.preferenciaContacto as "TELEFONO" | "CORREO" | "AMBOS") || "AMBOS"
  );

  const t =
    lang === "en"
      ? {
          editar: "Edit",
          cancelar: "Cancel",
          guardar: "Save changes",
          guardando: "Saving...",
          cerrar: "Mark as closed",
          reabrir: "Reopen",
          errGuardar: "Couldn't save the changes",
          tituloPlaceholder: "Short title",
          descPlaceholder: "Description",
          ciudadPlaceholder: "City",
          presupuestoPlaceholder: "Budget (optional)",
          telefonoPlaceholder: "Contact phone",
          preferenciaLabel: "Preferred contact method",
          prefTelefono: "Phone",
          prefCorreo: "Email",
          prefAmbos: "Either",
          categoriaLabel: "Category",
        }
      : {
          editar: "Editar",
          cancelar: "Cancelar",
          guardar: "Guardar cambios",
          guardando: "Guardando...",
          cerrar: "Marcar como cerrada",
          reabrir: "Reabrir",
          errGuardar: "No se pudieron guardar los cambios",
          tituloPlaceholder: "Título breve",
          descPlaceholder: "Descripción",
          ciudadPlaceholder: "Ciudad",
          presupuestoPlaceholder: "Presupuesto (opcional)",
          telefonoPlaceholder: "Teléfono de contacto",
          preferenciaLabel: "Cómo prefieres que te contacten",
          prefTelefono: "Teléfono",
          prefCorreo: "Correo",
          prefAmbos: "Cualquiera",
          categoriaLabel: "Categoría",
        };

  async function guardar() {
    setError("");
    if (titulo.trim().length < 3 || descripcion.trim().length < 10 || !ciudad.trim() || !telefonoContacto.trim()) {
      setError(t.errGuardar);
      return;
    }
    setCargando(true);
    const res = await fetch(`/api/solicitudes/${solicitud.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoriaId,
        titulo,
        descripcion,
        ciudad,
        presupuesto,
        presupuestoMoneda,
        telefonoContacto,
        preferenciaContacto,
      }),
    });
    setCargando(false);
    if (res.ok) {
      setEditando(false);
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || t.errGuardar);
    }
  }

  async function toggleEstado() {
    setCambiandoEstado(true);
    const nuevoEstado = solicitud.estado === "ABIERTA" ? "CERRADA" : "ABIERTA";
    const res = await fetch(`/api/solicitudes/${solicitud.id}/estado`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado: nuevoEstado }),
    });
    setCambiandoEstado(false);
    if (res.ok) router.refresh();
  }

  if (!editando) {
    return (
      <div className="flex items-center gap-3 mt-3">
        <button
          type="button"
          onClick={() => setEditando(true)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
        >
          <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
          {t.editar}
        </button>
        <button
          type="button"
          onClick={toggleEstado}
          disabled={cambiandoEstado}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/40 hover:text-ink/70 disabled:opacity-50"
        >
          {solicitud.estado === "ABIERTA" ? (
            <Lock className="w-3.5 h-3.5" strokeWidth={1.75} />
          ) : (
            <Unlock className="w-3.5 h-3.5" strokeWidth={1.75} />
          )}
          {solicitud.estado === "ABIERTA" ? t.cerrar : t.reabrir}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3 border-t border-black/5 pt-4 space-y-3">
      <div>
        <p className="text-xs font-medium text-ink/50 mb-1.5">{t.categoriaLabel}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
          {categorias.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoriaId(c.id)}
              className={`text-left text-xs border rounded-lg px-2.5 py-2 inline-flex items-center gap-1.5 transition-all ${
                categoriaId === c.id
                  ? "border-brand-500 bg-brand-50 text-brand-600"
                  : "border-black/10 hover:border-black/30"
              }`}
            >
              <CategoryIcon slug={c.slug} className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{nombreCategoria(c, lang)}</span>
            </button>
          ))}
        </div>
      </div>

      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder={t.tituloPlaceholder}
        className="w-full border border-black/10 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 transition-colors"
      />
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows={3}
        placeholder={t.descPlaceholder}
        className="w-full border border-black/10 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 transition-colors"
      />
      <div className="grid sm:grid-cols-2 gap-3">
        <input
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          placeholder={t.ciudadPlaceholder}
          className="w-full border border-black/10 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 transition-colors"
        />
        <div className="flex gap-2">
          <input
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            placeholder={t.presupuestoPlaceholder}
            className="flex-1 min-w-0 border border-black/10 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 transition-colors"
          />
          <select
            value={presupuestoMoneda}
            onChange={(e) => setPresupuestoMoneda(e.target.value as Moneda)}
            className="border border-black/10 rounded-xl px-2 py-2.5 text-sm outline-none focus:border-brand-500 transition-colors bg-white shrink-0"
          >
            {MONEDAS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>
      <input
        value={telefonoContacto}
        onChange={(e) => setTelefonoContacto(e.target.value)}
        placeholder={t.telefonoPlaceholder}
        className="w-full border border-black/10 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 transition-colors"
      />

      <div>
        <p className="text-xs font-medium text-ink/50 mb-1.5">{t.preferenciaLabel}</p>
        <div className="flex gap-2">
          {(
            [
              { valor: "TELEFONO", texto: t.prefTelefono },
              { valor: "CORREO", texto: t.prefCorreo },
              { valor: "AMBOS", texto: t.prefAmbos },
            ] as const
          ).map((op) => (
            <button
              type="button"
              key={op.valor}
              onClick={() => setPreferenciaContacto(op.valor)}
              className={`flex-1 text-xs border rounded-lg px-2.5 py-2 transition-colors ${
                preferenciaContacto === op.valor
                  ? "border-brand-500 bg-brand-50 text-brand-600 font-medium"
                  : "border-black/10 text-ink/70 hover:border-black/30"
              }`}
            >
              {op.texto}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-coral-600 text-xs">{error}</p>}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={guardar}
          disabled={cargando}
          className="bg-brand-500 text-cream px-4 py-2 rounded-xl text-sm font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors"
        >
          {cargando ? t.guardando : t.guardar}
        </button>
        <button
          type="button"
          onClick={() => setEditando(false)}
          className="text-sm font-medium text-ink/50 hover:text-ink"
        >
          {t.cancelar}
        </button>
      </div>
    </div>
  );
}
