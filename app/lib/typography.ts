/**
 * Typography tokens for Jaii Portal.
 *
 * Font stacks:
 * - Arabic (Tajawal): Self-hosted via @fontsource/tajawal
 * - English (Public Sans, Inter, DM Sans, Nunito Sans): Self-hosted via fontsource variables
 *
 * Each Latin font includes Tajawal as an explicit Arabic fallback.
 * These tokens feed into MUI's createTheme typography configuration.
 */

// ============================================================================
// Font Family Types
// ============================================================================

export type FontFamilyKey = "public-sans" | "inter" | "dm-sans" | "nunito-sans";

// ============================================================================
// Font Stacks
// ============================================================================

/**
 * Latin font stacks with Tajawal Arabic fallback.
 * Loaded via @fontsource-variable/* packages.
 */
export const LATIN_FONT_STACKS: Record<FontFamilyKey, string> = {
  "public-sans": ['"Public Sans Variable"', "Public Sans", "Tajawal", "sans-serif"].join(", "),
  inter: ['"Inter Variable"', "Inter", "Tajawal", "sans-serif"].join(", "),
  "dm-sans": ['"DM Sans Variable"', "DM Sans", "Tajawal", "sans-serif"].join(", "),
  "nunito-sans": ['"Nunito Sans Variable"', "Nunito Sans", "Tajawal", "sans-serif"].join(", "),
};

/**
 * Arabic font stack — always Tajawal for native Arabic rendering.
 */
export const ARABIC_FONT_STACK = ["Tajawal", "sans-serif"].join(", ");

/**
 * Returns the appropriate font stack based on language and font family key.
 * - Arabic (`ar`): Always uses Tajawal.
 * - English (`en`): Uses the selected font family with Tajawal fallback.
 */
export function getFontFamily(language: string, fontFamilyKey: FontFamilyKey = "public-sans"): string {
  if (language === "ar") return ARABIC_FONT_STACK;
  return LATIN_FONT_STACKS[fontFamilyKey];
}

// ============================================================================
// Font Family Display Labels
// ============================================================================

export const FONT_FAMILY_LABELS: Record<FontFamilyKey, { en: string; ar: string }> = {
  "public-sans": { en: "Public Sans", ar: "Public Sans" },
  inter: { en: "Inter", ar: "Inter" },
  "dm-sans": { en: "DM Sans", ar: "DM Sans" },
  "nunito-sans": { en: "Nunito Sans", ar: "Nunito Sans" },
};

// ============================================================================
// Typography Token Scale (px)
// ============================================================================

export const TYPOGRAPHY_SCALE = {
  h1: { size: 48, weight: 700, lineHeight: 1.2 },
  h2: { size: 40, weight: 700, lineHeight: 1.25 },
  h3: { size: 32, weight: 600, lineHeight: 1.3 },
  h4: { size: 28, weight: 600, lineHeight: 1.35 },
  h5: { size: 22, weight: 500, lineHeight: 1.4 },
  h6: { size: 18, weight: 500, lineHeight: 1.45 },
  subtitle1: { size: 16, weight: 500, lineHeight: 1.5 },
  subtitle2: { size: 14, weight: 500, lineHeight: 1.5 },
  body1: { size: 16, weight: 400, lineHeight: 1.6 },
  body2: { size: 14, weight: 400, lineHeight: 1.6 },
  caption: { size: 12, weight: 400, lineHeight: 1.5 },
  button: { size: 14, weight: 600, lineHeight: 1.5, letterSpacing: 0.5 },
  overline: { size: 12, weight: 600, lineHeight: 1.5, letterSpacing: 1 },
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY_SCALE;

// ============================================================================
// MUI Typography Config Generator
// ============================================================================

/**
 * Builds a complete MUI TypographyOptions object for the given language,
 * font family, and base font size.
 *
 * @param language - Active language code ("ar" or "en")
 * @param fontFamilyKey - Selected Latin font family key (ignored for Arabic)
 * @param baseFontSize - Base font size in px (14-18, default 16)
 */
export function createTypographyConfig(
  language: string,
  fontFamilyKey: FontFamilyKey = "public-sans",
  baseFontSize: number = 16,
) {
  const fontFamily = getFontFamily(language, fontFamilyKey);

  return {
    fontFamily,
    fontSize: baseFontSize,

    h1: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.h1.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.h1.weight,
      lineHeight: TYPOGRAPHY_SCALE.h1.lineHeight,
    },
    h2: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.h2.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.h2.weight,
      lineHeight: TYPOGRAPHY_SCALE.h2.lineHeight,
    },
    h3: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.h3.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.h3.weight,
      lineHeight: TYPOGRAPHY_SCALE.h3.lineHeight,
    },
    h4: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.h4.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.h4.weight,
      lineHeight: TYPOGRAPHY_SCALE.h4.lineHeight,
    },
    h5: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.h5.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.h5.weight,
      lineHeight: TYPOGRAPHY_SCALE.h5.lineHeight,
    },
    h6: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.h6.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.h6.weight,
      lineHeight: TYPOGRAPHY_SCALE.h6.lineHeight,
    },
    subtitle1: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.subtitle1.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.subtitle1.weight,
      lineHeight: TYPOGRAPHY_SCALE.subtitle1.lineHeight,
    },
    subtitle2: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.subtitle2.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.subtitle2.weight,
      lineHeight: TYPOGRAPHY_SCALE.subtitle2.lineHeight,
    },
    body1: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.body1.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.body1.weight,
      lineHeight: TYPOGRAPHY_SCALE.body1.lineHeight,
    },
    body2: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.body2.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.body2.weight,
      lineHeight: TYPOGRAPHY_SCALE.body2.lineHeight,
    },
    caption: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.caption.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.caption.weight,
      lineHeight: TYPOGRAPHY_SCALE.caption.lineHeight,
    },
    button: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.button.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.button.weight,
      lineHeight: TYPOGRAPHY_SCALE.button.lineHeight,
      letterSpacing: `${TYPOGRAPHY_SCALE.button.letterSpacing}px`,
      textTransform: "none",
    },
    overline: {
      fontFamily,
      fontSize: `${TYPOGRAPHY_SCALE.overline.size}px`,
      fontWeight: TYPOGRAPHY_SCALE.overline.weight,
      lineHeight: TYPOGRAPHY_SCALE.overline.lineHeight,
      letterSpacing: `${TYPOGRAPHY_SCALE.overline.letterSpacing}px`,
      textTransform: "uppercase",
    },
  };
}

// ============================================================================
// Convenience: Navigation font definition
// ============================================================================

export const NAVIGATION_FONT = {
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: 1.5,
} as const;
