import { ThemeProvider, CssBaseline } from "@mui/material";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { DirectionProvider, useDirection } from "./direction-context";
import { createJaiiTheme } from "./theme";

/**
 * Inner providers that depend on direction context.
 * Creates theme with correct direction and language-aware typography.
 * No custom CacheProvider — the default Emotion cache (key "css")
 * is used by both SSR and client, ensuring class name consistency
 * during hydration. MUI's built-in RtlProvider (activated via
 * theme.direction) handles RTL flipping for all MUI components.
 */
function ThemedProviders({ children }: { children: ReactNode }) {
  const { direction, language } = useDirection();

  // Create theme with dynamic direction and language-aware typography
  const theme = useMemo(
    () => createJaiiTheme({
      mode: "light",
      primaryPreset: "cyan",
      radius: "balanced",
      language,
      direction,
    }),
    [direction, language]
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
 * - DirectionProvider: Syncs direction with i18n language
 * - ThemeProvider: MUI theme with correct direction
 * - CssBaseline: Global CSS reset
 *
 * Note: No custom CacheProvider is used. Both SSR and client
 * rely on the default Emotion cache, preventing class name
 * prefix mismatches that cause hydration errors.
 */
export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <DirectionProvider>
      <ThemedProviders>{children}</ThemedProviders>
    </DirectionProvider>
  );
}
