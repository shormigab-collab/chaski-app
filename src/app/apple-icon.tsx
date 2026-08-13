import { ImageResponse } from "next/og";

// Versión más grande del ícono para cuando alguien agrega el sitio a la
// pantalla de inicio de su iPhone/iPad.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 40,
        }}
      >
        <svg width="110" height="110" viewBox="0 0 96 96" fill="none">
          <path
            d="M28 24 L52 48 L28 72"
            stroke="#FAF8F5"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M46 24 L70 48 L46 72"
            stroke="#FF6B4A"
            strokeWidth="12"
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
