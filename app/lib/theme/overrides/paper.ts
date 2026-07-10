/**
 * MUI Paper Component Overrides
 *
 * Premium paper styles with:
 * - Subtle elevation
 * - Consistent border radius
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
    outlined: {
      borderColor: "rgba(145, 158, 171, 0.16)",
    },
    elevation1: {
      boxShadow: "0 0 1px rgba(145, 158, 171, 0.24), 0 2px 4px rgba(145, 158, 171, 0.16)",
    },
    elevation2: {
      boxShadow: "0 0 1px rgba(145, 158, 171, 0.24), 0 4px 8px rgba(145, 158, 171, 0.24)",
    },
    elevation3: {
      boxShadow: "0 0 2px rgba(145, 158, 171, 0.20), 0 8px 16px rgba(145, 158, 171, 0.12)",
    },
    elevation4: {
      boxShadow: "0 0 2px rgba(145, 158, 171, 0.20), 0 12px 24px rgba(145, 158, 171, 0.12)",
    },
  },
};
