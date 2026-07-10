/**
 * MUI Button Component Overrides
 *
 * Polished button styles with:
 * - No text transform (sentence case)
 * - Smooth hover transitions
 * - Premium shadow on primary variant
 * - Consistent padding and border-radius
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
    contained: {
      boxShadow: "0 2px 4px rgba(7, 141, 238, 0.24)",
      "&:hover": {
        boxShadow: "0 4px 8px rgba(7, 141, 238, 0.32)",
      },
      "&:active": {
        boxShadow: "0 1px 2px rgba(7, 141, 238, 0.20)",
      },
    },
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
