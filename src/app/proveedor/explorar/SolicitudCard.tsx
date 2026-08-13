"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Solicitud = {
  id: string;
  titulo: string;
  descripcion: string;
  ciudad: string;
  presupuesto: string | null;
  categoriaNombre: string;
  categoriaIcono: string;
  nombreCliente: string;
  telefonoContacto: string;
  createdAt: string;
};

export default function SolicitudCard({
  solicitud,
  desbloqueada,
}: {
  solicitud: Solicitud;
  desbloqueada: boolean;
}) {
  const router = useRouter();
  const [visible, setVisible] = useState(desbloqueada);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function desbloquear() {
    setError("");
    setCargando(true);
    const res = await fetch(`/api/solicitudes/${solicitud.id}/desbloquear`, { method: "POST" });
    setCargando(false);
    if (res.ok) {
      setVisible(true);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "No se pudo desbloquear");
    }
  }

  return (
    <div className="border rounded-xl p-5 bg-white">
      <span className="text-xs uppercase tracking-wide text-brand-600 font-semibold">
        {solicitud.categoriaIcono} {solicitud.categoriaNombre} · {solicitud.ciudad}
      </span>
      <h3 className="font-semibold text-lg">{solicitud.titulo}</h3>
      <p className="text-gray-600 text-sm mt-1">{solicitud.descripcion}</p>
      {solicitud.presupuesto && (
        <p className="text-sm text-gray-500 mt-1">Presupuesto: {solicitud.presupuesto}</p>
      )}

      {visible ? (
        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
          <p className="font-medium text-green-800">
            {solicitud.nombreCliente} · {solicitud.telefonoContacto}
          </p>
          <p className="text-green-700">Contáctalo directamente para ofrecer tu servicio.</p>
        </div>
      ) : (
        <div className="mt-3">
          <button
            onClick={desbloquear}
            disabled={cargando}
            className="bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-600 disabled:opacity-50"
          >
            {cargando ? "Desbloqueando..." : "Desbloquear contacto (1 crédito)"}
          </button>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
}
