import type { ColorPalette, VibePreset, WebsiteType } from "./types";

const labels: Record<keyof ColorPalette, string> = {
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
  background: "Background",
  surface: "Surface",
  card: "Card",
  textPrimary: "Text Primary",
  textSecondary: "Text Secondary",
  border: "Border",
  success: "Success",
  warning: "Warning",
  danger: "Danger",
  muted: "Muted",
  input: "Input"
};

export function generateDesignMd({
  websiteType,
  vibe,
  palette,
  mixedDescription
 }: {
  websiteType: WebsiteType;
  vibe: VibePreset;
  palette: ColorPalette;
  mixedDescription: string;
}) {
  const colorRows = (Object.keys(palette) as Array<keyof ColorPalette>)
    .map((key) => `| ${labels[key]} | \`${palette[key]}\` | ${usageForColor(key)} |`)
    .join("\n");

  const cssVariables = Object.keys(palette)
    .map((key) => `  --color-${cssName(key as keyof ColorPalette)}: ${palette[key as keyof ColorPalette]};`)
    .join("\n");

  return `# DESIGN.md

This is the official design system specification for the **${websiteType.name}** project, generated using VibeDesign AI. Use this specification to ensure complete visual consistency during UI implementation.

---

## 1. Project & Brand Identity

- **Category / Layout Suggestion**: **${websiteType.name}**
- **Brand Vibe Theme**: **${vibe.name}**
- **Emotional Mood / Tone**: ${vibe.mood.join(", ")}
- **Mixed Direction Description**: ${mixedDescription}

### Expected User Journey & Purpose
The website should communicate a clear, focused purpose. Its page structure, typography, and color tokens must work together to lead visitors toward key actions. The page composition follows this structured layout flow:
*${websiteType.layoutSuggestion}*

---

## 2. Typography Specification

Headings and UI text follow the brand-specified typographic constraints:

| Typography Role | Style Specifications |
| :--- | :--- |
| **Interface Headings** | Sans-serif (Inter, Geist Sans, or system UI), semi-bold to bold (600–700 weight), tight tracking (-1.5% to -2%), line-height 1.1–1.2 |
| **Body Prose / Details** | Sans-serif (Inter or system UI), regular to medium (400–500 weight), line-height 1.5–1.6 for scanning |
| **Code / JSON / Technical** | Geist Mono (or system monospace), regular (400 weight), tight line-height |

*Preset Inspiration:* ${vibe.typography}

---

## 3. Color Token System

Use these exact tokens. Do not invent arbitrary colors. If hover, active, or disabled states require variation, derive them by adjusting the alpha opacity or brightness of these tokens.

| Token | HEX Code | Role & Usage |
| :--- | :--- | :--- |
${colorRows}

---

## 4. Component Implementation Rules

### Buttons & CTAs
- **Primary CTA**: Styled with \`Primary\` background (\`${palette.primary}\`) and readable text (\`readableOn(Primary)\`). Rounded-full (pill-style) or rounded-lg with subtle hover lifts (\`hover:-translate-y-0.5\`) and active compression.
- **Secondary CTA**: Styled with transparent background, outline border using \`Border\`, and \`Text Primary\`.

### Containers & Cards
- **Content Cards**: Use \`Card\` background (\`${palette.card}\`) and subtle hairline borders with \`Border\` (\`${palette.border}\`). Maintain a unified corner radius.
- **Section Breaks / Groups**: Grouped content areas or sidebars use the \`Surface\` background (\`${palette.surface}\`) for separation.

### Form Fields
- **Text Inputs / Selects**: Styled with \`Input\` background (\`${palette.input}\`), outlines using \`Border\`, and clear focus states with \`Primary\`.

*Website Type Component emphasis:* ${websiteType.componentSuggestion}

---

## 5. Visual Effects & Spacing

- **Corner Softening**: Components follow this principle: *${vibe.componentStyle}*
- **Drop Shadows & Glows**: Visual effects follow this principle: *${vibe.visualEffects}*
- **Transitions**: Keep hover animations smooth and fast (between 150ms and 220ms).
- **Responsive Paddings**: Mobile viewports use 16px horizontal gutters; tablet/desktop viewports scale to 24px and 32px respectively.

---

## 6. Code & Export Tokens

### CSS Variables
\`\`\`css
:root {
${cssVariables}
}
\`\`\`

### Tailwind Config Extend
\`\`\`js
theme: {
  extend: {
    colors: {
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      accent: "var(--color-accent)",
      background: "var(--color-background)",
      surface: "var(--color-surface)",
      card: "var(--color-card)",
      border: "var(--color-border)",
      muted: "var(--color-muted)",
      success: "var(--color-success)",
      warning: "var(--color-warning)",
      danger: "var(--color-danger)"
    }
  }
}
\`\`\`

---

## 7. Do's and Don'ts

### ✅ Do:
- Maintain clear visual contrast ratios between text and background.
- Follow the color token tables exactly.
- Keep components responsive and mobile-friendly.

### ❌ Don't:
- Do not introduce random hex codes outside this specification.
- Do not mix unrelated visual guidelines in the same view.
- Do not use low-contrast text on primary buttons or headers.
`;
}

function cssName(key: keyof ColorPalette) {
  return key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function usageForColor(token: keyof ColorPalette) {
  const usage: Record<keyof ColorPalette, string> = {
    primary: "Main CTA background, active navigation state, key brand highlights.",
    secondary: "Supporting buttons, secondary badges, charts, and content markers.",
    accent: "Focus rings, highlight borders, special annotations, attention states.",
    background: "Main page canvas background.",
    surface: "Grouped sections, panels, sidebars, page dividers.",
    card: "Content cards, pricing cards, dashboard widgets, modal dialog panels.",
    textPrimary: "Headings, main titles, buttons labels, primary readability copy.",
    textSecondary: "Descriptions, helper text, captions, secondary details.",
    border: "Subtle borders, outlines, hairline dividers, boundaries.",
    success: "Success states, completed indicators, success badges.",
    warning: "Caution statuses, warning alerts, attention indicators.",
    danger: "Errors, destructive buttons, critical alerts.",
    muted: "Placeholders, disabled inputs, quiet metadata, low-priority details.",
    input: "Form fields backgrounds, select dropdowns, editable boxes."
  };
  return usage[token];
}