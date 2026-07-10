/**
 * MUI Button Component Overrides
 *
 * Polished button styles with:
 * - No text transform (sentence case)
 * - Smooth hover transitions
 * - Premium shadow on primary variant
 * - Consistent padding and border-radius
 * - Theme-aware shadows (light/dark)
 */

import type { Theme, Components } from "@mui/material/styles";

export const buttonOverrides: Components<Theme>["MuiButton"] = {
  styleOverrides: {
    root: {
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 8,
      transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    },
    contained: ({ theme }) => ({
      boxShadow: theme.jaii.shadows.buttonPrimary,
      "&:hover": {
        boxShadow: theme.jaii.shadows.buttonPrimaryHover,
      },
      "&:active": {
        boxShadow: theme.jaii.shadows.buttonPrimary,
      },
    }),
    outlined: {
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none",
      },
    },
    text: {
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none",
      },
    },
    sizeSmall: {
      padding: "4px 12px",
      fontSize: "13px",
    },
    sizeMedium: {
      padding: "8px 16px",
    },
    sizeLarge: {
      padding: "12px 24px",
      fontSize: "16px",
    },
  },
  defaultProps: {
    disableElevation: false,
  },
};
