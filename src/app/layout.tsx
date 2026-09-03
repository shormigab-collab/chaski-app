import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ChatSoporte from "@/components/ChatSoporte";
import { obtenerUsuarioActual } from "@/lib/auth";

// Manrope para encabezados (font-heading), Inter para cuerpo de texto e
// interfaz (font-sans, el default). Antes solo se usaba Manrope en todo.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
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
  // Importante: NO poner aqui "alternates.canonical" — Next.js hereda ese
  // campo tal cual en cualquier pagina hija que no lo declare explicitamente
  // (blog, perfiles, etc.), lo que haria que todas esas paginas terminaran
  // con canonical="/" apuntando al home. El hreflang / canonical de la
  // portada en espanol vs "/en" se define en cada page.tsx por separado
  // (ver src/app/page.tsx y src/app/en/page.tsx).
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usuario = await obtenerUsuarioActual();
  return (
    <html lang="es" className={`${manrope.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-cream text-ink">
        <Navbar usuario={usuario} />
        <main className="min-h-screen">{children}</main>

        <Footer />

        <BackToTop />
        <ChatSoporte />
        <Analytics />
      </body>
    </html>
  );
}
