"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { WebsiteTypeSelector } from "./WebsiteTypeSelector";
import { VibeSelector } from "./VibeSelector";
import { PaletteEditor } from "./PaletteEditor";
import { ImagePaletteExtractor } from "./ImagePaletteExtractor";
import { VibeMixer } from "./VibeMixer";
import { LivePreview } from "./LivePreview";
import { DesignMdOutput } from "./DesignMdOutput";
import { ExportCenter } from "./ExportCenter";
import { ContrastChecker } from "./ContrastChecker";
import { Toast } from "./Toast";
import { websiteTypes } from "@/lib/website-types";
import { defaultVibe, vibePresets } from "@/lib/vibe-presets";
import type { ColorPalette, DesignState, MixerState, PreviewTab, PromptMode, ToastMessage, VibePreset } from "@/lib/types";
import { autoFixTextColor } from "@/lib/contrast-utils";
import { generateAgentPrompt } from "@/lib/agent-prompt-generator";
import { generateDesignMd } from "@/lib/design-md-generator";
import { copyToClipboard, downloadTextFile, generateCssVariables, generateJsonTokens, generateTailwindConfig } from "@/lib/export-utils";
import { extractColorsFromImage } from "@/lib/image-color-utils";
import { buildMixedPalette, generatePaletteFromBaseColor, generatePaletteFromVibe, normalizeHex, randomizeVibe, validateHex } from "@/lib/palette-utils";
import { clearDesignState, loadDesignState, saveDesignState, loadCustomVibes, saveCustomVibes, clearCustomVibes } from "@/lib/storage-utils";
import { AdminPanel } from "./AdminPanel";
import { AdminLoginModal } from "./AdminLoginModal";

const defaultMixer: MixerState = {
  primaryVibeId: "dark-premium",
  secondaryVibeId: "modern-saas",
  tertiaryVibeId: "futuristic-ai",
  primaryWeight: 60,
  secondaryWeight: 25,
  tertiaryWeight: 15
};

const defaultState: DesignState = {
  websiteTypeId: "startup",
  vibeId: "dark-premium",
  mixer: defaultMixer,
  palette: generatePaletteFromVibe(defaultVibe),
  previewTab: "Landing Page",
  promptMode: "Build Landing Page"
};

export function AppShell() {
  const [state, setState] = useState<DesignState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<string[]>([]);
  const [customVibes, setCustomVibes] = useState<VibePreset[]>([]);
  const [adminMode, setAdminMode] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const saved = loadDesignState();
    if (saved) setState({ ...defaultState, ...saved });
    
    const savedCustom = loadCustomVibes();
    setCustomVibes(savedCustom);

    if (typeof window !== "undefined" && sessionStorage.getItem("admin_logged_in") === "true") {
      setAdminMode(true);
    }
    
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveDesignState(state);
  }, [hydrated, state]);

  const allVibes = useMemo(() => [...vibePresets, ...customVibes], [customVibes]);

  const websiteType = useMemo(
    () => websiteTypes.find((item) => item.id === state.websiteTypeId) ?? websiteTypes[0],
    [state.websiteTypeId]
  );

  const vibe = useMemo(
    () => allVibes.find((item) => item.id === state.vibeId) ?? defaultVibe,
    [state.vibeId, allVibes]
  );

  const mixerVibes = useMemo(() => {
    const primary = allVibes.find((item) => item.id === state.mixer.primaryVibeId) ?? defaultVibe;
    const secondary = allVibes.find((item) => item.id === state.mixer.secondaryVibeId) ?? allVibes[0];
    const tertiary = allVibes.find((item) => item.id === state.mixer.tertiaryVibeId) ?? allVibes[1];
    return { primary, secondary, tertiary };
  }, [state.mixer, allVibes]);

  const mixedDescription = useMemo(() => {
    const moods = [...new Set([...mixerVibes.primary.mood, ...mixerVibes.secondary.mood.slice(0, 2), ...mixerVibes.tertiary.mood.slice(0, 2)])].slice(0, 7);
    return `${moods.join(", ")}, with ${state.mixer.primaryWeight}% ${mixerVibes.primary.name}, ${state.mixer.secondaryWeight}% ${mixerVibes.secondary.name}, and ${state.mixer.tertiaryWeight}% ${mixerVibes.tertiary.name}.`;
  }, [mixerVibes, state.mixer]);

  const designMd = useMemo(
    () => generateDesignMd({ websiteType, vibe, palette: state.palette, mixedDescription }),
    [websiteType, vibe, state.palette, mixedDescription]
  );

  const cssVariables = useMemo(() => generateCssVariables(state.palette), [state.palette]);
  const tailwindConfig = useMemo(() => generateTailwindConfig(), []);
  const jsonTokens = useMemo(() => generateJsonTokens(state.palette), [state.palette]);
  const agentPrompt = useMemo(() => generateAgentPrompt(state.promptMode, designMd), [state.promptMode, designMd]);

  const pushToast = useCallback((message: string, type: ToastMessage["type"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 2600);
  }, []);

  const saveNow = useCallback(() => {
    saveDesignState(state);
    pushToast("Design system saved locally.");
  }, [pushToast, state]);

  const resetAll = useCallback(() => {
    clearDesignState();
    clearCustomVibes();
    setCustomVibes([]);
    setState(defaultState);
    setExtractedColors([]);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    pushToast("Reset berhasil.");
  }, [previewUrl, pushToast]);

  const copy = useCallback(async (text: string, message = "Copied to clipboard.") => {
    try {
      await copyToClipboard(text);
      pushToast(message);
    } catch {
      pushToast("Copy failed. Your browser blocked clipboard access.", "error");
    }
  }, [pushToast]);

  const selectVibe = (id: string) => {
    const next = allVibes.find((item) => item.id === id) ?? defaultVibe;
    setState((current) => ({ ...current, vibeId: id, palette: generatePaletteFromVibe(next), mixer: { ...current.mixer, primaryVibeId: id } }));
  };

  const addCustomVibe = (newVibe: VibePreset) => {
    const updated = [...customVibes, newVibe];
    setCustomVibes(updated);
    saveCustomVibes(updated);
    setState((current) => ({
      ...current,
      vibeId: newVibe.id,
      palette: newVibe.colors,
      mixer: {
        ...current.mixer,
        primaryVibeId: newVibe.id
      }
    }));
    pushToast(`Theme "${newVibe.name}" created and loaded.`);
  };

  const deleteCustomVibe = (id: string) => {
    const updated = customVibes.filter((v) => v.id !== id);
    setCustomVibes(updated);
    saveCustomVibes(updated);
    if (state.vibeId === id) {
      setState((current) => ({
        ...current,
        vibeId: "dark-premium",
        palette: generatePaletteFromVibe(defaultVibe),
        mixer: {
          ...current.mixer,
          primaryVibeId: "dark-premium"
        }
      }));
    }
    pushToast("Custom theme deleted.");
  };

  const handleLoginSuccess = () => {
    setAdminMode(true);
    setIsLoginOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("admin_logged_in", "true");
    }
    pushToast("Admin workspace unlocked.");
  };

  const handleLockAdmin = () => {
    setAdminMode(false);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("admin_logged_in");
    }
    pushToast("Admin workspace locked.");
  };

  const randomVibe = () => {
    const next = randomizeVibe(state.vibeId);
    setState((current) => ({ ...current, vibeId: next.id, palette: generatePaletteFromVibe(next), mixer: { ...current.mixer, primaryVibeId: next.id } }));
    pushToast(`Random vibe: ${next.name}`, "info");
  };

  const updateColor = (token: keyof ColorPalette, value: string) => {
    setState((current) => ({
      ...current,
      palette: {
        ...current.palette,
        [token]: validateHex(value) ? normalizeHex(value) : value
      }
    }));
  };

  const uploadImage = async (file: File) => {
    try {
      const result = await extractColorsFromImage(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(result.previewUrl);
      setExtractedColors(result.colors);
      pushToast(result.colors.length ? "Color extracted." : "Image uploaded, but no dominant colors were found.", result.colors.length ? "success" : "info");
    } catch {
      pushToast("Image upload failed.", "error");
    }
  };

  const applyBaseColor = (color: string) => {
    setState((current) => ({ ...current, palette: generatePaletteFromBaseColor(color) }));
    pushToast(`${color} applied as primary color.`);
  };

  const applyMixedPalette = () => {
    setState((current) => ({ ...current, palette: buildMixedPalette(mixerVibes.primary, mixerVibes.secondary, mixerVibes.tertiary), vibeId: mixerVibes.primary.id }));
    pushToast("Mixed palette applied.");
  };

  const downloadDesign = () => {
    downloadTextFile("DESIGN.md", designMd);
    pushToast("DESIGN.md downloaded.");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ffffff] font-sans antialiased">
      <Toast toasts={toasts} />
      <AdminLoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSuccess={handleLoginSuccess} />
      <div className="mx-auto grid min-h-screen w-full max-w-[1800px] gap-5 p-4 lg:grid-cols-[260px_minmax(0,1fr)] 2xl:grid-cols-[260px_minmax(0,1fr)_470px]">
        <Sidebar />
        <main className="min-w-0">
          <Topbar onRandom={randomVibe} onSave={saveNow} onReset={resetAll} adminMode={adminMode} onToggleAdmin={handleLockAdmin} onTitleDoubleClick={() => setIsLoginOpen(true)} />
          <div className="space-y-8">
            {adminMode && <AdminPanel onAddVibe={addCustomVibe} />}
            <WebsiteTypeSelector websiteTypes={websiteTypes} selectedId={state.websiteTypeId} onSelect={(websiteTypeId) => setState((current) => ({ ...current, websiteTypeId }))} />
            <VibeSelector vibes={allVibes} selectedId={state.vibeId} onSelect={selectVibe} onGenerate={() => pushToast("Design system generated.")} onDeleteVibe={deleteCustomVibe} />
            <PaletteEditor
              palette={state.palette}
              originalPalette={vibe.colors}
              onChange={updateColor}
              onResetToken={(token) => updateColor(token, vibe.colors[token])}
              onResetAll={() => setState((current) => ({ ...current, palette: generatePaletteFromVibe(vibe) }))}
              onRegenerate={() => setState((current) => ({ ...current, palette: generatePaletteFromVibe(vibe) }))}
              onCopy={(text) => copy(text)}
              onCopyAll={() => copy(jsonTokens)}
            />
            <ImagePaletteExtractor previewUrl={previewUrl} extractedColors={extractedColors} onUpload={uploadImage} onApplyColor={applyBaseColor} />
            <VibeMixer vibes={allVibes} mixer={state.mixer} mixedDescription={mixedDescription} onChange={(mixer) => setState((current) => ({ ...current, mixer }))} onApply={applyMixedPalette} />
            <div className="2xl:hidden">
              <LivePreview palette={state.palette} vibe={vibe} websiteType={websiteType} selectedTab={state.previewTab} onTabChange={(previewTab: PreviewTab) => setState((current) => ({ ...current, previewTab }))} />
            </div>
            <DesignMdOutput designMd={designMd} onCopy={() => copy(designMd)} />
            <ExportCenter
              cssVariables={cssVariables}
              tailwindConfig={tailwindConfig}
              jsonTokens={jsonTokens}
              agentPrompt={agentPrompt}
              promptMode={state.promptMode}
              onPromptModeChange={(promptMode: PromptMode) => setState((current) => ({ ...current, promptMode }))}
              onCopyDesign={() => copy(designMd)}
              onDownloadDesign={downloadDesign}
              onCopyCss={() => copy(cssVariables)}
              onCopyTailwind={() => copy(tailwindConfig)}
              onCopyPrompt={() => copy(agentPrompt)}
              onCopyJson={() => copy(jsonTokens)}
              onSave={saveNow}
              onReset={resetAll}
            />
            <div className="2xl:hidden">
              <ContrastChecker palette={state.palette} onAutoFix={() => setState((current) => ({ ...current, palette: autoFixTextColor(current.palette) }))} />
            </div>
          </div>
        </main>
        <aside className="hidden min-w-0 space-y-5 2xl:block">
          <div className="sticky top-4 space-y-5">
            <LivePreview palette={state.palette} vibe={vibe} websiteType={websiteType} selectedTab={state.previewTab} onTabChange={(previewTab: PreviewTab) => setState((current) => ({ ...current, previewTab }))} />
            <ContrastChecker palette={state.palette} onAutoFix={() => {
              setState((current) => ({ ...current, palette: autoFixTextColor(current.palette) }));
              pushToast("Text contrast fixed.");
            }} />
          </div>
        </aside>
      </div>
    </div>
  );
}
