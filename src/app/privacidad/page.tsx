export const metadata = { title: "Política de privacidad | chaski" };

export default function PrivacidadPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-ink mb-2">Política de privacidad</h1>
      <p className="text-sm text-ink/40 mb-8">
        Este es un borrador general y todavía no ha sido revisado por un abogado. Reemplázalo por tu política
        definitiva, ajustada a las leyes de protección de datos de tu país, antes de operar con clientes reales.
      </p>

      <div className="space-y-6 text-ink/70 leading-relaxed">
        <p>
          Al registrarte en chaski recopilamos tu nombre, correo electrónico, teléfono, ciudad y, si eres
          proveedor, tu foto de perfil (opcional), años de experiencia y categorías de especialidad.
        </p>
        <p>
          Usamos esta información únicamente para operar la plataforma: crear tu cuenta, conectar clientes con
          proveedores y procesar pagos de créditos a través de Mercado Pago.
        </p>
        <p>
          El contacto de un cliente (teléfono) solo se comparte con un proveedor cuando este usa un crédito para
          desbloquearlo. No vendemos ni compartimos tus datos con terceros para fines publicitarios.
        </p>
        <p>
          Puedes solicitar la eliminación de tu cuenta y tus datos en cualquier momento escribiendo a{" "}
          <a href="mailto:soporte@usechaski.com" className="text-brand-500 font-medium hover:text-brand-600">
            soporte@usechaski.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
