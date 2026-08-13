import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Mercado Pago llama esta URL cuando cambia el estado de un pago.
// Doc: https://www.mercadopago.com/developers/es/docs/checkout-pro/additional-content/notifications/webhooks
export async function POST(req: Request) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  const body = await req.json().catch(() => null);

  const paymentId = body?.data?.id;
  if (!paymentId || !accessToken) {
    return NextResponse.json({ ok: true });
  }

  const res = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return NextResponse.json({ ok: true });

  const pago = await res.json();
  const transaccionId = pago.external_reference as string | undefined;
  if (!transaccionId) return NextResponse.json({ ok: true });

  const transaccion = await prisma.transaccion.findUnique({ where: { id: transaccionId } });
  if (!transaccion || transaccion.estado === "APROBADA") {
    return NextResponse.json({ ok: true });
  }

  if (pago.status === "approved") {
    const usuario = await prisma.user.findUnique({ where: { id: transaccion.userId }, include: { proveedor: true } });
    if (usuario?.proveedor) {
      await prisma.$transaction([
        prisma.transaccion.update({
          where: { id: transaccion.id },
          data: { estado: "APROBADA", mpPaymentId: String(paymentId) },
        }),
        prisma.proveedor.update({
          where: { id: usuario.proveedor.id },
          data: { creditos: { increment: transaccion.creditos } },
        }),
      ]);
    }
  } else if (pago.status === "rejected") {
    await prisma.transaccion.update({
      where: { id: transaccion.id },
      data: { estado: "RECHAZADA", mpPaymentId: String(paymentId) },
    });
  }

  return NextResponse.json({ ok: true });
}
