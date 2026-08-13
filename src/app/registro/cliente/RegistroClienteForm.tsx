"use client";


import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegistroClienteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoria = searchParams.get("categoria");
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
      const destino = categoria
        ? `/cliente/solicitudes?nuevo=1&categoria=${categoria}`
        : "/cliente/solicitudes?nuevo=1";
      router.push(destino);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "No se pudo crear la cuenta");
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-ink mb-1">Crea tu cuenta gratis</h1>
      <p className="text-ink/50 mb-6">Publica lo que necesitas en menos de 2 minutos.</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="nombre" required placeholder="Nombre completo" className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
        <input name="email" type="email" required placeholder="Correo electrónico" className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
        <input name="telefono" required placeholder="Teléfono (con WhatsApp)" className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
        <input name="ciudad" required placeholder="Ciudad" className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
        <input name="password" type="password" required minLength={6} placeholder="Contraseña" className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
        {error && <p className="text-coral-600 text-sm">{error}</p>}
        <button disabled={cargando} className="w-full bg-brand-500 text-cream py-3 rounded-full font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50">
          {cargando ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>
      <p className="text-sm text-ink/50 mt-4 text-center">
        ¿Ya tienes cuenta? <a href="/login" className="text-brand-600 font-medium">Inicia sesión</a>
      </p>
    </div>
  );
}
