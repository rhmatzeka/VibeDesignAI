import type { ThemePreview } from "./types";
import { appleGalleryTheme } from "./themes/apple-gallery";
import { commerceWarmTheme } from "./themes/commerce-warm";
import { developerDocsTheme } from "./themes/developer-docs";
import { editorialLuxuryTheme } from "./themes/editorial-luxury";
import { framerDarkTheme } from "./themes/framer-dark";
import { gamingNeonTheme } from "./themes/gaming-neon";

const themes: ThemePreview[] = [
  gamingNeonTheme,
  developerDocsTheme,
  framerDarkTheme,
  appleGalleryTheme,
  editorialLuxuryTheme,
  commerceWarmTheme
];

import type { VibePreset } from "@/lib/types";

export function getPreviewTheme(vibe: VibePreset) {
  if (vibe.previewThemeId) {
    return themes.find((theme) => theme.id === vibe.previewThemeId) ?? framerDarkTheme;
  }
  return themes.find((theme) => theme.vibeIds.includes(vibe.id)) ?? framerDarkTheme;
}

export const previewThemes = themes;
