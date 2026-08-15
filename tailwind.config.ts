import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        // Inter para texto de interfaz/cuerpo, Manrope para encabezados
        // (variable --font-heading). "sans" (el default) queda en Inter.
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      colors: {
        // Escala morada (antes indigo mas oscuro). 500/600 son los
        // valores exactos pedidos ("primary purple" / "purple hover");
        // el resto de la rampa se interpolo a partir de esos dos mas
        // el lavanda (50) y el ink navy (900) para que quede continua.
        brand: {
          50: "#F2EFFF",
          100: "#CAC5E6",
          200: "#A59ED0",
          300: "#8178BA",
          400: "#5C52A3",
          500: "#3B2F8F", // primary purple
          600: "#29206F", // purple hover
          700: "#211A57",
          800: "#1C1647",
          900: "#17133A", // = ink navy
        },
        // Coral reajustado al nuevo tono (#FF6B5F). OJO: texto blanco
        // sobre coral-500 da 2.79:1 (falla WCAG AA) y coral-600 solo
        // llega a 3.97:1 (tampoco alcanza 4.5:1 para texto normal).
        // Por eso el coral se usa como acento (badges, bordes, texto
        // sobre fondo claro) y NO como fondo solido con texto blanco
        // encima; para botones solidos se usa "brand" (10.5:1+).
        coral: {
          50: "#FFF3F2",
          100: "#FFE4E2",
          200: "#FFCAC5",
          300: "#FFAEA7",
          400: "#FF8C82",
          500: "#FF6B5F", // brand coral
          600: "#D65649",
          700: "#B34335",
          800: "#9C3729",
          900: "#8A2E1F",
        },
        // Dorado: se mantiene sin cambios. Por decision explicita, se
        // reserva unicamente para estrellas de calificacion/resenas;
        // el resto de la interfaz usa la paleta nueva.
        gold: {
          50: "#FEF6E7",
          100: "#FCE9C4",
          400: "#F7C05C",
          500: "#F5A524",
          600: "#D9860B",
        },
        cream: "#FFF9F4", // warm cream
        ink: "#17133A", // ink navy (= brand-900)
        lavender: "#F2EFFF", // soft lavender, para franjas de fondo
        border: "#E7E2EF",
        availability: "#169B62", // punto/indicador de "disponible"
      },
      borderRadius: {
        "2xl5": "20px", // tarjetas: entre rounded-2xl (16px) y rounded-3xl (24px)
      },
    },
  },
  plugins: [],
};
export default config;
