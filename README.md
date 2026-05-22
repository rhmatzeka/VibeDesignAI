# VibeDesign AI

VibeDesign AI is a full-frontend design system generator for vibe coding workflows.

It helps users create a consistent website direction before asking an AI coding agent to build the UI. Users can choose a website type, select or mix design vibes, generate and edit a color palette, extract colors from an uploaded image, preview real UI examples, check contrast, and export everything as `DESIGN.md`, CSS variables, Tailwind config, JSON tokens, and an AI agent prompt.

## Routes

- `/` - dark immersive landing page for VibeDesign AI.
- `/studio` - the working generator studio/dashboard.

## Features

- Website type selector with 20 website categories.
- 25 design vibe presets.
- Vibe mixer with weighted vibe selection.
- Full color palette generator and editor.
- Canvas-based image color extraction.
- Live UI previews for landing page, dashboard, login page, pricing page, product card, and mobile app.
- Professional `DESIGN.md` generator.
- CSS variables generator.
- Tailwind config generator.
- JSON token export.
- AI coding agent prompt generator.
- Contrast checker with auto-fix for text colors.
- localStorage save and reset.
- Copy to clipboard and `DESIGN.md` download.
- Toast notification system.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- lucide-react
- framer-motion
- localStorage
- Canvas API

No backend, database, login, payment, or external API is required.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Studio:

```txt
http://localhost:3000/studio
```

## Build

```bash
npm run build
```

## Project Structure

```txt
app/
  page.tsx
  studio/page.tsx
  globals.css

components/
  AppShell.tsx
  LandingPage.tsx
  Sidebar.tsx
  Topbar.tsx
  WebsiteTypeSelector.tsx
  VibeSelector.tsx
  VibeMixer.tsx
  PaletteEditor.tsx
  ImagePaletteExtractor.tsx
  LivePreview.tsx
  DesignMdOutput.tsx
  ExportCenter.tsx
  ContrastChecker.tsx
  Toast.tsx

lib/
  types.ts
  vibe-presets.ts
  website-types.ts
  palette-utils.ts
  image-color-utils.ts
  design-md-generator.ts
  export-utils.ts
  contrast-utils.ts
  agent-prompt-generator.ts
  storage-utils.ts
```

## Notes

The app is designed as a browser-only MVP. Uploaded images are processed locally through Canvas API and are not sent to a server. Saved design state is stored in `localStorage`.
