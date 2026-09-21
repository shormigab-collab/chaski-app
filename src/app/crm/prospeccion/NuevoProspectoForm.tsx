"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevoProspectoForm() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [origen, setOrigen] = useState("LinkedIn");
  const [notas, setNotas] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setError("");
    setCargando(true);
    const res = await fetch("/api/crm/contactos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, origen, notas, etapa: "NUEVO" }),
    });
    setCargando(false);
    if (res.ok) {
      setNombre("");
      setEmail("");
      setNotas("");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "No se pudo agregar el prospecto");
    }
  }

  const inputClass =
    "w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300 bg-white";

  return (
    <form onSubmit={onSubmit} className="bg-white border rounded-xl p-4 grid sm:grid-cols-5 gap-2 items-end mb-6">
      <div className="sm:col-span-1">
        <label className="block text-xs font-medium text-gray-500 mb-1">Nombre *</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} required className={inputClass} />
      </div>
      <div className="sm:col-span-1">
        <label className="block text-xs font-medium text-gray-500 mb-1">Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-1">
        <label className="block text-xs font-medium text-gray-500 mb-1">Fuente</label>
        <select value={origen} onChange={(e) => setOrigen(e.target.value)} className={inputClass}>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Correo directo">Correo directo</option>
          <option value="Referido">Referido</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <div className="sm:col-span-1">
        <label className="block text-xs font-medium text-gray-500 mb-1">Empresa / nota / link LinkedIn</label>
        <input
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          placeholder="Ej: Fundador de X, linkedin.com/in/..."
          className={inputClass}
        />
      </div>
      <div className="sm:col-span-1">
        <button
          type="submit"
          disabled={cargando}
          className="w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {cargando ? "Agregando..." : "Agregar prospecto"}
        </button>
      </div>
      {error && <p className="sm:col-span-5 text-xs text-coral-600">{error}</p>}
    </form>
  );
}
