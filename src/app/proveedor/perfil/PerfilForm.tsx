"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";

type Categoria = { id: string; nombre: string; slug: string; icono: string };
type Perfil = {
  bio: string;
  fotoUrl: string;
  categoriaIds: string[];
  nombre: string;
  telefono: string;
  ciudad: string;
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

      {guardado && <p className="text-brand-600 text-sm">Perfil actualizado.</p>}
      <button
        disabled={cargando || subiendoFoto}
        className="bg-brand-500 text-cream px-6 py-3 rounded-full font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50"
      >
        {subiendoFoto ? "Espera a que termine de subir la foto..." : cargando ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
