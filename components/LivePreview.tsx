"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ColorPalette, PreviewTab, VibePreset, WebsiteType } from "@/lib/types";
import { SectionTitle } from "./WebsiteTypeSelector";
import { getPreviewTheme } from "./previews/registry";

const tabs: PreviewTab[] = ["Landing Page", "Dashboard", "Login Page", "Pricing Page", "Product Card", "Mobile App"];

export function LivePreview({
  palette,
  vibe,
  websiteType,
  selectedTab,
  onTabChange
}: {
  palette: ColorPalette;
  vibe: VibePreset;
  websiteType: WebsiteType;
  selectedTab: PreviewTab;
  onTabChange: (tab: PreviewTab) => void;
}) {
  const theme = getPreviewTheme(vibe);
  const Preview = theme.render[selectedTab];

  return (
    <section id="preview" className="scroll-mt-6">
      <SectionTitle eyebrow={`Preview · ${theme.label}`} title="Live UI preview" subtitle="Renderer changes by vibe family, so themes have different layout language instead of only different colors." />
      <div className="rounded-lg border border-[#1f1f1f] bg-[#0c0c0e] p-3">
        <div className="studio-scroll mb-3 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`focus-ring shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${selectedTab === tab ? "bg-[#00d4a4] text-[#0a0a0a]" : "border border-[#1f1f1f] bg-[#0c0c0e] text-[#a8a8aa] hover:bg-[#1c1c1e] hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-md border border-[#1f1f1f]">
          <AnimatePresence mode="wait">
            <motion.div key={`${theme.id}-${selectedTab}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }}>
              <Preview palette={palette} vibe={vibe} websiteType={websiteType} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
