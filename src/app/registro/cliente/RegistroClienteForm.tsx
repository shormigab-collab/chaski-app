"use client";


import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegistroClienteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoria = searchParams.get("categoria");
  const lang = searchParams.get("lang") === "en" ? "en" : "es";
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setCargando(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "CLIENTE",
        nombre: form.get("nombre"),
        email: form.get("email"),
        password: form.get("password"),
        telefono: form.get("telefono"),
        ciudad: form.get("ciudad"),
      }),
    });
    setCargando(false);
    if (res.ok) {
      const params = new URLSearchParams({ nuevo: "1" });
      if (categoria) params.set("categoria", categoria);
      if (lang === "en") params.set("lang", "en");
      router.push(`/cliente/solicitudes?${params.toString()}`);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || (lang === "en" ? "Couldn't create your account" : "No se pudo crear la cuenta"));
    }
  }

  const t =
    lang === "en"
      ? {
          titulo: "Create your free account",
          sub: "Post what you need in under 2 minutes.",
          nombre: "Full name",
          email: "Email address",
          telefono: "Phone number",
          ciudad: "City",
          password: "Password",
          boton: "Create account",
          cargando: "Creating account...",
          yaCuenta: "Already have an account?",
          login: "Log in",
        }
      : {
          titulo: "Crea tu cuenta gratis",
          sub: "Publica lo que necesitas en menos de 2 minutos.",
          nombre: "Nombre completo",
          email: "Correo electrónico",
          telefono: "Teléfono (con WhatsApp)",
          ciudad: "Ciudad",
          password: "Contraseña",
          boton: "Crear cuenta",
          cargando: "Creando cuenta...",
          yaCuenta: "¿Ya tienes cuenta?",
          login: "Inicia sesión",
        };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-ink mb-1">{t.titulo}</h1>
      <p className="text-ink/50 mb-6">{t.sub}</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="nombre" required placeholder={t.nombre} className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
        <input name="email" type="email" required placeholder={t.email} className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
        <input name="telefono" required placeholder={t.telefono} className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
        <input name="ciudad" required placeholder={t.ciudad} className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
        <input name="password" type="password" required minLength={6} placeholder={t.password} className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
        {error && <p className="text-coral-600 text-sm">{error}</p>}
        <button disabled={cargando} className="w-full bg-brand-500 text-cream py-3 rounded-full font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50">
          {cargando ? t.cargando : t.boton}
        </button>
      </form>
      <p className="text-sm text-ink/50 mt-4 text-center">
        {t.yaCuenta} <a href="/login" className="text-brand-600 font-medium">{t.login}</a>
      </p>
    </div>
  );
}
