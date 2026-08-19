"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, ImagePlus, Plus, X, ShieldCheck, Clock, FileText } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import { ACENTOS_PORTAFOLIO, MAX_PROYECTOS_PORTAFOLIO, type ProyectoPortafolio } from "@/lib/portafolio";

type Categoria = { id: string; nombre: string; slug: string; icono: string };
type Perfil = {
  bio: string;
  fotoUrl: string;
  categoriaIds: string[];
  nombre: string;
  telefono: string;
  ciudad: string;
  aniosExperiencia: number | null;
  tarifaAproximada: string;
  linkedinUrl: string;
  portafolio: ProyectoPortafolio[];
  verificado: boolean;
  estadoVerificacion: string; // "SIN_ENVIAR" | "PENDIENTE" | "APROBADO" | "RECHAZADO"
};

const TAMANO_MAXIMO_MB = 2;

export default function PerfilForm({ categorias, perfil }: { categorias: Categoria[]; perfil: Perfil }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [seleccionadas, setSeleccionadas] = useState<string[]>(perfil.categoriaIds);
  const [fotoUrl, setFotoUrl] = useState(perfil.fotoUrl);
  const [errorFoto, setErrorFoto] = useState("");
  const [subiendoFoto, setSubiendoFoto] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const [proyectos, setProyectos] = useState<ProyectoPortafolio[]>(perfil.portafolio);
  const [errorPortafolio, setErrorPortafolio] = useState("");
  const [subiendoIndice, setSubiendoIndice] = useState<number | null>(null);
  const portafolioInputRef = useRef<HTMLInputElement>(null);

  const [estadoVerificacion, setEstadoVerificacion] = useState(perfil.estadoVerificacion);
  const [subiendoDoc, setSubiendoDoc] = useState(false);
  const [errorDoc, setErrorDoc] = useState("");
  const docInputRef = useRef<HTMLInputElement>(null);

  async function onDocumentoSeleccionado(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorDoc("");
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const tiposPermitidos = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"];
    if (!tiposPermitidos.includes(file.type)) {
      setErrorDoc("Sube una foto (JPG/PNG) o PDF de tu documento");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorDoc("El archivo debe pesar menos de 5MB");
      return;
    }

    setSubiendoDoc(true);
    try {
      const datosArchivo = new FormData();
      datosArchivo.append("documento", file);
      const res = await fetch("/api/proveedor/verificacion", { method: "POST", body: datosArchivo });
      if (!res.ok) throw new Error("upload failed");
      setEstadoVerificacion("PENDIENTE");
      router.refresh();
    } catch {
      setErrorDoc("No se pudo subir el archivo. Intenta de nuevo.");
    } finally {
      setSubiendoDoc(false);
    }
  }

  function agregarProyecto() {
    if (proyectos.length >= MAX_PROYECTOS_PORTAFOLIO) return;
    setProyectos((prev) => [...prev, { titulo: "", descripcion: "", imagenUrl: "" }]);
  }

  function actualizarProyecto(i: number, campo: "titulo" | "descripcion", valor: string) {
    setProyectos((prev) => prev.map((p, idx) => (idx === i ? { ...p, [campo]: valor } : p)));
  }

  function eliminarProyecto(i: number) {
    setProyectos((prev) => prev.filter((_, idx) => idx !== i));
  }

  function pedirImagenProyecto(i: number) {
    setSubiendoIndice(i);
    portafolioInputRef.current?.click();
  }

  async function onImagenProyectoSeleccionada(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorPortafolio("");
    const file = e.target.files?.[0];
    const idx = subiendoIndice;
    e.target.value = "";
    if (!file || idx === null) return;

    if (!file.type.startsWith("image/")) {
      setErrorPortafolio("Elige un archivo de imagen (JPG, PNG, etc.)");
      return;
    }
    if (file.size > TAMANO_MAXIMO_MB * 1024 * 1024) {
      setErrorPortafolio(`La imagen debe pesar menos de ${TAMANO_MAXIMO_MB} MB`);
      return;
    }

    const anterior = proyectos[idx]?.imagenUrl ?? "";
    const preview = URL.createObjectURL(file);
    setProyectos((prev) => prev.map((p, i) => (i === idx ? { ...p, imagenUrl: preview } : p)));

    try {
      const datosArchivo = new FormData();
      datosArchivo.append("imagen", file);
      const res = await fetch("/api/proveedor/portafolio-foto", { method: "POST", body: datosArchivo });
      if (!res.ok) throw new Error("upload failed");
      const { url } = await res.json();
      setProyectos((prev) => prev.map((p, i) => (i === idx ? { ...p, imagenUrl: url } : p)));
    } catch {
      setErrorPortafolio("No se pudo subir la imagen. Intenta de nuevo.");
      setProyectos((prev) => prev.map((p, i) => (i === idx ? { ...p, imagenUrl: anterior } : p)));
    } finally {
      setSubiendoIndice(null);
    }
  }

  function toggleCategoria(id: string) {
    setSeleccionadas((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  async function onFotoSeleccionada(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorFoto("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorFoto("Elige un archivo de imagen (JPG, PNG, etc.)");
      return;
    }
    if (file.size > TAMANO_MAXIMO_MB * 1024 * 1024) {
      setErrorFoto(`La imagen debe pesar menos de ${TAMANO_MAXIMO_MB} MB`);
      return;
    }

    // Vista previa instantánea mientras se sube al storage.
    const anterior = fotoUrl;
    setFotoUrl(URL.createObjectURL(file));
    setSubiendoFoto(true);

    try {
      const datosArchivo = new FormData();
      datosArchivo.append("foto", file);
      const res = await fetch("/api/proveedor/foto", { method: "POST", body: datosArchivo });
      if (!res.ok) throw new Error("upload failed");
      const { url } = await res.json();
      setFotoUrl(url);
    } catch {
      setErrorFoto("No se pudo subir la imagen. Intenta de nuevo.");
      setFotoUrl(anterior);
    } finally {
      setSubiendoFoto(false);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGuardado(false);
    setCargando(true);
    const form = new FormData(e.currentTarget);
    const proyectosValidos = proyectos
      .filter((p) => p.titulo.trim() && p.imagenUrl.trim())
      .map((p) => ({ ...p, titulo: p.titulo.trim(), descripcion: p.descripcion?.trim() || undefined }));
    const res = await fetch("/api/proveedor/perfil", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: form.get("nombre"),
        telefono: form.get("telefono"),
        ciudad: form.get("ciudad"),
        bio: form.get("bio"),
        fotoUrl,
        categoriaIds: seleccionadas,
        aniosExperiencia: form.get("aniosExperiencia") || undefined,
        tarifaAproximada: form.get("tarifaAproximada") || undefined,
        linkedinUrl: form.get("linkedinUrl") || undefined,
        portafolio: proyectosValidos,
      }),
    });
    setCargando(false);
    if (res.ok) {
      setGuardado(true);
      router.refresh();
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Foto de perfil */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={subiendoFoto}
          className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-black/10 bg-brand-50 shrink-0 group disabled:opacity-70"
        >
          {fotoUrl ? (
            <img src={fotoUrl} alt="Foto de perfil" className="w-full h-full object-cover" />
          ) : (
            <span className="w-full h-full flex items-center justify-center text-brand-300">
              <Camera className="w-6 h-6" strokeWidth={1.75} />
            </span>
          )}
          <span
            className={`absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-medium transition-opacity ${
              subiendoFoto ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {subiendoFoto ? "Subiendo..." : "Cambiar"}
          </span>
        </button>
        <div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={subiendoFoto}
            className="text-sm font-semibold text-brand-600 hover:text-brand-700 disabled:opacity-60"
          >
            {subiendoFoto ? "Subiendo..." : fotoUrl ? "Cambiar foto" : "Subir foto de perfil"}
          </button>
          <p className="text-xs text-ink/40 mt-0.5">JPG o PNG, máx. {TAMANO_MAXIMO_MB}MB</p>
          {errorFoto && <p className="text-xs text-coral-600 mt-0.5">{errorFoto}</p>}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={onFotoSeleccionada} className="hidden" />
      </div>

      <input name="nombre" defaultValue={perfil.nombre} required className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
      <input name="telefono" defaultValue={perfil.telefono} required className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
      <input name="ciudad" defaultValue={perfil.ciudad} required className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />
      <textarea name="bio" defaultValue={perfil.bio} rows={3} placeholder="Sobre tu experiencia" className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors" />

      <div className="grid grid-cols-2 gap-3">
        <input
          name="aniosExperiencia"
          type="number"
          min={0}
          max={60}
          defaultValue={perfil.aniosExperiencia ?? ""}
          placeholder="Años de experiencia"
          className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
        />
        <input
          name="tarifaAproximada"
          defaultValue={perfil.tarifaAproximada}
          placeholder="Tarifa aprox. (ej. $15-25/hora)"
          className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
        />
      </div>
      <input
        name="linkedinUrl"
        type="url"
        defaultValue={perfil.linkedinUrl}
        placeholder="Link de tu LinkedIn (opcional)"
        className="w-full border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-500 transition-colors"
      />

      <div>
        <p className="text-sm font-medium text-ink mb-2">Categorías de servicio</p>
        <div className="grid grid-cols-2 gap-2">
          {categorias.map((cat) => (
            <button
              type="button"
              key={cat.id}
              onClick={() => toggleCategoria(cat.id)}
              className={`text-left text-sm border rounded-xl px-3.5 py-2.5 transition-all ${
                seleccionadas.includes(cat.id)
                  ? "border-brand-500 bg-brand-50 text-brand-600"
                  : "border-black/10 hover:border-black/30"
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

      <div className="border-t border-black/5 pt-6 mt-2">
        <p className="text-sm font-medium text-ink mb-1">Verificación de identidad</p>

        {estadoVerificacion === "APROBADO" && (
          <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700">
            <ShieldCheck className="w-5 h-5 shrink-0" strokeWidth={1.75} />
            Tu identidad está verificada. Se muestra una insignia en tu perfil público.
          </div>
        )}

        {estadoVerificacion === "PENDIENTE" && (
          <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600">
            <Clock className="w-5 h-5 shrink-0" strokeWidth={1.75} />
            Tu documento está en revisión. Te avisamos apenas quede listo.
          </div>
        )}

        {(estadoVerificacion === "SIN_ENVIAR" || estadoVerificacion === "RECHAZADO") && (
          <div>
            {estadoVerificacion === "RECHAZADO" && (
              <p className="text-xs text-coral-600 mb-2">
                No pudimos verificar tu documento anterior. Sube una foto más clara para intentarlo de nuevo.
              </p>
            )}
            <p className="text-xs text-ink/45 mb-3">
              Sube una foto de tu cédula, DNI o pasaporte. Solo el equipo de Chaski la revisa para activar tu insignia
              de verificado — nunca se muestra públicamente ni se comparte con clientes.
            </p>
            <button
              type="button"
              onClick={() => docInputRef.current?.click()}
              disabled={subiendoDoc}
              className="inline-flex items-center gap-2 border border-black/10 rounded-xl px-4 py-2.5 text-sm font-medium text-ink/70 hover:border-brand-400 hover:text-brand-600 transition-colors disabled:opacity-60"
            >
              <FileText className="w-4 h-4" strokeWidth={1.75} />
              {subiendoDoc ? "Subiendo..." : "Subir documento de identidad"}
            </button>
            {errorDoc && <p className="text-xs text-coral-600 mt-1.5">{errorDoc}</p>}
          </div>
        )}

        <input
          ref={docInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={onDocumentoSeleccionado}
          className="hidden"
        />
      </div>

      <div className="border-t border-black/5 pt-6 mt-2">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-ink">Portafolio</p>
          <span className="text-xs text-ink/40">
            {proyectos.length}/{MAX_PROYECTOS_PORTAFOLIO}
          </span>
        </div>
        <p className="text-xs text-ink/45 mb-4">Muestra 2 o 3 proyectos reales — ayuda mucho a que te elijan.</p>

        <div className="space-y-4">
          {proyectos.map((p, i) => {
            const acento = ACENTOS_PORTAFOLIO[i % ACENTOS_PORTAFOLIO.length];
            return (
              <div key={i} className="relative border border-black/10 rounded-2xl p-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => pedirImagenProyecto(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 ${acento.bg} group`}
                >
                  {p.imagenUrl ? (
                    <img src={p.imagenUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className={`w-full h-full flex items-center justify-center ${acento.text}`}>
                      <ImagePlus className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                  )}
                  <span
                    className={`absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[10px] font-medium leading-tight text-center px-1 transition-opacity ${
                      subiendoIndice === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {subiendoIndice === i ? "Subiendo..." : "Cambiar"}
                  </span>
                </button>

                <div className="flex-1 min-w-0 space-y-2">
                  <input
                    value={p.titulo}
                    onChange={(e) => actualizarProyecto(i, "titulo", e.target.value)}
                    placeholder="Nombre del proyecto"
                    maxLength={80}
                    className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-500 transition-colors"
                  />
                  <textarea
                    value={p.descripcion}
                    onChange={(e) => actualizarProyecto(i, "descripcion", e.target.value)}
                    placeholder="Qué hiciste, en una frase"
                    rows={2}
                    maxLength={200}
                    className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => eliminarProyecto(i)}
                  aria-label="Eliminar proyecto"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-black/10 text-ink/40 flex items-center justify-center hover:text-coral-500 hover:border-coral-300 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {errorPortafolio && <p className="text-xs text-coral-600 mt-2">{errorPortafolio}</p>}

        {proyectos.length < MAX_PROYECTOS_PORTAFOLIO && (
          <button
            type="button"
            onClick={agregarProyecto}
            className="mt-3 w-full border-2 border-dashed border-black/10 rounded-xl py-3 text-sm font-medium text-ink/50 hover:border-brand-400 hover:text-brand-600 transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            Agregar proyecto
          </button>
        )}

        <input
          ref={portafolioInputRef}
          type="file"
          accept="image/*"
          onChange={onImagenProyectoSeleccionada}
          className="hidden"
        />
      </div>

      {guardado && <p className="text-brand-600 text-sm">Perfil actualizado.</p>}
      <button
        disabled={cargando || subiendoFoto || subiendoIndice !== null}
        className="bg-brand-500 text-cream px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50"
      >
        {subiendoFoto || subiendoIndice !== null
          ? "Espera a que termine de subir la foto..."
          : cargando
          ? "Guardando..."
          : "Guardar cambios"}
      </button>
    </form>
  );
}
