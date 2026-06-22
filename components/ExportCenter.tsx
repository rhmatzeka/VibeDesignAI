"use client";

import { Copy, Download, FileJson, Save, Trash2 } from "lucide-react";
import type { PromptMode } from "@/lib/types";
import { SectionTitle } from "./WebsiteTypeSelector";

const promptModes: PromptMode[] = ["Build Landing Page", "Build Dashboard", "Redesign Existing Website", "Build SaaS App", "Build Portfolio", "Build Online Store"];

export function ExportCenter({
  cssVariables,
  tailwindConfig,
  jsonTokens,
  agentPrompt,
  promptMode,
  onPromptModeChange,
  onCopyDesign,
  onDownloadDesign,
  onCopyCss,
  onCopyTailwind,
  onCopyPrompt,
  onCopyJson,
  onSave,
  onReset
}: {
  cssVariables: string;
  tailwindConfig: string;
  jsonTokens: string;
  agentPrompt: string;
  promptMode: PromptMode;
  onPromptModeChange: (mode: PromptMode) => void;
  onCopyDesign: () => void;
  onDownloadDesign: () => void;
  onCopyCss: () => void;
  onCopyTailwind: () => void;
  onCopyPrompt: () => void;
  onCopyJson: () => void;
  onSave: () => void;
  onReset: () => void;
}) {
  return (
    <section id="export" className="scroll-mt-6">
      <SectionTitle eyebrow="Export" title="Export your design system" subtitle="Copy your DESIGN.md, CSS variables, Tailwind config, or agent prompt and paste it into your vibe coding workflow." />
      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg border border-[#1f1f1f] bg-[#0c0c0e] p-4">
          <label className="text-sm font-semibold text-white">Agent prompt mode</label>
          <select value={promptMode} onChange={(event) => onPromptModeChange(event.target.value as PromptMode)} className="focus-ring mt-3 w-full rounded-md border border-[#1f1f1f] bg-[#0c0c0e] px-3 py-2.5 text-xs text-white focus:border-[#00d4a4] focus:ring-1 focus:ring-[#00d4a4]">
            {promptModes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
          </select>
          <div className="mt-4 grid gap-2">
            <ExportButton label="Copy DESIGN.md" icon={<Copy className="h-4 w-4" />} onClick={onCopyDesign} />
            <ExportButton label="Download DESIGN.md" icon={<Download className="h-4 w-4" />} onClick={onDownloadDesign} />
            <ExportButton label="Copy CSS Variables" icon={<Copy className="h-4 w-4" />} onClick={onCopyCss} />
            <ExportButton label="Copy Tailwind Config" icon={<Copy className="h-4 w-4" />} onClick={onCopyTailwind} />
            <ExportButton label="Copy Agent Prompt" icon={<Copy className="h-4 w-4" />} onClick={onCopyPrompt} />
            <ExportButton label="Copy JSON Tokens" icon={<FileJson className="h-4 w-4" />} onClick={onCopyJson} />
            <ExportButton label="Save to Browser" icon={<Save className="h-4 w-4" />} onClick={onSave} />
            <ExportButton label="Reset All" icon={<Trash2 className="h-4 w-4" />} onClick={onReset} danger />
          </div>
        </div>
        <div className="grid gap-4">
          <CodeBlock title="CSS Variables" code={cssVariables} />
          <CodeBlock title="Tailwind Config" code={tailwindConfig} />
          <CodeBlock title="Agent Prompt" code={agentPrompt} />
          <CodeBlock title="JSON Tokens" code={jsonTokens} />
        </div>
      </div>
    </section>
  );
}

function ExportButton({ label, icon, onClick, danger }: { label: string; icon: React.ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button onClick={onClick} className={`focus-ring flex items-center justify-between rounded-md border px-3 py-2 text-xs font-semibold transition ${danger ? "border-[#d45656]/20 bg-[#d45656]/10 text-red-200 hover:bg-[#d45656]/15" : "border-[#1f1f1f] bg-[#0c0c0e] text-slate-200 hover:bg-[#1c1c1e]"}`}>
      <span>{label}</span>
      {icon}
    </button>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#1f1f1f] bg-[#0c0c0e]">
      <div className="border-b border-[#1f1f1f] bg-[#0c0c0e] px-4 py-2.5 text-xs font-semibold text-white">{title}</div>
      <pre className="studio-scroll max-h-56 overflow-auto p-4 font-mono text-[13px] leading-relaxed text-[#b3b3b3] whitespace-pre-wrap">{code}</pre>
    </div>
  );
}
