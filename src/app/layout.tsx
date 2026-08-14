import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LogoMark } from "@/components/Logo";
import BackToTop from "@/components/BackToTop";
import { obtenerUsuarioActual } from "@/lib/auth";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const TITULO = "chaski — Encuentra al profesional ideal en LatAm";
const DESCRIPCION =
  "Publica tu proyecto gratis y recibe propuestas directas de expertos en diseño, desarrollo, marketing, contabilidad y más en Latinoamérica.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.usechaski.com"),
  title: {
    default: TITULO,
    template: "%s | chaski",
  },
  description: DESCRIPCION,
  keywords: [
    "freelancers Colombia",
    "profesionales independientes LatAm",
    "contratar diseñador freelance",
    "contratar desarrollador freelance",
    "marketplace de servicios profesionales",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://www.usechaski.com",
    siteName: "chaski",
    title: TITULO,
    description: DESCRIPCION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
  },
  verification: {
    google: "O9_CI1H68RijmHeN7_N_CfsmcS5Q5hlViv2RZKixf1s",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usuario = await obtenerUsuarioActual();
  return (
    <html lang="es" className={manrope.variable}>
      <body className="font-sans antialiased bg-cream text-ink">
        <Navbar usuario={usuario} />
        <main className="min-h-screen">{children}</main>

        <footer className="border-t border-black/5 mt-24 bg-white">
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

          <div className="border-t border-black/5 py-6">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-ink/40">
                © {new Date().getFullYear()} chaski. Todos los derechos reservados.
              </span>
              <span className="text-xs text-ink/40">Hecho para conectar talento en Latinoamérica</span>
            </div>
          </div>
        </footer>

        <BackToTop />
      </body>
    </html>
  );
}
