/**
 * MUI Card Component Overrides
 *
 * Premium card styles with:
 * - Subtle border
 * - Soft shadow
 * - Smooth hover elevation
 */

import type { Theme, Components } from "@mui/material/styles";
import { cardClasses } from "@mui/material/Card";

export const cardOverrides: Components<Theme>["MuiCard"] = {
  styleOverrides: {
    root: {
      borderRadius: 12,
      border: "1px solid",
      borderColor: "rgba(145, 158, 171, 0.16)",
      boxShadow: "0 0 1px rgba(145, 158, 171, 0.24), 0 2px 4px rgba(145, 158, 171, 0.16)",
      transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      backgroundImage: "none",
      "&:hover": {
        boxShadow: "0 0 1px rgba(145, 158, 171, 0.24), 0 4px 8px rgba(145, 158, 171, 0.24)",
      },
    },
  },
};

export const cardActionAreaOverrides: Components<Theme>["MuiCardActionArea"] = {
  styleOverrides: {
    root: {
      borderRadius: 12,
      "&:first-child": {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
  },
};

export const cardContentOverrides: Components<Theme>["MuiCardContent"] = {
  styleOverrides: {
    root: {
      padding: 16,
      "&:last-child": {
        paddingBottom: 16,
      },
    },
  },
};

export const cardHeaderOverrides: Components<Theme>["MuiCardHeader"] = {
  styleOverrides: {
    root: {
      padding: 16,
    },
    title: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    subheader: {
      fontSize: "0.875rem",
    },
  },
};
