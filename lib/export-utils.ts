import type { ColorPalette } from "./types";

const tokenNames: Array<keyof ColorPalette> = [
  "primary", "secondary", "accent", "background", "surface", "card", "textPrimary", "textSecondary", "border", "success", "warning", "danger", "muted", "input"
];

function cssName(key: keyof ColorPalette) {
  return key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

export function downloadTextFile(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function generateCssVariables(palette: ColorPalette) {
  return `:root {\n${tokenNames.map((token) => `  --color-${cssName(token)}: ${palette[token]};`).join("\n")}\n}`;
}

export function generateTailwindConfig() {
  return `theme: {
  extend: {
    colors: {
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      accent: "var(--color-accent)",
      background: "var(--color-background)",
      surface: "var(--color-surface)",
      card: "var(--color-card)",
      border: "var(--color-border)",
      muted: "var(--color-muted)",
      success: "var(--color-success)",
      warning: "var(--color-warning)",
      danger: "var(--color-danger)"
    },
    borderRadius: {
      xl: "1rem",
      "2xl": "1.5rem",
      "3xl": "2rem"
    },
    boxShadow: {
      soft: "0 20px 60px rgba(0,0,0,0.25)",
      glow: "0 0 40px rgba(124,58,237,0.25)"
    }
  }
}`;
}

export function generateJsonTokens(palette: ColorPalette) {
  return JSON.stringify({ colors: palette }, null, 2);
}
