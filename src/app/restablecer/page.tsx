"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle2 } from "lucide-react";
import Logo from "@/components/Logo";

function RestablecerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [listo, setListo] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Este enlace no es válido. Pide uno nuevo desde 'Olvidé mi contraseña'.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);
    const res = await fetch("/api/auth/restablecer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setCargando(false);

    if (res.ok) {
      setListo(true);
      setTimeout(() => router.push("/login"), 2500);
    } else {
      setError(data.error || "No se pudo actualizar la contraseña.");
    }
  }

  return (
    <div className="w-full max-w-md bg-white border border-border rounded-[2rem] shadow-lg shadow-brand-900/5 p-8 sm:p-10">
      {listo ? (
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-7 h-7" strokeWidth={1.75} />
          </div>
          <h1 className="text-2xl font-extrabold text-ink mb-2">¡Listo!</h1>
          <p className="text-ink/55">Tu contraseña se actualizó. Te llevamos a iniciar sesión...</p>
        </div>
      ) : (
        <>
          <span className="text-xs font-bold tracking-widest text-brand-600 mb-3 block">NUEVA CONTRASEÑA</span>
          <h1 className="text-3xl font-extrabold text-ink mb-2 tracking-tight">Crea tu contraseña</h1>
          <p className="text-ink/55 mb-8">Escribe tu nueva contraseña dos veces para confirmarla.</p>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-ink mb-1.5">
                Nueva contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/35" strokeWidth={1.75} />
                <input
                  id="password"
                  type={verPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full border border-border rounded-xl pl-10 pr-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                />
                <button
                  type="button"
                  onClick={() => setVerPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/35 hover:text-ink/60"
                  aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {verPassword ? <EyeOff className="w-4 h-4" strokeWidth={1.75} /> : <Eye className="w-4 h-4" strokeWidth={1.75} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmar" className="block text-sm font-semibold text-ink mb-1.5">
                Confirma tu contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/35" strokeWidth={1.75} />
                <input
                  id="confirmar"
                  type={verPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  placeholder="Repite la contraseña"
                  className="w-full border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
                />
              </div>
            </div>

            {error && <p className="text-coral-600 text-sm">{error}</p>}

            <button
              disabled={cargando}
              className="w-full min-h-[48px] bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50"
            >
              {cargando ? "Guardando..." : "Guardar nueva contraseña"}
            </button>
          </form>

          <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink/70 mt-6">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            Volver a inicio de sesión
          </Link>
        </>
      )}
    </div>
  );
}

export default function RestablecerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/50 via-cream to-cream flex flex-col">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 w-full">
        <Logo size={30} />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-16">
        <Suspense fallback={null}>
          <RestablecerForm />
        </Suspense>
      </div>
    </div>
  );
}
