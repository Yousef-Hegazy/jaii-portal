import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { getCache } from "./rtl-cache";
import { DirectionProvider, useDirection } from "./direction-context";
import { createTypographyConfig } from "./typography";

/**
 * Inner providers that depend on direction context.
 * Creates theme with correct direction, language-aware typography,
 * and uses appropriate Emotion cache.
 */
function ThemedProviders({ children }: { children: ReactNode }) {
  const { direction, language } = useDirection();

  // Create theme with dynamic direction and language-aware typography
  const theme = useMemo(
    () =>
      createTheme({
        direction,
        typography: createTypographyConfig(language),
        palette: {
          mode: "light",
        },
      }),
    [direction, language]
  );

  // Get the appropriate cache for current direction
  const cache = useMemo(() => getCache(direction), [direction]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

interface AppProvidersProps {
  children: ReactNode;
}

/**
 * Root application providers.
 * - DirectionProvider: Syncs direction with i18n language
 * - CacheProvider: Emotion cache (RTL or LTR based on direction)
 * - ThemeProvider: MUI theme with correct direction
 * - CssBaseline: Global CSS reset
 */
export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <DirectionProvider>
      <ThemedProviders>{children}</ThemedProviders>
    </DirectionProvider>
  );
}
