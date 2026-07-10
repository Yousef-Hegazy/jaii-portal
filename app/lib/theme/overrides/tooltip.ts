/**
 * MUI Tooltip Component Overrides
 *
 * Premium tooltip styles with:
 * - Subtle shadow
 * - Consistent border radius
 * - Smooth transitions
 * - Theme-aware background (light/dark)
 */

import type { Theme, Components } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";

export const tooltipOverrides: Components<Theme>["MuiTooltip"] = {
  styleOverrides: {
    tooltip: ({ theme }) => ({
      borderRadius: 6,
      padding: "6px 10px",
      fontSize: "12px",
      fontWeight: 500,
      boxShadow: theme.jaii.shadows.dropdown,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(97, 107, 118, 0.92)"
          : "rgba(33, 43, 54, 0.92)",
    }),
    arrow: ({ theme }) => ({
      color:
        theme.palette.mode === "dark"
          ? "rgba(97, 107, 118, 0.92)"
          : "rgba(33, 43, 54, 0.92)",
    }),
  },
  defaultProps: {
    arrow: true,
    placement: "top",
    enterDelay: 200,
    leaveDelay: 0,
  },
};
