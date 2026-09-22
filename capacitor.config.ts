import type { CapacitorConfig } from "@capacitor/cli";

// Config de Capacitor: envuelve la web real de chaski (server.url) en un
// proyecto nativo de iOS/Android. "webDir" apunta a public-capacitor, una
// pagina local minima que solo se ve un instante al arrancar (detras del
// splash screen) o si la carga remota falla — la app real vive en
// usechaski.com, no en este proyecto.
const config: CapacitorConfig = {
  appId: "com.usechaski.app",
  appName: "chaski",
  webDir: "public-capacitor",
  server: {
    url: "https://www.usechaski.com",
    cleartext: false,
  },
  ios: {
    contentInset: "automatic",
  },
  android: {
    allowMixedContent: false,
  },
};

export default config;
