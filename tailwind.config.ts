import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        ink: "#080808",
        charcoal: "#141414",
        ivory: "#F4F1EB",
        stone: "#D8D3CB",
        taupe: "#A7A19A",
        paper: "#FFFFFF",
      },
      fontFamily: {
        serif: ["var(--font-editorial)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      fontSize: {
        "display-1": ["clamp(3.5rem, 12vw, 12rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-2": ["clamp(2.5rem, 7vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
        "editorial": ["clamp(1.75rem, 3.5vw, 3rem)", { lineHeight: "1.1" }],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        editorial: "1440px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -4%)" },
          "20%": { transform: "translate(-6%, 2%)" },
          "30%": { transform: "translate(2%, -6%)" },
          "40%": { transform: "translate(-2%, 5%)" },
          "50%": { transform: "translate(-6%, 3%)" },
          "60%": { transform: "translate(6%, 0)" },
          "70%": { transform: "translate(0, 6%)" },
          "80%": { transform: "translate(-4%, 0)" },
          "90%": { transform: "translate(3%, 4%)" },
        },
        flash: {
          "0%": { opacity: "0" },
          "3%": { opacity: "0.12" },
          "6%": { opacity: "0" },
          "100%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        grain: "grain 8s steps(10) infinite",
        flash: "flash 6s ease-out 1",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
