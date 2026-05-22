"use client";

import { Gauge } from "lucide-react";
import type { ColorPalette } from "@/lib/types";
import { getContrastRatio, getContrastStatus } from "@/lib/contrast-utils";
import { SectionTitle } from "./WebsiteTypeSelector";

export function ContrastChecker({
  palette,
  onAutoFix
}: {
  palette: ColorPalette;
  onAutoFix: () => void;
}) {
  const checks = [
    ["Text Primary vs Background", palette.textPrimary, palette.background],
    ["Text Secondary vs Background", palette.textSecondary, palette.background],
    ["Text Primary vs Surface", palette.textPrimary, palette.surface],
    ["Text Secondary vs Surface", palette.textSecondary, palette.surface],
    ["Primary vs Background", palette.primary, palette.background],
    ["Primary Button Text vs Primary", readableOn(palette.primary), palette.primary],
    ["Accent vs Background", palette.accent, palette.background]
  ] as const;

  return (
    <section id="contrast" className="scroll-mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle eyebrow="Contrast" title="Contrast Check" subtitle="Check key color pairs and auto-fix text colors for readable UI." />
        <button onClick={onAutoFix} className="focus-ring mb-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
          <Gauge className="h-4 w-4" />
          Auto Fix Contrast
        </button>
      </div>
      <div className="grid gap-3">
        {checks.map(([label, foreground, background]) => {
          const ratio = getContrastRatio(foreground, background);
          const result = getContrastStatus(ratio);
          const tone = result.status === "Good" ? "text-emerald-300 border-emerald-400/20 bg-emerald-400/8" : result.status === "Warning" ? "text-amber-200 border-amber-400/20 bg-amber-400/8" : "text-red-200 border-red-400/20 bg-red-400/8";
          return (
            <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.055] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">{label}</p>
                  <p className="mt-1 text-sm text-slate-400">{result.message}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex overflow-hidden rounded-full border border-white/10">
                    <span className="h-8 w-10" style={{ backgroundColor: foreground }} />
                    <span className="h-8 w-10" style={{ backgroundColor: background }} />
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-bold ${tone}`}>{result.status} · {ratio}:1</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function readableOn(hex: string) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#0F172A" : "#FFFFFF";
}
