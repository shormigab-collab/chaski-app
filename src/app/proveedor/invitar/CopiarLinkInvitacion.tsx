"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopiarLinkInvitacion({ link }: { link: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(link);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // si el navegador bloquea el portapapeles, el usuario igual puede
      // seleccionar el texto manualmente desde el input
    }
  }

  return (
    <div className="flex items-center gap-2 bg-white border border-black/10 rounded-full pl-5 pr-1.5 py-1.5 shadow-sm shadow-black/5">
      <input
        readOnly
        value={link}
        onFocus={(e) => e.currentTarget.select()}
        className="flex-1 min-w-0 text-sm text-ink/70 outline-none bg-transparent truncate"
      />
      <button
        onClick={copiar}
        className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold bg-brand-500 text-cream px-4 py-2.5 rounded-xl hover:bg-brand-600 transition-colors min-h-[40px]"
      >
        {copiado ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copiado ? "¡Copiado!" : "Copiar"}
      </button>
    </div>
  );
}
