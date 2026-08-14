import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

        <Footer />

        <BackToTop />
      </body>
    </html>
  );
}
