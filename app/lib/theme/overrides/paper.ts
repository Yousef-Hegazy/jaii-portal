/**
 * MUI Paper Component Overrides
 *
 * Premium paper styles with:
 * - Subtle elevation
 * - Consistent border radius
 * - Theme-aware borders
 */

import type { Theme, Components } from "@mui/material/styles";

export const paperOverrides: Components<Theme>["MuiPaper"] = {
  styleOverrides: {
    root: {
      backgroundImage: "none",
    },
    rounded: {
      borderRadius: 12,
    },
    outlined: ({ theme }) => ({
      borderColor: theme.palette.divider,
    }),
    elevation1: ({ theme }) => ({
      boxShadow: theme.jaii.shadows.card,
    }),
    elevation2: ({ theme }) => ({
      boxShadow: theme.jaii.shadows.cardHover,
    }),
    elevation3: ({ theme }) => ({
      boxShadow: theme.jaii.shadows.dropdown,
    }),
    elevation4: ({ theme }) => ({
      boxShadow: theme.jaii.shadows.modal,
    }),
  },
};
