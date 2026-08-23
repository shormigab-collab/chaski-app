"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  MessageSquare,
  User,
  Sparkles,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import CategoryIcon from "@/components/CategoryIcon";
import Logo from "@/components/Logo";
import Reveal from "@/components/Reveal";
import { nombreCategoria } from "@/lib/categoriasEn";
import { MONEDAS, type Moneda } from "@/lib/moneda";

type Categoria = { id: string; nombre: string; slug: string; icono: string };

const inputClass =
  "w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition-colors placeholder:text-ink/35 bg-white";

export default function RegistroClienteForm({ categorias }: { categorias: Categoria[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoriaInicial = searchParams.get("categoria");
  const lang = searchParams.get("lang") === "en" ? "en" : "es";

  const total = 3;
  const [paso, setPaso] = useState(1);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [cuentaCreada, setCuentaCreada] = useState(false);

  // paso 1: cuenta
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  // paso 2: tu necesidad
  const [categoriaId, setCategoriaId] = useState(
    categorias.find((c) => c.slug === categoriaInicial)?.id ?? ""
  );
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [textoIA, setTextoIA] = useState("");
  const [generandoIA, setGenerandoIA] = useState(false);
  const [errorIA, setErrorIA] = useState("");

  // paso 3: publicar
  const [ciudad, setCiudad] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [presupuestoMoneda, setPresupuestoMoneda] = useState<Moneda>("COP");
  const [telefonoContacto, setTelefonoContacto] = useState("");
  const [preferenciaContacto, setPreferenciaContacto] = useState<"TELEFONO" | "CORREO" | "AMBOS">("AMBOS");

  const t =
    lang === "en"
      ? {
          heroBadge: "FOR CLIENTS",
          heroH1a: "Post your need.",
          heroH1b: "Find the",
          heroH1c: "right professional.",
          heroSub: "Create your account and get proposals from independent professionals across Latin America.",
          trust1: "Posting is free",
          trust2: "Direct contact",
          trust3: "You choose who to work with",
          asiFunciona: "HOW IT WORKS",
          proyecto: "Your project",
          proyectoTitulo: "Brand identity design",
          tag1: "Design & UX",
          tag2: "Remote",
          tag3: "Receiving proposals",
          stepCuenta: "Account",
          stepNecesidad: "Your need",
          stepPublicar: "Post it",
          pasoDe: (n: number) => `STEP ${n} OF 3`,
          s1Titulo: "Create your free account",
          s1Sub: "You'll tell us what you need next. The whole process takes under 2 minutes.",
          nombreLabel: "Full name",
          nombrePlaceholder: "E.g. Laura Gómez",
          emailLabel: "Email address",
          emailPlaceholder: "you@email.com",
          passwordLabel: "Password",
          passwordPlaceholder: "Minimum 6 characters",
          telefonoCiudadNota: "We'll ask for your phone and city when you post your need.",
          terminosPre: "I accept the ",
          terminos: "terms",
          terminosY: " and ",
          privacidad: "privacy policy",
          continuarNecesidad: "Continue with my need",
          confirmNota: "We won't publish anything without your confirmation.",
          yaCuenta: "Already have an account?",
          login: "Log in",
          errNombre: "Write your full name",
          errEmail: "Write a valid email",
          errPassword: "Password must be at least 6 characters",
          errTerminos: "You must accept the terms and privacy policy",
          errCategoria: "Choose a category to continue",
          errDetalle: "Fill in a title and a description of at least 10 characters",
          errIA: "Tell us a bit more (minimum 10 characters)",
          errIAFallback: "We couldn't generate the request automatically. Fill it in manually.",
          errContacto: "Fill in your city and contact phone",
          errRegistro: "Couldn't create your account",
          errPublicar: "Couldn't publish your request",
          s2Titulo: "Tell us what you need",
          s2Sub: "Choose a category and describe your project.",
          iaLabel: "Or tell us what you need and we'll draft it for you",
          iaPlaceholder: "E.g: I need help redesigning my company's website and setting up social media",
          iaBoton: "Draft with AI",
          iaCargando: "Drafting...",
          oManual: "Or choose manually:",
          tituloPlaceholder: "Short title (e.g: I need a redesign of my website)",
          descPlaceholder: "Describe in detail what you need",
          s3Titulo: "Last details",
          s3Sub: "This is how interested professionals will reach out to you.",
          ciudadPlaceholder: "City",
          presupuestoPlaceholder: "Approximate budget (optional)",
          telefonoPlaceholder: "Contact phone number",
          preferenciaLabel: "How do you prefer to be contacted?",
          prefTelefono: "Phone",
          prefCorreo: "Email",
          prefAmbos: "Either one",
          atras: "← Back",
          continuar: "Continue",
          publicar: "Post my project",
          publicando: "Posting...",
        }
      : {
          heroBadge: "PARA CLIENTES",
          heroH1a: "Publica tu necesidad.",
          heroH1b: "Encuentra al",
          heroH1c: "profesional ideal.",
          heroSub: "Crea tu cuenta y recibe propuestas de profesionales independientes de Latinoamérica.",
          trust1: "Publicar es gratis",
          trust2: "Contacto directo",
          trust3: "Tú eliges con quién trabajar",
          asiFunciona: "ASÍ FUNCIONA",
          proyecto: "Tu proyecto",
          proyectoTitulo: "Diseño de identidad de marca",
          tag1: "Diseño y UX",
          tag2: "Remoto",
          tag3: "Recibiendo propuestas",
          stepCuenta: "Cuenta",
          stepNecesidad: "Tu necesidad",
          stepPublicar: "Publicar",
          pasoDe: (n: number) => `PASO ${n} DE 3`,
          s1Titulo: "Crea tu cuenta gratis",
          s1Sub: "Después nos contarás qué necesitas. Todo el proceso toma menos de 2 minutos.",
          nombreLabel: "Nombre completo",
          nombrePlaceholder: "Ej. Laura Gómez",
          emailLabel: "Correo electrónico",
          emailPlaceholder: "tu@correo.com",
          passwordLabel: "Contraseña",
          passwordPlaceholder: "Mínimo 6 caracteres",
          telefonoCiudadNota: "Tu teléfono y ciudad se solicitarán al publicar tu necesidad.",
          terminosPre: "Acepto los ",
          terminos: "términos",
          terminosY: " y la ",
          privacidad: "política de privacidad",
          continuarNecesidad: "Continuar con mi necesidad",
          confirmNota: "No publicaremos nada sin tu confirmación.",
          yaCuenta: "¿Ya tienes cuenta?",
          login: "Inicia sesión",
          errNombre: "Escribe tu nombre completo",
          errEmail: "Escribe un correo válido",
          errPassword: "La contraseña debe tener al menos 6 caracteres",
          errTerminos: "Debes aceptar los términos y la política de privacidad",
          errCategoria: "Elige una categoría para continuar",
          errDetalle: "Completa el título y una descripción de al menos 10 caracteres",
          errIA: "Cuéntanos un poco más (mínimo 10 caracteres)",
          errIAFallback: "No pudimos generar la solicitud automáticamente. Completa los campos manualmente.",
          errContacto: "Completa tu ciudad y teléfono de contacto",
          errRegistro: "No se pudo crear tu cuenta",
          errPublicar: "No se pudo publicar la solicitud",
          s2Titulo: "Cuéntanos qué necesitas",
          s2Sub: "Elige una categoría y describe tu proyecto.",
          iaLabel: "O cuéntanos qué necesitas y lo armamos por ti",
          iaPlaceholder: "Ej: necesito que me ayuden a diseñar el logo de mi negocio de arepas y armar mis redes sociales",
          iaBoton: "Completar con IA",
          iaCargando: "Redactando...",
          oManual: "O elige manualmente:",
          tituloPlaceholder: "Título breve (ej: Necesito un rediseño de mi sitio web)",
          descPlaceholder: "Describe con detalle lo que necesitas",
          s3Titulo: "Últimos detalles",
          s3Sub: "Así te podrán contactar los profesionales interesados.",
          ciudadPlaceholder: "Ciudad",
          presupuestoPlaceholder: "Presupuesto aproximado (opcional)",
          telefonoPlaceholder: "Teléfono de contacto",
          preferenciaLabel: "¿Cómo prefieres que te contacten?",
          prefTelefono: "Teléfono",
          prefCorreo: "Correo",
          prefAmbos: "Cualquiera",
          atras: "← Atrás",
          continuar: "Continuar",
          publicar: "Publicar mi proyecto",
          publicando: "Publicando...",
        };

  function validarPaso1() {
    if (nombre.trim().length < 2) return t.errNombre;
    if (!/^\S+@\S+\.\S+$/.test(email)) return t.errEmail;
    if (password.length < 6) return t.errPassword;
    if (!aceptaTerminos) return t.errTerminos;
    return "";
  }

  function validarPaso2() {
    if (!categoriaId) return t.errCategoria;
    if (titulo.trim().length < 3 || descripcion.trim().length < 10) return t.errDetalle;
    return "";
  }

  function siguiente() {
    setError("");
    const msg = paso === 1 ? validarPaso1() : paso === 2 ? validarPaso2() : "";
    if (msg) {
      setError(msg);
      return;
    }
    setPaso((p) => Math.min(p + 1, total));
  }

  function anterior() {
    setError("");
    setPaso((p) => Math.max(p - 1, 1));
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
    } else {
      setErrorIA(data.error || t.errIAFallback);
    }
  }

  async function publicar() {
    setError("");
    if (!ciudad.trim() || !telefonoContacto.trim()) {
      setError(t.errContacto);
      return;
    }
    setCargando(true);

    if (!cuentaCreada) {
      const resReg = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "CLIENTE",
          nombre,
          email,
          password,
          telefono: telefonoContacto,
          ciudad,
        }),
      });
      if (!resReg.ok) {
        const data = await resReg.json();
        setCargando(false);
        setError(data.error || t.errRegistro);
        setPaso(1);
        return;
      }
      setCuentaCreada(true);
    }

    const resSol = await fetch("/api/solicitudes", {
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
    if (resSol.ok) {
      const params = new URLSearchParams({ nuevo: "1" });
      if (lang === "en") params.set("lang", "en");
      router.push(`/cliente/solicitudes?${params.toString()}`);
      router.refresh();
    } else {
      const data = await resSol.json();
      setError(data.error || t.errPublicar);
    }
  }

  const categoriaSeleccionada = categorias.find((c) => c.id === categoriaId);
  const STEPS = [
    { n: 1, label: t.stepCuenta },
    { n: 2, label: t.stepNecesidad },
    { n: 3, label: t.stepPublicar },
  ];

  const TRUST = [
    { Icono: FileText, texto: t.trust1 },
    { Icono: MessageSquare, texto: t.trust2 },
    { Icono: User, texto: t.trust3 },
  ];

  return (
    <div className="bg-gradient-to-b from-brand-50/60 via-cream to-cream">
      {/* barra superior */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 flex items-center justify-between">
        <Logo size={30} />
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm text-ink/50">{t.yaCuenta}</span>
          <Link
            href="/login"
            className="inline-flex items-center justify-center min-h-[40px] px-5 rounded-xl border border-brand-200 text-brand-600 font-semibold text-sm hover:bg-brand-50 transition-colors"
          >
            {t.login}
          </Link>
        </div>
      </div>

      {/* hero + wizard */}
      <div className="max-w-6xl mx-auto px-4 pb-16 sm:pb-20 grid lg:grid-cols-2 gap-12 lg:gap-14 items-start">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 bg-brand-100/60 text-brand-600 text-xs font-bold tracking-widest px-3.5 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
            {t.heroBadge}
          </span>
          <h1
            className="font-extrabold text-ink tracking-tight mb-5"
            style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.4rem)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
          >
            {t.heroH1a}
            <br />
            {t.heroH1b}
            <br />
            <span className="text-coral-500">{t.heroH1c}</span>
          </h1>
          <p className="text-ink/60 max-w-md mb-7 leading-relaxed">{t.heroSub}</p>

          <div className="space-y-4 mb-8">
            {TRUST.map((item) => (
              <div key={item.texto} className="flex items-center gap-3.5">
                <span className="w-11 h-11 rounded-full bg-lavender flex items-center justify-center shrink-0 text-brand-600">
                  <item.Icono className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <span className="font-semibold text-ink">{item.texto}</span>
              </div>
            ))}
          </div>

          <span className="block text-xs font-bold tracking-widest text-ink/40 mb-3">{t.asiFunciona}</span>
          <div className="rounded-2xl bg-lavender/40 border border-border p-5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-white rounded-xl p-4 shadow-sm min-w-0">
                <p className="text-xs font-semibold text-ink/50 mb-1">{t.proyecto}</p>
                <p className="font-bold text-ink mb-3 leading-snug">{t.proyectoTitulo}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs font-medium text-brand-600 bg-white border border-brand-200 px-2.5 py-1 rounded-full">
                    {t.tag1}
                  </span>
                  <span className="text-xs font-medium text-ink/60 bg-black/5 px-2.5 py-1 rounded-full">
                    {t.tag2}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-availability bg-availability/10 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-availability shrink-0" />
                    {t.tag3}
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col gap-3 shrink-0">
                {[0, 1].map((i) => (
                  <div key={i} className="w-16 h-14 bg-white rounded-xl shadow-sm p-2 flex items-center gap-1.5">
                    <span
                      className={`w-7 h-7 rounded-full shrink-0 ${
                        i === 0
                          ? "bg-gradient-to-br from-brand-400 to-brand-600"
                          : "bg-gradient-to-br from-coral-300 to-coral-500"
                      }`}
                    />
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="h-1 rounded-full bg-black/10 w-full" />
                      <div className="h-1 rounded-full bg-black/10 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* tarjeta del wizard */}
        <Reveal delay={120}>
          <div className="bg-white border border-border rounded-[2rem] shadow-xl shadow-brand-900/5 p-6 sm:p-8">
            {/* indicador de pasos */}
            <div className="flex items-center mb-7">
              {STEPS.map((s, i) => (
                <div key={s.n} className={`flex items-center ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        paso >= s.n ? "bg-brand-600 text-white" : "border border-border text-ink/35"
                      }`}
                    >
                      {s.n}
                    </span>
                    <span
                      className={`text-sm font-semibold hidden sm:inline transition-colors ${
                        paso >= s.n ? "text-ink" : "text-ink/35"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span className={`flex-1 h-px mx-3 transition-colors ${paso > s.n ? "bg-brand-600" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>

            <span className="inline-block text-xs font-bold tracking-widest text-brand-600 bg-brand-50 px-3 py-1 rounded-full mb-4">
              {t.pasoDe(paso)}
            </span>

            {/* paso 1: cuenta */}
            {paso === 1 && (
              <div>
                <h2 className="text-2xl font-extrabold text-ink tracking-tight mb-1">{t.s1Titulo}</h2>
                <p className="text-ink/55 mb-6">{t.s1Sub}</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">{t.nombreLabel}</label>
                    <input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder={t.nombrePlaceholder}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">{t.emailLabel}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink mb-1.5">{t.passwordLabel}</label>
                    <div className="relative">
                      <input
                        type={verPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t.passwordPlaceholder}
                        className={`${inputClass} pr-11`}
                      />
                      <button
                        type="button"
                        onClick={() => setVerPassword((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/35 hover:text-ink/60"
                        aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {verPassword ? (
                          <EyeOff className="w-4 h-4" strokeWidth={1.75} />
                        ) : (
                          <Eye className="w-4 h-4" strokeWidth={1.75} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-lavender/40 border border-border rounded-xl px-4 py-3">
                    <Lock className="w-4 h-4 text-ink/40 mt-0.5 shrink-0" strokeWidth={1.75} />
                    <p className="text-xs text-ink/55 leading-snug">{t.telefonoCiudadNota}</p>
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aceptaTerminos}
                      onChange={(e) => setAceptaTerminos(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-border text-brand-600 focus:ring-brand-400 shrink-0"
                    />
                    <span className="text-sm text-ink/70">
                      {t.terminosPre}
                      <Link href="/terminos" className="text-brand-600 font-medium hover:text-brand-700">
                        {t.terminos}
                      </Link>
                      {t.terminosY}
                      <Link href="/privacidad" className="text-brand-600 font-medium hover:text-brand-700">
                        {t.privacidad}
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* paso 2: tu necesidad */}
            {paso === 2 && (
              <div>
                <h2 className="text-2xl font-extrabold text-ink tracking-tight mb-1">{t.s2Titulo}</h2>
                <p className="text-ink/55 mb-5">{t.s2Sub}</p>

                <div className="bg-brand-50/60 border border-brand-100 rounded-xl p-4 mb-5">
                  <p className="text-xs font-semibold text-brand-600 mb-2 inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                    {t.iaLabel}
                  </p>
                  <textarea
                    value={textoIA}
                    onChange={(e) => setTextoIA(e.target.value)}
                    placeholder={t.iaPlaceholder}
                    rows={2}
                    className="w-full text-sm border border-border rounded-lg px-3 py-2.5 outline-none focus:border-brand-500 transition-colors bg-white"
                  />
                  {errorIA && <p className="text-coral-600 text-xs mt-1.5">{errorIA}</p>}
                  <button
                    type="button"
                    onClick={generarConIA}
                    disabled={generandoIA}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold bg-brand-600 text-white px-4 py-2 rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" strokeWidth={2} />
                    {generandoIA ? t.iaCargando : t.iaBoton}
                  </button>
                </div>

                <p className="text-xs text-ink/40 mb-3">{t.oManual}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1 mb-4">
                  {categorias.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setCategoriaId(c.id);
                        setError("");
                      }}
                      className={`text-left text-xs border rounded-xl px-3 py-2.5 transition-all ${
                        categoriaId === c.id
                          ? "border-brand-500 bg-brand-50 text-brand-600 font-medium"
                          : "border-border text-ink/70 hover:border-black/30"
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <CategoryIcon slug={c.slug} className="w-3.5 h-3.5 shrink-0" />
                        {nombreCategoria(c, lang)}
                      </span>
                    </button>
                  ))}
                </div>

                {categoriaSeleccionada && (
                  <p className="text-sm text-ink/50 mb-3">
                    {lang === "en" ? "Category: " : "Categoría: "}
                    <span className="font-medium text-brand-600 inline-flex items-center gap-1.5">
                      <CategoryIcon slug={categoriaSeleccionada.slug} className="w-3.5 h-3.5" />
                      {nombreCategoria(categoriaSeleccionada, lang)}
                    </span>
                  </p>
                )}

                <div className="space-y-4">
                  <input
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder={t.tituloPlaceholder}
                    className={inputClass}
                  />
                  <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows={4}
                    placeholder={t.descPlaceholder}
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* paso 3: publicar */}
            {paso === 3 && (
              <div>
                <h2 className="text-2xl font-extrabold text-ink tracking-tight mb-1">{t.s3Titulo}</h2>
                <p className="text-ink/55 mb-5">{t.s3Sub}</p>

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      value={ciudad}
                      onChange={(e) => setCiudad(e.target.value)}
                      placeholder={t.ciudadPlaceholder}
                      className={inputClass}
                    />
                    <div className="flex gap-2">
                      <input
                        value={presupuesto}
                        onChange={(e) => setPresupuesto(e.target.value)}
                        placeholder={t.presupuestoPlaceholder}
                        className={`${inputClass} flex-1 min-w-0`}
                      />
                      <select
                        value={presupuestoMoneda}
                        onChange={(e) => setPresupuestoMoneda(e.target.value as Moneda)}
                        className="border border-border rounded-xl px-2.5 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-400 transition-colors bg-white shrink-0"
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
                    className={inputClass}
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
                              : "border-border text-ink/70 hover:border-black/30"
                          }`}
                        >
                          {op.texto}
                        </button>
                      ))}
                    </div>
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
                className="text-sm font-semibold text-ink/50 hover:text-ink disabled:opacity-0 disabled:pointer-events-none transition-colors"
              >
                {t.atras}
              </button>

              {paso < total ? (
                <button
                  type="button"
                  onClick={siguiente}
                  className="min-h-[48px] bg-brand-600 text-white px-6 rounded-xl font-semibold hover:bg-brand-700 transition-colors"
                >
                  {paso === 1 ? t.continuarNecesidad : t.continuar}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={publicar}
                  disabled={cargando}
                  className="min-h-[48px] bg-brand-600 text-white px-6 rounded-xl font-semibold hover:bg-brand-700 disabled:opacity-50 transition-colors"
                >
                  {cargando ? t.publicando : t.publicar}
                </button>
              )}
            </div>

            {paso === 1 && (
              <>
                <p className="flex items-center justify-center gap-1.5 text-xs text-ink/40 mt-5">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                  {t.confirmNota}
                </p>
                <p className="text-sm text-ink/50 mt-4 text-center">
                  {t.yaCuenta}{" "}
                  <Link href="/login" className="text-brand-600 font-semibold hover:text-brand-700">
                    {t.login}
                  </Link>
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
