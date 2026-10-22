"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIAS_SENAL } from "@/lib/senales/categorias";

const FUENTES = ["Computrabajo", "LinkedIn", "Indeed", "Otra bolsa de empleo"];

const vacio = {
  empresa: "",
  titulo: "",
  url: "",
  fuente: FUENTES[0],
  categoriaSlug: CATEGORIAS_SENAL[0].slug,
  empresaWeb: "",
  empresaPais: "",
  publicadaEn: "",
  contactoEmail: "",
};

export default function AgregarManual() {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [f, setF] = useState(vacio);
  const [error, setError] = useState("");
  const [ocupado, setOcupado] = useState(false);

  const set = (k: keyof typeof vacio) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  async function guardar(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setOcupado(true);
    try {
      const res = await fetch("/api/crm/senales/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || `HTTP ${res.status}`);
      } else {
        setF(vacio);
        setAbierto(false);
        router.refresh();
      }
    } catch (err) {
      setError(`No se pudo contactar al servidor: ${err instanceof Error ? err.message : String(err)}`);
    }
    setOcupado(false);
  }

  const campo = "w-full border rounded-lg px-3 py-2 text-sm bg-white";

  return (
    <div className="mb-5">
      {!abierto ? (
        <button onClick={() => setAbierto(true)} className="text-sm font-semibold border bg-white px-3.5 py-2 rounded-lg hover:bg-gray-50">
          + Agregar señal manual
        </button>
      ) : (
        <form onSubmit={guardar} className="bg-white border rounded-2xl p-4 space-y-3">
          <p className="text-sm font-semibold">Agregar una vacante que encontraste tú</p>
          <p className="text-xs text-gray-500">
            Busca la vacante en Computrabajo, LinkedIn, Indeed u otra bolsa y pega aquí los datos. Se crea el borrador y la
            prioridad igual que con las demás.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <input required placeholder="Empresa *" value={f.empresa} onChange={set("empresa")} className={campo} />
            <input required placeholder="Título de la vacante *" value={f.titulo} onChange={set("titulo")} className={campo} />
            <input required type="url" placeholder="Enlace a la vacante * (https://...)" value={f.url} onChange={set("url")} className={campo} />
            <select value={f.fuente} onChange={set("fuente")} className={campo}>
              {FUENTES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <select value={f.categoriaSlug} onChange={set("categoriaSlug")} className={campo}>
              {CATEGORIAS_SENAL.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.nombre}
                </option>
              ))}
            </select>
            <input placeholder="País (opcional)" value={f.empresaPais} onChange={set("empresaPais")} className={campo} />
            <input placeholder="Sitio web de la empresa (opcional)" value={f.empresaWeb} onChange={set("empresaWeb")} className={campo} />
            <input type="email" placeholder="Correo de contacto (opcional)" value={f.contactoEmail} onChange={set("contactoEmail")} className={campo} />
            <label className="text-xs text-gray-600 flex items-center gap-2">
              Fecha de publicación
              <input type="date" value={f.publicadaEn} onChange={set("publicadaEn")} className="border rounded-lg px-2 py-1.5 text-sm" />
            </label>
          </div>
          <div className="flex items-center gap-2">
            <button disabled={ocupado} className="text-sm font-semibold bg-ink text-white px-4 py-2 rounded-lg disabled:opacity-50">
              {ocupado ? "Guardando..." : "Guardar señal"}
            </button>
            <button type="button" onClick={() => setAbierto(false)} className="text-sm text-gray-500 px-2 py-2">
              Cancelar
            </button>
          </div>
          {error && <p className="text-xs text-red-700">{error}</p>}
        </form>
      )}
    </div>
  );
}
