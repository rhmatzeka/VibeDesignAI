import type { ThemePreview } from "./types";
import { appleGalleryTheme } from "./themes/apple-gallery";
import { commerceWarmTheme } from "./themes/commerce-warm";
import { editorialLuxuryTheme } from "./themes/editorial-luxury";
import { framerDarkTheme } from "./themes/framer-dark";

const themes: ThemePreview[] = [
  framerDarkTheme,
  appleGalleryTheme,
  editorialLuxuryTheme,
  commerceWarmTheme
];

export function getPreviewTheme(vibeId: string) {
  return themes.find((theme) => theme.vibeIds.includes(vibeId)) ?? framerDarkTheme;
}

export const previewThemes = themes;
