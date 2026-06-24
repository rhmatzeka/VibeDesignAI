# Preview Theme Renderers

`LivePreview` is intentionally split into theme renderers so each vibe family can have a different layout language, not just a different color palette.

## Structure

```txt
components/previews/
  README.md
  registry.ts
  types.ts
  utils.tsx
  themes/
    apple-gallery.tsx
    commerce-warm.tsx
    developer-docs.tsx
    editorial-luxury.tsx
    framer-dark.tsx
    gaming-neon.tsx
```

## Add a New Theme Renderer

1. Create a file in `components/previews/themes/`, for example `healthcare-calm.tsx`.
2. Export a `ThemePreview` object with a unique `id`, `label`, `vibeIds`, and a `render` map for every `PreviewTab`.
3. Import that theme in `components/previews/registry.ts`.
4. Add it to the `themes` array before generic fallbacks.

## Minimal Example

```tsx
import type { ThemePreview, PreviewProps } from "../types";

function Landing({ palette, websiteType }: PreviewProps) {
  return <div style={{ backgroundColor: palette.background }}>{websiteType.name}</div>;
}

export const healthcareCalmTheme: ThemePreview = {
  id: "healthcare-calm",
  label: "Healthcare Calm",
  vibeIds: ["calm-wellness"],
  render: {
    "Landing Page": Landing,
    Dashboard: Landing,
    "Login Page": Landing,
    "Pricing Page": Landing,
    "Product Card": Landing,
    "Mobile App": Landing
  }
};
```

## Design Rules

- Do not create one generic SaaS layout for every vibe.
- Change composition, typography, spacing, card shapes, navigation, and content modules per theme family.
- Use `palette`, `vibe`, and `websiteType` from `PreviewProps`; do not hardcode brand-only colors unless the renderer intentionally defines a base surface style.
- Keep all renderers local and dependency-free so previews stay fast.
