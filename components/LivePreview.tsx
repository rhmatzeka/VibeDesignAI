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
      <div className="rounded-3xl border border-white/8 bg-white/[0.055] p-3">
        <div className="studio-scroll mb-3 flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`focus-ring shrink-0 rounded-2xl px-3 py-2 text-xs font-semibold transition ${selectedTab === tab ? "bg-white text-slate-950" : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-3xl border" style={{ backgroundColor: palette.background, borderColor: palette.border, color: palette.textPrimary }}>
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
    <div className="p-5 sm:p-7">
      <nav className="mb-10 flex items-center justify-between">
        <div className="font-bold">VibeSite</div>
        <div className="hidden gap-4 text-xs sm:flex" style={{ color: palette.textSecondary }}><span>Product</span><span>Pricing</span><span>Docs</span></div>
        <button className="rounded-full px-4 py-2 text-xs font-semibold" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>Start</button>
      </nav>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-4 w-fit rounded-full border px-3 py-1 text-xs" style={{ borderColor: palette.border, backgroundColor: palette.surface, color: palette.textSecondary }}>Design system ready</div>
        <h3 className="text-3xl font-bold leading-tight sm:text-5xl">Build better websites with a clear visual system.</h3>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6" style={{ color: palette.textSecondary }}>Turn your idea into a consistent design direction with colors, components, spacing, and style rules.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button className="rounded-full px-5 py-3 text-sm font-semibold" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>Start Building</button>
          <button className="rounded-full border px-5 py-3 text-sm font-semibold" style={{ borderColor: palette.border, color: palette.textPrimary }}>View Preview</button>
        </div>
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-3">
        {["Consistent Colors", "Better Components", "Ready for AI Agents"].map((item) => (
          <div key={item} className="rounded-2xl border p-4" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
            <Check className="mb-4 h-5 w-5" style={{ color: palette.accent }} />
            <p className="font-semibold">{item}</p>
            <p className="mt-2 text-xs leading-5" style={{ color: palette.textSecondary }}>Clear rules for polished, repeatable UI.</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t pt-5 text-xs" style={{ borderColor: palette.border, color: palette.textSecondary }}>
        <span>12k generated systems</span><span>CSS · Tailwind · DESIGN.md</span>
      </div>
    </div>
  );
}

function Dashboard({ palette }: { palette: ColorPalette }) {
  return (
    <div className="grid min-h-[520px] grid-cols-[88px_1fr]">
      <aside className="border-r p-3" style={{ backgroundColor: palette.surface, borderColor: palette.border }}>
        {[Home, LayoutDashboard, Package, User].map((Icon, index) => <div key={index} className="mb-3 grid h-11 place-items-center rounded-2xl" style={{ backgroundColor: index === 1 ? palette.primary : palette.card, color: index === 1 ? readableOn(palette.primary) : palette.textSecondary }}><Icon className="h-4 w-4" /></div>)}
      </aside>
      <main className="p-4">
        <div className="mb-4 flex items-center justify-between"><div><p className="text-xl font-bold">Overview</p><p className="text-xs" style={{ color: palette.textSecondary }}>Realtime product metrics</p></div><Bell className="h-5 w-5" style={{ color: palette.textSecondary }} /></div>
        <div className="grid gap-3 sm:grid-cols-3">
          {["Revenue", "Users", "Conversion"].map((item, index) => <div key={item} className="rounded-2xl border p-4" style={{ backgroundColor: palette.card, borderColor: palette.border }}><p className="text-xs" style={{ color: palette.textSecondary }}>{item}</p><p className="mt-2 text-2xl font-bold">{index === 0 ? "$24.8k" : index === 1 ? "18.2k" : "8.4%"}</p></div>)}
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border p-4" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
            <div className="mb-5 flex items-center gap-2"><BarChart3 className="h-4 w-4" style={{ color: palette.accent }} /><p className="font-semibold">Growth chart</p></div>
            <div className="flex h-40 items-end gap-2">{[38, 58, 44, 72, 62, 86, 76, 92].map((height, i) => <span key={i} className="flex-1 rounded-t-xl" style={{ height: `${height}%`, backgroundColor: i === 7 ? palette.primary : palette.surface }} />)}</div>
          </div>
          <div className="rounded-2xl border p-4" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
            <p className="font-semibold">Recent activity</p>
            {["New customer joined", "Invoice paid", "Campaign completed"].map((item) => <div key={item} className="mt-4 flex items-center gap-3 text-sm"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: palette.success }} /><span style={{ color: palette.textSecondary }}>{item}</span></div>)}
            <div className="mt-6 rounded-2xl p-3" style={{ backgroundColor: palette.surface }}><p className="text-xs" style={{ color: palette.textSecondary }}>Goal progress</p><div className="mt-2 h-2 rounded-full" style={{ backgroundColor: palette.border }}><div className="h-2 w-2/3 rounded-full" style={{ backgroundColor: palette.primary }} /></div></div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Login({ palette }: { palette: ColorPalette }) {
  return (
    <div className="grid min-h-[520px] place-items-center p-6">
      <div className="w-full max-w-sm rounded-3xl border p-6" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
        <Lock className="mb-5 h-9 w-9 rounded-2xl p-2" style={{ backgroundColor: palette.surface, color: palette.primary }} />
        <h3 className="text-2xl font-bold">Welcome back</h3>
        <p className="mt-2 text-sm" style={{ color: palette.textSecondary }}>Sign in to continue building your design system.</p>
        {["Email address", "Password"].map((label) => <label key={label} className="mt-4 block text-xs font-semibold"><span>{label}</span><input type={label === "Password" ? "password" : "email"} placeholder={label} className="mt-2 w-full rounded-2xl border px-4 py-3 text-sm outline-none" style={{ backgroundColor: palette.input, borderColor: palette.border, color: palette.textPrimary }} /></label>)}
        <button className="mt-5 w-full rounded-2xl py-3 text-sm font-semibold" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>Sign in</button>
        <button className="mt-3 w-full rounded-2xl border py-3 text-sm font-semibold" style={{ borderColor: palette.border, color: palette.textPrimary }}>Continue with Google</button>
        <p className="mt-4 text-center text-xs" style={{ color: palette.textSecondary }}>Need an account? Create one</p>
      </div>
    </div>
  );
}

function Pricing({ palette }: { palette: ColorPalette }) {
  return (
    <div className="p-6">
      <div className="mx-auto mb-7 max-w-xl text-center"><h3 className="text-3xl font-bold">Pricing that scales with you</h3><p className="mt-2 text-sm" style={{ color: palette.textSecondary }}>Choose a plan and keep the same design system across every page.</p></div>
      <div className="grid gap-3 md:grid-cols-3">
        {["Free", "Pro", "Scale"].map((plan, index) => <div key={plan} className="relative rounded-3xl border p-5" style={{ backgroundColor: palette.card, borderColor: index === 1 ? palette.primary : palette.border }}>
          {index === 1 && <span className="absolute right-4 top-4 rounded-full px-2 py-1 text-[10px] font-bold" style={{ backgroundColor: palette.accent, color: readableOn(palette.accent) }}>POPULAR</span>}
          <p className="font-semibold">{plan}</p><p className="mt-4 text-3xl font-bold">{index === 0 ? "$0" : index === 1 ? "$19" : "$49"}</p>
          <div className="mt-5 space-y-3">{["Palette", "Preview", "Export"].map((item) => <p key={item} className="flex items-center gap-2 text-sm" style={{ color: palette.textSecondary }}><Check className="h-4 w-4" style={{ color: palette.success }} />{item}</p>)}</div>
          <button className="mt-6 w-full rounded-2xl py-3 text-sm font-semibold" style={{ backgroundColor: index === 1 ? palette.primary : palette.surface, color: index === 1 ? readableOn(palette.primary) : palette.textPrimary }}>Get started</button>
        </div>)}
      </div>
    </div>
  );
}

function Product({ palette }: { palette: ColorPalette }) {
  return (
    <div className="grid min-h-[520px] place-items-center p-6">
      <div className="w-full max-w-md rounded-3xl border p-4" style={{ backgroundColor: palette.card, borderColor: palette.border }}>
        <div className="relative h-56 rounded-3xl" style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary}, ${palette.accent})` }}><span className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: palette.card, color: palette.textPrimary }}>New</span></div>
        <div className="mt-5 flex items-start justify-between gap-4"><div><h3 className="text-xl font-bold">Premium UI Kit</h3><p className="mt-1 text-sm" style={{ color: palette.textSecondary }}>Reusable cards, sections, and tokens.</p></div><p className="text-xl font-bold">$39</p></div>
        <div className="mt-4 flex items-center gap-1">{[1, 2, 3, 4, 5].map((star) => <Star key={star} className="h-4 w-4 fill-current" style={{ color: palette.warning }} />)}<span className="ml-2 text-xs" style={{ color: palette.textSecondary }}>4.9 rating</span></div>
        <button className="mt-5 w-full rounded-2xl py-3 text-sm font-semibold" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>Add to cart</button>
      </div>
    </div>
  );
}

function MobileApp({ palette }: { palette: ColorPalette }) {
  return (
    <div className="grid min-h-[560px] place-items-center p-6">
      <div className="w-[290px] rounded-[2.2rem] border-8 border-black p-3 shadow-2xl" style={{ backgroundColor: palette.background }}>
        <div className="mb-4 flex items-center justify-between"><Menu className="h-5 w-5" /><div className="h-6 w-20 rounded-full" style={{ backgroundColor: palette.surface }} /><User className="h-5 w-5" /></div>
        <h3 className="text-2xl font-bold">Today</h3><p className="text-sm" style={{ color: palette.textSecondary }}>3 design tasks ready</p>
        <div className="mt-5 rounded-3xl p-4" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}><p className="text-xs opacity-80">Current vibe</p><p className="mt-2 text-lg font-bold">Dark Premium</p><button className="mt-4 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold">Generate</button></div>
        <div className="mt-3 grid gap-3">{["Palette review", "Preview update"].map((item) => <div key={item} className="rounded-2xl border p-3" style={{ backgroundColor: palette.card, borderColor: palette.border }}><p className="text-sm font-semibold">{item}</p><p className="text-xs" style={{ color: palette.textSecondary }}>Ready to export</p></div>)}</div>
        <div className="mt-5 flex justify-around rounded-2xl p-3" style={{ backgroundColor: palette.surface }}><Home className="h-5 w-5" style={{ color: palette.primary }} /><BarChart3 className="h-5 w-5" style={{ color: palette.textSecondary }} /><User className="h-5 w-5" style={{ color: palette.textSecondary }} /></div>
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
