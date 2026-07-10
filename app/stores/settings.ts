/**
 * Settings Store (Zustand)
 *
 * Owns all mutable global appearance preferences.
 * Currently: mode selection (light/dark/system), primary color preset
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

interface SettingsStore {
  // ── State ──
  /** User's selected mode preference */
  mode: Mode;
  /** Actual applied mode after resolving system preference */
  resolvedMode: ResolvedMode;
  /** Selected primary color preset (default: "cyan") */
  primaryPreset: PrimaryPresetKey;

  // ── Actions ──
  /** Set mode, persist to localStorage, update document attributes */
  setMode: (mode: Mode) => void;
  /** Set primary color preset, persist to localStorage */
  setPrimaryPreset: (preset: PrimaryPresetKey) => void;
}

// ============================================================================
// Persistence helpers
// ============================================================================

const MODE_KEY = "jaii-mode";
const PRESET_KEY = "jaii-primary-preset";

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
 *   because SSR always renders with the default (light) mode + cyan preset
 * - After hydration, the client initializes from persisted preferences
 *   and attaches the OS `prefers-color-scheme` listener
 * - The single store instance on the server never holds request-scoped data
 */
export const useSettingsStore = create<SettingsStore>()((set) => ({
  // Initial state matches SSR default (light, cyan)
  mode: "system",
  resolvedMode: "light",
  primaryPreset: "cyan",

  // ── Actions ──
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

  // Listen for OS preference changes
  let mql: MediaQueryList | null = null;
  try {
    mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      // Re-resolve — if mode is 'system', picks up new OS preference
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
