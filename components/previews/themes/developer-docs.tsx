import { BarChart3, Check, FileText, GitBranch, Home, KeyRound, Package, Search, Terminal, User } from "lucide-react";
import type { ThemePreview, PreviewProps } from "../types";
import { getLandingCopy, readableOn } from "../utils";

function Shell({ children, palette }: { children: React.ReactNode; palette: PreviewProps["palette"] }) {
  return <div className="min-h-[620px] bg-[#050505] p-5 font-mono text-white" style={{ borderColor: palette.border }}>{children}</div>;
}

function Landing({ palette, websiteType, vibe }: PreviewProps) {
  const copy = getLandingCopy(websiteType);
  return (
    <Shell palette={palette}>
      <div className="grid min-h-[580px] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] lg:grid-cols-[250px_1fr_220px]">
        <aside className="hidden border-r border-white/10 p-5 lg:block">
          <div className="mb-8 flex items-center gap-2 text-sm font-bold"><Terminal className="h-4 w-4" style={{ color: palette.primary }} />docs</div>
          {["Introduction", "Quickstart", "Components", "API", "Deploy"].map((item, index) => <div key={item} className={`mb-1 rounded-md px-3 py-2 text-xs ${index === 1 ? "bg-white/10 text-white" : "text-white/45"}`}>{item}</div>)}
        </aside>
        <main className="p-6 sm:p-8">
          <nav className="mb-10 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs text-white/55"><GitBranch className="h-4 w-4" /> {vibe.name}</div>
            <div className="hidden rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/40 sm:flex"><Search className="mr-2 h-3.5 w-3.5" /> Search docs</div>
          </nav>
          <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: palette.primary }}>{copy.kicker}</p>
          <h3 className="mt-4 max-w-3xl text-5xl font-black leading-[1.02] tracking-[-0.06em] sm:text-6xl">{copy.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58">{copy.kicker}. Dense documentation layout, precise controls, technical copy, and code-first implementation guidance.</p>
          <div className="mt-8 flex flex-wrap gap-3"><button className="rounded-md px-5 py-3 text-xs font-bold" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>{copy.cta}</button><button className="rounded-md border border-white/10 px-5 py-3 text-xs font-bold">Read API</button></div>
          <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#111]">
            <div className="border-b border-white/10 px-4 py-3 text-xs text-white/50">install.sh</div>
            <pre className="p-5 text-xs leading-6 text-white/70"><span style={{ color: palette.primary }}>$</span> npm create vibedesign@latest{"\n"}<span style={{ color: palette.primary }}>$</span> export DESIGN_SYSTEM=ready</pre>
          </div>
        </main>
        <aside className="hidden border-l border-white/10 p-5 text-xs text-white/45 lg:block"><p className="mb-4 font-bold text-white">ON THIS PAGE</p>{["Overview", "Tokens", "Components", "Exports"].map((item) => <p key={item} className="mb-3">{item}</p>)}</aside>
      </div>
    </Shell>
  );
}

function Dashboard({ palette, websiteType }: PreviewProps) {
  return <Shell palette={palette}><div className="grid min-h-[580px] rounded-xl border border-white/10 bg-[#0a0a0a] lg:grid-cols-[76px_1fr]"><aside className="border-r border-white/10 p-3">{[Home, BarChart3, Package, User].map((Icon, i) => <div key={i} className={`mb-3 grid h-11 place-items-center rounded-md ${i === 1 ? "bg-white text-black" : "text-white/45"}`}><Icon className="h-4 w-4" /></div>)}</aside><main className="p-6"><p className="text-xs text-white/45">{websiteType.name}</p><h3 className="text-3xl font-black tracking-[-0.05em]">Telemetry dashboard</h3><div className="mt-6 grid gap-3 md:grid-cols-3">{["Requests", "Latency", "Uptime"].map((item, i) => <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-5"><p className="text-xs text-white/45">{item}</p><p className="mt-4 text-3xl font-black">{i === 0 ? "1.2M" : i === 1 ? "42ms" : "99.9%"}</p></div>)}</div><div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]"><div className="rounded-xl border border-white/10 bg-white/[0.03] p-5"><div className="flex h-52 items-end gap-2">{[38, 65, 52, 86, 74, 100, 82, 96].map((h, i) => <span key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, backgroundColor: i === 5 ? palette.primary : "rgba(255,255,255,.12)" }} />)}</div></div><div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">{["Auth passed", "Webhook sent", "Deploy synced"].map((item) => <div key={item} className="mb-4 flex items-center gap-3 text-xs text-white/60"><Check className="h-4 w-4" style={{ color: palette.success }} />{item}</div>)}</div></div></main></div></Shell>;
}

function Login({ palette }: PreviewProps) { return <Shell palette={palette}><div className="grid min-h-[580px] place-items-center"><div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-7"><KeyRound className="mb-6 h-10 w-10 rounded-md bg-white p-2 text-black" /><h3 className="text-3xl font-black tracking-[-0.05em]">API Access</h3><input className="mt-7 w-full rounded-md border border-white/10 bg-black px-4 py-3 text-xs" placeholder="token@workspace.dev" /><button className="mt-4 w-full rounded-md py-3 text-xs font-bold" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>Authenticate</button></div></div></Shell>; }
function Pricing({ palette }: PreviewProps) { return <Shell palette={palette}><h3 className="text-center text-5xl font-black tracking-[-0.06em]">Usage based pricing</h3><div className="mt-10 grid gap-4 md:grid-cols-3">{["Hobby", "Team", "Scale"].map((item, i) => <div key={item} className="rounded-xl border border-white/10 bg-white/[0.03] p-6"><p className="text-sm">{item}</p><p className="mt-7 text-4xl font-black">${i === 0 ? 0 : i === 1 ? 29 : 99}</p><button className="mt-7 w-full rounded-md py-3 text-xs font-bold" style={{ backgroundColor: i === 1 ? palette.primary : "rgba(255,255,255,.08)", color: i === 1 ? readableOn(palette.primary) : "#fff" }}>Start</button></div>)}</div></Shell>; }
function Product({ palette }: PreviewProps) { return <Shell palette={palette}><div className="grid min-h-[580px] place-items-center"><div className="w-full max-w-md rounded-xl border border-white/10 bg-white/[0.03] p-5"><div className="rounded-lg border border-white/10 bg-black p-4"><FileText className="mb-10 h-8 w-8" style={{ color: palette.primary }} /><pre className="text-xs leading-6 text-white/60">export const tokens = {'{'}{"\n"}  primary: &quot;{palette.primary}&quot;{"\n"}{'}'}</pre></div><button className="mt-5 w-full rounded-md py-3 text-xs font-bold" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>Copy kit</button></div></div></Shell>; }
function MobileApp({ palette }: PreviewProps) { return <Shell palette={palette}><div className="grid min-h-[600px] place-items-center"><div className="w-[300px] rounded-[2.4rem] border-8 border-white/10 bg-black p-4"><Terminal className="mb-8 h-7 w-7" style={{ color: palette.primary }} /><h3 className="text-3xl font-black tracking-[-0.06em]">CLI status</h3><div className="mt-5 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-xs text-white/60">Build complete</div><div className="mt-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-xs text-white/60">Preview synced</div></div></div></Shell>; }

export const developerDocsTheme: ThemePreview = { id: "developer-docs", label: "Developer Docs", vibeIds: ["vercel-inspired", "notion-inspired", "stripe-inspired", "fintech-trust", "modern-saas"], render: { "Landing Page": Landing, Dashboard, "Login Page": Login, "Pricing Page": Pricing, "Product Card": Product, "Mobile App": MobileApp } };
