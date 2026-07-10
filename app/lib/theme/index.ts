/**
 * Jaii Portal Theme Factory
 *
 * Creates a complete MUI theme with:
 * - Semantic palette (Cyan primary default)
 * - Neutral grey scale
 * - Premium shadows
 * - Typography integration
 * - Component overrides
 * - Custom theme extensions
 */

import { createTheme, type Theme } from "@mui/material/styles";
import { createPaletteConfig, PRIMARY_PRESETS, NEUTRAL, SEMANTIC, CHART_COLORS, type PrimaryPresetKey } from "./palette";
import { createShadows, SHADOWS, DARK_SHADOWS } from "./shadows";
import { createShapeConfig, type RadiusKey } from "./shape";
import { createTransitionsConfig } from "./transitions";
import { createZIndexConfig } from "./z-index";
import { createSpacingConfig } from "./spacing";
import { createTypographyConfig } from "../typography";
import { createComponentOverrides } from "./overrides";

// Import augmentation to ensure types are available
import "./theme-augmentation";

export interface JaiiThemeOptions {
  /** Light or dark mode */
  mode?: "light" | "dark";
  /** Primary color preset (default: "cyan") */
  primaryPreset?: PrimaryPresetKey;
  /** Border radius preset (default: "balanced") */
  radius?: RadiusKey;
  /** Language for typography ("ar" or "en") */
  language?: string;
  /** Direction for RTL/LTR */
  direction?: "rtl" | "ltr";
}

/**
 * Creates a complete Jaii Portal theme.
 *
 * @param options - Theme configuration options
 * @returns Complete MUI Theme with Jaii extensions
 */
export function createJaiiTheme(options: JaiiThemeOptions = {}): Theme {
  const {
    mode = "light",
    primaryPreset = "cyan",
    radius = "balanced",
    language = "ar",
    direction = "rtl",
  } = options;

  const isDark = mode === "dark";

  // Create base theme first to have access to palette values
  const paletteConfig = createPaletteConfig(mode, primaryPreset);
  const shapeConfig = createShapeConfig(radius);
  const shadows = createShadows(mode);
  const transitionsConfig = createTransitionsConfig();
  const zIndexConfig = createZIndexConfig();
  const spacing = createSpacingConfig();
  const typographyConfig = createTypographyConfig(language);

  // Create theme with all configurations
  const theme = createTheme({
    direction,
    palette: paletteConfig,
    typography: typographyConfig,
    shape: {
      borderRadius: shapeConfig.borderRadius,
    },
    shadows: shadows as unknown as Theme["shadows"],
    spacing,
    transitions: transitionsConfig,
    zIndex: zIndexConfig,
    components: createComponentOverrides(),
    // Custom Jaii extensions
    jaii: {
      primaryPreset,
      neutral: NEUTRAL,
      semantic: SEMANTIC,
      chart: {
        series: [...CHART_COLORS.series],
        background: { ...CHART_COLORS.background },
        grid: { ...CHART_COLORS.grid },
        text: { ...CHART_COLORS.text },
      },
      shape: shapeConfig,
      shadows: {
        card: isDark ? DARK_SHADOWS.card : SHADOWS.card,
        cardHover: isDark ? DARK_SHADOWS.cardHover : SHADOWS.cardHover,
        dropdown: isDark ? DARK_SHADOWS.dropdown : SHADOWS.dropdown,
        modal: isDark ? DARK_SHADOWS.modal : SHADOWS.modal,
        drawer: isDark ? DARK_SHADOWS.drawer : SHADOWS.drawer,
        buttonPrimary: isDark ? DARK_SHADOWS.buttonPrimary : SHADOWS.buttonPrimary,
        buttonPrimaryHover: isDark ? DARK_SHADOWS.buttonPrimaryHover : SHADOWS.buttonPrimaryHover,
        inputFocus: isDark ? DARK_SHADOWS.inputFocus : SHADOWS.inputFocus,
      },
    },
  });

  return theme;
}

// Re-export types and utilities
export type { PrimaryPresetKey } from "./palette";
export { PRIMARY_PRESETS, NEUTRAL, SEMANTIC, CHART_COLORS } from "./palette";
export { SHADOWS, DARK_SHADOWS } from "./shadows";
export { SHAPE } from "./shape";
export { Z_INDEX } from "./z-index";
export { SPACING } from "./spacing";
export { EASING, DURATION } from "./transitions";
