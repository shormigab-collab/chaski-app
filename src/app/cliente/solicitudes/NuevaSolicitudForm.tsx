"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import { nombreCategoria } from "@/lib/categoriasEn";
import { MONEDAS, type Moneda } from "@/lib/moneda";

type Categoria = { id: string; nombre: string; icono: string; slug: string };

export default function NuevaSolicitudForm({
  categorias,
  usuario,
  categoriaInicial,
  lang = "es",
}: {
  categorias: Categoria[];
  usuario: { telefono: string | null; ciudad: string | null };
  categoriaInicial?: string;
  lang?: "es" | "en";
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
  const [presupuestoMoneda, setPresupuestoMoneda] = useState<Moneda>("COP");
  const [telefonoContacto, setTelefonoContacto] = useState(usuario.telefono ?? "");
  const [preferenciaContacto, setPreferenciaContacto] = useState<"TELEFONO" | "CORREO" | "AMBOS">("AMBOS");

  const [textoIA, setTextoIA] = useState("");
  const [generandoIA, setGenerandoIA] = useState(false);
  const [errorIA, setErrorIA] = useState("");

  const t =
    lang === "en"
      ? {
          errCategoria: "Choose a category to continue",
          errDetalle: "Fill in a title and a description of at least 10 characters",
          errIA: "Tell us a bit more (minimum 10 characters)",
          errIAFallback: "We couldn't generate the request automatically. Fill it in manually.",
          errContacto: "Fill in your city and contact phone",
          errPublicar: "Couldn't publish your request",
          exito: "Request published! It's now visible to professionals. Feel free to post another one.",
          p1Titulo: "What kind of service do you need?",
          p1Sub: "Choose the category that best describes your project.",
          iaLabel: "Or tell us what you need and we'll draft it for you",
          iaPlaceholder: "E.g: I need help redesigning my company's website and setting up social media",
          iaBoton: "Draft with AI",
          iaCargando: "Drafting...",
          oManual: "Or choose manually:",
          p2Titulo: "Tell us more",
          categoriaLabel: "Category:",
          tituloPlaceholder: "Short title (e.g: I need a redesign of my website)",
          descPlaceholder: "Describe in detail what you need",
          p3Titulo: "Last details",
          p3Sub: "This is how interested professionals will reach out to you.",
          ciudadPlaceholder: "City",
          presupuestoPlaceholder: "Approximate budget (optional)",
          telefonoPlaceholder: "Contact phone number",
          preferenciaLabel: "How do you prefer to be contacted?",
          prefTelefono: "Phone",
          prefCorreo: "Email",
          prefAmbos: "Either one",
          atras: "← Back",
          continuar: "Continue",
          publicar: "Post request",
          publicando: "Posting...",
        }
      : {
          errCategoria: "Elige una categoría para continuar",
          errDetalle: "Completa el título y una descripción de al menos 10 caracteres",
          errIA: "Cuéntanos un poco más (mínimo 10 caracteres)",
          errIAFallback: "No pudimos generar la solicitud automáticamente. Completa los campos manualmente.",
          errContacto: "Completa tu ciudad y teléfono de contacto",
          errPublicar: "No se pudo publicar la solicitud",
          exito: "¡Solicitud publicada! Ya es visible para profesionales. Puedes publicar otra si quieres.",
          p1Titulo: "¿Qué tipo de servicio necesitas?",
          p1Sub: "Elige la categoría que mejor describa tu proyecto.",
          iaLabel: "O cuéntanos qué necesitas y lo armamos por ti",
          iaPlaceholder: "Ej: necesito que me ayuden a diseñar el logo de mi negocio de arepas y armar mis redes sociales",
          iaBoton: "Completar con IA",
          iaCargando: "Redactando...",
          oManual: "O elige manualmente:",
          p2Titulo: "Cuéntanos más",
          categoriaLabel: "Categoría:",
          tituloPlaceholder: "Título breve (ej: Necesito un rediseño de mi sitio web)",
          descPlaceholder: "Describe con detalle lo que necesitas",
          p3Titulo: "Últimos datos",
          p3Sub: "Así te podrán contactar los profesionales interesados.",
          ciudadPlaceholder: "Ciudad",
          presupuestoPlaceholder: "Presupuesto aproximado (opcional)",
          telefonoPlaceholder: "Teléfono de contacto",
          preferenciaLabel: "¿Cómo prefieres que te contacten?",
          prefTelefono: "Teléfono",
          prefCorreo: "Correo",
          prefAmbos: "Cualquiera",
          atras: "← Atrás",
          continuar: "Continuar",
          publicar: "Publicar solicitud",
          publicando: "Publicando...",
        };

  function siguiente() {
    setError("");
    if (paso === 1 && !categoriaId) {
      setError(t.errCategoria);
      return;
    }
    if (paso === 2 && (titulo.trim().length < 3 || descripcion.trim().length < 10)) {
      setError(t.errDetalle);
      return;
    }
    setPaso((p) => Math.min(p + 1, total));
  }

  async function generarConIA() {
    if (textoIA.trim().length < 10) {
      setErrorIA(t.errIA);
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
      setErrorIA(data.error || t.errIAFallback);
    }
  }

  function anterior() {
    setError("");
    setPaso((p) => Math.max(p - 1, 1));
  }

  async function publicar() {
    setError("");
    if (!ciudad.trim() || !telefonoContacto.trim()) {
      setError(t.errContacto);
      return;
    }
    setCargando(true);
    const res = await fetch("/api/solicitudes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoriaId,
        titulo,
        descripcion,
        ciudad,
        presupuesto,
        presupuestoMoneda,
        telefonoContacto,
        preferenciaContacto,
      }),
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
      setError(data.error || t.errPublicar);
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
          {t.exito}
        </p>
      )}

      {/* Paso 1: categoria */}
      {paso === 1 && (
        <div>
          <h3 className="font-bold text-lg text-ink mb-1">{t.p1Titulo}</h3>
          <p className="text-sm text-ink/50 mb-4">{t.p1Sub}</p>

          <div className="bg-brand-50/60 border border-brand-100 rounded-xl p-4 mb-5">
            <p className="text-xs font-semibold text-brand-600 mb-2 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {t.iaLabel}
            </p>
            <textarea
              value={textoIA}
              onChange={(e) => setTextoIA(e.target.value)}
              placeholder={t.iaPlaceholder}
              rows={2}
              className="w-full text-sm border border-black/10 rounded-lg px-3 py-2.5 outline-none focus:border-brand-500 transition-colors bg-white"
            />
            {errorIA && <p className="text-coral-600 text-xs mt-1.5">{errorIA}</p>}
            <button
              type="button"
              onClick={generarConIA}
              disabled={generandoIA}
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold bg-brand-500 text-cream px-4 py-2 rounded-xl hover:bg-brand-600 disabled:opacity-50 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {generandoIA ? t.iaCargando : t.iaBoton}
            </button>
          </div>

          <p className="text-xs text-ink/40 mb-3">{t.oManual}</p>
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
                {nombreCategoria(c, lang)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Paso 2: detalles */}
      {paso === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg text-ink mb-1">{t.p2Titulo}</h3>
            <p className="text-sm text-ink/50">
              {t.categoriaLabel}{" "}
              <span className="font-medium text-brand-600 inline-flex items-center gap-1.5">
                {categoriaSeleccionada && (
                  <CategoryIcon slug={categoriaSeleccionada.slug} className="w-3.5 h-3.5" />
                )}
                {categoriaSeleccionada && nombreCategoria(categoriaSeleccionada, lang)}
              </span>
            </p>
          </div>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder={t.tituloPlaceholder}
            className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
          />
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            placeholder={t.descPlaceholder}
            className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
          />
        </div>
      )}

      {/* Paso 3: contacto */}
      {paso === 3 && (
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-ink mb-1">{t.p3Titulo}</h3>
          <p className="text-sm text-ink/50 mb-2">{t.p3Sub}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              placeholder={t.ciudadPlaceholder}
              className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
            />
            <div className="flex gap-2">
              <input
                value={presupuesto}
                onChange={(e) => setPresupuesto(e.target.value)}
                placeholder={t.presupuestoPlaceholder}
                className="flex-1 min-w-0 border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
              />
              <select
                value={presupuestoMoneda}
                onChange={(e) => setPresupuestoMoneda(e.target.value as Moneda)}
                className="border border-black/10 rounded-xl px-2.5 py-3 text-sm outline-none focus:border-brand-500 transition-colors bg-white shrink-0"
              >
                {MONEDAS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <input
            value={telefonoContacto}
            onChange={(e) => setTelefonoContacto(e.target.value)}
            placeholder={t.telefonoPlaceholder}
            className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
          />

          <div>
            <p className="text-sm font-semibold text-ink mb-2">{t.preferenciaLabel}</p>
            <div className="flex gap-2">
              {(
                [
                  { valor: "TELEFONO", texto: t.prefTelefono },
                  { valor: "CORREO", texto: t.prefCorreo },
                  { valor: "AMBOS", texto: t.prefAmbos },
                ] as const
              ).map((op) => (
                <button
                  type="button"
                  key={op.valor}
                  onClick={() => setPreferenciaContacto(op.valor)}
                  className={`flex-1 text-sm border rounded-xl px-3 py-2.5 transition-colors ${
                    preferenciaContacto === op.valor
                      ? "border-brand-500 bg-brand-50 text-brand-600 font-medium"
                      : "border-black/10 text-ink/70 hover:border-black/30"
                  }`}
                >
                  {op.texto}
                </button>
              ))}
            </div>
          </div>
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
          {t.atras}
        </button>

        {paso < total ? (
          <button
            type="button"
            onClick={siguiente}
            className="bg-brand-500 text-cream px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-600 transition-colors"
          >
            {t.continuar}
          </button>
        ) : (
          <button
            type="button"
            onClick={publicar}
            disabled={cargando}
            className="bg-brand-500 text-cream px-6 py-2.5 rounded-xl font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors"
          >
            {cargando ? t.publicando : t.publicar}
          </button>
        )}
      </div>
    </div>
  );
}
