"use client";

import { useEffect, useState } from "react";

// Este componente SOLO hace algo cuando la app corre empacada con
// Capacitor (la version de iPhone/Android compilada con Xcode/Android
// Studio). En la web normal (navegador), los imports fallan en silencio
// y el componente no renderiza nada.
//
// Por que existe: Apple rechaza apps que son "solo la pagina web
// envuelta" (Guideline 4.2, Minimum Functionality) — sobre todo si al
// poner el telefono en modo avion se ve un error de navegador en vez de
// algo propio de la app. Esto le da a la app comportamiento nativo real:
// - Barra de estado con el color de marca
// - Splash screen nativo que se oculta cuando la web ya cargo
// - Pantalla de "sin conexion" propia (no el error feo del navegador)
// - Boton "atras" de Android navega hacia atras en vez de cerrar la app
export default function CapacitorNativo() {
  const [sinConexion, setSinConexion] = useState(false);

  useEffect(() => {
    let manejadores: Array<{ remove: () => void }> = [];
    let cancelado = false;

    async function iniciar() {
      let Capacitor: any;
      try {
        ({ Capacitor } = await import("@capacitor/core"));
      } catch {
        return; // No estamos dentro de una app nativa de Capacitor.
      }
      if (cancelado || !Capacitor?.isNativePlatform?.()) return;

      const [{ StatusBar, Style }, { SplashScreen }, { Network }, { App }] =
        await Promise.all([
          import("@capacitor/status-bar"),
          import("@capacitor/splash-screen"),
          import("@capacitor/network"),
          import("@capacitor/app"),
        ]);

      // Color de marca en la barra de estado (Android; en iOS solo
      // aplica el estilo claro/oscuro, setBackgroundColor no existe ahi).
      await StatusBar.setBackgroundColor({ color: "#3B2F8F" }).catch(() => {});
      await StatusBar.setStyle({ style: Style.Dark }).catch(() => {});
      await SplashScreen.hide().catch(() => {});

      const estadoInicial = await Network.getStatus();
      if (!cancelado) setSinConexion(!estadoInicial.connected);

      const handleRed = await Network.addListener("networkStatusChange", (estado) => {
        setSinConexion(!estado.connected);
      });
      manejadores.push(handleRed);

      const handleAtras = await App.addListener("backButton", () => {
        if (window.history.length > 1) window.history.back();
        else App.exitApp();
      });
      manejadores.push(handleAtras);
    }

    iniciar();
    return () => {
      cancelado = true;
      manejadores.forEach((h) => h.remove());
    };
  }, []);

  if (!sinConexion) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#17133A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: 24,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "#3B2F8F",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#FF6B5F", fontSize: 24, fontWeight: 700 }}>»</span>
      </div>
      <p style={{ color: "#FFF9F4", fontWeight: 500, fontSize: 16, margin: 0 }}>
        Sin conexión a internet
      </p>
      <p style={{ color: "#CECBF6", fontSize: 13, margin: 0, maxWidth: 260 }}>
        chaski necesita internet para mostrarte profesionales y solicitudes. Revisa tu conexión e
        intenta de nuevo.
      </p>
    </div>
  );
}
