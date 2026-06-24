"use client";

import { RotateCcw, Save, Shuffle } from "lucide-react";
import { motion } from "framer-motion";

export function Topbar({
  onRandom,
  onSave,
  onReset,
  adminMode,
  onToggleAdmin
}: {
  onRandom: () => void;
  onSave: () => void;
  onReset: () => void;
  adminMode: boolean;
  onToggleAdmin: () => void;
}) {
  return (
    <header className="sticky top-4 z-30 mb-5 rounded-lg border border-[#1f1f1f] bg-[#0c0c0e] px-4 py-3">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#00d4a4] text-[#0a0a0a] lg:hidden">
              <span className="text-sm font-black">V</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-white">VibeDesign AI</h1>
              <p className="text-xs text-[#888888] sm:text-sm">Generate palettes, previews, and DESIGN.md for your AI coding agent.</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <TopButton icon={<Shuffle className="h-4 w-4" />} label="Random Vibe" onClick={onRandom} variant="secondary" />
          <TopButton icon={<Save className="h-4 w-4" />} label="Save" onClick={onSave} variant="primary" />
          <TopButton icon={<RotateCcw className="h-4 w-4" />} label="Reset" onClick={onReset} variant="ghost" />
          <div className="h-6 w-[1px] bg-[#1f1f1f] self-center mx-1 hidden sm:block" />
          <TopButton 
            icon={<span className="h-2 w-2 rounded-full" style={{ backgroundColor: adminMode ? "#00d4a4" : "rgba(255,255,255,0.3)" }} />} 
            label={adminMode ? "Admin Active" : "Admin Mode"} 
            onClick={onToggleAdmin} 
            variant={adminMode ? "primary" : "secondary"} 
          />
        </div>
      </div>
    </header>
  );
}

function TopButton({ icon, label, onClick, variant }: { icon: React.ReactNode; label: string; onClick: () => void; variant: "primary" | "secondary" | "ghost" }) {
  const styles = {
    primary: "bg-[#00d4a4] hover:bg-[#00b48a] text-[#0a0a0a] rounded-full px-4 py-2",
    secondary: "border border-[#1f1f1f] bg-[#0c0c0e] hover:bg-[#1c1c1e] text-white rounded-full px-4 py-2",
    ghost: "text-[#a8a8aa] hover:text-white px-3 py-2 rounded-md"
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`focus-ring inline-flex items-center gap-2 text-xs font-semibold transition ${styles[variant]}`}
    >
      {icon}
      {label}
    </motion.button>
  );
}
