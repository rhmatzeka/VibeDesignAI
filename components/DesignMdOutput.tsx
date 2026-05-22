"use client";

import { Copy } from "lucide-react";
import { SectionTitle } from "./WebsiteTypeSelector";

export function DesignMdOutput({
  designMd,
  onCopy
}: {
  designMd: string;
  onCopy: () => void;
}) {
  return (
    <section id="design-md" className="scroll-mt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionTitle eyebrow="DESIGN.md" title="Generated design system" subtitle="Professional English output ready for Cursor, Windsurf, Bolt, Lovable, Replit Agent, v0, Claude Code, or another AI coding agent." />
        <button onClick={onCopy} className="focus-ring mb-4 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950">
          <Copy className="h-4 w-4" />
          Copy DESIGN.md
        </button>
      </div>
      <pre className="studio-scroll max-h-[560px] overflow-auto rounded-3xl border border-white/8 bg-black/35 p-5 text-sm leading-6 text-slate-200 whitespace-pre-wrap">
        {designMd || "Your DESIGN.md will appear here."}
      </pre>
    </section>
  );
}
