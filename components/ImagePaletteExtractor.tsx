"use client";

import { ImageUp, Wand2 } from "lucide-react";
import { SectionTitle } from "./WebsiteTypeSelector";

export function ImagePaletteExtractor({
  previewUrl,
  extractedColors,
  onUpload,
  onApplyColor
}: {
  previewUrl: string | null;
  extractedColors: string[];
  onUpload: (file: File) => void;
  onApplyColor: (color: string) => void;
}) {
  return (
    <section id="image-extract" className="scroll-mt-6">
      <SectionTitle eyebrow="Image Extract" title="Upload image to palette" subtitle="Upload a logo, screenshot, product photo, or moodboard to extract brand colors." />
      <div className="grid gap-4 xl:grid-cols-[1fr_1.15fr]">
        <label className="focus-within:ring-2 focus-within:ring-cyan-300/60 flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.045] p-6 text-center transition hover:bg-white/[0.07]">
          <ImageUp className="h-10 w-10 text-cyan-300" />
          <p className="mt-4 font-semibold text-white">Upload a brand image</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">Drop in a logo, screenshot, product photo, poster, or moodboard. Colors are extracted locally in your browser.</p>
          <input type="file" accept="image/*" className="sr-only" onChange={(event) => event.target.files?.[0] && onUpload(event.target.files[0])} />
        </label>
        <div className="rounded-3xl border border-white/8 bg-white/[0.055] p-4">
          {previewUrl ? (
            <img src={previewUrl} alt="Uploaded inspiration" className="h-56 w-full rounded-2xl object-cover" />
          ) : (
            <div className="grid h-56 place-items-center rounded-2xl border border-white/8 bg-black/20 text-sm text-slate-400">Upload state preview will appear here.</div>
          )}
          <div className="mt-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <Wand2 className="h-4 w-4 text-cyan-300" />
              Dominant colors
            </div>
            {extractedColors.length ? (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {extractedColors.map((color) => (
                  <button key={color} onClick={() => onApplyColor(color)} className="focus-ring group overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left">
                    <span className="block h-14" style={{ backgroundColor: color }} />
                    <span className="block truncate px-2 py-2 text-[11px] text-slate-300 group-hover:text-white">{color}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm text-slate-400">Choose your website type and vibe to generate your design system, or upload an image to extract colors from your brand.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
