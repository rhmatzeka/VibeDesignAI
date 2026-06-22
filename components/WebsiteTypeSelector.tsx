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
              className={`focus-ring rounded-lg border p-4 text-left transition ${
                selected
                  ? "border-[#00d4a4] bg-[#0c0c0e] shadow-[rgba(0,212,164,0.08)_0px_8px_24px]"
                  : "border-[#1f1f1f] bg-[#0c0c0e] hover:border-[#3a3a3c] hover:bg-[#111115]"
              }`}
            >
              <p className="font-semibold text-white">{type.name}</p>
              <p className="mt-2 text-xs leading-5 text-[#a8a8aa]">{type.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {type.mood.slice(0, 4).map((mood) => (
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

export function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00d4a4]">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-2 max-w-3xl text-xs leading-5 text-[#888888]">{subtitle}</p>
    </div>
  );
}
