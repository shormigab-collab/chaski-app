"use client";

import { useEffect } from "react";

// Registra el service worker (public/sw.js) que hace que chaski sea
// instalable como PWA en Android/desktop (Chrome). En iPhone no hace
// falta esto para "Agregar a inicio", pero no estorba.
export default function RegistrarSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Si falla (navegador viejo, modo privado, etc.) no pasa nada:
        // la web sigue funcionando normal, solo no sera instalable.
      });
    }
  }, []);

  return null;
}
