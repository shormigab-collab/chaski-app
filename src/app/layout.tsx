import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { obtenerUsuarioActual } from "@/lib/auth";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "chaski — Encuentra al profesional ideal en LatAm",
  description:
    "Marketplace que conecta empresas y emprendedores con profesionales verificados de diseño, desarrollo, marketing, contabilidad y más en Latinoamérica.",
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
        <footer className="border-t border-black/5 mt-24 py-10">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-ink/50">
              © {new Date().getFullYear()} chaski. Todos los derechos reservados.
            </span>
            <span className="text-sm text-ink/50">Hecho para conectar talento en Latinoamérica</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
