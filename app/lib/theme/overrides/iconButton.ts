/**
 * MUI IconButton Component Overrides
 *
 * Premium icon button styles with:
 * - Subtle hover background
 * - Consistent sizing
 * - Smooth transitions
 */

import type { Theme, Components } from "@mui/material/styles";

export const iconButtonOverrides: Components<Theme>["MuiIconButton"] = {
  styleOverrides: {
    root: {
      borderRadius: 8,
      transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    },
    sizeSmall: {
      padding: 4,
    },
    sizeMedium: {
      padding: 8,
    },
    sizeLarge: {
      padding: 12,
    },
  },
  defaultProps: {
    size: "medium",
  },
};
