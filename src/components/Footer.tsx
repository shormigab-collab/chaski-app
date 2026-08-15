"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin, Facebook, Instagram, X } from "lucide-react";
import { LogoMark } from "@/components/Logo";

// Redes sociales de chaski. LinkedIn y Facebook ya existen; X e Instagram
// aun no se han creado, asi que apuntan al handle esperado ("usechaski")
// y quedan listos para cuando el usuario cree esas cuentas.
const REDES = [
  {
    Icono: Linkedin,
    href: "https://www.linkedin.com/company/usechaski",
    label: "LinkedIn",
    bg: "bg-[#0A66C2]",
  },
  {
    Icono: Facebook,
    href: "https://www.facebook.com/profile.php?id=61593459986605",
    label: "Facebook",
    bg: "bg-[#1877F2]",
  },
  { Icono: X, href: "https://x.com/usechaski", label: "X", bg: "bg-ink" },
  {
    Icono: Instagram,
    href: "https://instagram.com/usechaski",
    label: "Instagram",
    bg: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]",
  },
];

function RedesSociales() {
  return (
    <div className="flex items-center gap-3">
      {REDES.map((r) => (
        <a
          key={r.label}
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={r.label}
          className={`w-10 h-10 rounded-full ${r.bg} text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-transform`}
        >
          <r.Icono className="w-[18px] h-[18px]" strokeWidth={1.75} />
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const esIngles = pathname?.startsWith("/en");

  if (esIngles) {
    return (
      <footer className="border-t border-border mt-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-2 sm:grid-cols-3 gap-10">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/en" className="inline-flex items-center gap-2 mb-3">
              <LogoMark size={28} />
              <span className="font-extrabold text-ink text-lg tracking-tight">chaski</span>
            </Link>
            <p className="text-sm text-ink/45 leading-relaxed max-w-[220px]">
              Marketplace connecting US businesses with independent professionals from Latin America.
            </p>
          </div>

          <nav aria-label="Product">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-3">Product</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#interesado" className="text-ink/60 hover:text-brand-500 transition-colors">
                  Get started
                </a>
              </li>
              <li>
                <Link href="/en/virtual-assistants" className="text-ink/60 hover:text-brand-500 transition-colors">
                  Hire a Virtual Assistant
                </Link>
              </li>
              <li>
                <Link href="/" className="text-ink/60 hover:text-brand-500 transition-colors">
                  Español
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Help">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-3">Help</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="mailto:soporte@usechaski.com" className="text-ink/60 hover:text-brand-500 transition-colors">
                  soporte@usechaski.com
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-border py-6">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-ink/40">© {new Date().getFullYear()} chaski. All rights reserved.</span>
            <RedesSociales />
            <span className="text-xs text-ink/40">Connecting talent across the Americas</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border mt-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-2 sm:grid-cols-4 gap-10">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <LogoMark size={28} />
            <span className="font-extrabold text-ink text-lg tracking-tight">chaski</span>
          </Link>
          <p className="text-sm text-ink/45 leading-relaxed max-w-[220px]">
            Marketplace de servicios profesionales para Latinoamérica.
          </p>
        </div>

        <nav aria-label="Producto">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-3">Producto</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/como-funciona" className="text-ink/60 hover:text-brand-500 transition-colors">
                Cómo funciona
              </Link>
            </li>
            <li>
              <Link href="/profesionales" className="text-ink/60 hover:text-brand-500 transition-colors">
                Explorar profesionales
              </Link>
            </li>
            <li>
              <Link href="/registro/cliente" className="text-ink/60 hover:text-brand-500 transition-colors">
                Publicar un proyecto
              </Link>
            </li>
            <li>
              <Link href="/registro/proveedor" className="text-ink/60 hover:text-brand-500 transition-colors">
                Crear perfil profesional
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-ink/60 hover:text-brand-500 transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/en" className="text-ink/60 hover:text-brand-500 transition-colors">
                English
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-3">Legal</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/terminos" className="text-ink/60 hover:text-brand-500 transition-colors">
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="text-ink/60 hover:text-brand-500 transition-colors">
                Política de privacidad
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Ayuda">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-3">Ayuda</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/ayuda" className="text-ink/60 hover:text-brand-500 transition-colors">
                Centro de ayuda
              </Link>
            </li>
            <li>
              <a href="mailto:soporte@usechaski.com" className="text-ink/60 hover:text-brand-500 transition-colors">
                soporte@usechaski.com
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-ink/40">
            © {new Date().getFullYear()} chaski. Todos los derechos reservados.
          </span>
          <RedesSociales />
          <span className="text-xs text-ink/40">Hecho para conectar talento en Latinoamérica</span>
        </div>
      </div>
    </footer>
  );
}
