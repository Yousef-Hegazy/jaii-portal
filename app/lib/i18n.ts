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
    ns: ["common"],
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

export default i18n;

// ============================================================================
// Language Change Listener — updates document attributes
// ============================================================================

i18n.on("languageChanged", (lng: string) => {
  if (typeof document === "undefined") return;
  const dir = lng === "ar" ? "rtl" : "ltr";
  const docLocale = lng === "ar" ? "ar-SA" : "en-US";
  document.documentElement.lang = docLocale;
  document.documentElement.dir = dir;
});

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