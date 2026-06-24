"use client";

import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import type { ColorPalette, VibePreset } from "@/lib/types";
import { colorTokenLabels, validateHex, normalizeHex } from "@/lib/palette-utils";

const previewLayouts = [
  { id: "framer-dark", name: "Dark Builder (Framer / Cyberpunk)" },
  { id: "apple-gallery", name: "Apple Gallery (Minimal / Calm)" },
  { id: "editorial-luxury", name: "Editorial Luxury (Elegant / Serif)" },
  { id: "commerce-warm", name: "Commerce Warm (Cozy / Friendly)" },
  { id: "developer-docs", name: "Developer Docs (Monospace / Dense)" },
  { id: "gaming-neon", name: "Gaming Neon (High-Contrast / HUD)" }
];

export function AdminPanel({
  onAddVibe
}: {
  onAddVibe: (vibe: VibePreset) => void;
}) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [desc, setDesc] = useState("");
  const [moodStr, setMoodStr] = useState("custom, modern, clean");
  const [layout, setLayout] = useState("framer-dark");
  const [typo, setTypo] = useState("Clean modern sans-serif");
  const [layoutStyle, setLayoutStyle] = useState("Responsive grid layout");
  const [compStyle, setCompStyle] = useState("Rounded border cards");
  const [visuals, setVisuals] = useState("Delicate shadows");
  
  // 14 Color Tokens default state
  const [colors, setColors] = useState<ColorPalette>({
    primary: "#6366F1",
    secondary: "#06B6D4",
    accent: "#22C55E",
    background: "#0a0a0a",
    surface: "#111827",
    card: "#1c1c1c",
    textPrimary: "#ffffff",
    textSecondary: "#a8a8aa",
    border: "#1f1f1f",
    success: "#22c55e",
    warning: "#ffdb13",
    danger: "#ff2201",
    muted: "#555555",
    input: "#1c1c1c"
  });

  const handleColorChange = (token: keyof ColorPalette, value: string) => {
    setColors((prev) => ({
      ...prev,
      [token]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !id || !desc) return;
    
    // Normalize color HEX codes
    const normalizedColors = { ...colors };
    (Object.keys(colors) as Array<keyof ColorPalette>).forEach((key) => {
      const hex = colors[key];
      normalizedColors[key] = validateHex(hex) ? normalizeHex(hex) : "#000000";
    });

    const newVibe: VibePreset = {
      id: id.toLowerCase().trim().replace(/\s+/g, "-"),
      name: name.trim(),
      description: desc.trim(),
      mood: moodStr.split(",").map((m) => m.trim().toLowerCase()).filter(Boolean),
      colors: normalizedColors,
      typography: typo.trim(),
      layoutStyle: layoutStyle.trim(),
      componentStyle: compStyle.trim(),
      visualEffects: visuals.trim(),
      bestFor: ["SaaS Website", "Custom Project"],
      avoid: "Avoid styling mismatch.",
      previewThemeId: layout
    };

    onAddVibe(newVibe);

    // Reset fields
    setName("");
    setId("");
    setDesc("");
    setMoodStr("custom, modern, clean");
  };

  return (
    <section id="admin-panel" className="scroll-mt-6 rounded-lg border border-[#1f1f1f] bg-[#0c0c0e] p-5">
      <div className="mb-6 flex items-center gap-3 border-b border-[#1f1f1f] pb-4">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#00d4a4] text-[#0a0a0a]">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Create Custom Vibe Theme (Admin Mode)</h2>
          <p className="text-xs text-[#888888]">Add a new theme preset to the registry. It will be stored in your browser.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-semibold text-white mb-1.5">Theme Name</label>
            <input
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!id) setId(e.target.value.toLowerCase().replace(/\s+/g, "-"));
              }}
              placeholder="e.g. Supabase Dark"
              className="w-full rounded-md border border-[#1f1f1f] bg-[#1c1c1e] px-3 py-2 text-xs text-white focus:border-[#00d4a4] focus:ring-1 focus:ring-[#00d4a4] outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-white mb-1.5">Theme ID</label>
            <input
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="e.g. supabase-dark"
              className="w-full rounded-md border border-[#1f1f1f] bg-[#1c1c1e] px-3 py-2 text-xs text-white focus:border-[#00d4a4] focus:ring-1 focus:ring-[#00d4a4] outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-semibold text-white mb-1.5">Description</label>
            <input
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="A brief overview of the theme's aesthetic"
              className="w-full rounded-md border border-[#1f1f1f] bg-[#1c1c1e] px-3 py-2 text-xs text-white focus:border-[#00d4a4] focus:ring-1 focus:ring-[#00d4a4] outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-white mb-1.5">Mood Tags (comma separated)</label>
            <input
              value={moodStr}
              onChange={(e) => setMoodStr(e.target.value)}
              placeholder="e.g. dark, emerald, postgres"
              className="w-full rounded-md border border-[#1f1f1f] bg-[#1c1c1e] px-3 py-2 text-xs text-white focus:border-[#00d4a4] focus:ring-1 focus:ring-[#00d4a4] outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-[11px] font-semibold text-white mb-1.5">Preview Layout Family</label>
            <select
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              className="w-full rounded-md border border-[#1f1f1f] bg-[#1c1c1e] px-3 py-2 text-xs text-white focus:border-[#00d4a4] focus:ring-1 focus:ring-[#00d4a4] outline-none"
            >
              {previewLayouts.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-white mb-1.5">Typography Style</label>
            <input
              value={typo}
              onChange={(e) => setTypo(e.target.value)}
              placeholder="e.g. Bold sans display, mono labels"
              className="w-full rounded-md border border-[#1f1f1f] bg-[#1c1c1e] px-3 py-2 text-xs text-white focus:border-[#00d4a4] focus:ring-1 focus:ring-[#00d4a4] outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-[11px] font-semibold text-white mb-1.5">Layout Spacing Principle</label>
            <input
              value={layoutStyle}
              onChange={(e) => setLayoutStyle(e.target.value)}
              placeholder="e.g. Wide margins, edge-to-edge product cards"
              className="w-full rounded-md border border-[#1f1f1f] bg-[#1c1c1e] px-3 py-2 text-xs text-white focus:border-[#00d4a4] focus:ring-1 focus:ring-[#00d4a4] outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-white mb-1.5">Component Shapes Principle</label>
            <input
              value={compStyle}
              onChange={(e) => setCompStyle(e.target.value)}
              placeholder="e.g. Soft cards, minimal outlines, quiet CTAs"
              className="w-full rounded-md border border-[#1f1f1f] bg-[#1c1c1e] px-3 py-2 text-xs text-white focus:border-[#00d4a4] focus:ring-1 focus:ring-[#00d4a4] outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-white mb-1.5">Visual Effects Principle</label>
            <input
              value={visuals}
              onChange={(e) => setVisuals(e.target.value)}
              placeholder="e.g. Soft vignette shadows, subtle blur filters"
              className="w-full rounded-md border border-[#1f1f1f] bg-[#1c1c1e] px-3 py-2 text-xs text-white focus:border-[#00d4a4] focus:ring-1 focus:ring-[#00d4a4] outline-none"
            />
          </div>
        </div>

        <div className="border-t border-[#1f1f1f] pt-4">
          <label className="block text-xs font-semibold text-white mb-3">Custom Palette Colors</label>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-7">
            {(Object.keys(colors) as Array<keyof ColorPalette>).map((token) => (
              <div key={token} className="rounded-md border border-[#1f1f1f] bg-[#111115] p-2 flex flex-col items-center">
                <span className="text-[10px] font-bold text-[#888888] mb-1.5 truncate w-full text-center">{colorTokenLabels[token]}</span>
                <label className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-[#1f1f1f] cursor-pointer" style={{ backgroundColor: colors[token] }}>
                  <input
                    aria-label={`Pick ${colorTokenLabels[token]}`}
                    type="color"
                    value={colors[token]}
                    onChange={(e) => handleColorChange(token, e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </label>
                <input
                  value={colors[token]}
                  onChange={(e) => handleColorChange(token, e.target.value)}
                  className="mt-1.5 w-full bg-transparent border-0 text-[10px] text-center font-mono text-white outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end border-t border-[#1f1f1f] pt-4">
          <button
            type="submit"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#00d4a4] hover:bg-[#00b48a] px-6 py-2.5 text-xs font-semibold text-[#0a0a0a] transition"
          >
            <Plus className="h-4 w-4" />
            Create Vibe Preset
          </button>
        </div>
      </form>
    </section>
  );
}
