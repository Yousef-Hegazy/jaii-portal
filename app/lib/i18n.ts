import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

// ============================================================================
// Namespaces
// ============================================================================

export const NAMESPACES = [
  "common",
  "navigation",
  "appearance",
  "landing",
  "auth",
  "dashboard",
  "orders",
  "customers",
  "analytics",
  "partners",
  "settings",
  "pricing",
  "zones",
  "drivers",
  "notifications",
  "validation",
  "errors",
] as const;

export type Namespace = (typeof NAMESPACES)[number];

// ============================================================================
// Configuration
// ============================================================================

i18n.use(HttpBackend)
  .use(initReactI18next)
  .init({
    supportedLngs: ["ar", "en"],
    fallbackLng: "en",
    lng: "ar",
    defaultNS: "common",
    ns: NAMESPACES,
    load: "languageOnly",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    react: {
      useSuspense: false,
    },
  });

// ============================================================================
// SSR: Preload translation resources from filesystem
// ============================================================================
// On the server, HttpBackend can't fetch translation JSON files (no browser
// fetch origin). We preload all resources synchronously so that the SSR HTML
// contains translated text instead of raw keys, preventing hydration mismatch.
// Vite tree-shakes this entire block from the client build.

if (import.meta.env.SSR) {
  const { readFileSync } = await import("fs");
  const { resolve } = await import("path");

  const baseDir = import.meta.env.DEV
    ? resolve(process.cwd(), "public", "locales")
    : resolve(process.cwd(), "build", "client", "locales");

  const SSR_LANGS = ["ar", "en"] as const;
  for (const lng of SSR_LANGS) {
    for (const ns of NAMESPACES) {
      try {
        const filePath = resolve(baseDir, lng, `${ns}.json`);
        const content = readFileSync(filePath, "utf-8");
        i18n.addResourceBundle(lng, ns, JSON.parse(content));
      } catch {
        // File may not exist for some language/namespace combinations
      }
    }
  }
}

export default i18n;

// ============================================================================
// Language Utilities
// ============================================================================

export const SUPPORTED_LANGUAGES = [
  { code: "ar", name: "العربية", dir: "rtl" as const },
  { code: "en", name: "English", dir: "ltr" as const },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

/**
 * Maps an i18next language code to a document/Intl locale
 */
export function getDocumentLocale(code: string): "ar-SA" | "en-US" {
  return code === "ar" ? "ar-SA" : "en-US";
}

/**
 * Gets the direction for a language code
 */
export function getDirection(code: string): "rtl" | "ltr" {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
  return lang?.dir ?? "rtl";
}

/**
 * Persists language preference to localStorage
 */
export function persistLanguage(code: LanguageCode): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("jaii-language", code);
  }
}

/**
 * Gets persisted language preference
 */
export function getPersistedLanguage(): LanguageCode | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("jaii-language");
  if (stored && SUPPORTED_LANGUAGES.some((l) => l.code === stored)) {
    return stored as LanguageCode;
  }
  return null;
}