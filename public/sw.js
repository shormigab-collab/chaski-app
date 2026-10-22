// Service worker minimo, solo para que Chrome/Android considere a chaski
// "instalable" como PWA. A proposito NO cachea paginas ni datos: como
// chaski tiene contenido dinamico y de sesion (login, solicitudes, CRM),
// cachear agresivamente podria mostrarle a alguien datos viejos o de otra
// cuenta. Si mas adelante queremos soporte offline real, esto se amplia
// con cuidado (solo assets estaticos: logo, css, fuentes).
//
// IMPORTANTE: el handler de "fetch" NO llama a event.respondWith(). Antes lo
// hacia con fetch(event.request) y Safari fallaba con "FetchEvent.respondWith
// received an error: TypeError: Load failed" (sobre todo en redirecciones),
// dejando el sitio sin abrir. Sin respondWith, el navegador hace la peticion
// normal, como si no hubiera service worker.

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // intencionalmente vacio: la red responde directamente
});
