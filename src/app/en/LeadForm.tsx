"use client";

import { useState } from "react";

export default function LeadForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setEnviando(true);
    const res = await fetch("/api/leads-us", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, empresa: empresa || undefined, mensaje }),
    });
    setEnviando(false);
    if (res.ok) {
      setEnviado(true);
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong. Please try again.");
    }
  }

  if (enviado) {
    return (
      <div id="interesado" className="bg-white border border-black/5 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-ink mb-2">Thanks, {nombre.split(" ")[0]}! 🎉</h3>
        <p className="text-ink/60">
          We&apos;ve got your request. We personally review every submission and will reach out to you by email within
          1-2 business days to talk about your project.
        </p>
      </div>
    );
  }

  return (
    <form
      id="interesado"
      onSubmit={onSubmit}
      className="bg-white border border-black/5 rounded-2xl p-6 sm:p-8 space-y-4"
    >
      <div>
        <h3 className="text-xl font-bold text-ink mb-1">Tell us what you need</h3>
        <p className="text-sm text-ink/50">We&apos;ll personally follow up by email to help you find the right person.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          placeholder="Full name"
          className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="Work email"
          className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
        />
      </div>
      <input
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        placeholder="Company (optional)"
        className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
      />
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        required
        rows={4}
        placeholder="What kind of help are you looking for? (e.g. a designer for a new logo, a developer to build an app, ongoing bookkeeping...)"
        className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
      />
      {error && <p className="text-coral-600 text-sm">{error}</p>}
      <button
        disabled={enviando}
        className="w-full bg-brand-500 text-cream py-3.5 rounded-xl font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50 min-h-[44px]"
      >
        {enviando ? "Sending..." : "Get started — it's free"}
      </button>
      <p className="text-xs text-ink/35 text-center">
        No commitment. We&apos;ll only use your info to follow up about this request.
      </p>
    </form>
  );
}
