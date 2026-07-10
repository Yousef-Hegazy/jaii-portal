/**
 * Jaii Portal Z-Index Strategy
 *
 * Organized z-index scale for consistent layering.
 * Follows a logical stacking order.
 */

export const Z_INDEX = {
  // Base layer (no z-index)
  base: 0,

  // Interactive elements
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  appBar: 1300,
  drawer: 1400,
  modal: 1500,
  popover: 1600,
  snackbar: 1700,
  tooltip: 1800,

  // Special overlays
  fab: 1050,
  speedDial: 1050,
  autocomplete: 1200,
  backdrop: -1,

  // Navigation
  sidebar: 1100,
  mobileNav: 1150,

  // Notifications
  notification: 1700,

  // Maximum
  max: 9999,
} as const;

/**
 * Creates z-index configuration for MUI theme.
 */
export function createZIndexConfig() {
  return {
    mobileStepper: Z_INDEX.base + 100,
    fab: Z_INDEX.fab,
    speedDial: Z_INDEX.speedDial,
    appBar: Z_INDEX.appBar,
    drawer: Z_INDEX.drawer,
    modal: Z_INDEX.modal,
    popover: Z_INDEX.popover,
    snackbar: Z_INDEX.snackbar,
    tooltip: Z_INDEX.tooltip,
  };
}

export type ZIndexConfig = ReturnType<typeof createZIndexConfig>;
