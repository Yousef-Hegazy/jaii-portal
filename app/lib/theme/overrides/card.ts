/**
 * MUI Card Component Overrides
 *
 * Premium card styles with:
 * - Subtle border
 * - Soft shadow
 * - Smooth hover elevation
 * - Theme-aware border colors (light/dark)
 */

import type { Theme, Components } from "@mui/material/styles";
import { cardClasses } from "@mui/material/Card";

export const cardOverrides: Components<Theme>["MuiCard"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: 12,
      border: "1px solid",
      borderColor: theme.palette.divider,
      boxShadow: theme.jaii.shadows.card,
      transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      backgroundImage: "none",
      "&:hover": {
        boxShadow: theme.jaii.shadows.cardHover,
      },
    }),
  },
};

export const cardActionAreaOverrides: Components<Theme>["MuiCardActionArea"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: 12,
      "&:first-child": {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    }),
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
