import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: "#0B0C10", // Fundo super escuro (quase preto)
          800: "#1F2833", // Fundo secundário
        },
        nebula: {
          primary: "#8B5CF6", // Roxo vibrante (Violet-500)
          secondary: "#06B6D4", // Ciano brilhante (Cyan-500)
        },
        starlight: "#C5C6C7", // Cinza claro para textos
        highlight: "#66FCF1", // Azul neon para detalhes
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "conic-gradient(from 180deg at 50% 50%, #2a2a2a 0deg, #0B0C10 180deg, #2a2a2a 360deg)",
      },
      animation: {
        "twinkle": "twinkle 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
