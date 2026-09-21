// Service worker minimo, solo para que Chrome/Android considere a chaski
// "instalable" como PWA. A proposito NO cachea paginas ni datos: como
// chaski tiene contenido dinamico y de sesion (login, solicitudes, CRM),
// cachear agresivamente podria mostrarle a alguien datos viejos o de otra
// cuenta. Si mas adelante queremos soporte offline real, esto se amplia
// con cuidado (solo assets estaticos: logo, css, fuentes).

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
