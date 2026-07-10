/**
 * MUI Tooltip Component Overrides
 *
 * Premium tooltip styles with:
 * - Subtle shadow
 * - Consistent border radius
 * - Smooth transitions
 */

import type { Theme, Components } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";

export const tooltipOverrides: Components<Theme>["MuiTooltip"] = {
  styleOverrides: {
    tooltip: {
      borderRadius: 6,
      padding: "6px 10px",
      fontSize: "12px",
      fontWeight: 500,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      backgroundColor: "rgba(33, 43, 54, 0.92)",
    },
    arrow: {
      color: "rgba(33, 43, 54, 0.92)",
    },
  },
  defaultProps: {
    arrow: true,
    placement: "top",
    enterDelay: 200,
    leaveDelay: 0,
  },
};
