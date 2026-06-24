import type { DesignState, VibePreset } from "./types";

const STORAGE_KEY = "vibedesign-ai-state";
const CUSTOM_VIBES_KEY = "vibedesign-ai-custom-vibes";

export function saveDesignState(state: DesignState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadDesignState(): DesignState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DesignState) : null;
  } catch {
    return null;
  }
}

export function clearDesignState() {
  localStorage.removeItem(STORAGE_KEY);
}

export function saveCustomVibes(vibes: VibePreset[]) {
  localStorage.setItem(CUSTOM_VIBES_KEY, JSON.stringify(vibes));
}

export function loadCustomVibes(): VibePreset[] {
  try {
    const raw = localStorage.getItem(CUSTOM_VIBES_KEY);
    return raw ? (JSON.parse(raw) as VibePreset[]) : [];
  } catch {
    return [];
  }
}

export function clearCustomVibes() {
  localStorage.removeItem(CUSTOM_VIBES_KEY);
}
