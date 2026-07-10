/**
 * Jaii Portal Theme Palette
 *
 * Semantic palette extensions with:
 * - Primary color presets (Cyan default)
 * - Neutral grey scale
 * - Semantic status colors
 * - Chart series colors
 */

// ============================================================================
// Primary Color Presets
// ============================================================================

export const PRIMARY_PRESETS = {
  emerald: {
    main: "#00A76F",
    light: "#00C896",
    lighter: "#E8F5E9",
    dark: "#007B54",
    darker: "#005C3F",
    contrastText: "#FFFFFF",
  },
  cyan: {
    main: "#078DEE",
    light: "#54A4F2",
    lighter: "#E3F2FD",
    dark: "#066BB8",
    darker: "#054D87",
    contrastText: "#FFFFFF",
  },
  purple: {
    main: "#7635DC",
    light: "#9C5FE8",
    lighter: "#F3E5F5",
    dark: "#5A29A8",
    darker: "#411F7A",
    contrastText: "#FFFFFF",
  },
  blue: {
    main: "#0C68E9",
    light: "#4A8EF0",
    lighter: "#E3F2FD",
    dark: "#094EB3",
    darker: "#073982",
    contrastText: "#FFFFFF",
  },
  orange: {
    main: "#FDA92D",
    light: "#FDC25E",
    lighter: "#FFF8E1",
    dark: "#E08A00",
    darker: "#A86600",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  red: {
    main: "#FF3030",
    light: "#FF6B6B",
    lighter: "#FFEBEE",
    dark: "#D32F2F",
    darker: "#B71C1C",
    contrastText: "#FFFFFF",
  },
} as const;

export type PrimaryPresetKey = keyof typeof PRIMARY_PRESETS;

// ============================================================================
// Neutral Grey Scale
// ============================================================================

export const NEUTRAL = {
  0: "#FFFFFF",
  50: "#F9FAFB",
  100: "#F4F6F8",
  200: "#DFE3E8",
  300: "#C4CDD5",
  400: "#919EAB",
  500: "#637381",
  600: "#454F5B",
  700: "#212B36",
  800: "#161C24",
  900: "#0D1117",
} as const;

// ============================================================================
// Semantic Status Colors
// ============================================================================

export const SEMANTIC = {
  success: {
    main: "#22C55E",
    light: "#4ADE80",
    lighter: "#DCFCE7",
    dark: "#16A34A",
    darker: "#15803D",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#F59E0B",
    light: "#FBBF24",
    lighter: "#FEF3C7",
    dark: "#D97706",
    darker: "#B45309",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  error: {
    main: "#EF4444",
    light: "#F87171",
    lighter: "#FEE2E2",
    dark: "#DC2626",
    darker: "#B91C1C",
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#0EA5E9",
    light: "#38BDF8",
    lighter: "#E0F2FE",
    dark: "#0284C7",
    darker: "#0369A1",
    contrastText: "#FFFFFF",
  },
} as const;

// ============================================================================
// Chart Series Colors
// ============================================================================

export const CHART_COLORS = {
  series: [
    "#078DEE", // Primary (Cyan)
    "#00A76F", // Emerald
    "#7635DC", // Purple
    "#FDA92D", // Orange
    "#FF3030", // Red
    "#0C68E9", // Blue
    "#22C55E", // Success
    "#F59E0B", // Warning
  ],
  background: {
    light: "#FFFFFF",
    dark: "#161C24",
  },
  grid: {
    light: "rgba(145, 158, 171, 0.2)",
    dark: "rgba(145, 158, 171, 0.1)",
  },
  text: {
    light: NEUTRAL[600],
    dark: NEUTRAL[400],
  },
} as const;

// ============================================================================
// Background Colors
// ============================================================================

export const BACKGROUND = {
  default: {
    light: NEUTRAL[50],
    dark: NEUTRAL[900],
  },
  paper: {
    light: NEUTRAL[0],
    dark: NEUTRAL[800],
  },
  neutral: {
    light: NEUTRAL[100],
    dark: NEUTRAL[700],
  },
} as const;

// ============================================================================
// Text Colors
// ============================================================================

export const TEXT = {
  primary: {
    light: NEUTRAL[800],
    dark: NEUTRAL[100],
  },
  secondary: {
    light: NEUTRAL[500],
    dark: NEUTRAL[400],
  },
  disabled: {
    light: NEUTRAL[400],
    dark: NEUTRAL[600],
  },
} as const;

// ============================================================================
// Action Colors
// ============================================================================

export const ACTION = {
  active: {
    light: NEUTRAL[800],
    dark: NEUTRAL[100],
  },
  hover: {
    light: "rgba(0, 0, 0, 0.04)",
    dark: "rgba(255, 255, 255, 0.04)",
  },
  selected: {
    light: "rgba(0, 0, 0, 0.08)",
    dark: "rgba(255, 255, 255, 0.08)",
  },
  disabled: {
    light: "rgba(0, 0, 0, 0.26)",
    dark: "rgba(255, 255, 255, 0.26)",
  },
  disabledBackground: {
    light: "rgba(0, 0, 0, 0.12)",
    dark: "rgba(255, 255, 255, 0.12)",
  },
} as const;

// ============================================================================
// Divider
// ============================================================================

export const DIVIDER = {
  light: NEUTRAL[200],
  dark: NEUTRAL[700],
} as const;

// ============================================================================
// Palette Factory
// ============================================================================

import type { PaletteOptions } from "@mui/material/styles";

/**
 * Creates a complete palette configuration for MUI theme.
 * Uses Cyan as the default primary color.
 */
export function createPaletteConfig(
  mode: "light" | "dark" = "light",
  primaryPreset: PrimaryPresetKey = "cyan"
): PaletteOptions {
  const primary = PRIMARY_PRESETS[primaryPreset];
  const isDark = mode === "dark";

  return {
    mode,
    primary: {
      main: primary.main,
      light: primary.light,
      dark: primary.dark,
      contrastText: primary.contrastText,
    },
    secondary: {
      main: NEUTRAL[500],
      light: NEUTRAL[300],
      dark: NEUTRAL[700],
      contrastText: isDark ? NEUTRAL[0] : NEUTRAL[800],
    },
    error: {
      main: SEMANTIC.error.main,
      light: SEMANTIC.error.light,
      dark: SEMANTIC.error.dark,
      contrastText: SEMANTIC.error.contrastText,
    },
    warning: {
      main: SEMANTIC.warning.main,
      light: SEMANTIC.warning.light,
      dark: SEMANTIC.warning.dark,
      contrastText: SEMANTIC.warning.contrastText,
    },
    info: {
      main: SEMANTIC.info.main,
      light: SEMANTIC.info.light,
      dark: SEMANTIC.info.dark,
      contrastText: SEMANTIC.info.contrastText,
    },
    success: {
      main: SEMANTIC.success.main,
      light: SEMANTIC.success.light,
      dark: SEMANTIC.success.dark,
      contrastText: SEMANTIC.success.contrastText,
    },
    grey: {
      50: NEUTRAL[50],
      100: NEUTRAL[100],
      200: NEUTRAL[200],
      300: NEUTRAL[300],
      400: NEUTRAL[400],
      500: NEUTRAL[500],
      600: NEUTRAL[600],
      700: NEUTRAL[700],
      800: NEUTRAL[800],
      900: NEUTRAL[900],
      A100: NEUTRAL[0],
      A200: NEUTRAL[100],
      A400: NEUTRAL[400],
      A700: NEUTRAL[700],
    },
    background: {
      default: isDark ? BACKGROUND.default.dark : BACKGROUND.default.light,
      paper: isDark ? BACKGROUND.paper.dark : BACKGROUND.paper.light,
    },
    text: {
      primary: isDark ? TEXT.primary.dark : TEXT.primary.light,
      secondary: isDark ? TEXT.secondary.dark : TEXT.secondary.light,
      disabled: isDark ? TEXT.disabled.dark : TEXT.disabled.light,
    },
    divider: isDark ? DIVIDER.dark : DIVIDER.light,
    action: {
      active: isDark ? ACTION.active.dark : ACTION.active.light,
      hover: isDark ? ACTION.hover.dark : ACTION.hover.light,
      selected: isDark ? ACTION.selected.dark : ACTION.selected.light,
      disabled: isDark ? ACTION.disabled.dark : ACTION.disabled.light,
      disabledBackground: isDark
        ? ACTION.disabledBackground.dark
        : ACTION.disabledBackground.light,
    },
  };
}

export { PRIMARY_PRESETS as primaryPresets, NEUTRAL as neutral, SEMANTIC as semantic, CHART_COLORS as chartColors };
