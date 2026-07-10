/**
 * Settings Store (Zustand)
 *
 * Owns all mutable global appearance preferences.
 * Currently: mode selection (light/dark/system)
 *
 * Design principles:
 * - MUI ThemeProvider derives its theme from a narrow Zustand selector
 * - Components call Zustand actions directly
 * - No mirroring of mode in Context, local state, and Zustand simultaneously
 * - SSR-safe: store initializes with default state matching SSR render
 * - Client-side content in this area is highly visible to users.
 */

import { create } from "zustand";

// ============================================================================
// Types
// ============================================================================

export type Mode = "light" | "dark" | "system";
export type ResolvedMode = "light" | "dark";

interface SettingsStore {
  // ── State ──
  /** User's selected mode preference */
  mode: Mode;
  /** Actual applied mode after resolving system preference */
  resolvedMode: ResolvedMode;

  // ── Actions ──
  /** Set mode, persist to localStorage, update document attributes */
  setMode: (mode: Mode) => void;
}

// ============================================================================
// Persistence helpers
// ============================================================================

const STORAGE_KEY = "jaii-mode";

function getPersistedMode(): Mode | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
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
 *   because SSR always renders with the default (light) mode
 * - After hydration, the client initializes from persisted preference
 *   and attaches the OS `prefers-color-scheme` listener
 * - The single store instance on the server never holds request-scoped data
 */
export const useSettingsStore = create<SettingsStore>()((set) => ({
  // Initial state matches SSR default (light)
  mode: "system",
  resolvedMode: "light",

  // ── Actions ──
  setMode: (mode: Mode) => {
    const resolved = resolveMode(mode);
    set({ mode, resolvedMode: resolved });
    persistMode(mode);
    updateDocumentMode(resolved);
  },
}));

// ============================================================================
// Initializer (called once after hydration)
// ============================================================================

/**
 * Load persisted preference and set up OS `prefers-color-scheme` listener.
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
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // localStorage unavailable
    }
  }
}
