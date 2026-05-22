import type { ColorPalette } from "./types";

function normalize(hex: string) {
  const clean = hex.replace("#", "");
  return clean.length === 3 ? clean.split("").map((char) => char + char).join("") : clean;
}

function hexToRgb(hex: string) {
  const clean = normalize(hex);
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16)
  };
}

export function getLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const values = [r, g, b].map((value) => {
    const channel = value / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
}

export function getContrastRatio(foreground: string, background: string) {
  const lighter = Math.max(getLuminance(foreground), getLuminance(background));
  const darker = Math.min(getLuminance(foreground), getLuminance(background));
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

export function getContrastStatus(ratio: number) {
  if (ratio >= 4.5) return { status: "Good" as const, message: "Great contrast. This color pair is readable." };
  if (ratio >= 3) return { status: "Warning" as const, message: "This pair may be readable for large text but risky for small text." };
  return { status: "Poor" as const, message: "Low contrast. Consider using a lighter or darker text color." };
}

export function autoFixTextColor(palette: ColorPalette): ColorPalette {
  const bgLum = getLuminance(palette.background);
  const surfaceLum = getLuminance(palette.surface);
  const darkBase = (bgLum + surfaceLum) / 2 < 0.42;
  return {
    ...palette,
    textPrimary: darkBase ? "#FFFFFF" : "#0F172A",
    textSecondary: darkBase ? "#CBD5E1" : "#475569"
  };
}
