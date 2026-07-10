/**
 * Jaii Portal Theme Palette
 *
 * Semantic palette extensions with:
 * - Primary color presets (Cyan default) with derived hover/selected/focus/translucent states
 * - Neutral grey scale
 * - Semantic status colors
 * - Chart series colors generated from presets
 */

// ============================================================================
// Hex-to-RGBA helper
// ============================================================================

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ============================================================================
// Primary Color Presets
// ============================================================================

/**
 * Each preset stores the core hex values.
 * Derived states (hover, selected, focus, translucent) are computed from `main`.
 */
export const PRIMARY_PRESETS = {
  emerald: {
    lighter: "#C8FAD6",
    light: "#5BE49B",
    main: "#00A76F",
    dark: "#007B55",
    darker: "#004B34",
    contrastText: "#FFFFFF",
  },
  cyan: {
    lighter: "#CAFDF5",
    light: "#61F3F3",
    main: "#078DEE",
    dark: "#066BB8",
    darker: "#054D87",
    contrastText: "#FFFFFF",
  },
  purple: {
    lighter: "#EFE1FF",
    light: "#B985FF",
    main: "#7635DC",
    dark: "#5A29A8",
    darker: "#411F7A",
    contrastText: "#FFFFFF",
  },
  blue: {
    lighter: "#D1E9FF",
    light: "#76B0F1",
    main: "#0C68E9",
    dark: "#094EB3",
    darker: "#073982",
    contrastText: "#FFFFFF",
  },
  orange: {
    lighter: "#FFF3CC",
    light: "#FDD48F",
    main: "#FDA92D",
    dark: "#E08A00",
    darker: "#A86600",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  red: {
    lighter: "#FFE0D6",
    light: "#FF8682",
    main: "#FF3030",
    dark: "#B72136",
    darker: "#7A151E",
    contrastText: "#FFFFFF",
  },
} as const;

export type PrimaryPresetKey = keyof typeof PRIMARY_PRESETS;

// ============================================================================
// Extended primary palette (computed)
// ============================================================================

export interface ExtendedPrimaryPalette {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
  /** 8% opacity on main — used for hover backgrounds */
  hover: string;
  /** 12% opacity on main — used for selected backgrounds */
  selected: string;
  /** 20% opacity on main — used for focus rings */
  focus: string;
  /** 8% opacity on main — used for translucent overlays */
  translucent: string;
}

/**
 * Builds the full extended primary palette for a given preset.
 * Derived alpha states (hover, selected, focus, translucent) are computed
 * from the `main` color so they match the active preset in both light and dark contexts.
 */
export function createExtendedPrimary(preset: PrimaryPresetKey): ExtendedPrimaryPalette {
  const p = PRIMARY_PRESETS[preset];
  return {
    lighter: p.lighter,
    light: p.light,
    main: p.main,
    dark: p.dark,
    darker: p.darker,
    contrastText: p.contrastText,
    hover: hexToRgba(p.main, 0.08),
    selected: hexToRgba(p.main, 0.12),
    focus: hexToRgba(p.main, 0.20),
    translucent: hexToRgba(p.main, 0.08),
  };
}

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
// Chart Series Colors (derived from all presets)
// ============================================================================

/**
 * Returns a chart series ordered by preset.
 * The first entry is the currently active preset's main color.
 */
export function createChartSeries(preset: PrimaryPresetKey): string[] {
  const presetOrder: PrimaryPresetKey[] = [
    preset,
    // Other presets in a fixed order (excluding the active one)
    ...(["emerald", "cyan", "purple", "blue", "orange", "red"] as PrimaryPresetKey[]).filter(
      (p) => p !== preset,
    ),
  ];
  return presetOrder.map((p) => PRIMARY_PRESETS[p].main);
}

export const CHART_COLORS = {
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
 *
 * @param mode - Light or dark mode
 * @param primaryPreset - Primary color preset key
 * @param contrast - Contrast preset ("standard" or "high")
 */
export function createPaletteConfig(
  mode: "light" | "dark" = "light",
  primaryPreset: PrimaryPresetKey = "cyan",
  contrast: "standard" | "high" = "standard"
): PaletteOptions {
  const primary = PRIMARY_PRESETS[primaryPreset];
  const isDark = mode === "dark";
  const isHighContrast = contrast === "high";

  // High contrast adjustments
  const textPrimary = isHighContrast
    ? (isDark ? "#FFFFFF" : "#000000")
    : (isDark ? TEXT.primary.dark : TEXT.primary.light);

  const textSecondary = isHighContrast
    ? (isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.72)")
    : (isDark ? TEXT.secondary.dark : TEXT.secondary.light);

  const bgDefault = isHighContrast
    ? (isDark ? "#0A0A0A" : "#F0F0F0")
    : (isDark ? BACKGROUND.default.dark : BACKGROUND.default.light);

  const divider = isHighContrast
    ? (isDark ? "rgba(255, 255, 255, 0.32)" : "rgba(0, 0, 0, 0.32)")
    : (isDark ? DIVIDER.dark : DIVIDER.light);

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
      default: bgDefault,
      paper: isDark ? BACKGROUND.paper.dark : BACKGROUND.paper.light,
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
      disabled: isDark ? TEXT.disabled.dark : TEXT.disabled.light,
    },
    divider,
    action: {
      active: isDark ? ACTION.active.dark : ACTION.active.light,
      hover: isHighContrast
        ? (isDark ? "rgba(255, 255, 255, 0.10)" : "rgba(0, 0, 0, 0.08)")
        : (isDark ? ACTION.hover.dark : ACTION.hover.light),
      selected: isHighContrast
        ? (isDark ? "rgba(255, 255, 255, 0.16)" : "rgba(0, 0, 0, 0.12)")
        : (isDark ? ACTION.selected.dark : ACTION.selected.light),
      disabled: isDark ? ACTION.disabled.dark : ACTION.disabled.light,
      disabledBackground: isDark
        ? ACTION.disabledBackground.dark
        : ACTION.disabledBackground.light,
    },
  };
}

export {
  PRIMARY_PRESETS as primaryPresets,
  NEUTRAL as neutral,
  SEMANTIC as semantic,
  CHART_COLORS as chartColors,
};
