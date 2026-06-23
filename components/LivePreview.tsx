"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Bell, Check, Home, LayoutDashboard, Lock, Menu, Package, Star, User } from "lucide-react";
import type { ColorPalette, PreviewTab, VibePreset, WebsiteType } from "@/lib/types";
import { SectionTitle } from "./WebsiteTypeSelector";

const tabs: PreviewTab[] = ["Landing Page", "Dashboard", "Login Page", "Pricing Page", "Product Card", "Mobile App"];

// Helper to calculate readable text color (dark/light) on a hex color background
function readableOn(hex: string) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#0F172A" : "#FFFFFF";
}

// Dynamically resolve button, card, and text styles based on the Vibe preset
function getVibeStyles(vibe: VibePreset, palette: ColorPalette) {
  const isSharp = ["cyberpunk", "vercel-inspired", "netflix-inspired"].includes(vibe.id);
  const isPill = ["apple-inspired", "modern-saas", "luxury-brand", "bold-startup"].includes(vibe.id);
  const isRound = ["soft-pastel", "calm-wellness", "indonesian-umkm", "coffee-warm"].includes(vibe.id);

  // Border Radius Class
  let radiusCard = "rounded-lg"; // 8px
  let radiusButton = "rounded-md"; // 6px
  let radiusBadge = "rounded"; // 4px

  if (isSharp) {
    radiusCard = "rounded-none";
    radiusButton = "rounded-none";
    radiusBadge = "rounded-none";
  } else if (isPill) {
    radiusCard = "rounded-xl";
    radiusButton = "rounded-full";
    radiusBadge = "rounded-full";
  } else if (isRound) {
    radiusCard = "rounded-2xl";
    radiusButton = "rounded-xl";
    radiusBadge = "rounded-full";
  }

  // Shadow / Glow Effect
  const hasGlow = ["cyberpunk", "gaming-neon", "dark-anime"].includes(vibe.id);
  const isFlat = ["vercel-inspired", "notion-inspired", "minimal-clean"].includes(vibe.id);
  
  let shadowStyle: React.CSSProperties = {};
  if (hasGlow) {
    shadowStyle = { boxShadow: `0 0 16px ${palette.primary}40` };
  } else if (isFlat) {
    shadowStyle = { boxShadow: "none" };
  } else {
    shadowStyle = { boxShadow: "0 4px 20px -2px rgba(0,0,0,0.12)" };
  }

  // Typography Class
  let fontClass = "font-sans";
  if (["elegant-editorial", "luxury-brand"].includes(vibe.id)) {
    fontClass = "font-serif";
  } else if (["vercel-inspired", "spotify-inspired", "gaming-neon"].includes(vibe.id)) {
    fontClass = "font-mono";
  }

  return { radiusCard, radiusButton, radiusBadge, shadowStyle, fontClass };
}

export function LivePreview({
  palette,
  vibe,
  websiteType,
  selectedTab,
  onTabChange
}: {
  palette: ColorPalette;
  vibe: VibePreset;
  websiteType: WebsiteType;
  selectedTab: PreviewTab;
  onTabChange: (tab: PreviewTab) => void;
}) {
  return (
    <section id="preview" className="scroll-mt-6">
      <SectionTitle eyebrow="Preview" title="Live UI preview" subtitle="Every preview adapts dynamically in layout, radius, borders, and typography according to the active vibe and website type." />
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
              {selectedTab === "Landing Page" && <Landing palette={palette} vibe={vibe} websiteType={websiteType} />}
              {selectedTab === "Dashboard" && <Dashboard palette={palette} vibe={vibe} websiteType={websiteType} />}
              {selectedTab === "Login Page" && <Login palette={palette} vibe={vibe} websiteType={websiteType} />}
              {selectedTab === "Pricing Page" && <Pricing palette={palette} vibe={vibe} websiteType={websiteType} />}
              {selectedTab === "Product Card" && <Product palette={palette} vibe={vibe} websiteType={websiteType} />}
              {selectedTab === "Mobile App" && <MobileApp palette={palette} vibe={vibe} websiteType={websiteType} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Landing({ palette, vibe, websiteType }: { palette: ColorPalette; vibe: VibePreset; websiteType: WebsiteType }) {
  const styles = getVibeStyles(vibe, palette);

  // Content configuration based on websiteType
  let heroTitle = "Build better websites with a clear visual system";
  let heroDesc = "Turn your ideas into a consistent design direction with organized color tokens, spacing rules, and modern layouts.";
  let actionLabel = "Start Building";
  let badges = ["Consistent Colors", "Better Components", "Ready for AI Agents"];
  
  if (["coffee", "restaurant"].includes(websiteType.id)) {
    heroTitle = "Crafted with passion, served with warmth";
    heroDesc = "Experience our carefully roasted single-origin coffees, fresh daily pastries, and cozy study spaces built for community.";
    actionLabel = "Reserve a Table";
    badges = ["Signature Espresso", "Warm Pastries", "Cozy Atmosphere"];
  } else if (["portfolio", "agency"].includes(websiteType.id)) {
    heroTitle = "I design digital products and build code systems";
    heroDesc = "Focused personal folio presenting interactive client work, developer utilities, and technical layout design.";
    actionLabel = "View Case Studies";
    badges = ["Visual Design", "Front-end Tech", "API Architecture"];
  } else if (["gaming", "event"].includes(websiteType.id)) {
    heroTitle = "Enter the arena & dominate the leaderboard";
    heroDesc = "Join regional ranked esports tournaments, build competitive guilds, and stream live tournaments in high definition.";
    actionLabel = "Join Tournament";
    badges = ["Ranked Matches", "Live Tournaments", "Guild Clans"];
  } else if (["education", "course"].includes(websiteType.id)) {
    heroTitle = "Learn modern design and technical engineering";
    heroDesc = "In-depth video courses covering clean visual systems, CSS variables, typography rhythm, and developer integrations.";
    actionLabel = "Explore Courses";
    badges = ["120+ Video Lessons", "Practical Quizzes", "Verified Certificates"];
  } else if (["marketplace", "online-store", "digital-store"].includes(websiteType.id)) {
    heroTitle = "Premium templates and digital assets built for speed";
    heroDesc = "Instant access to production-ready design tokens, Tailwind configs, code mockups, and modular page sections.";
    actionLabel = "Shop Templates";
    badges = ["Instant Download", "Lifetime Upgrades", "Developer License"];
  }

  return (
    <div className={`relative overflow-hidden p-6 sm:p-8 ${styles.fontClass}`}>
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

      <nav className={`relative z-10 mb-12 flex items-center justify-between border px-4 py-2.5 backdrop-blur-md ${styles.radiusButton}`} style={{ borderColor: palette.border, backgroundColor: `${palette.surface}80` }}>
        <div className="flex items-center gap-2 font-bold tracking-tight text-sm">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: palette.primary }} />
          VibeSite
        </div>
        <div className="hidden gap-6 text-[11px] font-semibold sm:flex" style={{ color: palette.textSecondary }}>
          <span className="hover:opacity-80 transition cursor-pointer">Product</span>
          <span className="hover:opacity-80 transition cursor-pointer">Pricing</span>
          <span className="hover:opacity-80 transition cursor-pointer">Docs</span>
        </div>
        <button className={`px-3.5 py-1.5 text-[11px] font-semibold shadow-sm transition hover:opacity-90 active:scale-95 ${styles.radiusButton}`} style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>
          {actionLabel.split(" ")[0]}
        </button>
      </nav>

      <div className="relative z-10 mx-auto max-w-2xl text-center py-6">
        <div className={`mx-auto mb-5 w-fit border px-3 py-1 text-[10px] font-bold tracking-wider uppercase ${styles.radiusBadge}`} style={{ borderColor: palette.border, backgroundColor: palette.surface, color: palette.textSecondary }}>
          ✨ {vibe.name}
        </div>
        <h3 className="text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl" style={{ color: palette.textPrimary }}>
          {heroTitle}
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-xs leading-relaxed" style={{ color: palette.textSecondary }}>
          {heroDesc}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button className={`px-5 py-2.5 text-xs font-semibold shadow-md transition hover:scale-[1.02] active:scale-95 ${styles.radiusButton}`} style={{ backgroundColor: palette.primary, color: readableOn(palette.primary), ...styles.shadowStyle }}>
            {actionLabel}
          </button>
          <button className={`border px-5 py-2.5 text-xs font-semibold transition hover:bg-white/5 active:scale-95 ${styles.radiusButton}`} style={{ borderColor: palette.border, color: palette.textPrimary }}>
            Learn More
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-12 grid gap-4 sm:grid-cols-3">
        {badges.map((title, i) => (
          <div key={title} className={`border p-5 transition hover:-translate-y-0.5 ${styles.radiusCard}`} style={{ backgroundColor: palette.card, borderColor: palette.border }}>
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${palette.accent}15` }}>
              <Check className="h-4 w-4" style={{ color: palette.accent }} />
            </div>
            <p className="font-bold text-xs" style={{ color: palette.textPrimary }}>{title}</p>
            <p className="mt-2 text-[10px] leading-relaxed" style={{ color: palette.textSecondary }}>
              {i === 0 ? "Carefully aligned color roles for visual balance." : i === 1 ? "Predictable shapes, outlines, and interaction logic." : "Ready-to-copy instruction guidelines for agents."}
            </p>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-10 flex items-center justify-between border-t pt-6 text-[10px] font-bold tracking-wide uppercase" style={{ borderColor: palette.border, color: palette.textSecondary }}>
        <span>🚀 {websiteType.name} template</span>
        <span>Preset: {vibe.name}</span>
      </div>
    </div>
  );
}

function Dashboard({ palette, vibe, websiteType }: { palette: ColorPalette; vibe: VibePreset; websiteType: WebsiteType }) {
  const styles = getVibeStyles(vibe, palette);

  return (
    <div className={`grid min-h-[520px] grid-cols-[70px_1fr] ${styles.fontClass}`}>
      <aside className="flex flex-col items-center border-r py-6 gap-6" style={{ backgroundColor: palette.surface, borderColor: palette.border }}>
        <div className="h-6 w-6 rounded-full" style={{ backgroundColor: palette.primary }} />
        <div className="flex flex-col gap-4 mt-8">
          {[Home, LayoutDashboard, Package, User].map((Icon, index) => (
            <button key={index} className={`flex h-10 w-10 items-center justify-center transition hover:opacity-90 active:scale-95 ${styles.radiusCard}`} style={{ backgroundColor: index === 1 ? palette.primary : "transparent", color: index === 1 ? readableOn(palette.primary) : palette.textSecondary }}>
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </aside>
      <main className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xl font-bold tracking-tight" style={{ color: palette.textPrimary }}>Dashboard</p>
            <p className="text-xs" style={{ color: palette.textSecondary }}>Management console for {websiteType.name}</p>
          </div>
          <button className={`relative flex h-8 w-8 items-center justify-center border transition hover:bg-white/5 ${styles.radiusButton}`} style={{ borderColor: palette.border, color: palette.textPrimary }}>
            <Bell className="h-4 w-4" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: palette.accent }} />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Active Nodes", value: "14,840", change: "+12%", trend: "success" },
            { label: "Completed Jobs", value: "3,892", change: "+8%", trend: "success" },
            { label: "Error Rate", value: "0.24%", change: "-2%", trend: "danger" }
          ].map((item) => (
            <div key={item.label} className={`border p-4 ${styles.radiusCard}`} style={{ backgroundColor: palette.card, borderColor: palette.border, ...styles.shadowStyle }}>
              <p className="text-xs font-semibold" style={{ color: palette.textSecondary }}>{item.label}</p>
              <div className="mt-2 flex items-baseline justify-between">
                <p className="text-2xl font-extrabold tracking-tight" style={{ color: palette.textPrimary }}>{item.value}</p>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 ${styles.radiusBadge}`} style={{ backgroundColor: item.trend === "success" ? `${palette.success}15` : `${palette.danger}15`, color: item.trend === "success" ? palette.success : palette.danger }}>
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className={`border p-5 ${styles.radiusCard}`} style={{ backgroundColor: palette.card, borderColor: palette.border, ...styles.shadowStyle }}>
            <div className="mb-6 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" style={{ color: palette.accent }} />
              <p className="font-bold text-xs" style={{ color: palette.textPrimary }}>Operational Load</p>
            </div>
            <div className="flex h-40 items-end gap-3 px-2">
              {[42, 62, 48, 82, 58, 92, 74, 100].map((height, i) => (
                <div key={i} className="group relative flex-1 flex flex-col items-center">
                  <span className="absolute -top-6 scale-0 rounded bg-slate-900 px-1.5 py-0.5 text-[9px] text-white transition group-hover:scale-100">{height}%</span>
                  <div className={`w-full transition-all duration-300 hover:opacity-80 ${styles.radiusButton}`} style={{ height: `${height}%`, backgroundColor: i === 7 ? palette.primary : palette.surface }} />
                </div>
              ))}
            </div>
          </div>
          <div className={`border p-5 ${styles.radiusCard}`} style={{ backgroundColor: palette.card, borderColor: palette.border, ...styles.shadowStyle }}>
            <p className="font-bold text-xs" style={{ color: palette.textPrimary }}>Activity Log</p>
            <div className="mt-4 space-y-3">
              {[
                { action: "Security check passed", status: palette.success },
                { action: "SSL handshake verified", status: palette.success },
                { action: "Deployment queued", status: palette.accent }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-xs">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.status }} />
                  <span className="truncate" style={{ color: palette.textSecondary }}>{item.action}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg p-3" style={{ backgroundColor: palette.surface }}>
              <div className="flex items-center justify-between text-xs mb-2">
                <span style={{ color: palette.textSecondary }}>System health</span>
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

function Login({ palette, vibe, websiteType }: { palette: ColorPalette; vibe: VibePreset; websiteType: WebsiteType }) {
  const styles = getVibeStyles(vibe, palette);

  return (
    <div className={`grid min-h-[520px] place-items-center p-6 ${styles.fontClass}`}>
      <div className={`w-full max-w-[360px] border p-6 ${styles.radiusCard}`} style={{ backgroundColor: palette.card, borderColor: palette.border, ...styles.shadowStyle }}>
        <div className={`mb-5 flex h-10 w-10 items-center justify-center ${styles.radiusCard}`} style={{ backgroundColor: palette.surface }}>
          <Lock className="h-5 w-5" style={{ color: palette.primary }} />
        </div>
        <h3 className="text-xl font-bold tracking-tight" style={{ color: palette.textPrimary }}>Sign in to workspace</h3>
        <p className="mt-1 text-xs" style={{ color: palette.textSecondary }}>Manage system configurations for {websiteType.name}.</p>

        <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-4">
          {["Email address", "Password"].map((label) => (
            <div key={label}>
              <label className="block text-[11px] font-semibold mb-1.5" style={{ color: palette.textPrimary }}>{label}</label>
              <input
                type={label === "Password" ? "password" : "email"}
                placeholder={label === "Password" ? "••••••••" : "you@domain.com"}
                className={`w-full border px-3 py-2 text-xs outline-none focus:ring-1 transition ${styles.radiusButton}`}
                style={{ backgroundColor: palette.input, borderColor: palette.border, color: palette.textPrimary }}
              />
            </div>
          ))}

          <button className={`mt-6 w-full py-2.5 text-xs font-semibold shadow-sm transition hover:opacity-90 active:scale-95 ${styles.radiusButton}`} style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>
            Authentication Direct
          </button>
        </form>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 h-[1px] w-full" style={{ backgroundColor: palette.border }} />
          <span className="relative px-3 text-[10px]" style={{ backgroundColor: palette.card, color: palette.textSecondary }}>OR</span>
        </div>

        <button className={`w-full border py-2.5 text-xs font-semibold transition hover:bg-white/5 active:scale-95 ${styles.radiusButton}`} style={{ borderColor: palette.border, color: palette.textPrimary }}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

function Pricing({ palette, vibe, websiteType }: { palette: ColorPalette; vibe: VibePreset; websiteType: WebsiteType }) {
  const styles = getVibeStyles(vibe, palette);

  return (
    <div className={`p-6 sm:p-8 ${styles.fontClass}`}>
      <div className="mx-auto mb-10 max-w-xl text-center">
        <h3 className="text-3xl font-extrabold tracking-tight" style={{ color: palette.textPrimary }}>Pricing Plans</h3>
        <p className="mt-2 text-xs" style={{ color: palette.textSecondary }}>Transparent subscriptions for {websiteType.name}.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { name: "Starter", price: "$0", desc: "Test layout rules", popular: false },
          { name: "Pro Team", price: "$19", desc: "Deploy design tokens", popular: true },
          { name: "Unlimited", price: "$49", desc: "Integrate with AI agents", popular: false }
        ].map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col justify-between border p-5 transition hover:scale-[1.01] ${styles.radiusCard}`}
            style={{
              backgroundColor: palette.card,
              borderColor: plan.popular ? palette.primary : palette.border,
              boxShadow: plan.popular ? `0 10px 30px -10px ${palette.primary}15` : "none"
            }}
          >
            {plan.popular && (
              <span className={`absolute right-4 top-4 px-2.5 py-0.5 text-[9px] font-bold ${styles.radiusBadge}`} style={{ backgroundColor: palette.accent, color: readableOn(palette.accent) }}>
                POPULAR
              </span>
            )}
            <div>
              <p className="font-bold text-sm" style={{ color: palette.textPrimary }}>{plan.name}</p>
              <p className="mt-1 text-[10px]" style={{ color: palette.textSecondary }}>{plan.desc}</p>
              <p className="mt-4 text-3xl font-extrabold tracking-tight" style={{ color: palette.textPrimary }}>{plan.price}</p>

              <div className="mt-6 space-y-3">
                {["14 Palette Tokens", "Interactive Previews", "Tailwind Snippet"].map((item) => (
                  <p key={item} className="flex items-center gap-2 text-xs" style={{ color: palette.textSecondary }}>
                    <Check className="h-3.5 w-3.5" style={{ color: palette.success }} />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <button
              className={`mt-8 w-full py-2.5 text-xs font-semibold shadow-sm transition hover:opacity-95 active:scale-95 ${styles.radiusButton}`}
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

function Product({ palette, vibe, websiteType }: { palette: ColorPalette; vibe: VibePreset; websiteType: WebsiteType }) {
  const styles = getVibeStyles(vibe, palette);

  return (
    <div className={`grid min-h-[520px] place-items-center p-6 ${styles.fontClass}`}>
      <div className={`group w-full max-w-[340px] border p-4 shadow-md transition hover:-translate-y-1 ${styles.radiusCard}`} style={{ backgroundColor: palette.card, borderColor: palette.border }}>
        <div className={`relative h-52 overflow-hidden flex items-center justify-center ${styles.radiusCard}`} style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary}, ${palette.accent})` }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)", backgroundSize: "20px 20px" }} />
          <div className="relative h-28 w-20 rounded-xl border border-white/20 bg-black/30 backdrop-blur-md flex flex-col justify-between p-3 text-[10px] text-white">
            <div className="h-4 w-4 rounded-full bg-white/20" />
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded bg-white/30" />
              <div className="h-2 w-2/3 rounded bg-white/20" />
            </div>
          </div>
          <span className={`absolute left-3 top-3 bg-white/20 px-2 py-0.5 text-[9px] font-bold text-white backdrop-blur-md ${styles.radiusBadge}`}>
            NEW
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-white">{websiteType.name} Assets</h3>
            <p className="mt-1 text-xs" style={{ color: palette.textSecondary }}>Premium pack built for visual builders.</p>
          </div>
          <p className="text-lg font-bold text-white">$29</p>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-3.5 w-3.5 fill-current" style={{ color: palette.warning }} />
            ))}
          </div>
          <span className="text-[11px]" style={{ color: palette.textSecondary }}>4.9 · 84 downloads</span>
        </div>
        <button className={`mt-6 w-full py-2.5 text-xs font-semibold shadow-sm transition hover:opacity-90 active:scale-95 ${styles.radiusButton}`} style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>
          Download Assets
        </button>
      </div>
    </div>
  );
}

function MobileApp({ palette, vibe, websiteType }: { palette: ColorPalette; vibe: VibePreset; websiteType: WebsiteType }) {
  const styles = getVibeStyles(vibe, palette);

  return (
    <div className={`grid min-h-[560px] place-items-center p-6 ${styles.fontClass}`}>
      <div className="w-[300px] rounded-[2.5rem] border-8 border-slate-900 p-3.5 shadow-2xl" style={{ backgroundColor: palette.background }}>
        {/* Device Status Bar */}
        <div className="mb-4 flex items-center justify-between text-[10px] px-1" style={{ color: palette.textSecondary }}>
          <span className="font-semibold">9:41</span>
          <div className="h-4 w-20 rounded-full bg-slate-950 flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          </div>
          <div className="flex gap-1">
            <span>LTE</span>
            <div className="h-3 w-5 rounded border border-current p-[1px]"><div className="h-full w-4/5 bg-current rounded-xs" /></div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="rounded-lg p-1.5 hover:bg-white/5"><Menu className="h-4 w-4" style={{ color: palette.textPrimary }} /></button>
          <div className="h-7 w-7 rounded-full overflow-hidden border" style={{ borderColor: palette.border }} />
        </div>

        <div className="mt-5">
          <h3 className="text-xl font-bold tracking-tight" style={{ color: palette.textPrimary }}>Today</h3>
          <p className="text-xs" style={{ color: palette.textSecondary }}>Analysis: {websiteType.name}</p>
        </div>

        <div className={`mt-5 p-4 shadow-sm ${styles.radiusCard}`} style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>
          <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">Workspace Vibe</p>
          <p className="mt-1 text-base font-bold">{vibe.name}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[9px] opacity-80">Preset config active</span>
            <button className={`bg-white/20 px-3 py-1 text-[9px] font-semibold backdrop-blur-md ${styles.radiusBadge}`}>Active</button>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {["Design checklist", "Variables check"].map((item) => (
            <div key={item} className={`flex items-center justify-between border p-3 ${styles.radiusCard}`} style={{ backgroundColor: palette.card, borderColor: palette.border }}>
              <p className="text-xs font-semibold" style={{ color: palette.textPrimary }}>{item}</p>
              <Check className="h-3.5 w-3.5" style={{ color: palette.accent }} />
            </div>
          ))}
        </div>

        <div className={`mt-6 flex justify-around p-3 border ${styles.radiusCard}`} style={{ backgroundColor: palette.surface, borderColor: palette.border }}>
          <Home className="h-4 w-4" style={{ color: palette.primary }} />
          <BarChart3 className="h-4 w-4" style={{ color: palette.textSecondary }} />
          <User className="h-4 w-4" style={{ color: palette.textSecondary }} />
        </div>
      </div>
    </div>
  );
}