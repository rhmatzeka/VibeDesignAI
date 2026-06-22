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
        <button onClick={onCopy} className="focus-ring mb-4 inline-flex items-center gap-2 rounded-full bg-[#00d4a4] hover:bg-[#00b48a] px-5 py-2.5 text-xs font-semibold text-[#0a0a0a] transition">
          <Copy className="h-4 w-4" />
          Copy DESIGN.md
        </button>
      </div>
      <pre className="studio-scroll max-h-[560px] overflow-auto rounded-lg border border-[#1f1f1f] bg-[#0c0c0e] p-5 font-mono text-[13px] leading-relaxed text-[#b3b3b3] whitespace-pre-wrap">
        {designMd || "Your DESIGN.md will appear here."}
      </pre>
    </section>
  );
}
