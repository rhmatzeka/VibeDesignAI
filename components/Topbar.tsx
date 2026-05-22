"use client";

import { RotateCcw, Save, Shuffle } from "lucide-react";
import { motion } from "framer-motion";

export function Topbar({
  onRandom,
  onSave,
  onReset
}: {
  onRandom: () => void;
  onSave: () => void;
  onReset: () => void;
}) {
  return (
    <header className="glass-panel sticky top-4 z-30 mb-5 rounded-3xl px-4 py-3">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 via-blue-500 to-emerald-400 shadow-glow lg:hidden">
              <span className="text-sm font-black">V</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-white">VibeDesign AI</h1>
              <p className="text-xs text-slate-400 sm:text-sm">Generate palettes, previews, and DESIGN.md for your AI coding agent.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <TopButton icon={<Shuffle className="h-4 w-4" />} label="Random Vibe" onClick={onRandom} />
          <TopButton icon={<Save className="h-4 w-4" />} label="Save" onClick={onSave} />
          <TopButton icon={<RotateCcw className="h-4 w-4" />} label="Reset" onClick={onReset} muted />
        </div>
      </div>
    </header>
  );
}

function TopButton({ icon, label, onClick, muted }: { icon: React.ReactNode; label: string; onClick: () => void; muted?: boolean }) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`focus-ring inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-sm font-medium transition ${
        muted
          ? "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
          : "bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400 text-white shadow-glow"
      }`}
    >
      {icon}
      {label}
    </motion.button>
  );
}
