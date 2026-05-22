"use client";

import Link from "next/link";
import { ArrowRight, Wand2 } from "lucide-react";
import { useEffect, useState } from "react";

const quickLinks = ["Resources", "Documentation", "Customers", "Blog", "Pricing"];

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const preview = document.getElementById("preview");
      const threshold = preview ? preview.offsetTop - 92 : 520;
      setScrolled(window.scrollY >= threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${scrolled ? "border-white/10 bg-[#050806]" : "border-transparent bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#00d4a4] text-[#06100d] shadow-[0_0_28px_rgba(0,212,164,0.36)]">
            <Wand2 className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold text-white">VibeDesign AI</span>
        </Link>

        <nav className="hidden items-center gap-7 text-xs font-medium text-white/70 lg:flex">
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
      </div>
    </header>
  );
}
