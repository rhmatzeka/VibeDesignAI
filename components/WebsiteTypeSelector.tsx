"use client";

import { motion } from "framer-motion";
import type { WebsiteType } from "@/lib/types";

export function WebsiteTypeSelector({
  websiteTypes,
  selectedId,
  onSelect
}: {
  websiteTypes: WebsiteType[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section id="generate" className="scroll-mt-6">
      <SectionTitle eyebrow="Step 1" title="Choose website type" subtitle="The selected type changes layout guidance, page direction, and DESIGN.md output." />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {websiteTypes.map((type) => {
          const selected = selectedId === type.id;
          return (
            <motion.button
              key={type.id}
              whileHover={{ y: -2 }}
              onClick={() => onSelect(type.id)}
              className={`focus-ring rounded-2xl border p-4 text-left transition ${
                selected ? "border-cyan-300/70 bg-cyan-300/12 shadow-glow" : "border-white/8 bg-white/[0.055] hover:border-white/18 hover:bg-white/[0.08]"
              }`}
            >
              <p className="font-semibold text-white">{type.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{type.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {type.mood.slice(0, 4).map((mood) => (
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

export function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{subtitle}</p>
    </div>
  );
}
