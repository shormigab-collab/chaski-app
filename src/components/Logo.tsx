export function LogoMark({ size = 40, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="96" height="96" rx="24" fill={dark ? "#FAF8F5" : "#2E2A6E"} />
      <path
        d="M28 24 L52 48 L28 72"
        stroke={dark ? "#2E2A6E" : "#FAF8F5"}
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M46 24 L70 48 L46 72"
        stroke="#FF6B4A"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({ size = 32, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark size={size} dark={dark} />
      <span
        className={`font-extrabold tracking-tight ${dark ? "text-cream" : "text-ink"}`}
        style={{ fontSize: size * 0.62 }}
      >
        chaski
      </span>
    </span>
  );
}
