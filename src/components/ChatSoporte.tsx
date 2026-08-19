"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, ArrowLeft } from "lucide-react";

type Mensaje = { role: "user" | "assistant"; content: string };

const SALUDO: Mensaje = {
  role: "assistant",
  content:
    "¡Hola! Soy el asistente de chaski. Puedo ayudarte con dudas sobre créditos, precios, verificación de perfil y cómo funciona la plataforma. ¿En qué te ayudo?",
};

const SUGERENCIAS = [
  "¿Cómo funcionan los créditos?",
  "Precios de los paquetes de créditos",
  "¿Cómo verifico mi perfil?",
];

export default function ChatSoporte() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([SALUDO]);
  const [entrada, setEntrada] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [vistaEscalar, setVistaEscalar] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  const [nombreEsc, setNombreEsc] = useState("");
  const [correoEsc, setCorreoEsc] = useState("");
  const [mensajeEsc, setMensajeEsc] = useState("");
  const [enviandoEsc, setEnviandoEsc] = useState(false);
  const [erroEsc, setErrorEsc] = useState("");
  const [enviadoEsc, setEnviadoEsc] = useState(false);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, vistaEscalar, cargando]);

  async function enviarMensaje(texto: string) {
    const contenido = texto.trim();
    if (!contenido || cargando) return;
    setError("");
    const historial = [...mensajes, { role: "user" as const, content: contenido }];
    setMensajes(historial);
    setEntrada("");
    setCargando(true);

    const paraApi = historial.filter((m) => m !== SALUDO).map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat-soporte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensajes: paraApi }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setMensajes((prev) => [...prev, { role: "assistant", content: data.respuesta }]);
    } catch {
      setError("El asistente no está disponible en este momento.");
    } finally {
      setCargando(false);
    }
  }

  function abrirEscalar() {
    const ultimoUsuario = [...mensajes].reverse().find((m) => m.role === "user");
    if (ultimoUsuario) setMensajeEsc(ultimoUsuario.content);
    setVistaEscalar(true);
  }

  async function enviarEscalar(e: React.FormEvent) {
    e.preventDefault();
    setErrorEsc("");
    if (!nombreEsc.trim() || !mensajeEsc.trim()) {
      setErrorEsc("Completa tu nombre y tu mensaje");
      return;
    }
    setEnviandoEsc(true);
    const res = await fetch("/api/soporte/escalar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: nombreEsc,
        correo: correoEsc,
        mensaje: mensajeEsc,
        transcripcion: mensajes.filter((m) => m !== SALUDO),
      }),
    });
    setEnviandoEsc(false);
    if (res.ok) {
      setEnviadoEsc(true);
    } else {
      const data = await res.json().catch(() => ({}));
      setErrorEsc(data.error || "No se pudo enviar tu mensaje");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-label={abierto ? "Cerrar chat de soporte" : "Abrir chat de soporte"}
        className="fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-40 w-14 h-14 rounded-full bg-brand-500 text-cream shadow-lg shadow-black/25 flex items-center justify-center hover:bg-brand-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        {abierto ? <X className="w-6 h-6" strokeWidth={2} /> : <MessageCircle className="w-6 h-6" strokeWidth={2} />}
      </button>

      {abierto && (
        <div className="fixed z-40 right-4 sm:right-5 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] left-4 sm:left-auto sm:w-[380px] max-h-[70vh] bg-white rounded-2xl shadow-2xl shadow-black/25 border border-black/5 flex flex-col overflow-hidden">
          <div className="bg-brand-600 text-cream px-4 py-3.5 flex items-center justify-between shrink-0">
            <div>
              <p className="font-semibold text-sm">Soporte chaski</p>
              <p className="text-[11px] text-cream/70">Normalmente respondemos al instante</p>
            </div>
            {vistaEscalar && (
              <button
                type="button"
                onClick={() => setVistaEscalar(false)}
                aria-label="Volver al chat"
                className="text-cream/80 hover:text-cream"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {!vistaEscalar ? (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[280px]">
                {mensajes.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.role === "user" ? "bg-brand-500 text-cream rounded-br-sm" : "bg-gray-100 text-ink rounded-bl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}

                {mensajes.length === 1 && (
                  <div className="flex flex-col gap-1.5 pt-1">
                    {SUGERENCIAS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => enviarMensaje(s)}
                        className="text-left text-xs border border-brand-200 text-brand-600 bg-brand-50 rounded-xl px-3 py-2 hover:bg-brand-100 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {cargando && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                      <Loader2 className="w-4 h-4 text-ink/40 animate-spin" />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="text-xs text-coral-600 bg-coral-50 rounded-xl px-3 py-2">{error}</div>
                )}

                <button
                  type="button"
                  onClick={abrirEscalar}
                  className="text-xs font-medium text-brand-600 hover:text-brand-700 underline underline-offset-2"
                >
                  Prefiero hablar con una persona
                </button>

                <div ref={finRef} />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  enviarMensaje(entrada);
                }}
                className="border-t border-black/5 p-3 flex items-center gap-2 shrink-0"
              >
                <input
                  value={entrada}
                  onChange={(e) => setEntrada(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="flex-1 min-w-0 border border-black/10 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={cargando || !entrada.trim()}
                  aria-label="Enviar"
                  className="w-10 h-10 shrink-0 rounded-xl bg-brand-500 text-cream flex items-center justify-center hover:bg-brand-600 disabled:opacity-40 transition-colors"
                >
                  <Send className="w-4 h-4" strokeWidth={2} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {enviadoEsc ? (
                <p className="text-sm text-brand-600 bg-brand-50 rounded-xl px-3.5 py-3">
                  ¡Listo! Le llegó tu mensaje a nuestro equipo — te respondemos a tu correo lo antes posible.
                </p>
              ) : (
                <form onSubmit={enviarEscalar} className="space-y-3">
                  <p className="text-xs text-ink/50 mb-1">
                    Cuéntanos tu caso y te escribimos a tu correo. Máximo en 24 horas hábiles.
                  </p>
                  <input
                    value={nombreEsc}
                    onChange={(e) => setNombreEsc(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full border border-black/10 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 transition-colors"
                  />
                  <input
                    value={correoEsc}
                    onChange={(e) => setCorreoEsc(e.target.value)}
                    type="email"
                    placeholder="Tu correo"
                    className="w-full border border-black/10 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 transition-colors"
                  />
                  <textarea
                    value={mensajeEsc}
                    onChange={(e) => setMensajeEsc(e.target.value)}
                    rows={4}
                    placeholder="Cuéntanos qué necesitas"
                    className="w-full border border-black/10 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 transition-colors resize-none"
                  />
                  {erroEsc && <p className="text-xs text-coral-600">{erroEsc}</p>}
                  <button
                    type="submit"
                    disabled={enviandoEsc}
                    className="w-full bg-brand-500 text-cream px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors"
                  >
                    {enviandoEsc ? "Enviando..." : "Enviar a soporte"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
