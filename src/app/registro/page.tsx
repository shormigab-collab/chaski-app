"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserSearch, Briefcase, Check, ArrowRight, ShieldCheck, Tag, MessageSquare } from "lucide-react";

type OpcionId = "cliente" | "proveedor";

const OPCIONES: {
  id: OpcionId;
  badge: string;
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  iconText: string;
  Icono: typeof UserSearch;
  titulo: string;
  descripcion: string;
  href: string;
}[] = [
  {
    id: "cliente",
    badge: "Para clientes",
    badgeBg: "bg-coral-50",
    badgeText: "text-coral-600",
    iconBg: "bg-coral-50",
    iconText: "text-coral-500",
    Icono: UserSearch,
    titulo: "Quiero contratar talento",
    descripcion: "Publica lo que necesitas y conecta con profesionales.",
    href: "/registro/cliente",
  },
  {
    id: "proveedor",
    badge: "Para profesionales",
    badgeBg: "bg-brand-50",
    badgeText: "text-brand-600",
    iconBg: "bg-brand-50",
    iconText: "text-brand-500",
    Icono: Briefcase,
    titulo: "Quiero ofrecer mis servicios",
    descripcion: "Crea tu perfil, muestra tu trabajo y encuentra clientes.",
    href: "/registro/proveedor",
  },
];

export default function RegistroPage() {
  const router = useRouter();
  const [seleccion, setSeleccion] = useState<OpcionId>("proveedor");

  const continuar = () => {
    const opcion = OPCIONES.find((o) => o.id === seleccion);
    if (opcion) router.push(opcion.href);
  };

  return (
    <div className="relative overflow-hidden bg-cream min-h-[80vh]">
      {/* chevrons decorativos, muy sutiles, mismo motivo que el logo */}
      <svg
        className="hidden sm:block absolute -top-2 right-4 w-40 h-56 text-border pointer-events-none"
        viewBox="0 0 140 220"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M20 10 L110 100 L20 190"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M60 10 L150 100 L60 190"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
      </svg>

      <div className="relative max-w-xl mx-auto px-4 py-14 sm:py-16">
        <span className="block text-xs font-bold tracking-widest text-brand-600 mb-3">CREA TU CUENTA</span>
        <h1
          className="font-extrabold text-ink mb-3"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
        >
          ¿Cómo quieres comenzar?
        </h1>
        <p className="text-ink/55 mb-8">Elige una opción. Podrás cambiarla después.</p>

        <div className="flex flex-col gap-4 mb-8">
          {OPCIONES.map((op) => {
            const activo = seleccion === op.id;
            return (
              <button
                key={op.id}
                type="button"
                onClick={() => setSeleccion(op.id)}
                aria-pressed={activo}
                className={`text-left flex items-center gap-4 rounded-2xl border p-5 transition-all ${
                  activo ? "border-brand-500 bg-brand-50/40 shadow-sm" : "border-border bg-white hover:border-brand-200"
                }`}
              >
                <span
                  className={`w-16 h-16 rounded-2xl ${op.iconBg} ${op.iconText} flex items-center justify-center shrink-0`}
                >
                  <op.Icono className="w-7 h-7" strokeWidth={1.75} />
                </span>
                <div className="flex-1 min-w-0">
                  <span
                    className={`inline-block text-[11px] font-semibold ${op.badgeBg} ${op.badgeText} px-2.5 py-0.5 rounded-full mb-1.5`}
                  >
                    {op.badge}
                  </span>
                  <h2 className="font-bold text-ink text-lg leading-snug">{op.titulo}</h2>
                  <p className="text-sm text-ink/55 leading-snug mt-0.5">{op.descripcion}</p>
                </div>
                <span
                  className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 ${
                    activo ? "bg-brand-500 border-brand-500" : "border-border"
                  }`}
                >
                  {activo && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={continuar}
          className="w-full min-h-[52px] flex items-center justify-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-coral-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
        >
          Continuar
          <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </button>

        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mt-5 text-xs text-ink/45">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.75} /> Gratis
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" strokeWidth={1.75} /> Sin comisiones
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.75} /> Contacto directo
          </span>
        </div>
      </div>
    </div>
  );
}
