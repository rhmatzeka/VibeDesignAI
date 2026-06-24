import { BarChart3, Home, Lock, Package, User } from "lucide-react";
import type { ThemePreview, PreviewProps } from "../types";
import { getLandingCopy, readableOn, Rating } from "../utils";

function HeroShell({ children, palette }: { children: React.ReactNode; palette: PreviewProps["palette"] }) {
  return (
    <div className="relative min-h-[620px] overflow-hidden bg-[#060606] p-6 text-white">
      <div className="absolute -left-28 top-16 h-72 w-72 rounded-full blur-3xl" style={{ backgroundColor: `${palette.primary}55` }} />
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full blur-3xl" style={{ backgroundColor: `${palette.accent}45` }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Landing(props: PreviewProps) {
  const { palette, vibe, websiteType } = props;
  const copy = getLandingCopy(websiteType);
  return (
    <HeroShell palette={palette}>
      <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
        <div className="font-bold tracking-[-0.04em]">VibeSite</div>
        <div className="hidden gap-6 text-xs text-white/60 sm:flex"><span>Showcase</span><span>Pricing</span><span>Docs</span></div>
        <button className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black">Get started</button>
      </nav>
      <section className="pt-14">
        <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: palette.accent }}>{vibe.name}</p>
        <h3 className="mt-4 max-w-4xl text-6xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl">{copy.title}</h3>
        <p className="mt-6 max-w-xl text-lg leading-7 text-white/62">{copy.kicker}. Built with dramatic spacing, bold artboard blocks, and focused conversion paths.</p>
        <div className="mt-9 flex gap-3"><button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">{copy.cta}</button><button className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white">Watch demo</button></div>
      </section>
      <div className="mt-14 grid gap-4 md:grid-cols-3">{copy.items.map((item, index) => <div key={item} className="min-h-52 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md"><p className="text-5xl font-black tracking-[-0.08em]" style={{ color: index === 1 ? palette.primary : palette.accent }}>0{index + 1}</p><p className="mt-10 text-xl font-bold tracking-[-0.04em]">{item}</p></div>)}</div>
    </HeroShell>
  );
}

function Dashboard({ palette, websiteType }: PreviewProps) {
  return <HeroShell palette={palette}><div className="grid gap-5 lg:grid-cols-[88px_1fr]"><aside className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-4">{[Home, BarChart3, Package, User].map((Icon, i) => <div key={i} className={`mb-3 grid h-12 place-items-center rounded-2xl ${i === 1 ? "bg-white text-black" : "text-white/60"}`}><Icon className="h-4 w-4" /></div>)}</aside><main><p className="text-white/50">{websiteType.name}</p><h3 className="text-5xl font-black tracking-[-0.08em]">Live control room</h3><div className="mt-7 grid gap-4 md:grid-cols-3">{["Launches", "Users", "Revenue"].map((item, i) => <div key={item} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6"><p className="text-white/50">{item}</p><p className="mt-5 text-4xl font-black tracking-[-0.06em]">{i === 0 ? 28 : i === 1 ? "18k" : "$42k"}</p></div>)}</div><div className="mt-4 rounded-[2rem] border border-white/10 bg-white/[0.06] p-6"><div className="flex h-52 items-end gap-3">{[30, 70, 45, 90, 55, 100, 76].map((height, i) => <span key={i} className="flex-1 rounded-full" style={{ height: `${height}%`, backgroundColor: i === 5 ? palette.accent : "rgba(255,255,255,.18)" }} />)}</div></div></main></div></HeroShell>;
}

function Login({ palette }: PreviewProps) { return <HeroShell palette={palette}><div className="grid min-h-[540px] place-items-center"><div className="w-full max-w-sm rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 backdrop-blur-xl"><Lock className="mb-6 h-11 w-11 rounded-2xl bg-white p-3 text-black" /><h3 className="text-4xl font-black tracking-[-0.08em]">Sign in.</h3><input className="mt-7 w-full rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none" placeholder="Email" /><input className="mt-3 w-full rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm outline-none" placeholder="Password" /><button className="mt-5 w-full rounded-full bg-white py-3 text-sm font-semibold text-black">Continue</button></div></div></HeroShell>; }
function Pricing({ palette }: PreviewProps) { return <HeroShell palette={palette}><h3 className="text-center text-6xl font-black tracking-[-0.08em]">Plans with punch.</h3><div className="mt-10 grid gap-4 md:grid-cols-3">{["Free", "Pro", "Scale"].map((item, i) => <div key={item} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7"><p className="text-xl font-bold">{item}</p><p className="mt-8 text-5xl font-black tracking-[-0.08em]">${i === 0 ? 0 : i === 1 ? 19 : 59}</p><button className="mt-8 w-full rounded-full bg-white py-3 text-sm font-semibold text-black">Choose</button></div>)}</div></HeroShell>; }
function Product({ palette }: PreviewProps) { return <HeroShell palette={palette}><div className="grid min-h-[540px] place-items-center"><div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.08] p-5"><div className="h-64 rounded-[1.5rem]" style={{ background: `radial-gradient(circle at 35% 30%, ${palette.accent}, transparent 30%), linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }} /><div className="mt-5 flex justify-between"><div><p className="text-2xl font-black tracking-[-0.05em]">Builder pack</p><Rating palette={palette} /></div><p className="text-2xl font-black">$39</p></div></div></div></HeroShell>; }
function MobileApp({ palette }: PreviewProps) { return <HeroShell palette={palette}><div className="grid min-h-[560px] place-items-center"><div className="w-[300px] rounded-[2.7rem] border-[10px] border-white/10 bg-black p-4 shadow-2xl"><div className="mx-auto h-6 w-24 rounded-full bg-white/10" /><h3 className="mt-8 text-4xl font-black tracking-[-0.08em]">Today</h3><div className="mt-6 rounded-[2rem] p-5" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary) }}>Creative system ready</div><div className="mt-4 grid gap-3">{["Tasks", "Preview"].map((item) => <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-semibold">{item}</div>)}</div></div></div></HeroShell>; }

export const framerDarkTheme: ThemePreview = { id: "framer-dark", label: "Dark Builder", vibeIds: ["dark-premium", "futuristic-ai", "cyberpunk", "gaming-neon", "dark-anime", "creative-agency", "spotify-inspired", "vercel-inspired", "netflix-inspired"], render: { "Landing Page": Landing, Dashboard, "Login Page": Login, "Pricing Page": Pricing, "Product Card": Product, "Mobile App": MobileApp } };
