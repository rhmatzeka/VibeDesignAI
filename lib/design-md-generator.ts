import type { ColorPalette, MixerState, VibePreset, WebsiteType } from "./types";

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
  mixer,
  mixedDescription
}: {
  websiteType: WebsiteType;
  vibe: VibePreset;
  palette: ColorPalette;
  mixer: MixerState;
  mixedDescription: string;
}) {
  const colorLines = (Object.keys(palette) as Array<keyof ColorPalette>)
    .map((key) => `- **${labels[key]}**: \`${palette[key]}\` - ${usageForColor(key)}`)
    .join("\n");

  return `# DESIGN.md

## Project Identity

This design system is for a **${websiteType.name}**. The website should communicate a clear purpose, present information with confidence, and help visitors understand what action to take next. Its primary goal is to turn a loose idea into a consistent production-ready interface that can be built by a frontend developer or AI coding agent without inventing a new visual language halfway through implementation.

The selected website type suggests this direction: ${websiteType.description} The page structure should respect the expected user journey for this category. Use the visual system to create a website that feels useful, polished, trustworthy, and easy to scan. The interface should avoid generic AI-generated sameness by committing to a specific mood, color role, component style, and spacing rhythm from the beginning.

## Brand Vibe

The selected vibe is **${vibe.name}**. It should feel ${vibe.mood.join(", ")}. ${vibe.description} The mixed vibe direction is: **${mixedDescription}**. This means the final website should not simply apply colors at random. It should use mood, spacing, typography, and component choices to reinforce one coherent personality.

The emotional direction should be intentional. Primary actions must feel obvious, content cards must feel consistent, and each page section should look like part of the same product family. The design should balance visual personality with usability. Do not sacrifice readability for decoration. If an effect does not help the user understand, trust, compare, or act, remove it.

## Design Inspiration

The design may take broad inspiration from modern digital products, premium SaaS interfaces, polished startup websites, refined dashboards, and contemporary AI tools. Inspiration should only inform the mood: clean hierarchy, careful spacing, consistent components, strong contrast, and smooth interactions. Do not copy any existing brand, logo, trademarked layout, exact color composition, or recognizable product UI.

For this project, the inspiration direction is best summarized as: ${vibe.layoutStyle} Components should follow this principle: ${vibe.componentStyle} Visual effects should follow this principle: ${vibe.visualEffects}

## Color System

Use the following color tokens exactly. Do not introduce random colors. If a new UI state is needed, derive it from these tokens by adjusting opacity, lightness, or alpha while keeping the same visual family.

${colorLines}

Color usage must be disciplined. The primary color is reserved for the most important action or active state. Secondary and accent colors should support hierarchy, not compete with the primary CTA. Background, surface, and card colors create depth. Text colors must always maintain readable contrast. Border and muted colors should be subtle enough to organize the interface without becoming decorative noise.

## Typography

Use a clean modern sans-serif typeface such as Inter, Geist Sans, or a strong system UI fallback. Headings should use 600 to 700 font weight with tight but readable line-height between 1.05 and 1.2. Body text should use 400 to 500 weight with line-height around 1.5 for comfortable reading. Captions, labels, and metadata should be smaller but never cramped.

Typography should create hierarchy before color does. Use large, clear headings for hero and section openings. Use medium-weight labels for cards, navigation, inputs, badges, and buttons. Button text should be concise, action-oriented, and visually centered. Avoid using too many font sizes. A reliable scale is 12, 14, 16, 18, 24, 32, 48, and 64 pixels depending on viewport.

The typography personality should follow this preset: ${vibe.typography}

## Layout Rules

The layout should be responsive and mobile-first. Use a maximum content width between 1120px and 1280px for marketing pages, with comfortable horizontal padding. Use 16px padding on small mobile screens, 24px on large mobile and tablet, and 32px or more on desktop. Sections should have enough vertical rhythm to feel deliberate, usually 64px to 96px on desktop and 40px to 56px on mobile.

For **${websiteType.name}**, follow this layout suggestion: ${websiteType.layoutSuggestion} Use grids only when they improve scanning and comparison. Feature sections can use 2 or 3 columns on desktop and collapse to one column on mobile. Dashboard-like areas should use denser spacing, but they still need consistent gutters and readable labels.

Never let fixed-width components break mobile layouts. Cards, tables, preview panels, navs, and forms must wrap or scroll intentionally. Keep primary CTAs visible early in the page. The first viewport should immediately communicate what the product or website offers.

## Component Styling

- **Button**: Use the primary color for the main CTA. Buttons should have strong contrast, clear focus rings, and comfortable padding. Use secondary buttons for lower-priority actions with border or surface treatment.
- **Card**: Cards use the Card token, thin borders, rounded corners, and consistent internal padding. Cards should not contain unnecessary nested cards.
- **Navbar**: Keep navigation clear, compact, and readable. Use Background or Surface depending on page depth. The active or primary action can use Primary.
- **Sidebar**: For dashboard or studio layouts, use Surface with Border. Active items should use a visible background and Primary or Accent indicator.
- **Form Input**: Inputs use the Input token, readable text, Border outline, and clear focus ring. Placeholder text should use Muted or Text Secondary.
- **Modal**: Modals use Card, strong overlay, clear title, direct actions, and no visual clutter.
- **Badge**: Badges use Accent, Secondary, Success, Warning, or Danger only when their meaning is clear.
- **Pricing Card**: Pricing cards must make plan comparison easy. Highlight one recommended option with Primary or Accent.
- **Dashboard Widget**: Widgets should be compact, information-rich, and aligned to a predictable grid.
- **Product Card**: Product cards need image area, name, price or value, supporting metadata, and one clear action.
- **Footer**: The footer should be quiet, organized, and lower contrast than the hero while remaining readable.

For this website type, component emphasis should follow: ${websiteType.componentSuggestion}

## Visual Effects

Use visual effects with restraint. Border radius should feel modern and consistent, typically 16px to 24px for larger cards and 10px to 14px for compact controls. Shadows should be soft and layered, not harsh. Gradients can be used for hero backgrounds, primary buttons, subtle glows, or selected states. Avoid decorative effects that make the layout feel noisy.

Hover effects should be short and smooth, usually 150ms to 220ms. Cards can lift slightly or brighten the border. Buttons can shift brightness, shadow, or gradient position. Active states should be obvious without changing layout size. Focus states must be visible for keyboard users.

Recommended effect direction: ${vibe.visualEffects}

## Accessibility Rules

Text must be readable against its background. Body text should meet at least WCAG AA contrast when possible. Do not place low-contrast text over gradients or images without an overlay. Primary buttons need readable button text. Interactive elements need focus rings. Do not communicate important state with color alone; combine color with labels, icons, position, or shape.

Use semantic HTML where possible: buttons for actions, links for navigation, headings in logical order, labels for form fields, and alt text for meaningful images. Tap targets should be at least 44px tall on mobile. Avoid tiny text in important flows.

## Do and Don’t

Do:
- Follow the color tokens exactly.
- Use ${vibe.name} as the consistent visual direction.
- Keep layout responsive and mobile-friendly.
- Use reusable components for cards, buttons, inputs, sections, and badges.
- Keep CTA hierarchy obvious.
- Preserve readable contrast and spacing.
- Use motion to clarify interaction, not to distract.

Don’t:
- Do not invent random colors outside the token system.
- Do not copy a real brand directly.
- Do not mix several unrelated visual styles.
- Do not make every card use a different shadow, radius, or border.
- Do not use low-contrast captions for important information.
- Do not create a landing page that looks like a generic template.
- Do not ignore the selected website type: ${websiteType.name}.

## Page Direction

For **${websiteType.name}**, the page should prioritize ${websiteType.mood.join(", ")}. Start with a strong first screen that clearly explains the offer or product. Follow with proof, features, relevant details, and a focused conversion path. If the page has product, pricing, dashboard, or content modules, they should use the same card and button language.

The best implementation will feel specific to the selected category. A coffee shop should feel warm and local. A fintech product should feel secure and precise. A gaming website should feel energetic and immersive. A dashboard should feel efficient and scannable. For the current selection, follow this exact guidance: ${websiteType.layoutSuggestion}

## Agent Instruction

Build the UI according to this DESIGN.md. Treat this file as the source of truth. Use the color system, typography rules, layout rules, component styling, visual effects, and accessibility rules consistently across every page and component. Do not introduce new visual styles unless they are directly derived from this design system. Do not use random gradients, random colors, or inconsistent border radii. Make the result responsive, production-ready, accessible, and visually coherent.`;
}

function usageForColor(token: keyof ColorPalette) {
  const usage: Record<keyof ColorPalette, string> = {
    primary: "Use for main CTA, active state, important links, and key highlights.",
    secondary: "Use for supporting actions, secondary accents, charts, and variation.",
    accent: "Use for special badges, focus moments, highlights, and detail accents.",
    background: "Use for the main page background.",
    surface: "Use for panels, page sections, sidebars, and grouped content zones.",
    card: "Use for content cards, pricing cards, widgets, modals, and product surfaces.",
    textPrimary: "Use for headings, primary labels, and body text that must be read first.",
    textSecondary: "Use for descriptions, helper text, captions, and metadata.",
    border: "Use for dividers, outlines, subtle separation, and card boundaries.",
    success: "Use for positive feedback, completed states, and success badges.",
    warning: "Use for caution states, warnings, and attention-needed messages.",
    danger: "Use for errors, destructive actions, and critical alerts.",
    muted: "Use for disabled labels, quiet metadata, placeholders, and low-emphasis UI.",
    input: "Use for form fields, select controls, and editable surfaces."
  };
  return usage[token];
}
