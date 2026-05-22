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
    <aside className="glass-panel sticky top-4 z-20 h-fit rounded-3xl p-3 lg:min-h-[calc(100vh-2rem)] lg:w-64">
      <div className="mb-5 hidden items-center gap-3 px-3 pt-2 lg:flex">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-emerald-400 shadow-glow">
          <Layers3 className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">VibeDesign AI</p>
          <p className="text-xs text-slate-400">Design studio</p>
        </div>
      </div>
      <nav className="studio-scroll flex gap-2 overflow-x-auto lg:block lg:space-y-1 lg:overflow-visible">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 2 }}
              onClick={() => jump(item.id)}
              className="focus-ring flex shrink-0 items-center gap-3 rounded-2xl border border-white/0 px-3 py-2.5 text-left text-sm text-slate-300 transition hover:border-white/10 hover:bg-white/8 hover:text-white lg:w-full"
            >
              <Icon className="h-4 w-4 text-cyan-300" />
              {item.label}
            </motion.button>
          );
        })}
      </nav>
      <div className="mt-5 hidden rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-xs text-emerald-100 lg:block">
        <p className="font-semibold">Coming Soon</p>
        <p className="mt-1 text-emerald-100/70">Figma export and GitHub sync after the frontend MVP.</p>
      </div>
    </aside>
  );
}
