import { Crosshair, Gamepad2, Home, Lock, Shield, Swords, Trophy, User, Zap } from "lucide-react";
import type { ThemePreview, PreviewProps } from "../types";
import { getLandingCopy, readableOn } from "../utils";

function Arena({ children, palette }: { children: React.ReactNode; palette: PreviewProps["palette"] }) {
  return (
    <div className="relative min-h-[620px] overflow-hidden bg-[#050014] p-6 font-sans text-white">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full blur-3xl" style={{ backgroundColor: `${palette.primary}55` }} />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full blur-3xl" style={{ backgroundColor: `${palette.accent}45` }} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Landing({ palette, websiteType, vibe }: PreviewProps) {
  const copy = getLandingCopy(websiteType);
  return (
    <Arena palette={palette}>
      <nav className="flex items-center justify-between border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-xl [clip-path:polygon(0_0,98%_0,100%_35%,100%_100%,2%_100%,0_65%)]">
        <div className="flex items-center gap-3 font-black uppercase tracking-[0.2em]"><Gamepad2 className="h-5 w-5" style={{ color: palette.accent }} />ARENA</div>
        <button className="px-5 py-2 text-xs font-black uppercase tracking-[0.2em]" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary), boxShadow: `0 0 32px ${palette.primary}66` }}>{copy.cta}</button>
      </nav>
      <section className="pt-14">
        <div className="mb-5 inline-flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-1 text-xs font-black uppercase tracking-[0.25em]"><Zap className="h-3.5 w-3.5" style={{ color: palette.accent }} />{vibe.name}</div>
        <h3 className="max-w-4xl text-6xl font-black uppercase leading-[0.86] tracking-[-0.07em] sm:text-7xl">{copy.title}</h3>
        <p className="mt-6 max-w-xl text-base leading-7 text-white/62">{copy.kicker}. Neon contrast, tournament energy, sharp panels, and cinematic calls to action.</p>
        <div className="mt-9 flex gap-3"><button className="px-6 py-3 text-sm font-black uppercase tracking-[0.16em]" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary), boxShadow: `0 0 34px ${palette.primary}66` }}>Join now</button><button className="border border-white/15 px-6 py-3 text-sm font-black uppercase tracking-[0.16em]">Watch trailer</button></div>
      </section>
      <div className="mt-12 grid gap-4 md:grid-cols-3">{copy.items.map((item, i) => <div key={item} className="border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md [clip-path:polygon(0_0,94%_0,100%_18%,100%_100%,6%_100%,0_82%)]"><p className="text-5xl font-black" style={{ color: i === 1 ? palette.primary : palette.accent }}>0{i + 1}</p><p className="mt-8 text-xl font-black uppercase tracking-[-0.04em]">{item}</p></div>)}</div>
    </Arena>
  );
}

function Dashboard({ palette }: PreviewProps) {
  return (
    <Arena palette={palette}>
      <div className="grid min-h-[560px] gap-5 lg:grid-cols-[86px_1fr]">
        <aside className="border border-white/10 bg-black/45 p-4">
          {[Home, Crosshair, Shield, User].map((Icon, i) => (
            <div key={i} className="mb-4 grid h-12 place-items-center" style={{ backgroundColor: i === 1 ? palette.primary : "rgba(255,255,255,.06)", color: i === 1 ? "#000" : "#fff" }}>
              <Icon className="h-5 w-5" />
            </div>
          ))}
        </aside>
        <main>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] style={{ color: palette.accent }}">Season live</p>
              <h3 className="text-5xl font-black uppercase tracking-[-0.07em]">Command center</h3>
            </div>
            <Trophy className="h-10 w-10" style={{ color: palette.primary }} />
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {["Players", "Kills", "Wins"].map((item, i) => (
              <div key={item} className="border border-white/10 bg-white/[0.05] p-6">
                <p className="text-white/50">{item}</p>
                <p className="mt-4 text-4xl font-black">{i === 0 ? "24k" : i === 1 ? "981k" : 128}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <div className="border border-white/10 bg-white/[0.05] p-6">
              <div className="flex h-52 items-end gap-2">
                {[35, 80, 45, 95, 55, 100, 70, 90].map((h, i) => (
                  <span key={i} className="flex-1" style={{ height: `${h}%`, backgroundColor: i === 5 ? palette.primary : "rgba(255,255,255,.12)", boxShadow: i === 5 ? `0 0 24px ${palette.primary}` : "none" }} />
                ))}
              </div>
            </div>
            <div className="border border-white/10 bg-white/[0.05] p-6">
              {["Squad online", "Loot claimed", "Boss defeated"].map((item) => (
                <div key={item} className="mb-4 flex items-center gap-3 text-sm text-white/70">
                  <Swords className="h-4 w-4" style={{ color: palette.accent }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </Arena>
  );
}

function Login({ palette }: PreviewProps) {
  return (
    <Arena palette={palette}>
      <div className="grid min-h-[560px] place-items-center">
        <div className="w-full max-w-sm border border-white/10 bg-black/55 p-7 [clip-path:polygon(0_0,96%_0,100%_10%,100%_100%,4%_100%,0_90%)]">
          <Lock className="mb-6 h-10 w-10" style={{ color: palette.accent }} />
          <h3 className="text-4xl font-black uppercase tracking-[-0.06em]">Player Login</h3>
          <input className="mt-7 w-full border border-white/10 bg-[#050014] px-4 py-3 text-xs outline-none" placeholder="Username" />
          <input className="mt-3 w-full border border-white/10 bg-[#050014] px-4 py-3 text-xs outline-none" placeholder="Password" type="password" />
          <button className="mt-6 w-full py-3 text-xs font-black uppercase tracking-[0.2em]" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary), boxShadow: `0 0 20px ${palette.primary}55` }}>
            Launch Game
          </button>
        </div>
      </div>
    </Arena>
  );
}

function Pricing({ palette }: PreviewProps) {
  return (
    <Arena palette={palette}>
      <h3 className="text-center text-6xl font-black uppercase tracking-[-0.08em]">Battle pass</h3>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {["Standard", "Elite", "Legendary"].map((item, i) => (
          <div key={item} className="border border-white/10 bg-black/55 p-7 [clip-path:polygon(0_0,94%_0,100%_14%,100%_100%,6%_100%,0_86%)]">
            <p className="text-lg font-black uppercase tracking-[0.1em]" style={{ color: palette.accent }}>{item}</p>
            <p className="mt-6 text-5xl font-black tracking-[-0.08em]">${i === 0 ? 0 : i === 1 ? 10 : 25}</p>
            <button className="mt-8 w-full py-3 text-xs font-black uppercase tracking-[0.2em]" style={{ backgroundColor: i === 1 ? palette.primary : "transparent", color: i === 1 ? readableOn(palette.primary) : "#fff", border: i === 1 ? "none" : "1px solid rgba(255,255,255,.15)" }}>
              Buy pass
            </button>
          </div>
        ))}
      </div>
    </Arena>
  );
}

function Product({ palette }: PreviewProps) {
  return (
    <Arena palette={palette}>
      <div className="grid min-h-[540px] place-items-center">
        <div className="w-full max-w-sm border border-white/10 bg-black/55 p-5 [clip-path:polygon(0_0,94%_0,100%_12%,100%_100%,6%_100%,0_88%)]">
          <div className="h-64 flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }}>
            <Crosshair className="h-16 w-16 opacity-30 animate-pulse text-white" />
          </div>
          <div className="mt-5 flex justify-between items-center">
            <div>
              <p className="text-2xl font-black uppercase tracking-[-0.05em]">Neon Skin Pack</p>
              <p className="text-xs text-white/50">Exclusive cosmetic bundle</p>
            </div>
            <p className="text-2xl font-black text-white">$15</p>
          </div>
          <button className="mt-6 w-full py-3 text-xs font-black uppercase tracking-[0.2em]" style={{ backgroundColor: palette.primary, color: readableOn(palette.primary), boxShadow: `0 0 20px ${palette.primary}55` }}>
            Claim Pack
          </button>
        </div>
      </div>
    </Arena>
  );
}

function MobileApp({ palette, vibe }: PreviewProps) {
  return (
    <Arena palette={palette}>
      <div className="grid min-h-[560px] place-items-center">
        <div className="w-[300px] rounded-[2.7rem] border-[10px] border-slate-900 bg-[#050014] p-4 shadow-2xl">
          <div className="mx-auto h-6 w-24 rounded-full bg-slate-950" />
          <h3 className="mt-8 text-4xl font-black uppercase tracking-[-0.08em]">HUD</h3>
          <p className="text-xs text-white/50">Companion app</p>
          <div className="mt-6 p-5 border border-white/10 bg-white/[0.05]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Vibe status</p>
            <p className="mt-1 text-xl font-bold uppercase tracking-[-0.04em]" style={{ color: palette.accent }}>{vibe.name}</p>
          </div>
          <div className="mt-4 grid gap-3">
            {["Lobby status", "Live match feed"].map((item) => (
              <div key={item} className="border border-white/10 bg-white/[0.04] p-4 text-xs font-black uppercase tracking-[-0.02em]">{item}</div>
            ))}
          </div>
        </div>
      </div>
    </Arena>
  );
}

export const gamingNeonTheme: ThemePreview = {
  id: "gaming-neon",
  label: "Gaming Neon",
  vibeIds: ["gaming-neon", "cyberpunk", "dark-anime", "spotify-inspired"],
  render: {
    "Landing Page": Landing,
    Dashboard,
    "Login Page": Login,
    "Pricing Page": Pricing,
    "Product Card": Product,
    "Mobile App": MobileApp
  }
};
