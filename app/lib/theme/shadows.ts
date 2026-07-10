/**
 * Jaii Portal Shadow Tokens
 *
 * Premium shadow system inspired by Minimal dashboard quality.
 * Provides subtle, layered shadows for depth and hierarchy.
 */

export const SHADOWS = {
  // No shadow
  none: "none",

  // Subtle elevation (cards, paper)
  z1: "0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 4px rgba(0, 0, 0, 0.04)",
  z2: "0 2px 4px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.04)",
  z3: "0 4px 8px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.04)",

  // Medium elevation (dropdowns, popovers)
  z4: "0 4px 8px rgba(0, 0, 0, 0.06), 0 12px 24px rgba(0, 0, 0, 0.06)",
  z5: "0 8px 16px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.06)",

  // High elevation (modals, dialogs)
  z6: "0 8px 16px rgba(0, 0, 0, 0.08), 0 24px 48px rgba(0, 0, 0, 0.08)",
  z7: "0 12px 24px rgba(0, 0, 0, 0.10), 0 32px 64px rgba(0, 0, 0, 0.10)",

  // Maximum elevation
  z8: "0 16px 32px rgba(0, 0, 0, 0.12), 0 48px 96px rgba(0, 0, 0, 0.12)",

  // Special shadows
  card: "0 0 1px rgba(145, 158, 171, 0.24), 0 2px 4px rgba(145, 158, 171, 0.16)",
  cardHover: "0 0 1px rgba(145, 158, 171, 0.24), 0 4px 8px rgba(145, 158, 171, 0.24)",
  dropdown: "0 0 2px rgba(145, 158, 171, 0.20), 0 12px 24px rgba(145, 158, 171, 0.12)",
  modal: "0 0 2px rgba(145, 158, 171, 0.20), 0 16px 48px rgba(145, 158, 171, 0.16)",
  drawer: "0 0 2px rgba(145, 158, 171, 0.20), 0 8px 32px rgba(145, 158, 171, 0.12)",

  // Primary button shadow
  buttonPrimary: "0 2px 4px rgba(7, 141, 238, 0.24)",
  buttonPrimaryHover: "0 4px 8px rgba(7, 141, 238, 0.32)",

  // Input focus ring
  inputFocus: "0 0 0 2px rgba(7, 141, 238, 0.20)",
} as const;

/**
 * Dark mode shadows (adjusted for dark backgrounds)
 */
export const DARK_SHADOWS = {
  none: "none",
  z1: "0 1px 2px rgba(0, 0, 0, 0.20), 0 1px 4px rgba(0, 0, 0, 0.20)",
  z2: "0 2px 4px rgba(0, 0, 0, 0.20), 0 4px 8px rgba(0, 0, 0, 0.20)",
  z3: "0 4px 8px rgba(0, 0, 0, 0.20), 0 8px 16px rgba(0, 0, 0, 0.20)",
  z4: "0 4px 8px rgba(0, 0, 0, 0.24), 0 12px 24px rgba(0, 0, 0, 0.24)",
  z5: "0 8px 16px rgba(0, 0, 0, 0.24), 0 16px 32px rgba(0, 0, 0, 0.24)",
  z6: "0 8px 16px rgba(0, 0, 0, 0.28), 0 24px 48px rgba(0, 0, 0, 0.28)",
  z7: "0 12px 24px rgba(0, 0, 0, 0.32), 0 32px 64px rgba(0, 0, 0, 0.32)",
  z8: "0 16px 32px rgba(0, 0, 0, 0.36), 0 48px 96px rgba(0, 0, 0, 0.36)",
  card: "0 0 1px rgba(0, 0, 0, 0.32), 0 2px 4px rgba(0, 0, 0, 0.24)",
  cardHover: "0 0 1px rgba(0, 0, 0, 0.32), 0 4px 8px rgba(0, 0, 0, 0.32)",
  dropdown: "0 0 2px rgba(0, 0, 0, 0.28), 0 12px 24px rgba(0, 0, 0, 0.20)",
  modal: "0 0 2px rgba(0, 0, 0, 0.28), 0 16px 48px rgba(0, 0, 0, 0.24)",
  drawer: "0 0 2px rgba(0, 0, 0, 0.28), 0 8px 32px rgba(0, 0, 0, 0.20)",
  buttonPrimary: "0 2px 4px rgba(7, 141, 238, 0.32)",
  buttonPrimaryHover: "0 4px 8px rgba(7, 141, 238, 0.40)",
  inputFocus: "0 0 0 2px rgba(7, 141, 238, 0.24)",
} as const;

/**
 * Creates shadow array for MUI theme (25 shadows required).
 */
export function createShadows(mode: "light" | "dark" = "light"): readonly string[] {
  const shadows = mode === "dark" ? DARK_SHADOWS : SHADOWS;

  return [
    shadows.none,
    shadows.z1,
    shadows.z2,
    shadows.z3,
    shadows.z4,
    shadows.z5,
    shadows.z6,
    shadows.z7,
    shadows.z8,
    shadows.z1,
    shadows.z2,
    shadows.z3,
    shadows.z4,
    shadows.z5,
    shadows.z6,
    shadows.z7,
    shadows.z8,
    shadows.z1,
    shadows.z2,
    shadows.z3,
    shadows.z4,
    shadows.z5,
    shadows.z6,
    shadows.z7,
    shadows.z8,
  ];
}

export type ShadowKey = keyof typeof SHADOWS;
