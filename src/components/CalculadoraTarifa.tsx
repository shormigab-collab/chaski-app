"use client";

import { useState } from "react";

const MONEDAS = ["USD", "COP", "MXN", "ARS", "PEN", "CLP", "EUR"];
const URL_PAGINA = "https://www.usechaski.com/calculadora-tarifa-freelance";

function aNumero(v: string) {
  const n = parseFloat(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function CalculadoraTarifa() {
  const [moneda, setMoneda] = useState("USD");
  const [ingreso, setIngreso] = useState("2000");
  const [gastos, setGastos] = useState("150");
  const [impuestos, setImpuestos] = useState("20");
  const [horasSemana, setHorasSemana] = useState("20");
  const [semanasLibres, setSemanasLibres] = useState("4");
  const [horasProyecto, setHorasProyecto] = useState("20");
  const [copiado, setCopiado] = useState(false);

  const n = aNumero(ingreso);
  const g = aNumero(gastos);
  const t = Math.min(aNumero(impuestos), 80);
  const h = aNumero(horasSemana);
  const v = Math.min(aNumero(semanasLibres), 20);
  const hp = aNumero(horasProyecto);

  const horasAnio = h * (52 - v);
  const necesarioAnual = ((n + g) * 12) / (1 - t / 100);
  const valido = n > 0 && h > 0 && horasAnio > 0;
  const tarifaHora = valido ? necesarioAnual / horasAnio : 0;
  const ingresoMensualBruto = valido ? (tarifaHora * horasAnio) / 12 : 0;
  const precioProyecto = tarifaHora * hp;

  const fmt = (x: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: moneda,
      maximumFractionDigits: 0,
    }).format(Math.round(x));

  const textoCompartir = valido
    ? `Calculé la tarifa mínima que necesito como freelancer con esta calculadora de chaski. Pruébala: ${URL_PAGINA}`
    : `Calculadora de tarifa freelance de chaski: ${URL_PAGINA}`;

  async function copiar() {
    try {
      await navigator.clipboard.writeText(URL_PAGINA);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Si el navegador no permite copiar, se puede usar WhatsApp/LinkedIn.
    }
  }

  const input =
    "w-full border border-black/10 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-brand-300 bg-white min-h-[44px]";
  const label = "block text-xs font-medium text-ink/60 mb-1.5";

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 border border-black/5 bg-white rounded-2xl p-6 space-y-5">
        <div>
          <label className={label}>Moneda</label>
          <select value={moneda} onChange={(e) => setMoneda(e.target.value)} className={input}>
            {MONEDAS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={label}>Ingreso neto que quieres ganar al mes</label>
            <input value={ingreso} onChange={(e) => setIngreso(e.target.value)} inputMode="decimal" className={input} />
          </div>
          <div>
            <label className={label}>Gastos mensuales de trabajo (internet, software, etc.)</label>
            <input value={gastos} onChange={(e) => setGastos(e.target.value)} inputMode="decimal" className={input} />
          </div>
          <div>
            <label className={label}>Impuestos y seguridad social (% aproximado)</label>
            <input value={impuestos} onChange={(e) => setImpuestos(e.target.value)} inputMode="decimal" className={input} />
          </div>
          <div>
            <label className={label}>Horas facturables por semana</label>
            <input value={horasSemana} onChange={(e) => setHorasSemana(e.target.value)} inputMode="decimal" className={input} />
          </div>
          <div>
            <label className={label}>Semanas al año sin trabajar (vacaciones, festivos, enfermedad)</label>
            <input value={semanasLibres} onChange={(e) => setSemanasLibres(e.target.value)} inputMode="decimal" className={input} />
          </div>
          <div>
            <label className={label}>Horas estimadas de un proyecto (opcional)</label>
            <input value={horasProyecto} onChange={(e) => setHorasProyecto(e.target.value)} inputMode="decimal" className={input} />
          </div>
        </div>

        <p className="text-xs text-ink/45 leading-relaxed">
          Las horas facturables son solo las que le cobras a clientes. Tu semana tiene además tiempo para buscar
          clientes, cotizar y administrar, por eso rara vez son 40.
        </p>
      </div>

      <div className="lg:col-span-2 border border-black/5 bg-brand-50 rounded-2xl p-6">
        <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">Tu tarifa mínima</p>
        {valido ? (
          <>
            <p className="text-4xl font-extrabold text-ink tracking-tight">{fmt(tarifaHora)}</p>
            <p className="text-sm text-ink/55 mb-5">por hora</p>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-3 border-t border-black/5 pt-3">
                <span className="text-ink/55">Proyecto de {hp || 0} horas</span>
                <span className="font-semibold text-ink">{fmt(precioProyecto)}</span>
              </div>
              <div className="flex justify-between gap-3 border-t border-black/5 pt-3">
                <span className="text-ink/55">Con 15% de margen para imprevistos</span>
                <span className="font-semibold text-ink">{fmt(precioProyecto * 1.15)}</span>
              </div>
              <div className="flex justify-between gap-3 border-t border-black/5 pt-3">
                <span className="text-ink/55">Facturación mensual promedio</span>
                <span className="font-semibold text-ink">{fmt(ingresoMensualBruto)}</span>
              </div>
            </div>

            <p className="text-xs text-ink/45 leading-relaxed mt-5">
              Es el mínimo para cubrir tu meta, no un precio de mercado. Si tu experiencia o tu especialidad lo
              justifican, puedes cobrar más.
            </p>
          </>
        ) : (
          <p className="text-sm text-ink/55">Completa tu ingreso deseado y tus horas facturables para ver el resultado.</p>
        )}

        <div className="mt-6 pt-5 border-t border-black/5">
          <p className="text-xs font-medium text-ink/60 mb-2">Compartir la calculadora</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copiar}
              className="text-xs font-semibold bg-white border border-black/10 rounded-lg px-3 py-2 hover:border-brand-300 min-h-[44px]"
            >
              {copiado ? "¡Enlace copiado!" : "Copiar enlace"}
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(textoCompartir)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold bg-white border border-black/10 rounded-lg px-3 py-2 hover:border-brand-300 min-h-[44px] flex items-center"
            >
              WhatsApp
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(URL_PAGINA)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold bg-white border border-black/10 rounded-lg px-3 py-2 hover:border-brand-300 min-h-[44px] flex items-center"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
