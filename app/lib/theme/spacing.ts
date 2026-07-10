/**
 * Jaii Portal Spacing Tokens
 *
 * Consistent spacing scale based on 4px grid.
 * Used for margins, padding, and gaps.
 */

export const SPACING = {
  0: 0,
  0.5: 2, // 2px
  1: 4, // 4px
  1.5: 6, // 6px
  2: 8, // 8px
  2.5: 10, // 10px
  3: 12, // 12px
  3.5: 14, // 14px
  4: 16, // 16px
  5: 20, // 20px
  6: 24, // 24px
  7: 28, // 28px
  8: 32, // 32px
  9: 36, // 36px
  10: 40, // 40px
  11: 44, // 44px
  12: 48, // 48px
  14: 56, // 56px
  16: 64, // 64px
  20: 80, // 80px
  24: 96, // 96px
  28: 112, // 112px
  32: 128, // 128px
} as const;

/**
 * Creates spacing function for MUI theme.
 * MUI expects a function that multiplies by 8px base.
 */
export function createSpacingConfig() {
  return (factor: number): string => {
    // Use our custom spacing scale
    if (factor in SPACING) {
      return `${SPACING[factor as keyof typeof SPACING]}px`;
    }
    // Fallback to 8px base multiplication
    return `${factor * 8}px`;
  };
}

export type SpacingConfig = ReturnType<typeof createSpacingConfig>;
