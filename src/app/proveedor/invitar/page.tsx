import { redirect } from "next/navigation";
import { obtenerUsuarioActual } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { obtenerOCrearCodigoReferido } from "@/lib/referidos";
import CopiarLinkInvitacion from "./CopiarLinkInvitacion";

export default async function InvitarPage() {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) redirect("/login");

  const codigo = await obtenerOCrearCodigoReferido(usuario.proveedor.id, usuario.nombre);
  const totalReferidos = await prisma.proveedor.count({ where: { referidoPorId: usuario.proveedor.id } });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.usechaski.com";
  const link = `${baseUrl}/registro/proveedor?ref=${codigo}`;

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-ink mb-2">Invita y gana créditos</h1>
      <p className="text-ink/60 mb-8">
        Comparte tu link con otros profesionales. Cuando alguien se registre con él, recibe 7 créditos de bienvenida
        (en vez de 5), y tú ganas 3 créditos extra por cada persona que se una.
      </p>

      <CopiarLinkInvitacion link={link} />

      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="border border-black/5 bg-white rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-brand-600 tabular-nums">{totalReferidos}</div>
          <div className="text-sm text-ink/50 mt-1">
            {totalReferidos === 1 ? "profesional invitado" : "profesionales invitados"}
          </div>
        </div>
        <div className="border border-black/5 bg-white rounded-2xl p-5 text-center">
          <div className="text-3xl font-bold text-gold-600 tabular-nums">{totalReferidos * 3}</div>
          <div className="text-sm text-ink/50 mt-1">créditos ganados por invitar</div>
        </div>
      </div>
    </div>
  );
}
