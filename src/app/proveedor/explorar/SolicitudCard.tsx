"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Phone, Mail, Users, Coins, Sparkles, Loader2, Copy, Check } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import ReportarBoton from "@/components/ReportarBoton";
import MatchExplanation from "@/components/MatchExplanation";
import { formatearPresupuesto } from "@/lib/moneda";
import type { NivelCompatibilidad } from "@/lib/matching";

type Solicitud = {
  id: string;
  titulo: string;
  descripcion: string;
  ciudad: string;
  presupuesto: string | null;
  presupuestoMoneda: string;
  categoriaNombre: string;
  categoriaSlug: string;
  nombreCliente: string;
  telefonoMostrar: string;
  correoMostrar: string;
  preferenciaContacto: string; // "TELEFONO" | "CORREO" | "AMBOS"
  totalDesbloqueos: number;
  tiempoTexto: string;
  costoCreditos: number;
  matchNivel: NivelCompatibilidad;
  matchRazones: string[];
};

const NOTA_PREFERENCIA: Record<string, string> = {
  TELEFONO: "Prefiere que lo contacten por teléfono.",
  CORREO: "Prefiere que lo contacten por correo.",
  AMBOS: "Puedes contactarlo por teléfono o correo.",
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
  const [propuesta, setPropuesta] = useState("");
  const [generandoPropuesta, setGenerandoPropuesta] = useState(false);
  const [errorPropuesta, setErrorPropuesta] = useState("");
  const [copiado, setCopiado] = useState(false);
  const mapaSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    solicitud.ciudad
  )}&output=embed`;
  const primerNombre = solicitud.nombreCliente.split(" ")[0];

  async function prepararPropuesta() {
    setErrorPropuesta("");
    setGenerandoPropuesta(true);
    const res = await fetch(`/api/solicitudes/${solicitud.id}/propuesta`, { method: "POST" });
    const data = await res.json();
    setGenerandoPropuesta(false);
    if (res.ok) {
      setPropuesta(data.mensaje);
    } else {
      setErrorPropuesta(data.error || "No se pudo preparar el mensaje.");
    }
  }

  async function copiarPropuesta() {
    await navigator.clipboard.writeText(propuesta);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

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
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-lg text-ink">{solicitud.nombreCliente}</h3>
        <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">{solicitud.tiempoTexto}</span>
      </div>

      <p className="font-semibold text-ink mt-0.5">{solicitud.titulo}</p>

      <span className="text-xs uppercase tracking-wide text-brand-600 font-semibold inline-flex items-center gap-1.5 mt-1.5">
        <CategoryIcon slug={solicitud.categoriaSlug} className="w-3.5 h-3.5" />
        {solicitud.categoriaNombre} · {solicitud.ciudad}
      </span>

      <p className="text-gray-400 text-sm mt-1.5">{NOTA_PREFERENCIA[solicitud.preferenciaContacto] || NOTA_PREFERENCIA.AMBOS}</p>

      <p className="text-gray-600 text-sm mt-2">{solicitud.descripcion}</p>

      <div className="mt-3">
        <MatchExplanation nivel={solicitud.matchNivel} razones={solicitud.matchRazones} />
      </div>
      {solicitud.presupuesto && (
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2 flex-wrap">
          Presupuesto: {formatearPresupuesto(solicitud.presupuesto, solicitud.presupuestoMoneda)}
          {solicitud.costoCreditos > 1 && (
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              {solicitud.costoCreditos === 2 ? "Presupuesto alto" : "Presupuesto premium"}
            </span>
          )}
        </p>
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

      <div className="mt-3 space-y-1.5 text-sm">
        <p className="flex items-center gap-2 text-ink">
          <Phone className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.75} />
          {solicitud.telefonoMostrar}
        </p>
        <p className="flex items-center gap-2 text-ink">
          <Mail className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.75} />
          {solicitud.correoMostrar}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border rounded-lg px-3 py-2">
        <Users className="w-4 h-4 shrink-0" strokeWidth={1.75} />
        {solicitud.totalDesbloqueos === 0
          ? "Ningún profesional ha destapado este contacto todavía."
          : `${solicitud.totalDesbloqueos} profesional${solicitud.totalDesbloqueos === 1 ? "" : "es"} ya destap${
              solicitud.totalDesbloqueos === 1 ? "ó" : "aron"
            } este contacto.`}
      </div>

      {visible ? (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
          <p className="text-green-700">Ya tienes el contacto completo. Escríbele directamente para ofrecer tu servicio.</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <a
              href={`tel:${solicitud.telefonoMostrar}`}
              className="inline-flex items-center gap-1.5 bg-white border border-green-300 text-green-800 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-100"
            >
              <Phone className="w-3.5 h-3.5" strokeWidth={1.75} />
              Llamar
            </a>
            <a
              href={`mailto:${solicitud.correoMostrar}`}
              className="inline-flex items-center gap-1.5 bg-white border border-green-300 text-green-800 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-100"
            >
              <Mail className="w-3.5 h-3.5" strokeWidth={1.75} />
              Enviar correo
            </a>
          </div>

          {!propuesta && (
            <button
              type="button"
              onClick={prepararPropuesta}
              disabled={generandoPropuesta}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 disabled:opacity-50"
            >
              {generandoPropuesta ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              {generandoPropuesta ? "Preparando mensaje..." : "Preparar mi propuesta con IA"}
            </button>
          )}
          {errorPropuesta && <p className="text-red-600 text-xs mt-2">{errorPropuesta}</p>}
          {propuesta && (
            <div className="mt-3 bg-white border border-green-200 rounded-lg p-3">
              <p className="text-xs font-semibold text-green-800 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Borrador de mensaje — revísalo antes de enviarlo tú mismo
              </p>
              <textarea
                value={propuesta}
                onChange={(e) => setPropuesta(e.target.value)}
                rows={5}
                className="w-full text-sm border border-black/10 rounded-lg px-3 py-2 outline-none focus:border-brand-500 transition-colors resize-none"
              />
              <button
                type="button"
                onClick={copiarPropuesta}
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold bg-brand-50 text-brand-600 px-3 py-1.5 rounded-lg hover:bg-brand-100"
              >
                {copiado ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiado ? "Copiado" : "Copiar mensaje"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 font-medium">
            <Coins className="w-4 h-4 text-brand-500" strokeWidth={1.75} />
            {solicitud.costoCreditos} crédito{solicitud.costoCreditos === 1 ? "" : "s"}
          </span>
          <button
            onClick={desbloquear}
            disabled={cargando}
            className="bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-600 disabled:opacity-50"
          >
            {cargando ? "Desbloqueando..." : `Contactar a ${primerNombre}`}
          </button>
        </div>
      )}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <div className="mt-3 pt-3 border-t border-black/5">
        <ReportarBoton tipo="SOLICITUD" objetivoId={solicitud.id} etiqueta="Reportar esta solicitud" />
      </div>
    </div>
  );
}
