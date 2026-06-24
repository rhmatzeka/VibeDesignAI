import { BarChart3, Home, Lock, Package, User } from "lucide-react";
import type { ThemePreview, PreviewProps } from "../types";
import { FeaturePill, getLandingCopy, readableOn } from "../utils";

function Landing({ palette, websiteType, vibe }: PreviewProps) {
  const copy = getLandingCopy(websiteType);
  return (
    <div className="min-h-[620px] bg-[#f5f5f7] p-5 text-[#1d1d1f]">
      <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full bg-white/80 px-5 py-3 text-xs shadow-[0_18px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <div className="font-semibold tracking-tight">VibeSite</div>
        <div className="hidden gap-7 text-[#6e6e73] sm:flex"><span>Overview</span><span>Gallery</span><span>Compare</span></div>
        <button className="rounded-full px-4 py-2 text-xs font-medium" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>{copy.cta}</button>
      </nav>
      <section className="mx-auto max-w-5xl pt-14 text-center">
        <p className="text-sm font-semibold" style={{ color: palette.primary }}>{vibe.name}</p>
        <h3 className="mx-auto mt-3 max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.05em] sm:text-6xl">{copy.title}</h3>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#6e6e73]">{copy.kicker}. Minimal chrome, generous whitespace, and product-first presentation.</p>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-h-72 rounded-[2rem] bg-white p-7 text-left shadow-[0_28px_70px_rgba(0,0,0,0.10)]">
            <div className="h-44 rounded-[1.5rem]" style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary}, ${palette.accent})` }} />
            <div className="mt-6 flex flex-wrap gap-2">{copy.items.map((item) => <FeaturePill key={item} label={item} palette={palette} />)}</div>
          </div>
          <div className="grid gap-4">
            {copy.items.map((item, index) => (
              <div key={item} className="rounded-[1.5rem] bg-white p-5 text-left shadow-[0_18px_50px_rgba(0,0,0,0.08)]">
                <p className="text-3xl font-semibold">0{index + 1}</p>
                <p className="mt-3 font-semibold">{item}</p>
                <p className="mt-1 text-sm text-[#86868b]">Clean product tile with precise spacing.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Dashboard({ palette, websiteType }: PreviewProps) {
  return (
    <div className="min-h-[560px] bg-[#f5f5f7] p-5 text-[#1d1d1f]">
      <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-[1.7rem] bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.07)]">
          <div className="mb-8 h-10 w-10 rounded-full" style={{ backgroundColor: palette.primary }} />
          {[Home, BarChart3, Package, User].map((Icon, index) => <div key={index} className={`mb-2 flex items-center gap-3 rounded-full px-3 py-2 text-sm ${index === 1 ? "bg-[#f5f5f7] font-semibold" : "text-[#6e6e73]"}`}><Icon className="h-4 w-4" />Section</div>)}
        </aside>
        <main className="rounded-[1.7rem] bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.07)]">
          <p className="text-sm text-[#6e6e73]">{websiteType.name}</p>
          <h3 className="mt-1 text-3xl font-semibold tracking-tight">Performance Overview</h3>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">{["Revenue", "Visitors", "Tasks"].map((item, i) => <div key={item} className="rounded-[1.3rem] bg-[#f5f5f7] p-5"><p className="text-sm text-[#6e6e73]">{item}</p><p className="mt-3 text-3xl font-semibold">{i === 0 ? "$42k" : i === 1 ? "18.4k" : "92%"}</p></div>)}</div>
          <div className="mt-4 h-56 rounded-[1.3rem] bg-[#f5f5f7] p-5"><div className="flex h-full items-end gap-3">{[42, 64, 48, 88, 72, 96, 78].map((height, i) => <span key={i} className="flex-1 rounded-full" style={{ height: `${height}%`, backgroundColor: i === 5 ? palette.primary : "#d2d2d7" }} />)}</div></div>
        </main>
      </div>
    </div>
  );
}

function Login({ palette }: PreviewProps) {
  return <div className="grid min-h-[560px] place-items-center bg-[#f5f5f7] p-6 text-[#1d1d1f]"><div className="w-full max-w-sm rounded-[2rem] bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.12)]"><Lock className="mb-6 h-10 w-10 rounded-full p-2" style={{ backgroundColor: "#f5f5f7", color: palette.primary }} /><h3 className="text-3xl font-semibold tracking-tight">Welcome back.</h3><p className="mt-2 text-sm text-[#6e6e73]">Sign in to continue your polished workflow.</p><div className="mt-7 space-y-3"><input className="w-full rounded-full border border-[#e0e0e0] px-4 py-3 text-sm outline-none" placeholder="Email address" /><input className="w-full rounded-full border border-[#e0e0e0] px-4 py-3 text-sm outline-none" placeholder="Password" type="password" /></div><button className="mt-5 w-full rounded-full py-3 text-sm font-medium" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>Continue</button></div></div>;
}

function Pricing({ palette }: PreviewProps) {
  return <div className="min-h-[560px] bg-[#f5f5f7] p-6 text-[#1d1d1f]"><div className="mx-auto max-w-4xl text-center"><h3 className="text-5xl font-semibold tracking-[-0.05em]">Choose your plan.</h3><div className="mt-8 grid gap-4 md:grid-cols-3">{["Basic", "Pro", "Studio"].map((plan, i) => <div key={plan} className="rounded-[1.7rem] bg-white p-6 text-left shadow-[0_18px_50px_rgba(0,0,0,0.08)]"><p className="font-semibold">{plan}</p><p className="mt-5 text-4xl font-semibold">${i === 0 ? 0 : i === 1 ? 19 : 49}</p><button className="mt-8 w-full rounded-full py-3 text-sm font-medium" style={{ backgroundColor: i === 1 ? palette.primary : "#f5f5f7", color: i === 1 ? readableOn(palette.primary) : "#1d1d1f" }}>Get started</button></div>)}</div></div></div>;
}

function Product({ palette }: PreviewProps) {
  return <div className="grid min-h-[560px] place-items-center bg-[#f5f5f7] p-6 text-[#1d1d1f]"><div className="w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.12)]"><div className="h-72" style={{ background: `radial-gradient(circle at 50% 20%, ${palette.accent}, transparent 35%), linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }} /><div className="p-6"><p className="text-sm text-[#6e6e73]">New collection</p><h3 className="mt-1 text-2xl font-semibold">Premium Design Kit</h3><button className="mt-6 rounded-full px-5 py-3 text-sm font-medium" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>Buy now</button></div></div></div>;
}

function MobileApp({ palette }: PreviewProps) {
  return <div className="grid min-h-[600px] place-items-center bg-[#f5f5f7] p-6"><div className="w-[300px] rounded-[2.7rem] border-[10px] border-black bg-white p-4 text-[#1d1d1f] shadow-2xl"><div className="mx-auto mb-6 h-6 w-24 rounded-full bg-black" /><h3 className="text-3xl font-semibold tracking-tight">Today</h3><p className="text-sm text-[#6e6e73]">Your creative summary</p><div className="mt-6 rounded-[1.5rem] p-5" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}><p className="text-xs opacity-80">Active design</p><p className="mt-2 text-xl font-semibold">Preview system</p></div><div className="mt-4 grid gap-3">{["Palette", "Exports"].map((item) => <div key={item} className="rounded-2xl bg-[#f5f5f7] p-4 text-sm font-semibold">{item}</div>)}</div></div></div>;
}

export const appleGalleryTheme: ThemePreview = {
  id: "apple-gallery",
  label: "Apple Gallery",
  vibeIds: ["apple-inspired", "minimal-clean", "soft-pastel", "calm-wellness"],
  render: {
    "Landing Page": Landing,
    Dashboard,
    "Login Page": Login,
    "Pricing Page": Pricing,
    "Product Card": Product,
    "Mobile App": MobileApp
  }
};
