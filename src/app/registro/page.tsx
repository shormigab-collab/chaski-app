import Link from "next/link";

export default function RegistroPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-8">¿Cómo quieres usar chaski?</h1>
      <div className="grid sm:grid-cols-2 gap-6">
        <Link
          href="/registro/cliente"
          className="border rounded-xl p-8 hover:border-brand-500 hover:shadow-sm transition"
        >
          <div className="text-4xl mb-3">🔍</div>
          <h2 className="font-semibold text-lg mb-2">Busco un servicio</h2>
          <p className="text-sm text-gray-600">Publica lo que necesitas gratis.</p>
        </Link>
        <Link
          href="/registro/proveedor"
          className="border rounded-xl p-8 hover:border-brand-500 hover:shadow-sm transition"
        >
          <div className="text-4xl mb-3">💼</div>
          <h2 className="font-semibold text-lg mb-2">Ofrezco un servicio</h2>
          <p className="text-sm text-gray-600">Crea tu perfil y consigue clientes.</p>
        </Link>
      </div>
    </div>
  );
}
