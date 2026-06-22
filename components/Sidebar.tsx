"use client";

import { motion } from "framer-motion";
import { Download, Eye, FileText, Gauge, Image, Layers3, Palette, SlidersHorizontal, Sparkles } from "lucide-react";

const items = [
  { id: "generate", label: "Generate", icon: Sparkles },
  { id: "palette", label: "Palette", icon: Palette },
  { id: "image-extract", label: "Image Extract", icon: Image },
  { id: "vibe-mixer", label: "Vibe Mixer", icon: SlidersHorizontal },
  { id: "preview", label: "Preview", icon: Eye },
  { id: "design-md", label: "DESIGN.md", icon: FileText },
  { id: "export", label: "Export", icon: Download },
  { id: "contrast", label: "Contrast Check", icon: Gauge }
];

export function Sidebar() {
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <aside className="sticky top-4 z-20 h-fit rounded-lg border border-[#1f1f1f] bg-[#0c0c0e] p-3 lg:min-h-[calc(100vh-2rem)] lg:w-64">
      <div className="mb-5 hidden items-center gap-3 px-3 pt-2 lg:flex">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#00d4a4] text-[#0a0a0a]">
          <Layers3 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">VibeDesign AI</p>
          <p className="text-xs text-[#888888]">Design studio</p>
        </div>
      </div>
      <nav className="studio-scroll flex gap-2 overflow-x-auto lg:block lg:space-y-0.5 lg:overflow-visible">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 2 }}
              onClick={() => jump(item.id)}
              className="focus-ring flex shrink-0 items-center gap-3 rounded-md border border-transparent px-3 py-2 text-left text-sm text-[#a8a8aa] transition hover:bg-[#1c1c1e] hover:text-[#00d4a4] lg:w-full"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </motion.button>
          );
        })}
      </nav>
      <div className="mt-5 hidden rounded-lg border border-[#00d4a4]/20 bg-[#00d4a4]/8 p-4 text-xs text-[#7cebcb] lg:block">
        <p className="font-semibold text-white">Coming Soon</p>
        <p className="mt-1 text-[#7cebcb]/80">Figma export and GitHub sync after the frontend MVP.</p>
      </div>
    </aside>
  );
}
