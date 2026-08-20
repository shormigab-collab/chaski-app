import ComunidadPrototipo from "./ComunidadPrototipo";

// Ruta de prueba, sin conectar a base de datos ni enlazada desde el menu.
// Sirve para que Sebas explore la idea de un feed tipo red social dentro de
// chaski (objetivo: retencion) antes de decidir si vale la pena construirlo
// de verdad. Todo lo que pasa aqui vive solo en el navegador — al recargar
// la pagina, se pierde.
export const metadata = { title: "Prototipo: Comunidad | chaski" };

export default function PrototipoComunidadPage() {
  return <ComunidadPrototipo />;
}
