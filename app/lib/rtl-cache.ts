import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";

/**
 * Emotion cache for RTL (right-to-left) direction.
 * Uses stylis prefixer + MUI RTL plugin to flip CSS properties.
 */
export const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

/**
 * Emotion cache for LTR (left-to-right) direction.
 * Uses only stylis prefixer (no RTL transformation).
 */
export const ltrCache = createCache({
  key: "muiltr",
  stylisPlugins: [prefixer],
});

/**
 * Returns the appropriate Emotion cache based on direction.
 */
export function getCache(direction: "rtl" | "ltr") {
  return direction === "rtl" ? rtlCache : ltrCache;
}
