import { ImageResponse } from "next/og";

// Genera el favicon (ícono de pestaña) automáticamente a partir del
// mismo diseño del logo (relevo/chevrón doble), en vez de usar el
// ícono genérico de Next.js. Next.js sirve este archivo como favicon
// sin necesidad de subir una imagen.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2E2A6E",
          borderRadius: 8,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 96 96" fill="none">
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
    ),
    { ...size }
  );
}
