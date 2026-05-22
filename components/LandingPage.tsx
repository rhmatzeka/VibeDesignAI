import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Braces,
  Check,
  Code2,
  Gauge,
  Image,
  Monitor,
  Palette,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  Wand2,
  Workflow,
  Zap
} from "lucide-react";
import PixelBlast from "./PixelBlast";

const quickLinks = ["Resources", "Documentation", "Customers", "Blog", "Pricing"];

const featureCards = [
  {
    icon: Bot,
    label: "LLMS.TXT & MCP",
    title: "Built for people and AI",
    copy: "Generate design instructions that humans can read and AI coding agents can follow without guessing."
  },
  {
    icon: Workflow,
    label: "AGENT",
    title: "Self-updating design context",
    copy: "Changing the vibe, palette, website type, or prompt mode updates the generated system instantly."
  },
  {
    icon: Monitor,
    label: "PREVIEW",
    title: "Interface previews that feel real",
    copy: "Inspect landing, dashboard, login, pricing, product, and mobile app surfaces before exporting."
  }
];

const capabilities = [
  { icon: Palette, title: "Color system", copy: "Primary, secondary, accent, background, surface, card, text, state, border, and input tokens." },
  { icon: Image, title: "Image extraction", copy: "Upload a logo, product photo, screenshot, or moodboard and extract dominant colors locally." },
  { icon: SlidersHorizontal, title: "Vibe mixer", copy: "Blend up to three visual directions into one usable palette and mood description." },
  { icon: Gauge, title: "Contrast check", copy: "Check important color pairs and auto-fix text contrast for safer production UI." }
];

const exports = ["DESIGN.md", "CSS variables", "Tailwind config", "Agent prompt", "JSON tokens", "Contrast report"];

const storyCards = [
  {
    title: "How teams avoid generic AI output",
    copy: "A clear design system gives the coding agent constraints before it starts building."
  },
  {
    title: "How founders move faster",
    copy: "Pick a vibe, generate a system, preview UI, then paste one prompt into your builder."
  },
  {
    title: "How students polish projects",
    copy: "Turn rough ideas into a consistent website direction without learning advanced UI theory first."
  }
];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-[#050806] text-white">
      <section className="relative overflow-hidden border-b border-white/8 bg-[#050806]">
        <div className="hero-starfield opacity-35" />
        <div className="absolute inset-0 z-0 opacity-100">
          <PixelBlast
            variant="circle"
            pixelSize={7}
            color="#00d4a4"
            patternScale={2.4}
            patternDensity={1.55}
            pixelSizeJitter={0.7}
            enableRipples
            rippleSpeed={0.42}
            rippleThickness={0.16}
            rippleIntensityScale={2.1}
            liquid
            liquidStrength={0.11}
            liquidRadius={1.25}
            liquidWobbleSpeed={5.2}
            speed={0.62}
            edgeFade={0.18}
            noiseAmount={0.025}
            transparent
          />
        </div>
        <div className="aurora-ribbon aurora-ribbon-one" />
        <div className="aurora-ribbon aurora-ribbon-two" />

        <header className="relative z-20 mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#00d4a4] text-[#06100d] shadow-[0_0_28px_rgba(0,212,164,0.36)]">
              <Wand2 className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold text-white">VibeDesign AI</span>
          </Link>

          <nav className="hidden items-center gap-7 text-xs font-medium text-white/62 lg:flex">
            {quickLinks.map((item) => (
              <a key={item} href={item === "Documentation" ? "#exports" : "#features"} className="transition hover:text-white">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/studio" className="hidden rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/35 sm:inline-flex">
              Contact sales
            </Link>
            <Link href="/studio" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#050806] transition hover:bg-[#e9fff8]">
              Start for free
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[1040px] max-w-7xl flex-col items-center px-4 pb-24 pt-16 text-center sm:px-6 lg:px-8 lg:pt-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00d4a4]/25 bg-[#00d4a4]/10 px-3 py-1.5 text-xs font-semibold text-[#7cebcb]">
            <span className="rounded-full bg-[#00d4a4] px-1.5 py-0.5 text-[10px] font-bold text-[#06100d]">NEW</span>
            Workflow for vibe coding design systems
            <Sparkles className="h-3.5 w-3.5" />
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.04] text-white sm:text-6xl lg:text-[76px]">
            The intelligent design system platform
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
            Helping builders create modern, consistent website direction for AI coding agents. Generate palettes, previews, DESIGN.md, Tailwind config, and production-ready prompts.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/studio" className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#050806] transition hover:bg-[#e8fff7]">
              Start now
            </Link>
            <a href="#preview" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/7 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#00d4a4]/45 hover:bg-[#00d4a4]/10">
              Email preview
            </a>
          </div>

          <div id="preview" className="mt-16 w-full max-w-6xl scroll-mt-24">
            <ProductMockup />
          </div>

          <LogoWall />
        </div>
      </section>

      <section id="features" className="border-b border-white/8 bg-[#070908] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">Built for the intelligence age</h2>
            <p className="mt-4 text-sm leading-6 text-white/55">
              Integrate a living visual system into your workflow so websites feel intentional before code generation begins.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {featureCards.slice(0, 2).map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-xl border border-white/8 bg-[#0b0f0d] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.28)]">
                  <p className="text-xs font-semibold text-[#00d4a4]">{feature.label}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/55">{feature.copy}</p>
                  <div className="mt-8 rounded-lg border border-white/8 bg-[#050806] p-5">
                    <div className="flex h-28 items-end gap-2">
                      {[34, 62, 48, 82, 58, 92, 74].map((height, index) => (
                        <span
                          key={height + index}
                          className="flex-1 rounded-t-md"
                          style={{ height: `${height}%`, backgroundColor: index === 5 ? "#00d4a4" : "rgba(0, 212, 164, 0.18)" }}
                        />
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-[#00d4a4] text-[#06100d]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="h-2 flex-1 rounded-full bg-white/8">
                        <div className="h-2 w-2/3 rounded-full bg-[#00d4a4]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 rounded-xl border border-white/8 bg-[#0b0f0d] p-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold text-[#00d4a4]">ASSISTANT</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Intelligent assistance for your users</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">
                Turn a simple visual direction into full implementation guidance across components, pages, states, and exports.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-lg border border-white/8 bg-[#050806] p-5">
                    <Icon className="h-5 w-5 text-[#00d4a4]" />
                    <h4 className="mt-4 font-semibold text-white">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-white/52">{item.copy}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#151817] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold text-[#00d4a4]">ENTERPRISE-READY DESIGN CONTEXT</p>
              <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-white">
                Bring intelligence to every website project
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-white/58">
                Give AI agents the context they need: visual direction, token usage, component rules, accessibility notes, and export-ready code snippets.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link href="/studio" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#050806] transition hover:bg-[#e8fff7]">
                Explore studio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <InfoBlock icon={ShieldCheck} title="Build with trust" copy="Readable contrast, focus rings, token rules, and mobile-friendly structure are generated into the instructions." />
            <InfoBlock icon={Zap} title="Move faster" copy="Generate a polished direction first, then let Cursor, Windsurf, Bolt, Lovable, or Claude Code build with constraints." />
          </div>

          <div className="mt-12 overflow-hidden rounded-xl border border-white/10 bg-[#080d0d] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="grid lg:grid-cols-[1fr_0.9fr]">
              <div className="p-8 sm:p-10">
                <p className="text-xs font-semibold text-[#7cebcb]">CUSTOMER STORY</p>
                <h3 className="mt-3 max-w-xl text-3xl font-semibold leading-tight text-white">
                  See how builders accelerate AI development with VibeDesign AI
                </h3>
                <Link href="/studio" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#7cebcb]">
                  Read story
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-4xl font-semibold text-white">20+</p>
                    <p className="mt-2 text-sm text-white/54">website types</p>
                  </div>
                  <div>
                    <p className="text-4xl font-semibold text-white">25</p>
                    <p className="mt-2 text-sm text-white/54">vibe presets with exports</p>
                  </div>
                </div>
              </div>
              <div className="min-h-80 bg-[linear-gradient(135deg,#0f172a_0%,#0f766e_45%,#f59e0b_100%)] p-8">
                <div className="grid h-full place-items-center rounded-xl border border-white/20 bg-black/24 p-8 backdrop-blur-sm">
                  <div className="relative h-48 w-32 rounded-t-full border-[18px] border-[#f59e0b] border-b-0 shadow-[0_0_70px_rgba(245,158,11,0.42)]">
                    <div className="absolute inset-x-5 top-8 h-28 rounded-t-full bg-[#0f172a]/65" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 bg-[#070908] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">Loved by builders who ship with AI</h2>
            <p className="mt-4 text-sm leading-6 text-white/55">
              From student projects to startup prototypes, VibeDesign AI gives every build a consistent visual language.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {storyCards.map((card, index) => (
              <div key={card.title} className="overflow-hidden rounded-xl border border-white/8 bg-[#0b0f0d]">
                <div className={`h-44 ${index === 0 ? "bg-[linear-gradient(135deg,#064e3b,#0ea5e9)]" : index === 1 ? "bg-[linear-gradient(135deg,#111827,#52525b)]" : "bg-[linear-gradient(135deg,#00d4a4,#164e63)]"}`}>
                  <div className="grid h-full place-items-center text-4xl font-semibold text-white/84">{index === 0 ? "AI" : index === 1 ? "UX" : "UI"}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/52">{card.copy}</p>
                  <Link href="/studio" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#7cebcb]">
                    Read story
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="exports" className="bg-[#050806] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">Make design direction your winning advantage</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/55">
            Join builders who give their coding agent a real visual system before asking it to write the first component.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/studio" className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#050806] transition hover:bg-[#e8fff7]">
              Get started for free
            </Link>
            <Link href="/studio" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#00d4a4]/45">
              Get a demo
            </Link>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {exports.map((item) => (
              <div key={item} className="rounded-xl border border-white/8 bg-[#0b0f0d] p-5 text-left">
                <Check className="h-5 w-5 text-[#00d4a4]" />
                <p className="mt-4 font-semibold text-white">{item}</p>
                <p className="mt-2 text-sm leading-6 text-white/52">Ready to copy from the studio export center.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 bg-[#050806] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 border-b border-white/8 pb-10 md:flex-row md:items-center md:justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#00d4a4] text-[#06100d]">
                <Wand2 className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-white">VibeDesign AI</span>
            </Link>
            <div className="flex flex-wrap gap-5 text-sm text-white/48">
              <Link href="/studio" className="hover:text-white">Studio</Link>
              <a href="#features" className="hover:text-white">Features</a>
              <a href="#exports" className="hover:text-white">Exports</a>
              <Link href="/studio" className="hover:text-white">Documentation</Link>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 text-xs text-white/36 sm:flex-row sm:items-center sm:justify-between">
            <span>AI design systems powered by clear constraints.</span>
            <span>2026 VibeDesign AI.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function LogoWall() {
  const logos = ["Cursor", "Windsurf", "Bolt", "Lovable", "Replit", "v0", "Claude Code", "Bolt.new"];

  return (
    <div className="mt-20 w-full max-w-5xl">
      <div className="grid grid-cols-2 gap-6 text-sm font-semibold text-white/58 sm:grid-cols-4">
        {logos.map((logo) => (
          <div key={logo} className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00d4a4]" />
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductMockup() {
  const nav = ["Ask Assistant", "Quickstart", "Global Settings", "AI optimization", "Components", "Themes"];
  const cards = [
    { icon: Wand2, title: "Vibe selector", copy: "Pick from 25 styles" },
    { icon: Upload, title: "Image extraction", copy: "Sample brand colors" },
    { icon: Braces, title: "Agent prompt", copy: "Ready-to-copy output" },
    { icon: Code2, title: "Tailwind config", copy: "Token-driven setup" }
  ];

  return (
    <div className="rounded-xl border border-white/12 bg-[#050806] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
      <div className="grid min-h-[520px] overflow-hidden rounded-lg border border-white/8 bg-[#070908] text-left lg:grid-cols-[250px_1fr_220px]">
        <aside className="hidden border-r border-white/8 bg-[#060806] p-5 lg:block">
          <div className="mb-6 flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#00d4a4] text-[#06100d]">
              <Wand2 className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-semibold text-white">vibedesign</span>
          </div>
          {nav.map((item, index) => (
            <div key={item} className={`mt-1 rounded-md px-3 py-2 text-sm ${index === 1 ? "bg-[#00d4a4]/12 font-medium text-[#7cebcb]" : "text-white/44"}`}>
              {item}
            </div>
          ))}
        </aside>

        <div className="p-5 sm:p-7">
          <div className="flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5 text-sm font-medium">
              <span className="text-[#00d4a4]">Guide</span>
              <span className="text-white/38">API Reference</span>
              <span className="text-white/38">Changelog</span>
            </div>
            <div className="flex items-center gap-2 rounded-md border border-white/8 bg-white/[0.03] px-3 py-2 text-xs text-white/40">
              <Search className="h-3.5 w-3.5" />
              Search or ask
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-white">Getting Started</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Quickstart Guide</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/48">
              Start building intelligent design systems with palette extraction, live previews, and AI-ready exports.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-lg border border-[#00d4a4]/10 bg-[#052017]/70 p-5">
                  <Icon className="h-8 w-8 text-[#00d4a4]" />
                  <p className="mt-5 font-semibold text-white">{card.title}</p>
                  <p className="mt-2 text-sm leading-5 text-white/45">{card.copy}</p>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="hidden border-l border-white/8 p-5 lg:block">
          <p className="text-xs font-semibold text-white/38">ON THIS PAGE</p>
          {["Introduction", "Select vibe", "Generate palette", "Export files"].map((item, index) => (
            <p key={item} className={`mt-3 text-sm ${index === 0 ? "text-[#7cebcb]" : "text-white/38"}`}>{item}</p>
          ))}
          <div className="mt-8 rounded-lg border border-white/8 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold text-white">Export status</p>
            <div className="mt-4 space-y-3">
              {["DESIGN.md", "CSS variables", "Agent prompt"].map((item) => (
                <div key={item} className="flex items-center justify-between text-sm text-white/48">
                  <span>{item}</span>
                  <Check className="h-4 w-4 text-[#00d4a4]" />
                </div>
              ))}
            </div>
            <button className="mt-5 w-full rounded-full bg-[#00d4a4] px-4 py-2 text-xs font-bold text-[#06100d]">Copy all</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  copy
}: {
  icon: typeof ShieldCheck;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-[#101312] p-6">
      <Icon className="h-5 w-5 text-[#00d4a4]" />
      <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/55">{copy}</p>
    </div>
  );
}
