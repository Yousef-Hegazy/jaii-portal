/**
 * MUI Chip Component Overrides
 *
 * Premium chip styles with:
 * - Consistent border radius
 * - Subtle filled variant
 * - Proper RTL support
 */

import type { Theme, Components } from "@mui/material/styles";

export const chipOverrides: Components<Theme>["MuiChip"] = {
  styleOverrides: {
    root: {
      fontWeight: 500,
      borderRadius: 8,
    },
    sizeSmall: {
      height: 24,
      fontSize: "12px",
    },
    sizeMedium: {
      height: 32,
      fontSize: "13px",
    },
    filled: {
      backgroundColor: "rgba(145, 158, 171, 0.08)",
      color: "rgb(99, 115, 129)",
      "&:hover": {
        backgroundColor: "rgba(145, 158, 171, 0.16)",
      },
    },
    outlined: {
      borderColor: "rgba(145, 158, 171, 0.24)",
      "&:hover": {
        backgroundColor: "rgba(145, 158, 171, 0.04)",
      },
    },
    label: {
      paddingInline: 10,
    },
    icon: {
      marginInlineStart: -4,
      marginInlineEnd: 4,
    },
    deleteIcon: {
      marginInlineStart: 4,
      marginInlineEnd: -4,
    },
  },
  defaultProps: {
    size: "medium",
    variant: "filled",
  },
};
