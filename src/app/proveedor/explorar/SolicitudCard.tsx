"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";

type Solicitud = {
  id: string;
  titulo: string;
  descripcion: string;
  ciudad: string;
  presupuesto: string | null;
  categoriaNombre: string;
  categoriaSlug: string;
  nombreCliente: string;
  telefonoContacto: string;
  emailContacto: string;
  preferenciaContacto: string; // "TELEFONO" | "CORREO" | "AMBOS"
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
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const mapaSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    solicitud.ciudad
  )}&output=embed`;

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
      <span className="text-xs uppercase tracking-wide text-brand-600 font-semibold inline-flex items-center gap-1.5">
        <CategoryIcon slug={solicitud.categoriaSlug} className="w-3.5 h-3.5" />
        {solicitud.categoriaNombre} · {solicitud.ciudad}
      </span>
      <h3 className="font-semibold text-lg">{solicitud.titulo}</h3>
      <p className="text-gray-600 text-sm mt-1">{solicitud.descripcion}</p>
      {solicitud.presupuesto && (
        <p className="text-sm text-gray-500 mt-1">Presupuesto: {solicitud.presupuesto}</p>
      )}

      <button
        type="button"
        onClick={() => setMostrarMapa((v) => !v)}
        className="mt-2 inline-flex items-center gap-1.5 text-sm text-brand-600 font-medium hover:text-brand-700"
      >
        <MapPin className="w-3.5 h-3.5" />
        {mostrarMapa ? "Ocultar ubicación" : "Ver ubicación"}
      </button>

      {mostrarMapa && (
        <div className="mt-2 rounded-lg overflow-hidden border">
          <iframe
            src={mapaSrc}
            width="100%"
            height="180"
            style={{ border: 0 }}
            loading="lazy"
            title={`Ubicación aproximada en ${solicitud.ciudad}`}
          />
        </div>
      )}

      {visible ? (
        <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
          <p className="font-medium text-green-800 mb-1.5">{solicitud.nombreCliente}</p>
          <div className="space-y-1">
            <p
              className={`flex items-center gap-1.5 ${
                solicitud.preferenciaContacto === "TELEFONO" ? "font-semibold text-green-900" : "text-green-700"
              }`}
            >
              <Phone className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
              {solicitud.telefonoContacto}
              {solicitud.preferenciaContacto === "TELEFONO" && (
                <span className="text-[10px] font-bold uppercase tracking-wide bg-green-600 text-white px-1.5 py-0.5 rounded-full">
                  Preferido
                </span>
              )}
            </p>
            <p
              className={`flex items-center gap-1.5 ${
                solicitud.preferenciaContacto === "CORREO" ? "font-semibold text-green-900" : "text-green-700"
              }`}
            >
              <Mail className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
              {solicitud.emailContacto}
              {solicitud.preferenciaContacto === "CORREO" && (
                <span className="text-[10px] font-bold uppercase tracking-wide bg-green-600 text-white px-1.5 py-0.5 rounded-full">
                  Preferido
                </span>
              )}
            </p>
          </div>
          <p className="text-green-700 mt-1.5">Contáctalo directamente para ofrecer tu servicio.</p>
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
