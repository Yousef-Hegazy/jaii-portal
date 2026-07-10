/**
 * Settings Store (Zustand)
 *
 * Owns all mutable global appearance preferences.
 * Currently: mode, primary preset, radius, compact, contrast, font family, font size
 *
 * Design principles:
 * - MUI ThemeProvider derives its theme from narrow Zustand selectors
 * - Components call Zustand actions directly
 * - No mirroring of settings in Context, local state, and Zustand simultaneously
 * - SSR-safe: store initializes with default state matching SSR render
 */

import { create } from "zustand";

// ============================================================================
// Types
// ============================================================================

export type Mode = "light" | "dark" | "system";
export type ResolvedMode = "light" | "dark";

/**
 * Primary color preset keys.
 * Matches the presets defined in app/lib/theme/palette.ts.
 */
export type PrimaryPresetKey = "emerald" | "cyan" | "purple" | "blue" | "orange" | "red";

/**
 * Border radius presets.
 */
export type RadiusKey = "compact" | "balanced" | "soft" | "rounded";

/**
 * Font family presets.
 */
export type FontFamilyKey = "public-sans" | "inter" | "dm-sans" | "nunito-sans";

/**
 * Contrast preset.
 */
export type ContrastKey = "standard" | "high";

/**
 * Direction preference.
 * - 'auto': direction follows active language (ar→rtl, en→ltr)
 * - 'ltr': force left-to-right (preview override)
 * - 'rtl': force right-to-left (preview override)
 */
export type DirectionKey = "auto" | "ltr" | "rtl";

/**
 * Navigation layout modes.
 */
export type NavLayoutKey = "vertical" | "horizontal" | "mini";

/**
 * Navigation color modes.
 */
export type NavColorKey = "integrated" | "apparent";

/**
 * Supported language codes.
 */
export type LanguageCode = "ar" | "en";

/**
 * Resolves a direction preference into an actual CSS direction.
 */
export function resolveDirection(direction: DirectionKey, language: string): "rtl" | "ltr" {
  if (direction !== "auto") return direction;
  return language === "ar" ? "rtl" : "ltr";
}

interface SettingsStore {
  // ── State ──
  /** User's selected language */
  language: LanguageCode;
  /** User's selected mode preference */
  mode: Mode;
  /** Actual applied mode after resolving system preference */
  resolvedMode: ResolvedMode;
  /** Selected primary color preset (default: "cyan") */
  primaryPreset: PrimaryPresetKey;
  /** Border radius preset (default: "balanced") */
  radius: RadiusKey;
  /** Compact density mode (default: false) */
  compact: boolean;
  /** Contrast preset (default: "standard") */
  contrast: ContrastKey;
  /** Active font family key (default: "public-sans") */
  fontFamily: FontFamilyKey;
  /** Base font size in px (14–18, default: 16) */
  fontSize: number;
  /** Direction preference (default: "auto") */
  direction: DirectionKey;
  /** Navigation layout mode (default: "vertical") */
  navLayout: NavLayoutKey;
  /** Navigation color mode (default: "integrated") */
  navColor: NavColorKey;
  /** Whether the appearance customizer drawer is open */
  customizerOpen: boolean;

  // ── Actions ──
  /** Set language, persist to localStorage, sync i18next */
  setLanguage: (language: LanguageCode) => void;
  /** Set mode, persist to localStorage, update document attributes */
  setMode: (mode: Mode) => void;
  /** Set primary color preset, persist to localStorage */
  setPrimaryPreset: (preset: PrimaryPresetKey) => void;
  /** Set border radius preset, persist to localStorage */
  setRadius: (radius: RadiusKey) => void;
  /** Set compact density, persist to localStorage */
  setCompact: (compact: boolean) => void;
  /** Set contrast preset, persist to localStorage */
  setContrast: (contrast: ContrastKey) => void;
  /** Set font family, persist to localStorage */
  setFontFamily: (fontFamily: FontFamilyKey) => void;
  /** Set base font size, persist to localStorage */
  setFontSize: (fontSize: number) => void;
  /** Set direction preference, persist to localStorage */
  setDirection: (direction: DirectionKey) => void;
  /** Set navigation layout mode, persist to localStorage */
  setNavLayout: (navLayout: NavLayoutKey) => void;
  /** Set navigation color mode, persist to localStorage */
  setNavColor: (navColor: NavColorKey) => void;
  /** Open the appearance customizer drawer */
  openCustomizer: () => void;
  /** Close the appearance customizer drawer */
  closeCustomizer: () => void;
  /** Toggle the appearance customizer drawer */
  toggleCustomizer: () => void;
  /** Reset all appearance settings to defaults and close drawer */
  resetAll: () => void;
}

// ============================================================================
// Persistence helpers
// ============================================================================

const LANGUAGE_KEY = "jaii-language";
const MODE_KEY = "jaii-mode";
const PRESET_KEY = "jaii-primary-preset";
const RADIUS_KEY = "jaii-radius";
const COMPACT_KEY = "jaii-compact";
const CONTRAST_KEY = "jaii-contrast";
const FONT_FAMILY_KEY = "jaii-font-family";
const FONT_SIZE_KEY = "jaii-font-size";
const DIRECTION_KEY = "jaii-direction";
const NAV_LAYOUT_KEY = "jaii-nav-layout";
const NAV_COLOR_KEY = "jaii-nav-color";

function getPersistedLanguage(): LanguageCode | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(LANGUAGE_KEY);
    if (stored === "ar" || stored === "en") {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getPersistedMode(): Mode | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(MODE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getPersistedPreset(): PrimaryPresetKey | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(PRESET_KEY);
    if (["emerald", "cyan", "purple", "blue", "orange", "red"].includes(stored ?? "")) {
      return stored as PrimaryPresetKey;
    }
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getPersistedRadius(): RadiusKey | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(RADIUS_KEY);
    if (["compact", "balanced", "soft", "rounded"].includes(stored ?? "")) {
      return stored as RadiusKey;
    }
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getPersistedCompact(): boolean | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(COMPACT_KEY);
    if (stored === "true") return true;
    if (stored === "false") return false;
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getPersistedContrast(): ContrastKey | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(CONTRAST_KEY);
    if (stored === "standard" || stored === "high") {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getPersistedFontFamily(): FontFamilyKey | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(FONT_FAMILY_KEY);
    if (["public-sans", "inter", "dm-sans", "nunito-sans"].includes(stored ?? "")) {
      return stored as FontFamilyKey;
    }
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getPersistedFontSize(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(FONT_SIZE_KEY);
    const num = Number(stored);
    if (num >= 14 && num <= 18) {
      return num;
    }
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getPersistedDirection(): DirectionKey | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(DIRECTION_KEY);
    if (stored === "auto" || stored === "ltr" || stored === "rtl") {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getPersistedNavLayout(): NavLayoutKey | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(NAV_LAYOUT_KEY);
    if (stored === "vertical" || stored === "horizontal" || stored === "mini") {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return null;
}

function getPersistedNavColor(): NavColorKey | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(NAV_COLOR_KEY);
    if (stored === "integrated" || stored === "apparent") {
      return stored;
    }
  } catch {
    // localStorage unavailable
  }
  return null;
}

// ============================================================================
// OS preference resolver
// ============================================================================

function resolveMode(mode: Mode): ResolvedMode {
  if (mode === "system") {
    if (typeof window === "undefined") return "light";
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  }
  return mode;
}

// ============================================================================
// Document attribute updater
// ============================================================================

function updateDocumentMode(resolvedMode: ResolvedMode): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-mode", resolvedMode);
  document.documentElement.style.colorScheme = resolvedMode;
}

// ============================================================================
// Store
// ============================================================================

/**
 * Singleton Zustand store for application appearance settings.
 *
 * SSR behaviour:
 * - Created at module scope (singleton in Node.js module cache)
 * - All SSR requests share the same default state — this is correct
 *   because SSR always renders with default values
 * - After hydration, the client initializes from persisted preferences
 *   and attaches the OS `prefers-color-scheme` listener
 * - The single store instance on the server never holds request-scoped data
 */
export const useSettingsStore = create<SettingsStore>()((set) => ({
  // Initial state matches SSR defaults
  language: "ar",
  mode: "system",
  resolvedMode: "light",
  primaryPreset: "cyan",
  radius: "balanced",
  compact: false,
  contrast: "standard",
  fontFamily: "public-sans",
  fontSize: 16,
  direction: "auto",
  navLayout: "vertical",
  navColor: "integrated",
  customizerOpen: false,

  // ── Actions ──
  setLanguage: (language: LanguageCode) => {
    set({ language });
    persistLanguage(language);
    // Update document lang and dir immediately
    if (typeof document !== "undefined") {
      const dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language === "ar" ? "ar-SA" : "en-US";
      document.documentElement.dir = dir;
    }
  },

  setMode: (mode: Mode) => {
    const resolved = resolveMode(mode);
    set({ mode, resolvedMode: resolved });
    persistMode(mode);
    updateDocumentMode(resolved);
  },

  setPrimaryPreset: (preset: PrimaryPresetKey) => {
    set({ primaryPreset: preset });
    persistPreset(preset);
  },

  setRadius: (radius: RadiusKey) => {
    set({ radius });
    persistRadius(radius);
  },

  setCompact: (compact: boolean) => {
    set({ compact });
    persistCompact(compact);
  },

  setContrast: (contrast: ContrastKey) => {
    set({ contrast });
    persistContrast(contrast);
  },

  setFontFamily: (fontFamily: FontFamilyKey) => {
    set({ fontFamily });
    persistFontFamily(fontFamily);
  },

  setFontSize: (fontSize: number) => {
    set({ fontSize });
    persistFontSize(fontSize);
  },

  setDirection: (direction: DirectionKey) => {
    set({ direction });
    persistDirection(direction);
  },

  setNavLayout: (navLayout: NavLayoutKey) => {
    set({ navLayout });
    persistNavLayout(navLayout);
  },

  setNavColor: (navColor: NavColorKey) => {
    set({ navColor });
    persistNavColor(navColor);
  },

  openCustomizer: () => set({ customizerOpen: true }),
  closeCustomizer: () => set({ customizerOpen: false }),
  toggleCustomizer: () => set((state) => ({ customizerOpen: !state.customizerOpen })),

  resetAll: () => {
    const resolved = resolveMode("system");
    set({
      language: "ar",
      mode: "system",
      resolvedMode: resolved,
      primaryPreset: "cyan",
      radius: "balanced",
      compact: false,
      contrast: "standard",
      fontFamily: "public-sans",
      fontSize: 16,
      direction: "auto",
      navLayout: "vertical",
      navColor: "integrated",
      customizerOpen: false,
    });
    // Persist defaults
    persistLanguage("ar");
    persistMode("system");
    persistPreset("cyan");
    persistRadius("balanced");
    persistCompact(false);
    persistContrast("standard");
    persistFontFamily("public-sans");
    persistFontSize(16);
    persistDirection("auto");
    persistNavLayout("vertical");
    persistNavColor("integrated");
    updateDocumentMode(resolved);
    if (typeof document !== "undefined") {
      document.documentElement.lang = "ar-SA";
      document.documentElement.dir = "rtl";
    }
  },
}));

// ============================================================================
// Initializer (called once after hydration)
// ============================================================================

/**
 * Load persisted preferences and set up OS `prefers-color-scheme` listener.
 *
 * Must be called once in a client `useEffect` after React hydration.
 * Designed to be invoked from a single `<SettingsInitializer />` component
 * rendered inside the provider tree.
 */
export function initializeSettings(): () => void {
  // Load persisted language
  const persistedLanguage = getPersistedLanguage();
  if (persistedLanguage) {
    useSettingsStore.getState().setLanguage(persistedLanguage);
  }

  // Load persisted mode
  const persisted = getPersistedMode();
  if (persisted) {
    useSettingsStore.getState().setMode(persisted);
  }

  // Load persisted primary preset
  const persistedPreset = getPersistedPreset();
  if (persistedPreset) {
    useSettingsStore.getState().setPrimaryPreset(persistedPreset);
  }

  // Load persisted radius
  const persistedRadius = getPersistedRadius();
  if (persistedRadius) {
    useSettingsStore.getState().setRadius(persistedRadius);
  }

  // Load persisted compact
  const persistedCompact = getPersistedCompact();
  if (persistedCompact !== null) {
    useSettingsStore.getState().setCompact(persistedCompact);
  }

  // Load persisted contrast
  const persistedContrast = getPersistedContrast();
  if (persistedContrast) {
    useSettingsStore.getState().setContrast(persistedContrast);
  }

  // Load persisted font family
  const persistedFontFamily = getPersistedFontFamily();
  if (persistedFontFamily) {
    useSettingsStore.getState().setFontFamily(persistedFontFamily);
  }

  // Load persisted font size
  const persistedFontSize = getPersistedFontSize();
  if (persistedFontSize !== null) {
    useSettingsStore.getState().setFontSize(persistedFontSize);
  }

  // Load persisted direction
  const persistedDirection = getPersistedDirection();
  if (persistedDirection) {
    useSettingsStore.getState().setDirection(persistedDirection);
  }

  // Load persisted nav layout
  const persistedNavLayout = getPersistedNavLayout();
  if (persistedNavLayout) {
    useSettingsStore.getState().setNavLayout(persistedNavLayout);
  }

  // Load persisted nav color
  const persistedNavColor = getPersistedNavColor();
  if (persistedNavColor) {
    useSettingsStore.getState().setNavColor(persistedNavColor);
  }

  // Listen for OS preference changes
  let mql: MediaQueryList | null = null;
  try {
    mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const currentMode = useSettingsStore.getState().mode;
      useSettingsStore.getState().setMode(currentMode);
    };
    mql.addEventListener("change", handler);
    return () => mql?.removeEventListener("change", handler);
  } catch {
    return () => {};
  }
}

// ---------------------------------------------------------------------------
// Private helpers (not exported)
// ---------------------------------------------------------------------------

function persistLanguage(language: LanguageCode): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LANGUAGE_KEY, language);
    } catch {
      // localStorage unavailable
    }
  }
}

function persistMode(mode: Mode): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch {
      // localStorage unavailable
    }
  }
}

function persistPreset(preset: PrimaryPresetKey): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(PRESET_KEY, preset);
    } catch {
      // localStorage unavailable
    }
  }
}

function persistRadius(radius: RadiusKey): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(RADIUS_KEY, radius);
    } catch {
      // localStorage unavailable
    }
  }
}

function persistCompact(compact: boolean): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(COMPACT_KEY, String(compact));
    } catch {
      // localStorage unavailable
    }
  }
}

function persistContrast(contrast: ContrastKey): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CONTRAST_KEY, contrast);
    } catch {
      // localStorage unavailable
    }
  }
}

function persistFontFamily(fontFamily: FontFamilyKey): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(FONT_FAMILY_KEY, fontFamily);
    } catch {
      // localStorage unavailable
    }
  }
}

function persistFontSize(fontSize: number): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(FONT_SIZE_KEY, String(fontSize));
    } catch {
      // localStorage unavailable
    }
  }
}

function persistDirection(direction: DirectionKey): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(DIRECTION_KEY, direction);
    } catch {
      // localStorage unavailable
    }
  }
}

function persistNavLayout(navLayout: NavLayoutKey): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(NAV_LAYOUT_KEY, navLayout);
    } catch {
      // localStorage unavailable
    }
  }
}

function persistNavColor(navColor: NavColorKey): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(NAV_COLOR_KEY, navColor);
    } catch {
      // localStorage unavailable
    }
  }
}
