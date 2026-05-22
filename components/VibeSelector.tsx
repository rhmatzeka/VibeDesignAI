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
        <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} onClick={onGenerate} className="focus-ring mb-4 rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
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
              className={`focus-ring rounded-2xl border p-4 text-left transition ${
                selected ? "border-violet-300/70 bg-violet-300/12 shadow-glow" : "border-white/8 bg-white/[0.055] hover:border-white/18 hover:bg-white/[0.08]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{vibe.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{vibe.description}</p>
                </div>
                <div className="flex shrink-0 -space-x-2">
                  {[vibe.colors.primary, vibe.colors.secondary, vibe.colors.accent].map((color) => (
                    <span key={color} className="h-6 w-6 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {vibe.mood.slice(0, 4).map((mood) => (
                  <span key={mood} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300">{mood}</span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
