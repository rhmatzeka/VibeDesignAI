import type { ColorPalette, PreviewTab, VibePreset, WebsiteType } from "@/lib/types";

export type PreviewProps = {
  palette: ColorPalette;
  vibe: VibePreset;
  websiteType: WebsiteType;
};

export type ThemePreview = {
  id: string;
  label: string;
  vibeIds: string[];
  render: Record<PreviewTab, (props: PreviewProps) => React.ReactNode>;
};
