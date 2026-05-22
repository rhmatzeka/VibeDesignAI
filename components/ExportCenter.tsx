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
        <div className="rounded-3xl border border-white/8 bg-white/[0.055] p-4">
          <label className="text-sm font-semibold text-white">Agent prompt mode</label>
          <select value={promptMode} onChange={(event) => onPromptModeChange(event.target.value as PromptMode)} className="focus-ring mt-3 w-full rounded-2xl border border-white/10 bg-[#0b1020] px-3 py-3 text-sm text-white">
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
    <button onClick={onClick} className={`focus-ring flex items-center justify-between rounded-2xl border px-3 py-2.5 text-sm transition ${danger ? "border-red-400/25 bg-red-400/10 text-red-100 hover:bg-red-400/15" : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"}`}>
      <span>{label}</span>
      {icon}
    </button>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/8 bg-black/35">
      <div className="border-b border-white/8 px-4 py-3 text-sm font-semibold text-white">{title}</div>
      <pre className="studio-scroll max-h-56 overflow-auto p-4 text-xs leading-5 text-slate-300 whitespace-pre-wrap">{code}</pre>
    </div>
  );
}
