"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Loader2, CheckCircle2, Info } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import { MONEDAS, type Moneda } from "@/lib/moneda";

type Categoria = { id: string; nombre: string; slug: string };
type Mensaje = { role: "user" | "assistant"; content: string };

type Brief = {
  categoriaSlug: string;
  titulo: string;
  resumen: string;
  entregables: string[];
  presupuestoEstimado: string;
  presupuestoMoneda: Moneda;
  ciudad: string;
  criteriosExito: string;
};

const MAX_PREGUNTAS = 4;

export default function CopilotoFlow({
  categorias,
  usuario,
}: {
  categorias: Categoria[];
  usuario: { telefono: string | null; ciudad: string | null };
}) {
  const router = useRouter();

  const [fase, setFase] = useState<"inicio" | "pregunta" | "brief" | "publicando" | "publicado">("inicio");
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [textoInicial, setTextoInicial] = useState("");
  const [preguntaActual, setPreguntaActual] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [numPregunta, setNumPregunta] = useState(0);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Brief editable
  const [categoriaId, setCategoriaId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [resumen, setResumen] = useState("");
  const [entregables, setEntregables] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [presupuestoMoneda, setPresupuestoMoneda] = useState<Moneda>("COP");
  const [ciudad, setCiudad] = useState(usuario.ciudad ?? "");
  const [criteriosExito, setCriteriosExito] = useState("");
  const [telefonoContacto, setTelefonoContacto] = useState(usuario.telefono ?? "");
  const [preferenciaContacto, setPreferenciaContacto] = useState<"TELEFONO" | "CORREO" | "AMBOS">("AMBOS");
  const [categoriaSinDetectar, setCategoriaSinDetectar] = useState(false);

  async function enviarTurno(mensajesActualizados: Mensaje[]) {
    setError("");
    setCargando(true);
    const res = await fetch("/api/copiloto/turno", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensajes: mensajesActualizados }),
    });
    const data = await res.json();
    setCargando(false);

    if (!res.ok) {
      setError(data.error || "El Copiloto no está disponible en este momento.");
      return;
    }

    if (data.tipo === "pregunta") {
      setMensajes([...mensajesActualizados, { role: "assistant", content: data.pregunta }]);
      setPreguntaActual(data.pregunta);
      setNumPregunta((n) => n + 1);
      setFase("pregunta");
    } else {
      const b = data.brief as Brief;
      setTitulo(b.titulo);
      setResumen(b.resumen);
      setEntregables(b.entregables.join("\n"));
      setPresupuesto(b.presupuestoEstimado);
      setPresupuestoMoneda(b.presupuestoMoneda);
      setCiudad(b.ciudad || usuario.ciudad || "");
      setCriteriosExito(b.criteriosExito);
      if (data.categoriaId) {
        setCategoriaId(data.categoriaId);
        setCategoriaSinDetectar(false);
      } else {
        setCategoriaId(categorias[0]?.id ?? "");
        setCategoriaSinDetectar(true);
      }
      setFase("brief");
    }
  }

  function iniciar() {
    if (textoInicial.trim().length < 10) {
      setError("Cuéntanos un poco más — mínimo 10 caracteres.");
      return;
    }
    setError("");
    enviarTurno([{ role: "user", content: textoInicial.trim() }]);
  }

  function responderPregunta() {
    if (!respuesta.trim()) {
      setError("Escribe una respuesta, o usa la opción de abajo.");
      return;
    }
    const actualizados: Mensaje[] = [...mensajes, { role: "user", content: respuesta.trim() }];
    setRespuesta("");
    enviarTurno(actualizados);
  }

  function noEstoySeguro() {
    const actualizados: Mensaje[] = [
      ...mensajes,
      { role: "user", content: "No estoy seguro, usa tu mejor criterio para esto." },
    ];
    enviarTurno(actualizados);
  }

  async function publicar() {
    if (!ciudad.trim() || !telefonoContacto.trim()) {
      setError("Completa la ciudad y tu teléfono de contacto.");
      return;
    }
    if (titulo.trim().length < 3 || resumen.trim().length < 10) {
      setError("El título y el resumen del proyecto no pueden estar vacíos.");
      return;
    }
    setError("");
    setFase("publicando");

    const listaEntregables = entregables
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const descripcionCompleta = [
      resumen.trim(),
      listaEntregables.length > 0 ? `\nEntregables:\n${listaEntregables.map((e) => `- ${e}`).join("\n")}` : "",
      criteriosExito.trim() ? `\nCriterios de éxito: ${criteriosExito.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch("/api/solicitudes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categoriaId,
        titulo: titulo.trim(),
        descripcion: descripcionCompleta,
        ciudad: ciudad.trim(),
        presupuesto: presupuesto.trim(),
        presupuestoMoneda,
        telefonoContacto: telefonoContacto.trim(),
        preferenciaContacto,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      setFase("publicado");
      router.push(`/cliente/solicitudes/${data.id}/matches`);
    } else {
      setFase("brief");
      setError(data.error || "No se pudo publicar la solicitud.");
    }
  }

  const categoriaSeleccionada = categorias.find((c) => c.id === categoriaId);

  return (
    <div>
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Con inteligencia artificial
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink">¿Qué quieres hacer realidad?</h1>
        <p className="text-ink/55 mt-2 max-w-md mx-auto">
          No necesitas preparar un brief. Cuéntanos tu idea como se la contarías a una persona.
        </p>
      </div>

      <div className="border border-black/5 rounded-2xl bg-white p-6 sm:p-8">
        {fase === "inicio" && (
          <div>
            <textarea
              value={textoInicial}
              onChange={(e) => setTextoInicial(e.target.value)}
              rows={5}
              placeholder="Ej.: Quiero crear la identidad y la página web de mi nueva marca de café en Medellín. Tengo un presupuesto de ocho millones de pesos y quiero lanzarla en un mes."
              className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors resize-none"
            />
            <p className="text-xs text-ink/40 mt-2 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              Tu descripción se usa solo para armar tu proyecto. No la compartimos con nadie hasta que decidas
              publicarlo.
            </p>
            {error && <p className="text-coral-600 text-sm mt-3">{error}</p>}
            <button
              type="button"
              onClick={iniciar}
              disabled={cargando}
              className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-500 text-cream px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors min-h-[44px]"
            >
              {cargando ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Pensando...
                </>
              ) : (
                <>
                  Describe tu proyecto <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <div className="mt-4 pt-4 border-t border-black/5">
              <Link href="/cliente/solicitudes" className="text-sm text-ink/50 hover:text-ink underline">
                Prefiero completar el formulario manualmente
              </Link>
            </div>
          </div>
        )}

        {fase === "pregunta" && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              {Array.from({ length: MAX_PREGUNTAS }).map((_, i) => (
                <div key={i} className="flex-1 h-1.5 rounded-full bg-black/5 overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full transition-all duration-500"
                    style={{ width: numPregunta > i ? "100%" : "0%" }}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-ink/40 mb-2">
              Pregunta {numPregunta} de máx. {MAX_PREGUNTAS}
            </p>
            <h3 className="font-bold text-lg text-ink mb-4">{preguntaActual}</h3>
            <textarea
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              rows={3}
              autoFocus
              className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors resize-none"
            />
            {error && <p className="text-coral-600 text-sm mt-3">{error}</p>}
            <div className="flex flex-col sm:flex-row gap-2.5 mt-5">
              <button
                type="button"
                onClick={responderPregunta}
                disabled={cargando}
                className="inline-flex items-center justify-center gap-2 bg-brand-500 text-cream px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors min-h-[44px]"
              >
                {cargando ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                Continuar
              </button>
              <button
                type="button"
                onClick={noEstoySeguro}
                disabled={cargando}
                className="text-sm font-medium text-ink/50 hover:text-ink transition-colors disabled:opacity-50"
              >
                No estoy seguro, ayúdame a decidir
              </button>
            </div>
          </div>
        )}

        {(fase === "brief" || fase === "publicando" || fase === "publicado") && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-brand-600 mb-1">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="font-bold text-lg text-ink">Tu proyecto, listo para revisar</h3>
            </div>
            <p className="text-xs text-ink/40 -mt-2">
              Chaski Copiloto puede cometer errores. Revisa la información antes de publicarla.
            </p>

            <div>
              <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Categoría</label>
              {categoriaSinDetectar && (
                <p className="text-xs text-coral-600 mt-0.5 mb-1.5">
                  No pudimos detectar la categoría automáticamente, elígela tú.
                </p>
              )}
              <select
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors bg-white mt-1"
              >
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
              {categoriaSeleccionada && (
                <span className="inline-flex items-center gap-1.5 text-xs text-brand-600 mt-1.5">
                  <CategoryIcon slug={categoriaSeleccionada.slug} className="w-3.5 h-3.5" />
                  {categoriaSeleccionada.nombre}
                </span>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Título</label>
              <input
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Resumen</label>
              <textarea
                value={resumen}
                onChange={(e) => setResumen(e.target.value)}
                rows={3}
                className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors mt-1 resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">
                Entregables (uno por línea)
              </label>
              <textarea
                value={entregables}
                onChange={(e) => setEntregables(e.target.value)}
                rows={3}
                className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors mt-1 resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Ciudad</label>
                <input
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  placeholder="Ciudad, o 'Remoto'"
                  className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors mt-1"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">
                  Presupuesto <span className="normal-case font-normal">(estimación orientativa)</span>
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(e.target.value)}
                    placeholder="Opcional"
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
            </div>
            <p className="text-xs text-ink/40 -mt-2">
              Estimación orientativa — el precio final se acuerda directamente con el profesional.
            </p>

            <div>
              <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">
                Criterios de éxito <span className="normal-case font-normal">(opcional)</span>
              </label>
              <textarea
                value={criteriosExito}
                onChange={(e) => setCriteriosExito(e.target.value)}
                rows={2}
                className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors mt-1 resize-none"
              />
            </div>

            <div className="pt-2 border-t border-black/5" />

            <div>
              <label className="text-xs font-semibold text-ink/50 uppercase tracking-wide">Tu teléfono de contacto</label>
              <input
                value={telefonoContacto}
                onChange={(e) => setTelefonoContacto(e.target.value)}
                className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors mt-1"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-ink/50 uppercase tracking-wide mb-2">¿Cómo prefieres que te contacten?</p>
              <div className="flex gap-2">
                {(
                  [
                    { valor: "TELEFONO", texto: "Teléfono" },
                    { valor: "CORREO", texto: "Correo" },
                    { valor: "AMBOS", texto: "Cualquiera" },
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

            {error && <p className="text-coral-600 text-sm">{error}</p>}

            <button
              type="button"
              onClick={publicar}
              disabled={fase === "publicando" || fase === "publicado"}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-500 text-cream px-6 py-3.5 rounded-xl font-semibold hover:bg-brand-600 disabled:opacity-50 transition-colors min-h-[44px]"
            >
              {fase === "publicando" || fase === "publicado" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Publicando...
                </>
              ) : (
                "Publicar solicitud"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
