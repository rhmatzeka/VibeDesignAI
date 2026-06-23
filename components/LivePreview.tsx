"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Bell, Check, Home, LayoutDashboard, Lock, Menu, Package, Star, User } from "lucide-react";
import type { ColorPalette, PreviewTab } from "@/lib/types";
import { SectionTitle } from "./WebsiteTypeSelector";

const tabs: PreviewTab[] = ["Landing Page", "Dashboard", "Login Page", "Pricing Page", "Product Card", "Mobile App"];

export function LivePreview({
  palette,
  selectedTab,
  onTabChange
}: {
  palette: ColorPalette;
  selectedTab: PreviewTab;
  onTabChange: (tab: PreviewTab) => void;
}) {
  return (
    <section id="preview" className="scroll-mt-6">
      <SectionTitle eyebrow="Preview" title="Live UI preview" subtitle="Every preview uses the active palette, so color changes are visible immediately." />
      <div className="rounded-lg border border-[#1f1f1f] bg-[#0c0c0e] p-3">
        <div className="studio-scroll mb-3 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`focus-ring shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${selectedTab === tab ? "bg-[#00d4a4] text-[#0a0a0a]" : "border border-[#1f1f1f] bg-[#0c0c0e] text-[#a8a8aa] hover:bg-[#1c1c1e] hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-md border" style={{ backgroundColor: palette.background, borderColor: palette.border, color: palette.textPrimary }}>
          <AnimatePresence mode="wait">
            <motion.div key={selectedTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }}>
              {selectedTab === "Landing Page" && <Landing palette={palette} />}
              {selectedTab === "Dashboard" && <Dashboard palette={palette} />}
              {selectedTab === "Login Page" && <Login palette={palette} />}
              {selectedTab === "Pricing Page" && <Pricing palette={palette} />}
              {selectedTab === "Product Card" && <Product palette={palette} />}
              {selectedTab === "Mobile App" && <MobileApp palette={palette} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Landing({ palette }: { palette: ColorPalette }) {
  return (
    <div className="relative overflow-hidden p-6 sm:p-8 font-sans">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

      <nav className="relative z-10 mb-12 flex items-center justify-between rounded-full border px-4 py-2.5 backdrop-blur-md" style={{ borderColor: palette.border, backgroundColor: `${palette.surface}80` }}>
        <div className="flex items-center gap-2 font-bold tracking-tight">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.primary }} />
          VibeSite
        </div>
        <div className="hidden gap-6 text-xs font-medium sm:flex" style={{ color: palette.textSecondary }}>
          <span className="hover:text-white transition cursor-pointer">Product</span>
          <span className="hover:text-white transition cursor-pointer">Pricing</span>
          <span className="hover:text-white transition cursor-pointer">Docs</span>
        </div>
        <button className="rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm transition hover:opacity-90 active:scale-95" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>
          Start Free
        </button>
      </nav>

      <div className="relative z-10 mx-auto max-w-2xl text-center py-6">
        <div className="mx-auto mb-5 w-fit rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide" style={{ borderColor: palette.border, backgroundColor: palette.surface, color: palette.textSecondary }}>
          ✨ Design system active
        </div>
        <h3 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: palette.textPrimary }}>
          Build better websites with a clear visual system
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed" style={{ color: palette.textSecondary }}>
          Turn your ideas into a consistent design direction with organized color tokens, spacing rules, and modern layouts.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button className="rounded-full px-6 py-3 text-xs font-semibold shadow-md transition hover:scale-[1.02] active:scale-95" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>
            Start Building
          </button>
          <button className="rounded-full border px-6 py-3 text-xs font-semibold transition hover:bg-white/5 active:scale-95" style={{ borderColor: palette.border, color: palette.textPrimary }}>
            View Showcase
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Consistent Colors", desc: "No more random hex codes. Unified visual harmony across pages." },
          { title: "Better Components", desc: "Predictable borders, spacing, and hover states out of the box." },
          { title: "Ready for AI", desc: "Perfect context guidelines for Cursor, Windsurf, or custom LLM builders." }
        ].map((item) => (
          <div key={item.title} className="rounded-xl border p-5 transition hover:-translate-y-1" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${palette.accent}15` }}>
              <Check className="h-4 w-4" style={{ color: palette.accent }} />
            </div>
            <p className="font-semibold text-sm" style={{ color: palette.textPrimary }}>{item.title}</p>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: palette.textSecondary }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-10 flex items-center justify-between border-t pt-6 text-[11px] font-medium" style={{ borderColor: palette.border, color: palette.textSecondary }}>
        <span>🚀 12,480 systems generated</span>
        <span>CSS Variables · Tailwind · JSON</span>
      </div>
    </div>
  );
}

function Dashboard({ palette }: { palette: ColorPalette }) {
  return (
    <div className="grid min-h-[520px] grid-cols-[70px_1fr] font-sans">
      <aside className="flex flex-col items-center border-r py-6 gap-6" style={{ backgroundColor: palette.surface, borderColor: palette.border }}>
        <div className="h-6 w-6 rounded-full" style={{ backgroundColor: palette.primary }} />
        <div className="flex flex-col gap-4 mt-8">
          {[Home, LayoutDashboard, Package, User].map((Icon, index) => (
            <button key={index} className="flex h-10 w-10 items-center justify-center rounded-xl transition hover:opacity-90 active:scale-95" style={{ backgroundColor: index === 1 ? palette.primary : "transparent", color: index === 1 ? readableOn(palette.primary) : palette.textSecondary }}>
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </aside>
      <main className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xl font-bold tracking-tight" style={{ color: palette.textPrimary }}>Overview</p>
            <p className="text-xs" style={{ color: palette.textSecondary }}>System monitoring and analytics</p>
          </div>
          <button className="relative flex h-8 w-8 items-center justify-center rounded-full border transition hover:bg-white/5" style={{ borderColor: palette.border, color: palette.textPrimary }}>
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: palette.accent }} />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Active Users", value: "14,840", change: "+12.2%", trend: "success" },
            { label: "Palettes Built", value: "3,892", change: "+8.4%", trend: "success" },
            { label: "API Calls", value: "24.8k", change: "-2.1%", trend: "danger" }
          ].map((item) => (
            <div key={item.label} className="rounded-xl border p-4" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
              <p className="text-xs font-medium" style={{ color: palette.textSecondary }}>{item.label}</p>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-2xl font-bold tracking-tight" style={{ color: palette.textPrimary }}>{item.value}</p>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: item.trend === "success" ? `${palette.success}15` : `${palette.danger}15`, color: item.trend === "success" ? palette.success : palette.danger }}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-xl border p-5" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
            <div className="mb-6 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" style={{ color: palette.accent }} />
              <p className="font-semibold text-sm" style={{ color: palette.textPrimary }}>Weekly Activity</p>
            </div>
            <div className="flex h-40 items-end gap-3 px-2">
              {[42, 62, 48, 82, 58, 92, 74, 100].map((height, i) => (
                <div key={i} className="group relative flex-1 flex flex-col items-center">
                  <span className="absolute -top-6 scale-0 rounded bg-slate-900 px-1.5 py-0.5 text-[9px] text-white transition group-hover:scale-100">{height}%</span>
                  <div className="w-full rounded-t-md transition-all duration-300 hover:opacity-80" style={{ height: `${height}%`, backgroundColor: i === 7 ? palette.primary : palette.surface }} />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border p-5" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
            <p className="font-semibold text-sm" style={{ color: palette.textPrimary }}>System Actions</p>
            <div className="mt-4 space-y-3">
              {[
                { action: "Palette export success", status: palette.success },
                { action: "Contrast auto-fixed", status: palette.success },
                { action: "New custom preset added", status: palette.accent }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.status }} />
                  <span className="truncate" style={{ color: palette.textSecondary }}>{item.action}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg p-3" style={{ backgroundColor: palette.surface }}>
              <div className="flex items-center justify-between text-xs mb-2">
                <span style={{ color: palette.textSecondary }}>Contrast pass rate</span>
                <span className="font-bold" style={{ color: palette.textPrimary }}>94%</span>
              </div>
              <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: palette.border }}>
                <div className="h-1.5 rounded-full" style={{ backgroundColor: palette.primary, width: "94%" }} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Login({ palette }: { palette: ColorPalette }) {
  return (
    <div className="grid min-h-[520px] place-items-center p-6 font-sans">
      <div className="w-full max-w-[360px] rounded-xl border p-6 shadow-lg" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: palette.surface }}>
          <Lock className="h-5 w-5" style={{ color: palette.primary }} />
        </div>
        <h3 className="text-xl font-bold tracking-tight" style={{ color: palette.textPrimary }}>Welcome back</h3>
        <p className="mt-1 text-xs" style={{ color: palette.textSecondary }}>Enter details to access your studio profile.</p>

        <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-4">
          {["Email address", "Password"].map((label) => (
            <div key={label}>
              <label className="block text-[11px] font-semibold mb-1.5" style={{ color: palette.textPrimary }}>{label}</label>
              <input
                type={label === "Password" ? "password" : "email"}
                placeholder={label === "Password" ? "••••••••" : "you@domain.com"}
                className="w-full rounded-md border px-3 py-2 text-xs outline-none focus:ring-1 transition"
                style={{ backgroundColor: palette.input, borderColor: palette.border, color: palette.textPrimary }}
              />
            </div>
          ))}

          <button className="mt-6 w-full rounded-md py-2.5 text-xs font-semibold shadow-sm transition hover:opacity-90 active:scale-95" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>
            Sign In
          </button>
        </form>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 h-[1px] w-full" style={{ backgroundColor: palette.border }} />
          <span className="relative px-3 text-[10px]" style={{ backgroundColor: palette.card, color: palette.textSecondary }}>OR</span>
        </div>

        <button className="w-full rounded-md border py-2.5 text-xs font-semibold transition hover:bg-white/5 active:scale-95" style={{ borderColor: palette.border, color: palette.textPrimary }}>
          Continue with GitHub
        </button>

        <p className="mt-6 text-center text-[10px]" style={{ color: palette.textSecondary }}>
          New builder? <span className="font-semibold underline cursor-pointer" style={{ color: palette.primary }}>Create account</span>
        </p>
      </div>
    </div>
  );
}

function Pricing({ palette }: { palette: ColorPalette }) {
  return (
    <div className="p-6 sm:p-8 font-sans">
      <div className="mx-auto mb-10 max-w-xl text-center">
        <h3 className="text-3xl font-extrabold tracking-tight" style={{ color: palette.textPrimary }}>Pricing that scales</h3>
        <p className="mt-2 text-xs" style={{ color: palette.textSecondary }}>Simple tokens, simple plans, full visual consistency.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { name: "Free", price: "$0", desc: "For exploring ideas", popular: false },
          { name: "Pro", price: "$19", desc: "For professional shipping", popular: true },
          { name: "Enterprise", price: "$49", desc: "For massive context scale", popular: false }
        ].map((plan) => (
          <div
            key={plan.name}
            className="relative flex flex-col justify-between rounded-xl border p-5 transition hover:scale-[1.01]"
            style={{
              backgroundColor: palette.card,
              borderColor: plan.popular ? palette.primary : palette.border,
              boxShadow: plan.popular ? `0 10px 30px -10px ${palette.primary}15` : "none"
            }}
          >
            {plan.popular && (
              <span className="absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[9px] font-bold" style={{ backgroundColor: palette.accent, color: readableOn(palette.accent) }}>
                POPULAR
              </span>
            )}
            <div>
              <p className="font-bold text-sm" style={{ color: palette.textPrimary }}>{plan.name}</p>
              <p className="mt-1 text-[11px]" style={{ color: palette.textSecondary }}>{plan.desc}</p>
              <p className="mt-4 text-3xl font-extrabold tracking-tight" style={{ color: palette.textPrimary }}>{plan.price}</p>

              <div className="mt-6 space-y-3">
                {["14 Palette Tokens", "Interactive Live Previews", "Tailwind + CSS Export"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-xs" style={{ color: palette.textSecondary }}>
                    <Check className="h-3.5 w-3.5" style={{ color: palette.success }} />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <button
              className="mt-8 w-full rounded-md py-2.5 text-xs font-semibold shadow-sm transition hover:opacity-95 active:scale-95"
              style={{
                backgroundColor: plan.popular ? palette.primary : palette.surface,
                color: plan.popular ? readableOn(palette.primary) : palette.textPrimary,
                border: plan.popular ? "none" : `1px solid ${palette.border}`
              }}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Product({ palette }: { palette: ColorPalette }) {
  return (
    <div className="grid min-h-[520px] place-items-center p-6 font-sans">
      <div className="group w-full max-w-[340px] rounded-xl border p-4 shadow-md transition hover:-translate-y-1" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
        {/* Abstract design placeholder for the product image */}
        <div className="relative h-52 overflow-hidden rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary}, ${palette.accent})` }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)", backgroundSize: "20px 20px" }} />
          <div className="relative h-28 w-20 rounded-xl border border-white/20 bg-black/30 backdrop-blur-md flex flex-col justify-between p-3 text-[10px] text-white">
            <div className="h-4 w-4 rounded-full bg-white/20" />
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded bg-white/30" />
              <div className="h-2 w-2/3 rounded bg-white/20" />
            </div>
          </div>
          <span className="absolute left-3 top-3 rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-md">
            NEW
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-white">Advanced UI Kit</h3>
            <p className="mt-1 text-xs" style={{ color: palette.textSecondary }}>A library of 48+ layout elements.</p>
          </div>
          <p className="text-lg font-bold text-white">$49</p>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-3.5 w-3.5 fill-current" style={{ color: palette.warning }} />
            ))}
          </div>
          <span className="text-[11px]" style={{ color: palette.textSecondary }}>4.9 · 128 sales</span>
        </div>
        <button className="mt-6 w-full rounded-md py-2.5 text-xs font-semibold shadow-sm transition hover:opacity-90 active:scale-95" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>
          Purchase Item
        </button>
      </div>
    </div>
  );
}

function MobileApp({ palette }: { palette: ColorPalette }) {
  return (
    <div className="grid min-h-[560px] place-items-center p-6 font-sans">
      {/* Sleek Mobile Device Frame */}
      <div className="w-[300px] rounded-[2.5rem] border-8 border-slate-900 p-3.5 shadow-2xl" style={{ backgroundColor: palette.background }}>
        {/* Device Notch & Status bar */}
        <div className="mb-4 flex items-center justify-between text-[10px] px-1" style={{ color: palette.textSecondary }}>
          <span className="font-semibold">9:41</span>
          <div className="h-4 w-20 rounded-full bg-slate-950 flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          </div>
          <div className="flex gap-1">
            <span>5G</span>
            <div className="h-3 w-5 rounded border border-current p-[1px]"><div className="h-full w-4/5 bg-current rounded-xs" /></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="rounded-lg p-1.5 hover:bg-white/5"><Menu className="h-4 w-4" style={{ color: palette.textPrimary }} /></button>
          <div className="h-7 w-7 rounded-full overflow-hidden border" style={{ borderColor: palette.border }} />
        </div>

        <div className="mt-5">
          <h3 className="text-2xl font-bold tracking-tight" style={{ color: palette.textPrimary }}>Today</h3>
          <p className="text-xs" style={{ color: palette.textSecondary }}>Design workspace analysis</p>
        </div>

        {/* Feature widget card */}
        <div className="mt-5 rounded-2xl p-4 shadow-sm" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>
          <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Active Project</p>
          <p className="mt-1 text-lg font-bold">VibeDesign AI</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[10px] opacity-80">MVP Phase 1</span>
            <button className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold backdrop-blur-md">Active</button>
          </div>
        </div>

        {/* Action list */}
        <div className="mt-4 space-y-2">
          {["Generate palette", "Verify contrast"].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-xl border p-3" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
              <p className="text-xs font-semibold" style={{ color: palette.textPrimary }}>{item}</p>
              <Check className="h-3.5 w-3.5" style={{ color: palette.accent }} />
            </div>
          ))}
        </div>

        {/* Bottom Nav Bar */}
        <div className="mt-6 flex justify-around rounded-xl p-3 border" style={{ backgroundColor: palette.surface, borderColor: palette.border }}>
          <Home className="h-4 w-4" style={{ color: palette.primary }} />
          <BarChart3 className="h-4 w-4" style={{ color: palette.textSecondary }} />
          <User className="h-4 w-4" style={{ color: palette.textSecondary }} />
        </div>
      </div>
    </div>
  );
}

function readableOn(hex: string) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#0F172A" : "#FFFFFF";
}