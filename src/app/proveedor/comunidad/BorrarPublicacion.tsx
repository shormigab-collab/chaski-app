"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BorrarPublicacion({ id }: { id: string }) {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);

  async function borrar() {
    if (!confirm("¿Borrar esta publicación?")) return;
    setCargando(true);
    await fetch(`/api/comunidad/${id}`, { method: "DELETE" });
    setCargando(false);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={borrar}
      disabled={cargando}
      className="text-xs font-semibold text-coral-600 hover:text-coral-700 disabled:opacity-50"
    >
      {cargando ? "Borrando..." : "Borrar"}
    </button>
  );
}
