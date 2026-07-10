/**
 * Jaii Portal Transition Tokens
 *
 * Easing curves and duration values for smooth, premium animations.
 * Respects reduced-motion preferences.
 */

export const EASING = {
  // Material Design standard easings
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",

  // Premium smooth easing
  smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  smoothOut: "cubic-bezier(0.0, 0, 0.2, 0.8)",
  smoothIn: "cubic-bezier(0.4, 0, 1, 0.8)",

  // Bounce/spring effects
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
} as const;

export const DURATION = {
  // Fast interactions (hover, focus)
  fast: 150,
  short: 200,

  // Standard transitions (expand, collapse)
  standard: 300,
  medium: 400,

  // Slow transitions (page transitions, modals)
  slow: 500,
  enteringScreen: 500,
  leavingScreen: 400,

  // Complex animations
  complex: 600,
} as const;

/**
 * Creates transitions configuration for MUI theme.
 */
export function createTransitionsConfig() {
  return {
    easing: {
      easeInOut: EASING.easeInOut,
      easeOut: EASING.easeOut,
      easeIn: EASING.easeIn,
      sharp: EASING.sharp,
    },
    duration: {
      shortest: DURATION.fast,
      shorter: DURATION.short,
      short: DURATION.standard,
      standard: DURATION.standard,
      longer: DURATION.medium,
      long: DURATION.slow,
      complex: DURATION.complex,
      enteringScreen: DURATION.enteringScreen,
      leavingScreen: DURATION.leavingScreen,
    },
  };
}

export type TransitionsConfig = ReturnType<typeof createTransitionsConfig>;
