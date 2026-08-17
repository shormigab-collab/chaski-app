"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, MessageSquare, ShieldCheck, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [verPassword, setVerPassword] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setCargando(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    setCargando(false);
    if (res.ok) {
      const data = await res.json();
      const destino =
        data.role === "PROVEEDOR" ? "/proveedor/explorar" : data.role === "ADMIN" ? "/admin" : "/cliente/solicitudes";
      router.push(destino);
      router.refresh();
    } else {
      setError("Correo o contraseña incorrectos");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50/50 via-cream to-cream">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* barra superior */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <Logo size={30} />
          <div className="hidden sm:flex items-center gap-3 text-sm">
            <span className="text-ink/55">¿Aún no tienes cuenta?</span>
            <Link
              href="/registro"
              className="inline-flex items-center min-h-[40px] border border-brand-200 text-brand-600 font-semibold px-4 py-2 rounded-xl hover:bg-brand-50 transition-colors"
            >
              Crear mi perfil
            </Link>
          </div>
        </div>

        {/* tarjeta principal */}
        <div className="grid md:grid-cols-2 rounded-[2rem] overflow-hidden shadow-xl shadow-brand-900/10 bg-white">
          {/* foto + copy */}
          <div className="relative min-h-[460px] sm:min-h-[520px] md:min-h-[600px]">
            <img src="/images/login-mujer.webp" alt="Profesional trabajando en su portafolio" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

            <span className="absolute top-5 left-5 right-5 sm:right-auto sm:top-6 sm:left-6 inline-block text-center sm:text-left text-[10px] sm:text-xs font-bold tracking-widest text-brand-600 bg-white/95 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full whitespace-nowrap overflow-hidden text-ellipsis">
              MARKETPLACE PROFESIONAL DE LATINOAMÉRICA
            </span>

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <h2 className="font-extrabold text-white mb-3" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)", lineHeight: 1.15 }}>
                Talento y <span className="text-coral-400">oportunidades,</span>
                <br />
                en un solo lugar.
              </h2>
              <p className="text-white/75 mb-5 max-w-sm">Conecta, muestra tu trabajo y encuentra nuevas oportunidades.</p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/25 rounded-xl px-3.5 py-2">
                  <MessageSquare className="w-4 h-4" strokeWidth={1.75} />
                  Contacto directo
                </span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/25 rounded-xl px-3.5 py-2">
                  <ShieldCheck className="w-4 h-4" strokeWidth={1.75} />
                  Sin comisiones
                </span>
              </div>
            </div>
          </div>

          {/* formulario */}
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <span className="text-xs font-bold tracking-widest text-brand-600 mb-3">BIENVENIDO DE NUEVO</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-ink mb-2 tracking-tight">Inicia sesión en chaski</h1>
            <p className="text-ink/55 mb-8">Accede a tu perfil y continúa conectando.</p>

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

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="block text-sm font-semibold text-ink">
                    Contraseña
                  </label>
                  <Link href="/recuperar" className="text-xs font-semibold text-brand-600 hover:text-brand-700">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/35" strokeWidth={1.75} />
                  <input
                    id="password"
                    name="password"
                    type={verPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full border border-border rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400"
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

              {error && <p className="text-coral-600 text-sm">{error}</p>}

              <button
                disabled={cargando}
                className="w-full min-h-[48px] bg-brand-600 text-white rounded-xl font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50"
              >
                {cargando ? "Entrando..." : "Iniciar sesión"}
              </button>
            </form>

            <p className="text-sm text-ink/55 text-center mt-6">
              ¿Aún no tienes cuenta?{" "}
              <Link href="/registro" className="text-brand-600 font-semibold hover:text-brand-700">
                Crear mi perfil gratis
              </Link>
            </p>

            <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink/70 mt-6">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
