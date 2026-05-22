import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: "#050816",
          panel: "rgba(255,255,255,0.065)",
          border: "rgba(255,255,255,0.08)"
        }
      },
      boxShadow: {
        soft: "0 24px 80px rgba(0,0,0,0.32)",
        glow: "0 0 42px rgba(124,58,237,0.28)"
      }
    }
  },
  plugins: []
};

export default config;
