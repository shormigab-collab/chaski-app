"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

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

  const linksInvitado = esIngles ? (
    <>
      <Link href="/login" className="text-ink/60 hover:text-ink transition-colors">
        Log in
      </Link>
      <a
        href="#interesado"
        className="bg-brand-500 text-cream px-4 py-2 rounded-full hover:bg-brand-600 transition-colors shadow-sm text-center"
      >
        Get started
      </a>
    </>
  ) : (
    <>
      <Link href="/como-funciona" className="text-ink/60 hover:text-ink transition-colors">
        Cómo funciona
      </Link>
      <Link href="/login" className="text-ink/60 hover:text-ink transition-colors">
        Iniciar sesión
      </Link>
      <Link
        href="/registro"
        className="bg-brand-500 text-cream px-4 py-2 rounded-full hover:bg-brand-600 transition-colors shadow-sm text-center"
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
      className="text-xs font-semibold text-ink/50 hover:text-ink border border-black/10 rounded-full px-3 py-1.5 transition-colors shrink-0"
    >
      {esIngles ? "ES" : "EN"}
    </Link>
  ) : null;

  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-cream/80 border-b border-black/5">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3.5">
        <Link href={esIngles ? "/en" : "/"} className="shrink-0" onClick={() => setAbierto(false)}>
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
            onClick={() => setAbierto((v) => !v)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label="Abrir menú"
          >
            {abierto ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M6 18L18 6" stroke="#211E3D" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 7H20M4 12H20M4 17H20" stroke="#211E3D" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {abierto && (
        <nav
          className="sm:hidden flex flex-col gap-4 px-4 pb-5 pt-1 text-sm font-medium border-t border-black/5"
          onClick={() => setAbierto(false)}
        >
          {linksActivos}
        </nav>
      )}
    </header>
  );
}
