"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Categoria = { id: string; nombre: string; icono: string };

export default function ProveedorForm({ categorias }: { categorias: Categoria[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);

  function toggleCategoria(id: string) {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (seleccionadas.length === 0) {
      setError("Selecciona al menos una categoría de servicio");
      return;
    }
    setCargando(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: "PROVEEDOR",
        nombre: form.get("nombre"),
        email: form.get("email"),
        password: form.get("password"),
        telefono: form.get("telefono"),
        ciudad: form.get("ciudad"),
        bio: form.get("bio"),
        categoriaIds: seleccionadas,
      }),
    });
    setCargando(false);
    if (res.ok) {
      router.push("/proveedor/explorar?nuevo=1");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "No se pudo crear la cuenta");
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-1">Crea tu perfil de profesional</h1>
      <p className="text-gray-600 mb-6">
        Recibes 3 créditos de bienvenida para empezar a contactar clientes.
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="nombre" required placeholder="Nombre completo o de tu negocio" className="w-full border rounded-lg px-4 py-2.5" />
        <input name="email" type="email" required placeholder="Correo electrónico" className="w-full border rounded-lg px-4 py-2.5" />
        <input name="telefono" required placeholder="Teléfono (con WhatsApp)" className="w-full border rounded-lg px-4 py-2.5" />
        <input name="ciudad" required placeholder="Ciudad donde ofreces el servicio" className="w-full border rounded-lg px-4 py-2.5" />
        <textarea name="bio" placeholder="Cuéntanos brevemente sobre tu experiencia" className="w-full border rounded-lg px-4 py-2.5" rows={3} />
        <input name="password" type="password" required minLength={6} placeholder="Contraseña" className="w-full border rounded-lg px-4 py-2.5" />

        <div>
          <p className="text-sm font-medium mb-2">¿En qué categorías trabajas?</p>
          <div className="grid grid-cols-2 gap-2">
            {categorias.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => toggleCategoria(cat.id)}
                className={`text-left text-sm border rounded-lg px-3 py-2 transition ${
                  seleccionadas.includes(cat.id)
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "hover:border-gray-400"
                }`}
              >
                {cat.icono} {cat.nombre}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={cargando} className="w-full bg-brand-500 text-white py-2.5 rounded-lg font-semibold hover:bg-brand-600 disabled:opacity-50">
          {cargando ? "Creando perfil..." : "Crear mi perfil"}
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-4 text-center">
        ¿Ya tienes cuenta? <a href="/login" className="text-brand-600 font-medium">Inicia sesión</a>
      </p>
    </div>
  );
}
