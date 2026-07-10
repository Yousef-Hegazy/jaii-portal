/**
 * MUI Chip Component Overrides
 *
 * Premium chip styles with:
 * - Consistent border radius
 * - Theme-aware filled variant (light/dark)
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
    filled: ({ theme }) => ({
      backgroundColor: "rgba(145, 158, 171, 0.08)",
      color: theme.palette.text.secondary,
      "&:hover": {
        backgroundColor: "rgba(145, 158, 171, 0.16)",
      },
    }),
    outlined: ({ theme }) => ({
      borderColor: theme.palette.divider,
      "&:hover": {
        backgroundColor: "rgba(145, 158, 171, 0.04)",
      },
    }),
    label: {
      paddingInline: 10,
    },
    icon: {
      marginInlineStart: 4,
      marginInlineEnd: 4,
    },
    deleteIcon: {
      marginInlineStart: 4,
      marginInlineEnd: 4,
    },
  },
  defaultProps: {
    size: "medium",
    variant: "filled",
  },
};
