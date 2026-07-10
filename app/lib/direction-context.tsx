import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { getDirection, getPersistedLanguage, persistLanguage } from "./i18n";

/**
 * Direction context value
 */
interface DirectionContextValue {
  direction: "rtl" | "ltr";
  language: string;
}

// Default to Arabic RTL for SSR/client hydration consistency
const DEFAULT_DIRECTION: "rtl" | "ltr" = "rtl";
const DEFAULT_LANGUAGE = "ar";

/**
 * Initialize direction and language from localStorage during render phase.
 * This ensures the initial state matches the persisted preference, avoiding
 * a flash/state-update after hydration.
 */
function getInitialDirection(): "rtl" | "ltr" {
  if (typeof window === "undefined") return DEFAULT_DIRECTION;
  const persisted = getPersistedLanguage();
  if (persisted) return getDirection(persisted);
  return DEFAULT_DIRECTION;
}

function getInitialLanguage(): string {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  return getPersistedLanguage() || DEFAULT_LANGUAGE;
}

const DirectionContext = createContext<DirectionContextValue>({
  direction: DEFAULT_DIRECTION,
  language: DEFAULT_LANGUAGE,
});

/**
 * Hook to access the current direction from context
 */
export function useDirection() {
  return useContext(DirectionContext);
}

interface DirectionProviderProps {
  children: ReactNode;
}

/**
 * Provider that syncs direction with i18n language.
 * Initializes from localStorage during render to match SSR output,
 * then syncs with i18n asynchronously after mount.
 */
export function DirectionProvider({ children }: DirectionProviderProps) {
  const { i18n } = useTranslation();

  // Initialize state from localStorage during render (client-only) localStorage to match user preference
  // This avoids a state update after hydration that would cause a flash
  const [direction, setDirection] = useState<"rtl" | "ltr">(() =>
    getInitialDirection()
  );
  const [language, setLanguage] = useState<string>(() => getInitialLanguage());

  // Ref to track if we've already synced i18n to avoid duplicate work
  const i18nSyncedRef = useRef(false);

  useEffect(() => {
    // After mount, sync i18n language if it differs from our initialized state
    // Use setTimeout to defer until after paint, avoiding render-phase state updates
    if (!i18nSyncedRef.current && i18n.language !== language) {
      i18nSyncedRef.current = true;
      setTimeout(() => {
        i18n.changeLanguage(language);
      }, 0);
    }

    // Handler for language changes (user-initiated via language switcher)
    const handleLanguageChange = (lng: string) => {
      const newDirection = getDirection(lng);
      setDirection(newDirection);
      setLanguage(lng);
      persistLanguage(lng as "ar" | "en");

      // Update document attributes
      if (typeof document !== "undefined") {
        document.documentElement.dir = newDirection;
        document.documentElement.lang = lng === "ar" ? "ar-SA" : "en-US";
      }
    };

    // Subscribe to language changes
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, language]);

  const value = useMemo(
    () => ({
      direction,
      language,
    }),
    [direction, language]
  );

  return (
    <DirectionContext.Provider value={value}>
      {children}
    </DirectionContext.Provider>
  );
}
