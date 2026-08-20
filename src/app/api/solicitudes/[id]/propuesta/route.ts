import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { obtenerUsuarioActual } from "@/lib/auth";
import { preguntarClaude } from "@/lib/anthropic";
import { formatearPresupuesto } from "@/lib/moneda";
import { formatearTarifa } from "@/lib/tarifa";

// Genera un borrador de mensaje de contacto para que el proveedor lo revise,
// edite y copie manualmente. La IA NUNCA envia nada por si sola: chaski no
// tiene mensajeria interna, el proveedor contacta al cliente por su cuenta
// (telefono/correo) una vez desbloqueado el contacto.
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const usuario = await obtenerUsuarioActual();
  if (!usuario || usuario.role !== "PROVEEDOR" || !usuario.proveedor) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const desbloqueo = await prisma.desbloqueo.findUnique({
    where: {
      proveedorId_solicitudId: {
        proveedorId: usuario.proveedor.id,
        solicitudId: params.id,
      },
    },
  });
  if (!desbloqueo) {
    return NextResponse.json(
      { error: "Primero debes destapar el contacto de esta solicitud." },
      { status: 403 }
    );
  }

  const solicitud = await prisma.solicitud.findUnique({
    where: { id: params.id },
    include: { cliente: true, categoria: true },
  });
  if (!solicitud) {
    return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 });
  }

  const primerNombreCliente = solicitud.cliente.nombre.split(" ")[0];
  const presupuestoTexto = solicitud.presupuesto
    ? formatearPresupuesto(solicitud.presupuesto, solicitud.presupuestoMoneda)
    : "no especificado";

  const systemPrompt = `Ayudas a un profesional independiente de chaski (marketplace de LatAm) a preparar un primer mensaje de contacto para un cliente potencial. Escribe en español latinoamericano, tono cálido, profesional y breve (60-100 palabras). Nunca prometas resultados, plazos ni precios exactos como si fueran definitivos — el precio final se acuerda directamente entre ambos. No inventes experiencia ni datos que no te doy. No firmes con "Atentamente" ni datos de contacto (el proveedor ya lo va a enviar desde su propio teléfono o correo). Responde solo con el texto del mensaje, sin comillas ni explicaciones adicionales.`;

  const mensajeUsuario = `Cliente: ${primerNombreCliente}
Proyecto: ${solicitud.titulo}
Descripción del cliente: ${solicitud.descripcion}
Categoría: ${solicitud.categoria.nombre}
Ciudad: ${solicitud.ciudad}
Presupuesto mencionado por el cliente: ${presupuestoTexto}

Mi perfil profesional:
Bio: ${usuario.proveedor.bio || "(sin biografía en el perfil)"}
Años de experiencia: ${usuario.proveedor.aniosExperiencia ?? "(no especificado)"}
Tarifa aproximada: ${
    usuario.proveedor.tarifaAproximada
      ? formatearTarifa(usuario.proveedor.tarifaAproximada, usuario.proveedor.tarifaTipo)
      : "(no especificada)"
  }

Escribe el mensaje de contacto.`;

  try {
    const mensaje = await preguntarClaude(systemPrompt, mensajeUsuario);
    return NextResponse.json({ ok: true, mensaje: mensaje.trim() });
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error && err.message.includes("no esta configurado")
            ? err.message
            : "No pudimos preparar el mensaje automáticamente. Escríbelo tú mismo.",
      },
      { status: 500 }
    );
  }
}
