"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import Logo from "@/components/Logo";

export default function RecuperarPage() {
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setCargando(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/recuperar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email") }),
    });
    setCargando(false);
    if (res.ok) {
      setEnviado(true);
    } else {
      setError("Correo inválido, revísalo e intenta de nuevo.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/50 via-cream to-cream flex flex-col">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 w-full">
        <Logo size={30} />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md bg-white border border-border rounded-[2rem] shadow-lg shadow-brand-900/5 p-8 sm:p-10">
          {enviado ? (
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7" strokeWidth={1.75} />
              </div>
              <h1 className="text-2xl font-extrabold text-ink mb-2">Revisa tu correo</h1>
              <p className="text-ink/55 mb-8">
                Si ese correo tiene una cuenta en chaski, te enviamos un enlace para crear una contraseña nueva. Puede
                tardar unos minutos — revisa también spam.
              </p>
              <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
                <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
                Volver a inicio de sesión
              </Link>
            </div>
          ) : (
            <>
              <span className="text-xs font-bold tracking-widest text-brand-600 mb-3 block">¿OLVIDASTE TU CONTRASEÑA?</span>
              <h1 className="text-3xl font-extrabold text-ink mb-2 tracking-tight">Recupera tu acceso</h1>
              <p className="text-ink/55 mb-8">Escribe tu correo y te mandamos un enlace para crear una contraseña nueva.</p>

              <form onSubmit={onSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-ink mb-1.5">
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/35" strokeWidth={1.75} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="tu@correo.com"
                      className="w-full border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                    />
                  </div>
                </div>

                {error && <p className="text-coral-600 text-sm">{error}</p>}

                <button
                  disabled={cargando}
                  className="w-full min-h-[48px] bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50"
                >
                  {cargando ? "Enviando..." : "Enviar enlace de recuperación"}
                </button>
              </form>

              <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink/70 mt-6">
                <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
                Volver a inicio de sesión
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
