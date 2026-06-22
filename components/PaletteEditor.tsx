"use client";

import { Copy, RotateCcw, Shuffle } from "lucide-react";
import { motion } from "framer-motion";
import type { ColorPalette } from "@/lib/types";
import { colorTokenLabels, getColorUsageLabel, validateHex } from "@/lib/palette-utils";
import { SectionTitle } from "./WebsiteTypeSelector";

export function PaletteEditor({
  palette,
  originalPalette,
  onChange,
  onResetToken,
  onResetAll,
  onRegenerate,
  onCopy,
  onCopyAll
}: {
  palette: ColorPalette;
  originalPalette: ColorPalette;
  onChange: (token: keyof ColorPalette, value: string) => void;
  onResetToken: (token: keyof ColorPalette) => void;
  onResetAll: () => void;
  onRegenerate: () => void;
  onCopy: (text: string) => void;
  onCopyAll: () => void;
}) {
  const tokens = Object.keys(palette) as Array<keyof ColorPalette>;

  return (
    <section id="palette" className="scroll-mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle eyebrow="Palette" title="Color palette generator" subtitle="Edit HEX manually, use color pickers, copy tokens, regenerate palette, and see preview updates immediately." />
        <div className="mb-4 flex flex-wrap gap-2">
          <ActionButton label="Regenerate Palette" icon={<Shuffle className="h-4 w-4" />} onClick={onRegenerate} />
          <ActionButton label="Copy All" icon={<Copy className="h-4 w-4" />} onClick={onCopyAll} />
          <ActionButton label="Reset Colors" icon={<RotateCcw className="h-4 w-4" />} onClick={onResetAll} />
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tokens.map((token) => {
          const invalid = !validateHex(palette[token]);
          return (
            <motion.div key={token} whileHover={{ y: -2 }} className="rounded-lg border border-[#1f1f1f] bg-[#0c0c0e] p-4 transition-colors hover:border-[#3a3a3c]">
              <div className="flex items-start gap-3">
                <label className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-[#1f1f1f]" style={{ backgroundColor: validateHex(palette[token]) ? palette[token] : "#000000" }}>
                  <input aria-label={`Pick ${colorTokenLabels[token]}`} type="color" value={validateHex(palette[token]) ? palette[token] : originalPalette[token]} onChange={(event) => onChange(token, event.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                </label>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white">{colorTokenLabels[token]}</p>
                  <p className="mt-1 text-xs leading-5 text-[#888888]">{getColorUsageLabel(token)}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <input value={palette[token]} onChange={(event) => onChange(token, event.target.value)} className={`focus-ring min-w-0 flex-1 rounded-md border bg-[#1c1c1e] px-3 py-2 text-xs font-mono text-white focus:border-[#00d4a4] focus:ring-1 focus:ring-[#00d4a4] ${invalid ? "border-[#d45656]" : "border-[#1f1f1f]"}`} />
                <button onClick={() => onCopy(palette[token])} className="focus-ring rounded-md border border-[#1f1f1f] bg-[#0c0c0e] px-3 text-slate-200 hover:bg-[#1c1c1e]" title="Copy HEX">
                  <Copy className="h-4 w-4" />
                </button>
                <button onClick={() => onResetToken(token)} className="focus-ring rounded-md border border-[#1f1f1f] bg-[#0c0c0e] px-3 text-slate-200 hover:bg-[#1c1c1e]" title="Reset token">
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
              {invalid && <p className="mt-2 text-xs text-[#d45656]">Invalid HEX color.</p>}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function ActionButton({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="focus-ring inline-flex items-center gap-2 rounded-full border border-[#1f1f1f] bg-[#0c0c0e] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1c1c1e] transition">
      {icon}
      {label}
    </button>
  );
}
