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
      <div className="rounded-3xl border border-white/8 bg-white/[0.055] p-5">
        <div className="grid gap-4 lg:grid-cols-3">
          <MixerSlot label="Vibe utama" value={mixer.primaryVibeId} weight={mixer.primaryWeight} onVibe={(value) => set({ primaryVibeId: value })} onWeight={(value) => set({ primaryWeight: value })} vibes={vibes} />
          <MixerSlot label="Vibe kedua" value={mixer.secondaryVibeId} weight={mixer.secondaryWeight} onVibe={(value) => set({ secondaryVibeId: value })} onWeight={(value) => set({ secondaryWeight: value })} vibes={vibes} />
          <MixerSlot label="Vibe ketiga" value={mixer.tertiaryVibeId} weight={mixer.tertiaryWeight} onVibe={(value) => set({ tertiaryVibeId: value })} onWeight={(value) => set({ tertiaryWeight: value })} vibes={vibes} />
        </div>
        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/8 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Mixed design direction</p>
            <p className="mt-1 text-sm leading-6 text-slate-300">{mixedDescription}</p>
          </div>
          <button onClick={onApply} className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-400 px-4 py-2.5 text-sm font-semibold text-white shadow-glow">
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
    <div className="rounded-2xl border border-white/8 bg-black/18 p-4">
      <label className="text-sm font-semibold text-white">{label}</label>
      <select value={value} onChange={(event) => onVibe(event.target.value)} className="focus-ring mt-3 w-full rounded-xl border border-white/10 bg-[#0b1020] px-3 py-2 text-sm text-white">
        {vibes.map((vibe) => <option key={vibe.id} value={vibe.id}>{vibe.name}</option>)}
      </select>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>Weight</span>
        <span>{weight}%</span>
      </div>
      <input type="range" min={0} max={100} value={weight} onChange={(event) => onWeight(Number(event.target.value))} className="mt-3 w-full accent-cyan-300" />
    </div>
  );
}
