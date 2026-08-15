"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gift, X } from "lucide-react";

const CLAVE_DESCARTADO = "chaski_banner_referidos_oculto";

export default function ReferralBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Se decide en el cliente (no en el servidor) para no depender de
    // localStorage durante el render inicial y evitar desajustes de hidratacion.
    if (localStorage.getItem(CLAVE_DESCARTADO) !== "1") {
      setVisible(true);
    }
  }, []);

  function descartar() {
    localStorage.setItem(CLAVE_DESCARTADO, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-brand-500 to-coral-500 text-cream">
      <Link
        href="/proveedor/invitar"
        className="flex items-center justify-center gap-2 px-10 py-2.5 text-sm font-medium text-center hover:bg-white/10 transition-colors"
      >
        <Gift className="w-4 h-4 shrink-0" strokeWidth={2} />
        <span>
          <strong className="font-bold">Invita a un colega</strong> y gana 3 créditos por cada uno que se una —
          <span className="underline underline-offset-2 ml-1">Invitar ahora</span>
        </span>
      </Link>
      <button
        onClick={descartar}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/15 transition-colors"
        aria-label="Cerrar aviso"
      >
        <X className="w-3.5 h-3.5" strokeWidth={2} />
      </button>
    </div>
  );
}
