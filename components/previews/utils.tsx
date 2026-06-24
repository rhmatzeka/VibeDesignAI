import { Check, Star } from "lucide-react";
import type { ColorPalette, WebsiteType } from "@/lib/types";

export function readableOn(hex: string) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#0F172A" : "#FFFFFF";
}

export function getLandingCopy(websiteType: WebsiteType) {
  if (["coffee", "restaurant"].includes(websiteType.id)) {
    return { title: "Slow mornings, warm tables, unforgettable taste", kicker: "Local hospitality", cta: "Reserve a Table", items: ["Signature menu", "Chef favorites", "Warm interiors"] };
  }
  if (["portfolio", "agency"].includes(websiteType.id)) {
    return { title: "Selected work for brands that need sharper digital systems", kicker: "Creative studio", cta: "View Work", items: ["Case studies", "Process", "Client proof"] };
  }
  if (["gaming", "event"].includes(websiteType.id)) {
    return { title: "Enter the arena where every second feels legendary", kicker: "Live season", cta: "Join Match", items: ["Ranked squads", "Live battles", "Reward drops"] };
  }
  if (["education", "course"].includes(websiteType.id)) {
    return { title: "Learn faster with structured lessons and visual progress", kicker: "Learning path", cta: "Start Learning", items: ["Modules", "Quizzes", "Certificates"] };
  }
  if (["marketplace", "online-store", "digital-store"].includes(websiteType.id)) {
    return { title: "Discover premium assets built to ship your next idea", kicker: "Creator marketplace", cta: "Browse Assets", items: ["Instant download", "Curated packs", "Secure checkout"] };
  }
  return { title: "Launch a product experience that feels designed from day one", kicker: "Product system", cta: "Start Building", items: ["Product clarity", "Component rhythm", "Export ready"] };
}

export function FeaturePill({ label, palette }: { label: string; palette: ColorPalette }) {
  return (
    <div className="flex items-center gap-2 rounded-full border px-3 py-1 text-xs" style={{ borderColor: palette.border, color: palette.textSecondary }}>
      <Check className="h-3.5 w-3.5" style={{ color: palette.accent }} />
      {label}
    </div>
  );
}

export function Rating({ palette }: { palette: ColorPalette }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((item) => <Star key={item} className="h-3.5 w-3.5 fill-current" style={{ color: palette.warning }} />)}
    </div>
  );
}
