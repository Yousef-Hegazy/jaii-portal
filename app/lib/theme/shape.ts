/**
 * Jaii Portal Shape Tokens
 *
 * Border radius system for consistent component styling.
 * Supports the four radius presets from SPEC §5.2.
 */

export const SHAPE = {
  // Border radius values (px)
  compact: 4,
  balanced: 8,
  soft: 12,
  rounded: 16,

  // Component-specific radii
  button: 8,
  card: 12,
  dialog: 16,
  drawer: 16,
  menu: 8,
  paper: 12,
  tooltip: 6,
  chip: 8,
  avatar: "50%",
  input: 8,
} as const;

export type RadiusKey = "compact" | "balanced" | "soft" | "rounded";

/**
 * Creates shape configuration for MUI theme.
 */
export function createShapeConfig(radius: RadiusKey = "balanced") {
  const borderRadius = SHAPE[radius];

  return {
    borderRadius,
    // Custom shape overrides for specific components
    custom: {
      button: borderRadius,
      card: borderRadius + 4,
      dialog: borderRadius + 8,
      drawer: borderRadius + 8,
      menu: borderRadius,
      paper: borderRadius + 4,
      tooltip: Math.max(borderRadius - 2, 4),
      chip: borderRadius,
      input: borderRadius,
    },
  };
}

export type ShapeConfig = ReturnType<typeof createShapeConfig>;
