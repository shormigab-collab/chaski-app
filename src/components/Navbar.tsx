"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import Logo from "./Logo";
import ReferralBanner from "./ReferralBanner";

type UsuarioConProveedor = {
  id: string;
  nombre: string;
  role: "CLIENTE" | "PROVEEDOR" | "ADMIN";
  proveedor?: { creditos: number } | null;
} | null;

export default function Navbar({ usuario }: { usuario: UsuarioConProveedor }) {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();
  const esIngles = pathname?.startsWith("/en");
  const cerrar = () => setAbierto(false);

  const linksInvitado = esIngles ? (
    <>
      <Link href="/login" className="text-ink/60 hover:text-ink transition-colors">
        Log in
      </Link>
      <a
        href="#interesado"
        className="bg-brand-500 text-cream px-4 py-2 rounded-xl hover:bg-brand-600 transition-colors shadow-sm text-center"
      >
        Get started
      </a>
    </>
  ) : (
    <>
      <Link href="/como-funciona" className="text-ink/60 hover:text-ink transition-colors">
        Cómo funciona
      </Link>
      <Link href="/blog" className="text-ink/60 hover:text-ink transition-colors">
        Blog
      </Link>
      <Link href="/login" className="text-ink/60 hover:text-ink transition-colors">
        Iniciar sesión
      </Link>
      <Link
        href="/registro"
        className="bg-brand-500 text-cream px-4 py-2 rounded-xl hover:bg-brand-600 transition-colors shadow-sm text-center"
      >
        Registrarme
      </Link>
    </>
  );

  const linksCliente = (
    <>
      <Link href="/como-funciona" className="text-ink/60 hover:text-ink transition-colors">
        Cómo funciona
      </Link>
      <Link href="/cliente/solicitudes" className="text-ink/60 hover:text-ink transition-colors">
        Mis solicitudes
      </Link>
      <form action="/api/auth/logout" method="post">
        <button className="text-ink/60 hover:text-ink transition-colors">Salir</button>
      </form>
    </>
  );

  const linksProveedor = (
    <>
      <Link href="/proveedor/explorar" className="text-ink/60 hover:text-ink transition-colors">
        Explorar
      </Link>
      <Link href="/proveedor/perfil" className="text-ink/60 hover:text-ink transition-colors">
        Mi perfil
      </Link>
      <Link href="/proveedor/invitar" className="text-ink/60 hover:text-ink transition-colors">
        Invitar y ganar
      </Link>
      <Link
        href="/proveedor/creditos"
        className="bg-coral-50 text-coral-600 px-3.5 py-1.5 rounded-full font-semibold text-sm inline-block w-fit tabular-nums"
      >
        {usuario?.role === "PROVEEDOR" ? usuario.proveedor?.creditos ?? 0 : 0} créditos
      </Link>
      <form action="/api/auth/logout" method="post">
        <button className="text-ink/60 hover:text-ink transition-colors">Salir</button>
      </form>
    </>
  );

  const linksAdmin = (
    <>
      <Link href="/admin" className="text-ink/60 hover:text-ink transition-colors">
        Admin
      </Link>
      <form action="/api/auth/logout" method="post">
        <button className="text-ink/60 hover:text-ink transition-colors">Salir</button>
      </form>
    </>
  );

  const linksActivos = !usuario
    ? linksInvitado
    : usuario.role === "CLIENTE"
    ? linksCliente
    : usuario.role === "PROVEEDOR"
    ? linksProveedor
    : linksAdmin;

  // El toggle de idioma solo tiene sentido en las paginas de mercadeo
  // (home en espanol y landing en ingles), no dentro de la app ya logueada.
  const mostrarToggleIdioma = !usuario && (pathname === "/" || esIngles);
  const toggleIdioma = mostrarToggleIdioma ? (
    <Link
      href={esIngles ? "/" : "/en"}
      className="text-xs font-semibold text-ink/50 hover:text-ink border border-border rounded-full px-3 py-1.5 transition-colors shrink-0"
    >
      {esIngles ? "ES" : "EN"}
    </Link>
  ) : null;

  const filaLink = "flex items-center py-2.5 text-[15px] text-ink hover:text-brand-600 transition-colors";
  const tituloSeccion = "text-xs font-semibold uppercase tracking-wide text-brand-600 mt-6 mb-1 first:mt-0";

  return (
    <>
      {usuario?.role === "PROVEEDOR" && <ReferralBanner />}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-cream/80 border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3.5">
        <Link href={esIngles ? "/en" : "/"} className="shrink-0" onClick={cerrar}>
          <Logo size={34} />
        </Link>

        {/* Desktop */}
        <nav className="hidden sm:flex items-center gap-5 text-sm font-medium">
          {linksActivos}
          {toggleIdioma}
        </nav>

        {/* Mobile toggle */}
        <div className="sm:hidden flex items-center gap-2">
          {toggleIdioma}
          <button
            onClick={() => setAbierto(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label="Abrir menú"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 7H20M4 12H20M4 17H20" stroke="#17133A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      </header>

      {/* Fondo oscuro del panel movil */}
      <div
        className={`sm:hidden fixed inset-0 bg-black/40 z-30 transition-opacity ${
          abierto ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={cerrar}
        aria-hidden="true"
      />

      {/* Panel deslizante movil: se ajusta al contenido (max-h-[85vh]) en vez
          de forzar toda la altura de la pantalla, para que no quede un
          espacio en blanco enorme cuando hay pocos links (ej. proveedor). */}
      <div
        className={`sm:hidden fixed top-0 left-0 max-h-[85vh] w-[85%] max-w-xs bg-white z-40 shadow-xl rounded-br-2xl transition-transform duration-300 overflow-y-auto ${
          abierto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <Link href={esIngles ? "/en" : "/"} onClick={cerrar}>
            <Logo size={30} />
          </Link>
          <button
            onClick={cerrar}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-4 h-4 text-ink" strokeWidth={2} />
          </button>
        </div>

        <div className="px-5 pb-6" onClick={cerrar}>
          {!usuario ? (
            <>
              <p className={tituloSeccion}>{esIngles ? "For Clients" : "Para clientes"}</p>
              <Link href={esIngles ? "/en#interesado" : "/registro/cliente"} className={filaLink}>
                {esIngles ? "Post a project" : "Publicar un proyecto"}
              </Link>
              {!esIngles && (
                <Link href="/profesionales" className={filaLink}>
                  Explorar profesionales
                </Link>
              )}
              <Link href={esIngles ? "/en" : "/como-funciona"} className={filaLink}>
                {esIngles ? "How it Works" : "Cómo funciona"}
              </Link>

              <p className={tituloSeccion}>{esIngles ? "For Professionals" : "Para profesionales"}</p>
              <Link href={esIngles ? "/en#interesado" : "/registro/proveedor"} className={filaLink}>
                {esIngles ? "Create a profile" : "Crear perfil profesional"}
              </Link>
              {!esIngles && (
                <Link href="/blog" className={filaLink}>
                  Blog
                </Link>
              )}

              <p className={tituloSeccion}>{esIngles ? "Change Language" : "Cambiar idioma"}</p>
              <div className="flex gap-2 py-1">
                <Link
                  href="/"
                  className={`text-sm font-medium px-3.5 py-2 rounded-full border transition-colors ${
                    !esIngles ? "border-brand-500 bg-brand-50 text-brand-600" : "border-border text-ink/60"
                  }`}
                >
                  Español
                </Link>
                <Link
                  href="/en"
                  className={`text-sm font-medium px-3.5 py-2 rounded-full border transition-colors ${
                    esIngles ? "border-brand-500 bg-brand-50 text-brand-600" : "border-border text-ink/60"
                  }`}
                >
                  English
                </Link>
              </div>

              <div className="mt-6 pt-5 border-t border-border flex flex-col gap-2.5">
                <Link
                  href={esIngles ? "/en#interesado" : "/registro"}
                  className="text-center bg-brand-500 text-cream px-4 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors min-h-[44px] flex items-center justify-center"
                >
                  {esIngles ? "Get started" : "Registrarme"}
                </Link>
                <Link
                  href="/login"
                  className="text-center border border-border text-ink px-4 py-3 rounded-xl font-semibold hover:border-brand-300 transition-colors min-h-[44px] flex items-center justify-center"
                >
                  {esIngles ? "Log in" : "Iniciar sesión"}
                </Link>
              </div>
            </>
          ) : (
            <nav className="flex flex-col text-sm font-medium pt-2">{linksActivos}</nav>
          )}
        </div>
      </div>
    </>
  );
}
