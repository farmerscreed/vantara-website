import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1628",
          50: "#E7EBF1",
          100: "#C2CAD9",
          200: "#8E9CB3",
          300: "#5B6E8C",
          400: "#2E4160",
          500: "#0A1628",
          600: "#081222",
          700: "#060E1B",
          800: "#040A14",
          900: "#02050A",
        },
        slate: {
          DEFAULT: "#1E2D3D",
          900: "#1E2D3D",
        },
        gold: {
          DEFAULT: "#C8963E",
          50: "#F9F2E4",
          100: "#F1E1BD",
          200: "#E5C98B",
          300: "#D9B15A",
          400: "#CFA148",
          500: "#C8963E",
          600: "#A07830",
          700: "#785A24",
          800: "#503C18",
          900: "#281E0C",
        },
        teal: {
          DEFAULT: "#2A9D8F",
          500: "#2A9D8F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        stat: ["var(--font-stat)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        wide: "0.08em",
        wider: "0.14em",
        widest: "0.22em",
      },
      maxWidth: {
        wrap: "1280px",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
