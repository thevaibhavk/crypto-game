import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0E14",
        surface: "#0B0F14",
        panel: "#121826",
        overlay: "#1B2330",
        chroma: {
          teal: "#0FF5C6",
          magenta: "#FF2E88",
          violet: "#7C4DFF",
          amber: "#FFD166",
          lime: "#B0FF00",
          danger: "#FF3B3B",
        },
        text: {
          primary: "#F8FAFC",
          muted: "#98A2B3",
          tertiary: "rgba(255,255,255,0.5)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", ...fontFamily.sans],
        body: ["var(--font-body)", ...fontFamily.sans],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      boxShadow: {
        glow: "0 0 24px rgba(15,245,198,0.45)",
        "magenta-glow": "0 0 24px rgba(255,46,136,0.45)",
      },
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
      },
      borderRadius: {
        xs: "6px",
        md: "10px",
        lg: "14px",
        capsule: "999px",
      },
      transitionTimingFunction: {
        "swift-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "hack-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(15,245,198,0.35)" },
          "50%": { boxShadow: "0 0 20px 6px rgba(255,46,136,0.45)" },
        },
        "crt-flicker": {
          "0%": { opacity: "0.98" },
          "5%": { opacity: "0.9" },
          "10%": { opacity: "0.98" },
          "15%": { opacity: "0.95" },
          "20%": { opacity: "1" },
          "100%": { opacity: "0.98" },
        },
        "glitch-translate": {
          "0%": { transform: "translate(0)" },
          "50%": { transform: "translate(-1px, 1px)" },
          "100%": { transform: "translate(0)" },
        },
        "beam-travel": {
          "0%": { strokeDashoffset: "400" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "hack-pulse": "hack-pulse 0.9s ease-in-out infinite",
        "crt-flicker": "crt-flicker 4s ease-in-out infinite",
        "glitch-translate": "glitch-translate 600ms steps(2, end) infinite",
      },
      backgroundImage: {
        "dark-breach": "linear-gradient(135deg, #0FF5C6 0%, #7C4DFF 55%, #FF2E88 100%)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
