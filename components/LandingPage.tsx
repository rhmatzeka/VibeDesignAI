import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Code2,
  Download,
  FileText,
  Image,
  Layers3,
  Palette,
  Sparkles,
  Wand2
} from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Palette generator",
    copy: "Create full color systems from a vibe, base color, or brand image."
  },
  {
    icon: Layers3,
    title: "Live UI preview",
    copy: "Preview landing, dashboard, login, pricing, product, and mobile layouts."
  },
  {
    icon: FileText,
    title: "DESIGN.md output",
    copy: "Generate structured design direction that AI coding agents can follow."
  },
  {
    icon: Code2,
    title: "CSS and Tailwind export",
    copy: "Copy CSS variables, Tailwind tokens, JSON, and reusable agent prompts."
  },
  {
    icon: Image,
    title: "Image color extraction",
    copy: "Upload a logo, screenshot, product photo, or moodboard and extract colors."
  },
  {
    icon: ClipboardCheck,
    title: "Contrast checker",
    copy: "Check readable color pairs and auto-fix text contrast for safer UI."
  }
];

const workflow = [
  "Choose website type",
  "Select a design vibe",
  "Edit or extract colors",
  "Preview real UI",
  "Export to your AI agent"
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-[#0a0a0a]">
      <div className="bg-[#0a0a0a] px-4 py-2 text-center text-sm font-medium text-white">
        Vibe coding starter kit: palette, preview, DESIGN.md, CSS variables, Tailwind config, and agent prompt.
      </div>

      <header className="sticky top-0 z-40 border-b border-[#ededed] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0a0a0a] text-white">
              <Wand2 className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold">VibeDesign AI</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-[#5a5a5c] lg:flex">
            <a href="#features" className="hover:text-[#0a0a0a]">Features</a>
            <a href="#workflow" className="hover:text-[#0a0a0a]">Workflow</a>
            <a href="#exports" className="hover:text-[#0a0a0a]">Exports</a>
            <a href="#preview" className="hover:text-[#0a0a0a]">Preview</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/studio" className="hidden rounded-full border border-[#e5e5e5] px-4 py-2 text-sm font-medium text-[#0a0a0a] transition hover:border-[#0a0a0a] sm:inline-flex">
              Open Studio
            </Link>
            <Link href="/studio" className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1c1c1e]">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#87a8c8_0%,#f5e9d8_100%)]">
        <div className="landing-cloud landing-cloud-one" />
        <div className="landing-cloud landing-cloud-two" />
        <div className="landing-cloud landing-cloud-three" />

        <div className="relative mx-auto flex min-h-[820px] max-w-7xl flex-col items-center px-4 pb-14 pt-24 text-center sm:px-6 lg:px-8 lg:pt-28">
          <div className="rounded-full border border-white/45 bg-white/35 px-4 py-2 text-sm font-medium text-[#1c1c1e] shadow-sm backdrop-blur-md">
            AI Design System Generator for Vibe Coding
          </div>
          <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[1.04] tracking-[-0.03em] text-[#0a0a0a] sm:text-7xl lg:text-[88px]">
            VibeDesign AI
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#3a3a3c] sm:text-xl">
            Turn any vibe into a beautiful website design system. Generate palettes, previews, DESIGN.md, CSS variables, Tailwind config, and prompts for your AI coding agent.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link href="/studio" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#00d4a4] px-6 py-3 text-sm font-semibold text-[#0a0a0a] shadow-[0_12px_30px_rgba(0,212,164,0.24)] transition hover:bg-[#00b48a]">
              Generate Design System
              <Sparkles className="h-4 w-4" />
            </Link>
            <a href="#preview" className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#d8d0c7] bg-white/45 px-6 py-3 text-sm font-semibold text-[#0a0a0a] backdrop-blur-md transition hover:bg-white/70">
              View preview
            </a>
          </div>

          <div id="preview" className="mt-16 w-full max-w-6xl scroll-mt-24 rounded-xl border border-white/70 bg-white shadow-[0_24px_48px_-8px_rgba(0,0,0,0.18)]">
            <ProductMockup />
          </div>
        </div>
      </section>

      <section className="border-y border-[#ededed] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-[#ededed] px-0 text-center text-sm font-semibold text-[#5a5a5c] sm:grid-cols-3 lg:grid-cols-6">
          {["Cursor", "Windsurf", "Bolt", "Lovable", "Replit", "Claude Code"].map((name) => (
            <div key={name} className="bg-white px-6 py-6">{name}</div>
          ))}
        </div>
      </section>

      <section id="features" className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#00b48a]">Everything your AI agent needs</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl">
              Stop shipping generic AI websites.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5a5a5c]">
              VibeDesign AI gives your project a real visual direction before coding starts, so components, colors, spacing, and states stay consistent.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-xl border border-[#e5e5e5] bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#f7f7f7] text-[#00b48a]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[#0a0a0a]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5a5a5c]">{feature.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="workflow" className="overflow-hidden bg-[linear-gradient(135deg,#1a3d4a_0%,#2d5a4f_100%)] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-[#7cebcb]">Built for real workflows</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl">
              From loose idea to production-ready design direction.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/72">
              Pick the website type, mix the vibe, tune the palette, inspect previews, then export clear instructions for the coding agent you already use.
            </p>
            <Link href="/studio" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:bg-[#f7f7f7]">
              Open Studio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
            <div className="rounded-lg bg-[#0a0a0a] p-4">
              {workflow.map((item, index) => (
                <div key={item} className="flex items-center gap-4 border-b border-white/10 py-4 last:border-b-0">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-[#00d4a4] text-sm font-bold text-[#0a0a0a]">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item}</p>
                    <p className="mt-1 text-sm text-white/55">A focused step that keeps the design system usable.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="exports" className="bg-[#fafafa] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-[#00b48a]">Export center</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl">
              Copy once. Build consistently.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#5a5a5c]">
              Every export updates automatically as the user changes website type, vibe, colors, or prompt mode.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["DESIGN.md", "CSS variables", "Tailwind config", "Agent prompt", "JSON tokens", "Contrast report"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-sm font-medium text-[#1c1c1e]">
                  <Check className="h-4 w-4 text-[#00b48a]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-[#e5e5e5] bg-[#1c1c1e] text-white shadow-[0_20px_50px_rgba(0,0,0,0.16)]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm text-white/60">
              <span>DESIGN.md</span>
              <Download className="h-4 w-4" />
            </div>
            <pre className="p-5 text-sm leading-6 text-white/80">
{`# DESIGN.md

## Brand Vibe
Modern, premium, clear, and usable.

## Color System
- Primary: #00D4A4
- Background: #080A12
- Surface: #111827
- Text Primary: #FFFFFF

## Agent Instruction
Follow this design system exactly.
Do not introduce random colors.`}
            </pre>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.02em] text-[#0a0a0a] sm:text-5xl">
            Ready to make your next website look intentional?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#5a5a5c]">
            Open the studio, generate a design system, and paste the result into your vibe coding workflow.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/studio" className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1c1c1e]">
              Start building with VibeDesign AI
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e5e5e5] bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-[#5a5a5c] md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-[#0a0a0a]">VibeDesign AI</p>
            <p className="mt-1">Turn any vibe into a beautiful website design system.</p>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/studio" className="hover:text-[#0a0a0a]">Studio</Link>
            <a href="#features" className="hover:text-[#0a0a0a]">Features</a>
            <a href="#exports" className="hover:text-[#0a0a0a]">Exports</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ProductMockup() {
  const palette = ["#00d4a4", "#7C3AED", "#06B6D4", "#080A12", "#FFFFFF", "#F59E0B"];

  return (
    <div className="grid min-h-[410px] overflow-hidden rounded-xl bg-white text-left lg:grid-cols-[230px_1fr_220px]">
      <aside className="hidden border-r border-[#ededed] bg-[#fafafa] p-5 lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#888888]">Studio</p>
        {["Generate", "Palette", "Image Extract", "Preview", "Export"].map((item, index) => (
          <div key={item} className={`mt-3 rounded-md px-3 py-2 text-sm ${index === 1 ? "bg-white font-medium text-[#0a0a0a] shadow-sm" : "text-[#5a5a5c]"}`}>
            {item}
          </div>
        ))}
      </aside>
      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00b48a]">Vibe selected</p>
            <h3 className="mt-2 text-2xl font-semibold text-[#0a0a0a]">Dark Premium SaaS</h3>
          </div>
          <button className="rounded-full bg-[#0a0a0a] px-4 py-2 text-sm font-medium text-white">Export</button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {palette.map((color) => (
            <div key={color} className="rounded-lg border border-[#e5e5e5] bg-white p-3">
              <div className="h-16 rounded-md" style={{ backgroundColor: color }} />
              <p className="mt-3 text-xs font-medium text-[#5a5a5c]">{color}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-[#e5e5e5] bg-[#f7f7f7] p-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-[#0a0a0a]">Live landing preview</p>
            <span className="rounded-full bg-[#00d4a4] px-3 py-1 text-xs font-bold text-[#0a0a0a]">Good contrast</span>
          </div>
          <div className="mt-4 rounded-lg bg-[#080A12] p-5 text-white">
            <p className="text-xs text-white/55">Generated hero</p>
            <p className="mt-2 max-w-md text-2xl font-semibold leading-tight">Build better websites with a clear visual system.</p>
            <div className="mt-5 flex gap-2">
              <span className="rounded-full bg-[#7C3AED] px-4 py-2 text-xs font-semibold">Start Building</span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold">View Preview</span>
            </div>
          </div>
        </div>
      </div>
      <aside className="hidden border-l border-[#ededed] p-5 lg:block">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#888888]">Output</p>
        <div className="mt-4 rounded-lg bg-[#1c1c1e] p-4 font-mono text-xs leading-5 text-white/72">
          <p className="text-[#7cebcb]"># DESIGN.md</p>
          <p>## Color System</p>
          <p>primary: #00d4a4</p>
          <p>surface: #111827</p>
          <p>card: #161B22</p>
        </div>
        <div className="mt-4 rounded-lg border border-[#e5e5e5] p-4">
          <p className="text-sm font-semibold">Agent prompt</p>
          <p className="mt-2 text-sm leading-6 text-[#5a5a5c]">Build responsive UI. Follow DESIGN.md. Do not invent colors.</p>
        </div>
      </aside>
    </div>
  );
}
