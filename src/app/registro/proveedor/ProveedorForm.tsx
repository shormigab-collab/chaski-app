"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Gift, Sparkles, ArrowRight, Check, User, MessageSquare, ShieldCheck } from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";

type Categoria = { id: string; nombre: string; slug: string; icono: string };

const CREDITOS_BIENVENIDA = 5;
const CREDITOS_REFERIDO = 7;

const CONFIANZA = [
  { Icono: User, texto: "Perfil gratis" },
  { Icono: MessageSquare, texto: "Contacto directo" },
  { Icono: ShieldCheck, texto: "Sin comisiones" },
];

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
    <div className="bg-gradient-to-b from-brand-50/60 via-cream to-cream">
      {/* barra superior */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex items-center justify-between">
        <Logo size={30} />
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-ink/50">¿Ya tienes cuenta?</span>
          <Link
            href="/login"
            className="inline-flex items-center justify-center min-h-[40px] px-5 rounded-xl border border-brand-200 text-brand-600 font-semibold text-sm hover:bg-brand-50 transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>

      {/* hero */}
      <div className="max-w-6xl mx-auto px-4 pb-16 sm:pb-20 grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 bg-brand-100/60 text-brand-600 text-xs font-bold tracking-widest px-3.5 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
            PARA PROFESIONALES INDEPENDIENTES
          </span>
          <h1
            className="font-extrabold text-ink tracking-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.4rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
          >
            Haz que tu trabajo
            <br />
            <span className="text-coral-500">hable por ti.</span>
          </h1>
          <p className="text-ink/60 max-w-md mb-7 leading-relaxed">
            Crea tu perfil profesional gratis, muestra tu experiencia y conecta con clientes que buscan tus
            servicios.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-3">
            <a
              href="#crear-cuenta"
              className="inline-flex items-center justify-center min-h-[52px] px-7 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-brand-900/10"
            >
              Crear mi perfil gratis
            </a>
            <Link
              href="/profesionales"
              className="inline-flex items-center gap-1.5 text-brand-600 font-semibold hover:text-brand-700"
            >
              Ver perfiles de ejemplo
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          </div>
          <p className="text-sm text-ink/40 mb-7">Toma menos de 2 minutos.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-7">
            {CONFIANZA.map((c) => (
              <span key={c.texto} className="inline-flex items-center gap-2 text-sm text-ink/70 font-medium">
                <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0">
                  <c.Icono className="w-4 h-4" strokeWidth={1.75} />
                </span>
                {c.texto}
              </span>
            ))}
          </div>

          <div className="flex items-start gap-3 bg-gold-50 border border-gold-100 rounded-2xl px-5 py-4">
            <div className="shrink-0 w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-ink/80 leading-snug">
              <span className="font-bold text-ink">{creditosAMostrar} créditos de bienvenida</span>
              <br className="hidden sm:block" />
              Úsalos para contactar clientes desde el primer día.
              {refCode && " Vienes invitado por un colega, por eso recibes créditos extra."}
            </p>
          </div>
        </Reveal>

        {/* vista previa de perfil */}
        <Reveal delay={120}>
          <div className="relative">
            <div className="bg-white border border-border rounded-[2rem] shadow-xl shadow-brand-900/5 p-6 sm:p-7">
              <span className="block text-xs font-bold tracking-widest text-ink/40 mb-5">
                VISTA PREVIA DE TU PERFIL
              </span>

              <div className="flex items-center gap-4 mb-4">
                <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-lavender shrink-0">
                  <img
                    src="/images/ejemplos/avatar-perfil-ejemplo.webp"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-ink text-lg leading-snug">Valentina R.</h3>
                  <p className="text-sm text-ink/55">Diseñadora de producto · Bogotá</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-availability bg-availability/10 px-3 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-availability" />
                Disponible para proyectos
              </span>

              <div className="flex flex-wrap gap-2 mb-5">
                {["UX/UI", "Diseño de producto", "Prototipado"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold text-brand-700 bg-brand-50 px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="border-t border-border pt-5 mb-5">
                <p className="text-sm font-bold text-ink mb-3">Portafolio</p>
                <div className="grid grid-cols-2 gap-3">
                  {/* miniaturas ilustrativas (formas, no fotos reales de
                      proyectos) para el ejemplo de perfil */}
                  <div className="aspect-[4/3] rounded-xl bg-lavender p-2.5 flex gap-1.5">
                    <div className="w-1/3 h-full rounded-lg bg-brand-400" />
                    <div className="flex-1 flex flex-col gap-1.5 justify-center">
                      <div className="h-1.5 rounded-full bg-brand-200 w-full" />
                      <div className="h-1.5 rounded-full bg-brand-200 w-2/3" />
                      <div className="h-1.5 rounded-full bg-coral-300 w-1/2" />
                    </div>
                  </div>
                  <div className="aspect-[4/3] rounded-xl bg-ink relative overflow-hidden">
                    <span className="absolute top-2 left-3 w-9 h-14 bg-brand-500 rounded-md rotate-12" />
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-16 bg-brand-400/80 rounded-tr-[100%]" />
                    <span className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-brand-200/70" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-brand-50/60 rounded-xl px-4 py-3">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium text-ink/70">Tu perfil está listo para destacar</span>
              </div>
            </div>

            {/* insignia flotante */}
            <div className="absolute -bottom-5 -right-3 sm:-right-6 flex items-center gap-3 bg-white rounded-2xl shadow-lg shadow-brand-900/10 border border-border px-4 py-3">
              <span className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center shrink-0">
                <Gift className="w-4 h-4 text-white" />
              </span>
              <span className="text-sm font-bold text-ink leading-tight">
                {creditosAMostrar} créditos
                <br />
                incluidos
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* formulario */}
      <div id="crear-cuenta" className="max-w-xl mx-auto px-4 pb-20 scroll-mt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-2">
            Crea tu cuenta para comenzar
          </h2>
          <p className="text-ink/55">Completa tus datos y empieza a recibir clientes hoy mismo.</p>
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
              className="w-full bg-brand-600 text-white py-3.5 rounded-xl font-semibold hover:bg-brand-700 transition-colors disabled:opacity-50 min-h-[44px]"
            >
              {cargando ? "Creando perfil..." : `Crear mi perfil y recibir ${creditosAMostrar} créditos`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
