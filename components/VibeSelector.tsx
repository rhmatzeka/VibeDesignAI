"use client";

import { motion } from "framer-motion";
import type { VibePreset } from "@/lib/types";
import { SectionTitle } from "./WebsiteTypeSelector";

export function VibeSelector({
  vibes,
  selectedId,
  onSelect,
  onGenerate
}: {
  vibes: VibePreset[];
  selectedId: string;
  onSelect: (id: string) => void;
  onGenerate: () => void;
}) {
  return (
    <section className="scroll-mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle eyebrow="Step 2" title="Select design vibe" subtitle="Inspired labels are used only as mood direction. The generated design remains original." />
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGenerate}
          className="focus-ring mb-4 rounded-full bg-[#00d4a4] hover:bg-[#00b48a] px-5 py-2.5 text-xs font-semibold text-[#0a0a0a] transition"
        >
          Generate Design System
        </motion.button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {vibes.map((vibe) => {
          const selected = selectedId === vibe.id;
          return (
            <motion.button
              key={vibe.id}
              whileHover={{ y: -2 }}
              onClick={() => onSelect(vibe.id)}
              className={`focus-ring rounded-lg border p-4 text-left transition ${
                selected
                  ? "border-[#00d4a4] bg-[#0c0c0e] shadow-[rgba(0,212,164,0.08)_0px_8px_24px]"
                  : "border-[#1f1f1f] bg-[#0c0c0e] hover:border-[#3a3a3c] hover:bg-[#111115]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{vibe.name}</p>
                  <p className="mt-2 text-xs leading-5 text-[#a8a8aa]">{vibe.description}</p>
                </div>
                <div className="flex shrink-0 -space-x-2">
                  {[vibe.colors.primary, vibe.colors.secondary, vibe.colors.accent].map((color) => (
                    <span key={color} className="h-6 w-6 rounded-full border border-[#1f1f1f]" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {vibe.mood.slice(0, 4).map((mood) => (
                  <span key={mood} className="rounded border border-[#1f1f1f] bg-[#1c1c1e] px-2 py-0.5 font-mono text-[10px] text-[#a8a8aa]">{mood}</span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
