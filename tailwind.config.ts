import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#EEEDF9",
          100: "#D7D4F0",
          200: "#B0A9E1",
          300: "#8A7ED3",
          400: "#6357A8",
          500: "#2E2A6E", // indigo principal
          600: "#252258",
          700: "#1C1A43",
          800: "#14122F",
          900: "#0B0A1A",
        },
        coral: {
          50: "#FFF1EC",
          100: "#FFDCD0",
          400: "#FF8A6E",
          500: "#FF6B4A", // acento coral
          600: "#E5502F",
          700: "#C43D20",
        },
        gold: {
          50: "#FEF6E7",
          100: "#FCE9C4",
          400: "#F7C05C",
          500: "#F5A524",
          600: "#D9860B",
        },
        cream: "#FAF8F5",
        ink: "#211E3D",
      },
    },
  },
  plugins: [],
};
export default config;
