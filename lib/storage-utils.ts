import type { DesignState } from "./types";

const STORAGE_KEY = "vibedesign-ai-state";

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
