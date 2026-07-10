/**
 * MUI Menu Component Overrides
 *
 * Premium menu styles with:
 * - Rounded corners
 * - Subtle shadow
 * - Theme-aware colors (light/dark)
 */

import type { Theme, Components } from "@mui/material/styles";

export const menuOverrides: Components<Theme>["MuiMenu"] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      borderRadius: 8,
      boxShadow: theme.jaii.shadows.dropdown,
      backgroundImage: "none",
    }),
    list: {
      padding: "4px 0",
    },
  },
  defaultProps: {
    elevation: 0,
  },
};

export const menuItemOverrides: Components<Theme>["MuiMenuItem"] = {
  styleOverrides: {
    root: {
      borderRadius: 0,
      padding: "6px 16px",
      fontSize: "14px",
      fontWeight: 500,
      transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
};
