import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
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
 * Ensures SSR/client hydration consistency by starting with Arabic RTL
 * and switching to persisted language after mount.
 */
export function DirectionProvider({ children }: DirectionProviderProps) {
  const { i18n } = useTranslation();

  // Always start with Arabic RTL for SSR/client hydration consistency
  const [direction, setDirection] = useState<"rtl" | "ltr">(DEFAULT_DIRECTION);
  const [language, setLanguage] = useState<string>(DEFAULT_LANGUAGE);

  useEffect(() => {
    // After mount, check for persisted language preference
    const persistedLang = getPersistedLanguage();
    const currentLang = persistedLang || i18n.language || DEFAULT_LANGUAGE;
    const currentDir = getDirection(currentLang);

    // Update state if different from default
    if (currentLang !== DEFAULT_LANGUAGE || currentDir !== DEFAULT_DIRECTION) {
      setDirection(currentDir);
      setLanguage(currentLang);

      // Sync i18n if needed
      if (i18n.language !== currentLang) {
        i18n.changeLanguage(currentLang);
      }
    }

    // Handler for language changes
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
  }, [i18n]);

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
