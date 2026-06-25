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
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" }
        }
      },
      opacity: {
        "8": "0.08",
        "12": "0.12",
        "15": "0.15",
        "18": "0.18",
        "24": "0.24",
        "36": "0.36",
        "42": "0.42",
        "44": "0.44",
        "48": "0.48",
        "52": "0.52",
        "54": "0.54",
        "55": "0.55",
        "58": "0.58",
        "62": "0.62",
        "68": "0.68",
        "84": "0.84"
      }
    }
  },
  plugins: []
};

export default config;
