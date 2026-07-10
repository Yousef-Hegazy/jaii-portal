import { ThemeProvider, CssBaseline } from "@mui/material";
import type { ReactNode } from "react";
import { useMemo, useEffect, useRef } from "react";
import i18n from "./i18n";
import {
  useSettingsStore,
  initializeSettings,
  resolveDirection,
  type LanguageCode,
} from "../stores/settings";
import { createJaiiTheme } from "./theme";

/**
 * DirectionSync — effect-only component.
 *
 * Synchronizes document attributes and i18next with Zustand state.
 * Renders no UI, provides no Context.
 *
 * Responsibilities:
 * - Updates <html dir> when language or direction preference changes
 * - Updates <html lang> when language changes
 * - Syncs Zustand language → i18next (when user changes language via the customizer)
 * - Syncs i18next → Zustand (when language changes externally, e.g. home.tsx toggle)
 */
function DirectionSync() {
  const language = useSettingsStore((s) => s.language);
  const directionPref = useSettingsStore((s) => s.direction);
  const setLanguage = useSettingsStore((s) => s.setLanguage);

  // Sync Zustand language → i18next + document attributes
  useEffect(() => {
    const dir = resolveDirection(directionPref, language);

    // Update document
    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "ar" ? "ar-SA" : "en-US";

      // Only set dir directly if not auto (auto is handled by resolveDirection)
      document.documentElement.dir = dir;
    }

    // Sync language to i18next if it differs
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, directionPref]);

  // Sync i18next → Zustand when language changes externally
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      const currentLang = useSettingsStore.getState().language;
      if (lng !== currentLang) {
        setLanguage(lng as LanguageCode);
      }
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [setLanguage]);

  return null;
}

/**
 * Initializes settings after hydration.
 * - Loads persisted preferences
 * - Attaches OS prefers-color-scheme listener
 * - Runs exactly once
 */
function SettingsInitializer({ children }: { children: ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    return initializeSettings();
  }, []);

  return <>{children}</>;
}

/**
 * Inner providers that depend on resolved direction and settings.
 * Creates theme with correct direction, mode, and language-aware typography.
 * All values derived from narrow Zustand selectors — no Context, no local state.
 */
function ThemedProviders({ children }: { children: ReactNode }) {
  // Resolve direction from language preference + direction override
  const language = useSettingsStore((state) => state.language);
  const directionPref = useSettingsStore((state) => state.direction);
  const direction = resolveDirection(directionPref, language);

  // Narrow Zustand selectors — only re-renders when relevant state changes
  const resolvedMode = useSettingsStore((state) => state.resolvedMode);
  const primaryPreset = useSettingsStore((state) => state.primaryPreset);
  const radius = useSettingsStore((state) => state.radius);
  const compact = useSettingsStore((state) => state.compact);
  const contrast = useSettingsStore((state) => state.contrast);
  const fontFamily = useSettingsStore((state) => state.fontFamily);
  const fontSize = useSettingsStore((state) => state.fontSize);

  // Create theme with dynamic mode, primary preset, radius, compact, contrast,
  // font family, font size, direction and language-aware typography
  const theme = useMemo(
    () =>
      createJaiiTheme({
        mode: resolvedMode,
        primaryPreset,
        radius,
        compact,
        contrast,
        fontFamily,
        fontSize,
        language,
        direction,
      }),
    [resolvedMode, primaryPreset, radius, compact, contrast, fontFamily, fontSize, direction, language],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Root application providers.
 *
 * Provider order:
 * 1. SettingsInitializer — hydrates persisted preferences (Zustand, runs once)
 * 2. DirectionSync — syncs document attributes + i18next with Zustand (no Context, no UI)
 * 3. ThemedProviders — MUI ThemeProvider + CssBaseline, derives values from Zustand
 *
 * No custom application-state Context exists.
 * Library providers (ThemeProvider, CssBaseline) remain as infrastructure only.
 * No custom CacheProvider — SSR and client share the default Emotion cache.
 */
export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <SettingsInitializer>
      <DirectionSync />
      <ThemedProviders>{children}</ThemedProviders>
    </SettingsInitializer>
  );
}
