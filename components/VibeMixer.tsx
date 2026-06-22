"use client";

import { SlidersHorizontal } from "lucide-react";
import type { MixerState, VibePreset } from "@/lib/types";
import { SectionTitle } from "./WebsiteTypeSelector";

export function VibeMixer({
  vibes,
  mixer,
  mixedDescription,
  onChange,
  onApply
}: {
  vibes: VibePreset[];
  mixer: MixerState;
  mixedDescription: string;
  onChange: (mixer: MixerState) => void;
  onApply: () => void;
}) {
  const set = (patch: Partial<MixerState>) => onChange({ ...mixer, ...patch });

  return (
    <section id="vibe-mixer" className="scroll-mt-6">
      <SectionTitle eyebrow="Vibe Mixer" title="Blend up to 3 vibes" subtitle="Combine direction, mood, and core colors. MVP mixing keeps readability stable while borrowing accents." />
      <div className="rounded-lg border border-[#1f1f1f] bg-[#0c0c0e] p-5">
        <div className="grid gap-4 lg:grid-cols-3">
          <MixerSlot label="Vibe utama" value={mixer.primaryVibeId} weight={mixer.primaryWeight} onVibe={(value) => set({ primaryVibeId: value })} onWeight={(value) => set({ primaryWeight: value })} vibes={vibes} />
          <MixerSlot label="Vibe kedua" value={mixer.secondaryVibeId} weight={mixer.secondaryWeight} onVibe={(value) => set({ secondaryVibeId: value })} onWeight={(value) => set({ secondaryWeight: value })} vibes={vibes} />
          <MixerSlot label="Vibe ketiga" value={mixer.tertiaryVibeId} weight={mixer.tertiaryWeight} onVibe={(value) => set({ tertiaryVibeId: value })} onWeight={(value) => set({ tertiaryWeight: value })} vibes={vibes} />
        </div>
        <div className="mt-5 flex flex-col gap-4 rounded-md border border-[#00d4a4]/20 bg-[#00d4a4]/8 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Mixed design direction</p>
            <p className="mt-1 text-xs leading-5 text-[#7cebcb]/90">{mixedDescription}</p>
          </div>
          <button onClick={onApply} className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[#00d4a4] hover:bg-[#00b48a] px-5 py-2.5 text-xs font-semibold text-[#0a0a0a] transition">
            <SlidersHorizontal className="h-4 w-4" />
            Apply Mixed Palette
          </button>
        </div>
      </div>
    </section>
  );
}

function MixerSlot({
  label,
  value,
  weight,
  vibes,
  onVibe,
  onWeight
}: {
  label: string;
  value: string;
  weight: number;
  vibes: VibePreset[];
  onVibe: (id: string) => void;
  onWeight: (weight: number) => void;
}) {
  return (
    <div className="rounded-md border border-[#1f1f1f] bg-[#111115] p-4">
      <label className="text-sm font-semibold text-white">{label}</label>
      <select value={value} onChange={(event) => onVibe(event.target.value)} className="focus-ring mt-3 w-full rounded-md border border-[#1f1f1f] bg-[#0c0c0e] px-3 py-2 text-xs text-white focus:border-[#00d4a4] focus:ring-1 focus:ring-[#00d4a4]">
        {vibes.map((vibe) => <option key={vibe.id} value={vibe.id}>{vibe.name}</option>)}
      </select>
      <div className="mt-4 flex items-center justify-between text-xs text-[#888888]">
        <span>Weight</span>
        <span>{weight}%</span>
      </div>
      <input type="range" min={0} max={100} value={weight} onChange={(event) => onWeight(Number(event.target.value))} className="mt-3 w-full accent-[#00d4a4]" />
    </div>
  );
}
