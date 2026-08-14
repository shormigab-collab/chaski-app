import { ImageResponse } from "next/og";

// Genera la imagen que aparece al compartir el link de chaski en
// WhatsApp, LinkedIn, X, etc. Se construye con el mismo estilo del
// logo (icon.tsx), sin necesidad de subir un archivo de imagen.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#2E2A6E",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 110,
              height: 110,
              borderRadius: 26,
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="68" height="68" viewBox="0 0 96 96" fill="none">
              <path
                d="M28 24 L52 48 L28 72"
                stroke="#FAF8F5"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M46 24 L70 48 L46 72"
                stroke="#FF6B4A"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: "#FAF8F5" }}>chaski</div>
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 34, color: "rgba(250,248,245,0.75)" }}>
          Encuentra al profesional ideal en LatAm
        </div>
      </div>
    ),
    { ...size }
  );
}
