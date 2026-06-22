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
        <button onClick={onAutoFix} className="focus-ring mb-4 inline-flex items-center gap-2 rounded-full bg-[#00d4a4] hover:bg-[#00b48a] px-5 py-2.5 text-xs font-semibold text-[#0a0a0a] transition">
          <Gauge className="h-4 w-4" />
          Auto Fix Contrast
        </button>
      </div>
      <div className="grid gap-3">
        {checks.map(([label, foreground, background]) => {
          const ratio = getContrastRatio(foreground, background);
          const result = getContrastStatus(ratio);
          const tone = result.status === "Good" ? "text-[#00d4a4] border-[#00d4a4]/20 bg-[#00d4a4]/8" : result.status === "Warning" ? "text-[#c37d0d] border-[#c37d0d]/20 bg-[#c37d0d]/8" : "text-[#d45656] border-[#d45656]/20 bg-[#d45656]/8";
          return (
            <div key={label} className="rounded-lg border border-[#1f1f1f] bg-[#0c0c0e] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-white">{label}</p>
                  <p className="mt-1 text-xs text-[#888888]">{result.message}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex overflow-hidden rounded-md border border-[#1f1f1f]">
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
