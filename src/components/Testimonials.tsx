import Reveal from "./Reveal";

// Ejemplos ilustrativos para maqueta de diseño — reemplaza por testimonios
// reales de tus clientes y proveedores antes de lanzar en público.
const TESTIMONIOS = [
  {
    nombre: "Camila R.",
    rol: "Fundadora de una tienda online, México",
    foto: "https://i.pravatar.cc/100?img=45",
    cita: "Publiqué lo que necesitaba y en un día ya tenía tres propuestas de diseñadores. Elegí uno y quedé feliz con el resultado.",
  },
  {
    nombre: "Andrés M.",
    rol: "Contador independiente, Colombia",
    foto: "https://i.pravatar.cc/100?img=13",
    cita: "Los créditos se sienten justos: solo pago por los clientes que realmente me interesan. Ya conseguí varios clientes recurrentes.",
  },
  {
    nombre: "Valentina P.",
    rol: "Directora de marketing, Perú",
    foto: "https://i.pravatar.cc/100?img=48",
    cita: "Me gustó poder ver el perfil de cada profesional antes de contactarlo. Se siente más confiable que buscar por redes sociales.",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <Reveal>
        <h2 className="text-2xl sm:text-3xl font-bold text-ink text-center mb-2">Lo que dicen quienes ya lo usan</h2>
        <p className="text-center text-ink/50 text-sm mb-12">Ejemplos ilustrativos — pronto con historias reales de la comunidad chaski.</p>
      </Reveal>
      <div className="grid sm:grid-cols-3 gap-5">
        {TESTIMONIOS.map((t, i) => (
          <Reveal key={t.nombre} delay={i * 120}>
            <div className="h-full border border-black/5 bg-white rounded-2xl p-6 flex flex-col">
              <span className="text-gold-500 text-sm mb-3">★★★★★</span>
              <p className="text-sm text-ink/70 leading-relaxed flex-1">&ldquo;{t.cita}&rdquo;</p>
              <div className="flex items-center gap-3 mt-5">
                <img src={t.foto} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-ink">{t.nombre}</div>
                  <div className="text-xs text-ink/45">{t.rol}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
