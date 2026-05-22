import { vibePresets } from "./vibe-presets";
import type { ColorPalette, VibePreset } from "./types";

export const colorTokenLabels: Record<keyof ColorPalette, string> = {
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
  background: "Background",
  surface: "Surface",
  card: "Card",
  textPrimary: "Text Primary",
  textSecondary: "Text Secondary",
  border: "Border",
  success: "Success",
  warning: "Warning",
  danger: "Danger",
  muted: "Muted",
  input: "Input"
};

const usage: Record<keyof ColorPalette, string> = {
  primary: "Main CTA, active state, important links, and key highlight.",
  secondary: "Supporting actions, charts, secondary highlights, and visual variety.",
  accent: "Special highlights, badges, focus moments, and memorable details.",
  background: "Main page background.",
  surface: "Panels, sections, sidebars, and content zones.",
  card: "Content cards, pricing cards, dashboard widgets, and modals.",
  textPrimary: "Headings and primary readable text.",
  textSecondary: "Descriptions, captions, helper text, and supporting copy.",
  border: "Thin dividers, outlines, panel borders, and separators.",
  success: "Positive states, confirmations, and completed indicators.",
  warning: "Caution states, notices, and attention messages.",
  danger: "Errors, destructive actions, and urgent warnings.",
  muted: "Disabled text, subtle metadata, and low-priority labels.",
  input: "Input fields, select controls, and form surfaces."
};

export function validateHex(value: string) {
  return /^#?([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value.trim());
}

export function normalizeHex(value: string) {
  const clean = value.trim().replace("#", "");
  if (clean.length === 3) {
    return `#${clean.split("").map((char) => char + char).join("")}`.toUpperCase();
  }
  return `#${clean}`.toUpperCase();
}

export function getColorUsageLabel(token: keyof ColorPalette) {
  return usage[token];
}

export function generatePaletteFromVibe(vibe: VibePreset): ColorPalette {
  return { ...vibe.colors };
}

type Rgb = { r: number; g: number; b: number };

function hexToRgb(hex: string): Rgb {
  const normalized = normalizeHex(hex).slice(1);
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16)
  };
}

function rgbToHex({ r, g, b }: Rgb) {
  return `#${[r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function mix(a: string, b: string, amount: number) {
  const c1 = hexToRgb(a);
  const c2 = hexToRgb(b);
  return rgbToHex({
    r: c1.r + (c2.r - c1.r) * amount,
    g: c1.g + (c2.g - c1.g) * amount,
    b: c1.b + (c2.b - c1.b) * amount
  });
}

function brightness(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

export function generatePaletteFromBaseColor(baseColor: string): ColorPalette {
  const primary = normalizeHex(baseColor);
  const isDark = brightness(primary) < 135;
  return {
    primary,
    secondary: mix(primary, isDark ? "#22C55E" : "#2563EB", 0.45),
    accent: mix(primary, isDark ? "#38BDF8" : "#F97316", 0.35),
    background: isDark ? mix(primary, "#030712", 0.82) : mix(primary, "#FFFFFF", 0.9),
    surface: isDark ? mix(primary, "#111827", 0.7) : mix(primary, "#F8FAFC", 0.84),
    card: isDark ? mix(primary, "#171923", 0.66) : "#FFFFFF",
    textPrimary: isDark ? "#FFFFFF" : "#111827",
    textSecondary: isDark ? "#C7D2FE" : "#475569",
    border: isDark ? mix(primary, "#334155", 0.58) : mix(primary, "#CBD5E1", 0.72),
    success: "#22C55E",
    warning: "#F59E0B",
    danger: "#EF4444",
    muted: isDark ? "#818CF8" : "#64748B",
    input: isDark ? mix(primary, "#111827", 0.74) : "#FFFFFF"
  };
}

export function randomizeVibe(currentId?: string) {
  const pool = vibePresets.filter((vibe) => vibe.id !== currentId);
  return pool[Math.floor(Math.random() * pool.length)] ?? vibePresets[0];
}

export function buildMixedPalette(primary: VibePreset, secondary: VibePreset, tertiary: VibePreset): ColorPalette {
  return {
    ...primary.colors,
    secondary: secondary.colors.secondary,
    accent: tertiary.colors.accent,
    surface: mix(primary.colors.surface, secondary.colors.surface, 0.38),
    card: mix(primary.colors.card, secondary.colors.card, 0.28),
    border: mix(primary.colors.border, secondary.colors.border, 0.35),
    success: secondary.colors.success,
    warning: tertiary.colors.warning
  };
}
