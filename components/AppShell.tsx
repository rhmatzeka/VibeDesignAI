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
import type { ColorPalette, DesignState, MixerState, PreviewTab, PromptMode, ToastMessage } from "@/lib/types";
import { autoFixTextColor } from "@/lib/contrast-utils";
import { generateAgentPrompt } from "@/lib/agent-prompt-generator";
import { generateDesignMd } from "@/lib/design-md-generator";
import { copyToClipboard, downloadTextFile, generateCssVariables, generateJsonTokens, generateTailwindConfig } from "@/lib/export-utils";
import { extractColorsFromImage } from "@/lib/image-color-utils";
import { buildMixedPalette, generatePaletteFromBaseColor, generatePaletteFromVibe, normalizeHex, randomizeVibe, validateHex } from "@/lib/palette-utils";
import { clearDesignState, loadDesignState, saveDesignState } from "@/lib/storage-utils";

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

  useEffect(() => {
    const saved = loadDesignState();
    if (saved) setState({ ...defaultState, ...saved });
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveDesignState(state);
  }, [hydrated, state]);

  const websiteType = useMemo(
    () => websiteTypes.find((item) => item.id === state.websiteTypeId) ?? websiteTypes[0],
    [state.websiteTypeId]
  );

  const vibe = useMemo(
    () => vibePresets.find((item) => item.id === state.vibeId) ?? defaultVibe,
    [state.vibeId]
  );

  const mixerVibes = useMemo(() => {
    const primary = vibePresets.find((item) => item.id === state.mixer.primaryVibeId) ?? defaultVibe;
    const secondary = vibePresets.find((item) => item.id === state.mixer.secondaryVibeId) ?? vibePresets[0];
    const tertiary = vibePresets.find((item) => item.id === state.mixer.tertiaryVibeId) ?? vibePresets[1];
    return { primary, secondary, tertiary };
  }, [state.mixer]);

  const mixedDescription = useMemo(() => {
    const moods = [...new Set([...mixerVibes.primary.mood, ...mixerVibes.secondary.mood.slice(0, 2), ...mixerVibes.tertiary.mood.slice(0, 2)])].slice(0, 7);
    return `${moods.join(", ")}, with ${state.mixer.primaryWeight}% ${mixerVibes.primary.name}, ${state.mixer.secondaryWeight}% ${mixerVibes.secondary.name}, and ${state.mixer.tertiaryWeight}% ${mixerVibes.tertiary.name}.`;
  }, [mixerVibes, state.mixer]);

  const designMd = useMemo(
    () => generateDesignMd({ websiteType, vibe, palette: state.palette, mixer: state.mixer, mixedDescription }),
    [websiteType, vibe, state.palette, state.mixer, mixedDescription]
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
    const next = vibePresets.find((item) => item.id === id) ?? defaultVibe;
    setState((current) => ({ ...current, vibeId: id, palette: generatePaletteFromVibe(next), mixer: { ...current.mixer, primaryVibeId: id } }));
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
    <>
      <Toast toasts={toasts} />
      <div className="mx-auto grid min-h-screen w-full max-w-[1800px] gap-5 p-4 lg:grid-cols-[260px_minmax(0,1fr)] 2xl:grid-cols-[260px_minmax(0,1fr)_470px]">
        <Sidebar />
        <main className="min-w-0">
          <Topbar onRandom={randomVibe} onSave={saveNow} onReset={resetAll} />
          <div className="space-y-8">
            <WebsiteTypeSelector websiteTypes={websiteTypes} selectedId={state.websiteTypeId} onSelect={(websiteTypeId) => setState((current) => ({ ...current, websiteTypeId }))} />
            <VibeSelector vibes={vibePresets} selectedId={state.vibeId} onSelect={selectVibe} onGenerate={() => pushToast("Design system generated.")} />
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
            <VibeMixer vibes={vibePresets} mixer={state.mixer} mixedDescription={mixedDescription} onChange={(mixer) => setState((current) => ({ ...current, mixer }))} onApply={applyMixedPalette} />
            <div className="2xl:hidden">
              <LivePreview palette={state.palette} selectedTab={state.previewTab} onTabChange={(previewTab: PreviewTab) => setState((current) => ({ ...current, previewTab }))} />
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
            <LivePreview palette={state.palette} selectedTab={state.previewTab} onTabChange={(previewTab: PreviewTab) => setState((current) => ({ ...current, previewTab }))} />
            <ContrastChecker palette={state.palette} onAutoFix={() => {
              setState((current) => ({ ...current, palette: autoFixTextColor(current.palette) }));
              pushToast("Text contrast fixed.");
            }} />
          </div>
        </aside>
      </div>
    </>
  );
}
