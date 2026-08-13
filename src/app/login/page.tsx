"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

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
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Inicia sesión</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="email" type="email" required placeholder="Correo electrónico" className="w-full border rounded-lg px-4 py-2.5" />
        <input name="password" type="password" required placeholder="Contraseña" className="w-full border rounded-lg px-4 py-2.5" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={cargando} className="w-full bg-brand-500 text-white py-2.5 rounded-lg font-semibold hover:bg-brand-600 disabled:opacity-50">
          {cargando ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-4 text-center">
        ¿No tienes cuenta? <a href="/registro" className="text-brand-600 font-medium">Regístrate</a>
      </p>
    </div>
  );
}
