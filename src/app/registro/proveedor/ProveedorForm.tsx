"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gift, Sparkles } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";

type Categoria = { id: string; nombre: string; slug: string; icono: string };

const CREDITOS_BIENVENIDA = 5;
const CREDITOS_REFERIDO = 7;

export default function ProveedorForm({
  categorias,
  refCode,
}: {
  categorias: Categoria[];
  refCode?: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [seleccionadas, setSeleccionadas] = useState<string[]>([]);
  const creditosAMostrar = refCode ? CREDITOS_REFERIDO : CREDITOS_BIENVENIDA;

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
        ref: refCode,
        aniosExperiencia: form.get("aniosExperiencia") || undefined,
        tarifaAproximada: form.get("tarifaAproximada") || undefined,
        linkedinUrl: form.get("linkedinUrl") || undefined,
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

  const inputClass =
    "w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors placeholder:text-ink/35 bg-white";

  return (
    <div className="bg-gradient-to-b from-brand-50 via-cream to-cream">
      <div className="max-w-xl mx-auto px-4 pt-16 pb-20">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-1.5 bg-brand-100 text-brand-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Para profesionales independientes
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-2">
            Crea tu perfil profesional
          </h1>
          <p className="text-ink/60 max-w-sm mx-auto">
            Es gratis, toma menos de 2 minutos y ya puedes empezar a recibir clientes interesados en tu trabajo.
          </p>
        </div>

        <div className="flex items-start gap-3 bg-gold-50 border border-gold-100 rounded-2xl px-5 py-4 mb-8">
          <div className="shrink-0 w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center">
            <Gift className="w-4 h-4 text-white" />
          </div>
          <p className="text-sm text-ink/80 leading-snug">
            <span className="font-bold text-ink">Recibes {creditosAMostrar} créditos de bienvenida</span> para
            empezar a contactar clientes apenas termines tu registro.
            {refCode && " Vienes invitado por un colega, por eso recibes créditos extra."}
          </p>
        </div>

        <div className="bg-white border border-black/5 rounded-3xl shadow-sm p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-4">
            <input name="nombre" required placeholder="Nombre completo o de tu negocio" className={inputClass} />
            <input name="email" type="email" required placeholder="Correo electrónico" className={inputClass} />
            <input name="telefono" required placeholder="Teléfono (con WhatsApp)" className={inputClass} />
            <input name="ciudad" required placeholder="Ciudad donde ofreces el servicio" className={inputClass} />
            <textarea
              name="bio"
              placeholder="Cuéntanos brevemente sobre tu experiencia"
              className={inputClass}
              rows={3}
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                name="aniosExperiencia"
                type="number"
                min={0}
                max={60}
                placeholder="Años de experiencia"
                className={inputClass}
              />
              <input name="tarifaAproximada" placeholder="Tarifa aprox. (ej. $15-25/hora)" className={inputClass} />
            </div>
            <input
              name="linkedinUrl"
              type="url"
              placeholder="Link de tu LinkedIn (opcional)"
              className={inputClass}
            />

            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="Contraseña"
              className={inputClass}
            />

            <div>
              <p className="text-sm font-semibold text-ink mb-2">¿En qué categorías trabajas?</p>
              <div className="grid grid-cols-2 gap-2">
                {categorias.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => toggleCategoria(cat.id)}
                    className={`text-left text-sm border rounded-xl px-3 py-2.5 transition-colors ${
                      seleccionadas.includes(cat.id)
                        ? "border-brand-500 bg-brand-50 text-brand-600 font-medium"
                        : "border-black/10 text-ink/70 hover:border-black/30"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <CategoryIcon slug={cat.slug} className="w-3.5 h-3.5 shrink-0" />
                      {cat.nombre}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-coral-600 text-sm">{error}</p>}

            <button
              disabled={cargando}
              className="w-full bg-brand-500 text-cream py-3.5 rounded-full font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50 min-h-[44px]"
            >
              {cargando ? "Creando perfil..." : `Crear mi perfil y recibir ${creditosAMostrar} créditos`}
            </button>
          </form>
        </div>

        <p className="text-sm text-ink/50 mt-6 text-center">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-brand-600 font-medium hover:text-brand-700">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
