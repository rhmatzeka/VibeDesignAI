import type { PromptMode } from "./types";

const modeInstructions: Record<PromptMode, string> = {
  "Build Landing Page": "Build a responsive landing page with hero, feature sections, proof, pricing or CTA, and footer.",
  "Build Dashboard": "Build a responsive dashboard with sidebar, topbar, metrics, charts, tables, activity feed, and settings-like controls.",
  "Redesign Existing Website": "Redesign the existing website while preserving content hierarchy and applying the DESIGN.md consistently.",
  "Build SaaS App": "Build a SaaS application shell with marketing page, app dashboard, reusable components, and polished empty states.",
  "Build Portfolio": "Build a personal portfolio with hero, selected work, case studies, skills, writing or experience, and contact section.",
  "Build Online Store": "Build an online store with product grid, product cards, cart-ready CTAs, offer sections, and trust signals."
};

export function generateAgentPrompt(mode: PromptMode, designMd: string) {
  return `${modeInstructions[mode]}

Follow the color system, typography, spacing, component rules, visual effects, and accessibility rules from the DESIGN.md below.
Do not introduce random colors.
Do not ignore the visual direction.
Make the UI modern, clean, responsive, and production-ready.
Use reusable components.
Make sure all pages are visually consistent.
Use semantic HTML and accessible focus states.
Prefer real working UI structure over decorative placeholders.

Here is the DESIGN.md:

${designMd}`;
}
