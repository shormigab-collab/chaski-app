import type { Metadata } from "next";
import Link from "next/link";
import CalculadoraTarifa from "@/components/CalculadoraTarifa";

export const metadata: Metadata = {
  title: "Calculadora de tarifa freelance: cuánto cobrar por hora y por proyecto",
  description:
    "Calcula la tarifa mínima por hora y por proyecto que necesitas cobrar como freelancer según tu ingreso deseado, gastos, impuestos y horas facturables. Gratis.",
  alternates: { canonical: "/calculadora-tarifa-freelance" },
  openGraph: {
    title: "Calculadora de tarifa freelance | chaski",
    description: "Descubre cuánto necesitas cobrar por hora y por proyecto para llegar a tu ingreso deseado.",
  },
};

export default function CalculadoraPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
        Calculadora de tarifa freelance
      </h1>
      <p className="text-ink/60 max-w-2xl mb-10 leading-relaxed">
        Descubre cuánto necesitas cobrar por hora y por proyecto para llegar al ingreso que quieres, después de gastos
        e impuestos. Es una estimación basada en tus propias cifras, sin datos inventados de mercado.
      </p>

      <CalculadoraTarifa />

      <div className="mt-14 max-w-2xl space-y-4 text-ink/70 leading-relaxed">
        <h2 className="text-xl font-bold text-ink">Cómo se calcula</h2>
        <p>
          Sumamos el ingreso neto que quieres ganar y tus gastos de trabajo, lo ajustamos por el porcentaje que
          destinas a impuestos y seguridad social, y lo dividimos entre las horas que realmente puedes facturar al año
          (descontando semanas sin trabajar). El resultado es la tarifa mínima por hora para cubrir esa meta.
        </p>
        <p>
          Úsala como piso, no como techo: la experiencia, la especialidad y el valor que aportas al cliente pueden
          justificar cobrar más. Si quieres profundizar, lee la guía{" "}
          <Link href="/blog/como-fijar-tu-tarifa-freelance" className="text-brand-600 font-medium hover:text-brand-700">
            cómo fijar tu tarifa como freelancer
          </Link>
          .
        </p>
      </div>

      <div className="mt-12 border border-black/5 bg-brand-50 rounded-2xl p-6 text-center max-w-xl mx-auto">
        <p className="text-ink font-semibold mb-3">¿Ya sabes cuánto cobrar? Consigue clientes que lo valoren.</p>
        <Link
          href="/registro/proveedor"
          className="inline-block bg-brand-500 text-cream px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors min-h-[44px]"
        >
          Crear mi perfil gratis en chaski
        </Link>
      </div>
    </div>
  );
}
