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
        <label className="focus-within:ring-1 focus-within:ring-[#00d4a4] flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#1f1f1f] bg-[#0c0c0e] p-6 text-center transition hover:bg-[#111115]">
          <ImageUp className="h-10 w-10 text-[#00d4a4]" />
          <p className="mt-4 font-semibold text-white">Upload a brand image</p>
          <p className="mt-2 max-w-sm text-xs leading-5 text-[#888888]">Drop in a logo, screenshot, product photo, poster, or moodboard. Colors are extracted locally in your browser.</p>
          <input type="file" accept="image/*" className="sr-only" onChange={(event) => event.target.files?.[0] && onUpload(event.target.files[0])} />
        </label>
        <div className="rounded-lg border border-[#1f1f1f] bg-[#0c0c0e] p-4">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- Object URLs from local uploads are not supported by next/image optimization.
            <img src={previewUrl} alt="Uploaded inspiration" className="h-56 w-full rounded-md object-cover" />
          ) : (
            <div className="grid h-56 place-items-center rounded-md border border-[#1f1f1f] bg-[#111115] text-xs text-[#888888]">Upload state preview will appear here.</div>
          )}
          <div className="mt-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
              <Wand2 className="h-4 w-4 text-[#00d4a4]" />
              Dominant colors
            </div>
            {extractedColors.length ? (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {extractedColors.map((color) => (
                  <button key={color} onClick={() => onApplyColor(color)} className="focus-ring group overflow-hidden rounded-md border border-[#1f1f1f] bg-[#0c0c0e] hover:bg-[#1c1c1e] text-left">
                    <span className="block h-14" style={{ backgroundColor: color }} />
                    <span className="block truncate px-2 py-2 font-mono text-[10px] text-[#a8a8aa] group-hover:text-white">{color}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-md border border-[#1f1f1f] bg-[#111115] p-4 text-xs text-[#888888]">Choose your website type and vibe to generate your design system, or upload an image to extract colors from your brand.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
