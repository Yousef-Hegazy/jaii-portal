/**
 * Emotion cache for MUI components.
 *
 * Uses the default Emotion cache (key "css") to ensure class name consistency
 * between SSR and client hydration. React Router Framework Mode SSR does not
 * respect custom CacheProvider keys, so custom cache keys (e.g., "muirtl")
 * caused hydration mismatches where the server rendered "css-xxx" classes
 * while the client expected "muirtl-xxx".
 *
 * MUI v9 handles RTL (right-to-left) through theme.direction alone via its
 * built-in RtlProvider. The @mui/stylis-plugin-rtl is not required for MUI
 * components. Custom CSS uses logical properties (margin-inline-start, etc.)
 * per project conventions, which naturally support both directions.
 */

import createCache from "@emotion/cache";

/**
 * Default Emotion cache.
 * Uses the "css" key (Emotion default) so SSR and client produce matching
 * class name prefixes, avoiding hydration mismatch errors.
 */
const defaultCache = createCache({
  key: "css",
});

/**
 * Returns the Emotion cache for the given direction.
 * Since we use the default cache, the same instance is returned for both
 * RTL and LTR. RTL is handled by MUI's ThemeProvider via theme.direction.
 *
 * @param _direction - "rtl" | "ltr" (ignored, kept for API compatibility)
 */
export function getCache(_direction: "rtl" | "ltr") {
  return defaultCache;
}
