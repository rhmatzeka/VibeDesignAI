export type ColorPalette = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  muted: string;
  input: string;
};

export type VibePreset = {
  id: string;
  name: string;
  description: string;
  mood: string[];
  colors: ColorPalette;
  typography: string;
  layoutStyle: string;
  componentStyle: string;
  visualEffects: string;
  bestFor: string[];
  avoid: string;
};

export type WebsiteType = {
  id: string;
  name: string;
  description: string;
  mood: string[];
  layoutSuggestion: string;
  componentSuggestion: string;
};

export type MixerState = {
  primaryVibeId: string;
  secondaryVibeId: string;
  tertiaryVibeId: string;
  primaryWeight: number;
  secondaryWeight: number;
  tertiaryWeight: number;
};

export type PreviewTab =
  | "Landing Page"
  | "Dashboard"
  | "Login Page"
  | "Pricing Page"
  | "Product Card"
  | "Mobile App";

export type PromptMode =
  | "Build Landing Page"
  | "Build Dashboard"
  | "Redesign Existing Website"
  | "Build SaaS App"
  | "Build Portfolio"
  | "Build Online Store";

export type ToastMessage = {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
};

export type DesignState = {
  websiteTypeId: string;
  vibeId: string;
  mixer: MixerState;
  palette: ColorPalette;
  previewTab: PreviewTab;
  promptMode: PromptMode;
};
