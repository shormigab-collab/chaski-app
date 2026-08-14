"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";

type Categoria = { id: string; nombre: string; icono: string; slug: string };

export default function NuevaSolicitudForm({
  categorias,
  usuario,
  categoriaInicial,
}: {
  categorias: Categoria[];
  usuario: { telefono: string | null; ciudad: string | null };
  categoriaInicial?: string;
}) {
  const router = useRouter();
  const total = 3;
  const [paso, setPaso] = useState(1);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);

  const [categoriaId, setCategoriaId] = useState(
    categorias.find((c) => c.slug === categoriaInicial)?.id ?? ""
  );
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ciudad, setCiudad] = useState(usuario.ciudad ?? "");
  const [presupuesto, setPresupuesto] = useState("");
  const [telefonoContacto, setTelefonoContacto] = useState(usuario.telefono ?? "");

  const [textoIA, setTextoIA] = useState("");
  const [generandoIA, setGenerandoIA] = useState(false);
  const [errorIA, setErrorIA] = useState("");

  function siguiente() {
    setError("");
    if (paso === 1 && !categoriaId) {
      setError("Elige una categoría para continuar");
      return;
    }
    if (paso === 2 && (titulo.trim().length < 3 || descripcion.trim().length < 10)) {
      setError("Completa el título y una descripción de al menos 10 caracteres");
      return;
    }
    setPaso((p) => Math.min(p + 1, total));
  }

  async function generarConIA() {
    if (textoIA.trim().length < 10) {
      setErrorIA("Cuéntanos un poco más (mínimo 10 caracteres)");
      return;
    }
    setErrorIA("");
    setGenerandoIA(true);
    const res = await fetch("/api/solicitudes/asistente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: textoIA }),
    });
    const data = await res.json();
    setGenerandoIA(false);
    if (res.ok) {
      const cat = categorias.find((c) => c.slug === data.categoriaSlug);
      if (cat) setCategoriaId(cat.id);
      setTitulo(data.titulo);
      setDescripcion(data.descripcion);
      setError("");
      setPaso(2);
    } else {
      setErrorIA(data.error || "No pudimos generar la solicitud, intenta llenarlo manualmente");
    }
  }

  function anterior() {
    setError("");
    setPaso((p) => Math.max(p - 1, 1));
  }

  async function publicar() {
    setError("");
    if (!ciudad.trim() || !telefonoContacto.trim()) {
      setError("Completa tu ciudad y teléfono de contacto");
      return;
    }
    setCargando(true);
    const res = await fetch("/api/solicitudes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categoriaId, titulo, descripcion, ciudad, presupuesto, telefonoContacto }),
    });
    setCargando(false);
    if (res.ok) {
      setExito(true);
      setPaso(1);
      setTitulo("");
      setDescripcion("");
      setPresupuesto("");
      setCategoriaId("");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "No se pudo publicar la solicitud");
    }
  }

  const categoriaSeleccionada = categorias.find((c) => c.id === categoriaId);

  return (
    <div className="border border-black/5 rounded-2xl bg-white p-6 sm:p-8">
      {/* Barra de progreso */}
      <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full bg-black/5 overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-500"
              style={{ width: paso > i ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>

      {exito && (
        <p className="mb-6 bg-brand-50 border border-brand-100 text-brand-600 text-sm rounded-xl p-3.5">
          ¡Solicitud publicada! Ya es visible para profesionales. Puedes publicar otra si quieres.
        </p>
      )}

      {/* Paso 1: categoria */}
      {paso === 1 && (
        <div>
          <h3 className="font-bold text-lg text-ink mb-1">¿Qué tipo de servicio necesitas?</h3>
          <p className="text-sm text-ink/50 mb-4">Elige la categoría que mejor describa tu proyecto.</p>

          <div className="bg-brand-50/60 border border-brand-100 rounded-xl p-4 mb-5">
            <p className="text-xs font-semibold text-brand-600 mb-2 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              O cuéntanos qué necesitas y lo armamos por ti
            </p>
            <textarea
              value={textoIA}
              onChange={(e) => setTextoIA(e.target.value)}
              placeholder="Ej: necesito que me ayuden a diseñar el logo de mi negocio de arepas y armar mis redes sociales"
              rows={2}
              className="w-full text-sm border border-black/10 rounded-lg px-3 py-2.5 outline-none focus:border-brand-500 transition-colors bg-white"
            />
            {errorIA && <p className="text-coral-600 text-xs mt-1.5">{errorIA}</p>}
            <button
              type="button"
              onClick={generarConIA}
              disabled={generandoIA}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold bg-brand-500 text-cream px-4 py-2 rounded-full hover:bg-brand-600 disabled:opacity-50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {generandoIA ? "Redactando..." : "Completar con IA"}
            </button>
          </div>

          <p className="text-xs text-ink/40 mb-3">O elige manualmente:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
            {categorias.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCategoriaId(c.id);
                  setError("");
                }}
                className={`text-left text-sm border rounded-xl px-3.5 py-3 transition-all ${
                  categoriaId === c.id
                    ? "border-brand-500 bg-brand-50 text-brand-600 shadow-sm"
                    : "border-black/10 hover:border-black/30"
                }`}
              >
                <span className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center mb-1.5">
                  <CategoryIcon slug={c.slug} className="w-4 h-4" />
                </span>
                {c.nombre}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Paso 2: detalles */}
      {paso === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg text-ink mb-1">Cuéntanos más</h3>
            <p className="text-sm text-ink/50">
              Categoría:{" "}
              <span className="font-medium text-brand-600 inline-flex items-center gap-1.5">
                {categoriaSeleccionada && (
                  <CategoryIcon slug={categoriaSeleccionada.slug} className="w-3.5 h-3.5" />
                )}
                {categoriaSeleccionada?.nombre}
              </span>
            </p>
          </div>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título breve (ej: Necesito un rediseño de mi sitio web)"
            className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
          />
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            placeholder="Describe con detalle lo que necesitas"
            className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
          />
        </div>
      )}

      {/* Paso 3: contacto */}
      {paso === 3 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-ink mb-1">Últimos datos</h3>
          <p className="text-sm text-ink/50 mb-2">Así te podrán contactar los profesionales interesados.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              placeholder="Ciudad"
              className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
            />
            <input
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
              placeholder="Presupuesto aproximado (opcional)"
              className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
            />
          </div>
          <input
            value={telefonoContacto}
            onChange={(e) => setTelefonoContacto(e.target.value)}
            placeholder="Teléfono de contacto"
            className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
          />
        </div>
      )}

      {error && <p className="text-coral-600 text-sm mt-4">{error}</p>}

      <div className="flex items-center justify-between mt-7">
        <button
          type="button"
          onClick={anterior}
          disabled={paso === 1}
          className="text-sm font-medium text-ink/50 hover:text-ink disabled:opacity-0 transition-colors"
        >
          ← Atrás
        </button>

        {paso < total ? (
          <button
            type="button"
            onClick={siguiente}
            className="bg-brand-500 text-cream px-6 py-2.5 rounded-full font-semibold hover:bg-brand-600 transition-colors"
          >
            Continuar
          </button>
        ) : (
          <button
            type="button"
            onClick={publicar}
            disabled={cargando}
            className="bg-brand-500 text-cream px-6 py-2.5 rounded-full font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors"
          >
            {cargando ? "Publicando..." : "Publicar solicitud"}
          </button>
        )}
      </div>
    </div>
  );
}
