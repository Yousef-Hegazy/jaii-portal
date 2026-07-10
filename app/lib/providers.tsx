import { ThemeProvider, CssBaseline } from "@mui/material";
import type { ReactNode } from "react";
import { useMemo, useEffect, useRef } from "react";
import { DirectionProvider, useDirection } from "./direction-context";
import { useSettingsStore, initializeSettings } from "../stores/settings";
import { createJaiiTheme } from "./theme";

/**
 * Initializes settings after hydration.
 * - Loads persisted mode preference
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
 * Inner providers that depend on direction and settings context.
 * Creates theme with correct direction, mode, and language-aware typography.
 */
function ThemedProviders({ children }: { children: ReactNode }) {
  const { direction, language } = useDirection();

  // Narrow Zustand selector — only re-renders when resolvedMode changes
  const resolvedMode = useSettingsStore((state) => state.resolvedMode);

  // Create theme with dynamic mode, direction and language-aware typography
  const theme = useMemo(
    () =>
      createJaiiTheme({
        mode: resolvedMode,
        primaryPreset: "cyan",
        radius: "balanced",
        language,
        direction,
      }),
    [resolvedMode, direction, language],
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
 * - SettingsInitializer: Hydrates persisted mode + OS listener (Zustand)
 * - DirectionProvider: Syncs direction with i18n language
 * - ThemeProvider: MUI theme with correct direction and mode
 * - CssBaseline: Global CSS reset
 *
 * Custom global-state Context has been removed:
 * ModeContext was replaced by the Zustand `useSettingsStore`.
 *
 * Note: No custom CacheProvider is used. Both SSR and client
 * rely on the default Emotion cache, preventing class name
 * prefix mismatches that cause hydration errors.
 */
export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <SettingsInitializer>
      <DirectionProvider>
        <ThemedProviders>{children}</ThemedProviders>
      </DirectionProvider>
    </SettingsInitializer>
  );
}
