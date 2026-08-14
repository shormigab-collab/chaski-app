export const metadata = { title: "Términos y condiciones | chaski" };

export default function TerminosPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-ink mb-2">Términos y condiciones</h1>
      <p className="text-sm text-ink/40 mb-8">
        Este es un borrador general y todavía no ha sido revisado por un abogado. Reemplázalo por tus términos
        definitivos antes de operar con clientes reales.
      </p>

      <div className="space-y-6 text-ink/70 leading-relaxed">
        <p>
          chaski es un marketplace que conecta a personas y empresas que buscan servicios profesionales
          (&quot;clientes&quot;) con profesionales independientes (&quot;proveedores&quot;) en Latinoamérica.
        </p>
        <p>
          Publicar una solicitud como cliente es gratuito. Los proveedores usan créditos, adquiridos dentro de la
          plataforma, para desbloquear los datos de contacto de un cliente y ofrecerle sus servicios.
        </p>
        <p>
          chaski actúa únicamente como intermediario tecnológico entre clientes y proveedores. No participa en la
          negociación, ejecución ni pago del servicio contratado entre ambas partes, y no se hace responsable por
          la calidad, cumplimiento o resultado del trabajo realizado.
        </p>
        <p>
          Los usuarios se comprometen a proporcionar información veraz al registrarse y a hacer un uso adecuado de
          la plataforma, sin publicar contenido falso, ofensivo o fraudulento.
        </p>
        <p>
          chaski se reserva el derecho de suspender o eliminar cuentas que incumplan estos términos.
        </p>
      </div>
    </div>
  );
}
