/**
 * MUI Dialog Component Overrides
 *
 * Premium dialog styles with:
 * - Rounded corners
 * - Subtle shadow
 * - Smooth transitions
 * - Theme-aware colors (light/dark)
 */

import type { Theme, Components } from "@mui/material/styles";

export const dialogOverrides: Components<Theme>["MuiDialog"] = {
  styleOverrides: {
    root: {
      // Container styles
    },
    paper: ({ theme }) => ({
      borderRadius: 16,
      boxShadow: theme.jaii.shadows.modal,
      margin: 16,
      maxHeight: "calc(100% - 32px)",
      maxWidth: "calc(100% - 32px)",
    }),
    paperFullScreen: {
      borderRadius: 0,
      margin: 0,
      maxHeight: "100%",
      maxWidth: "100%",
    },
  },
  defaultProps: {
    maxWidth: "sm",
    fullWidth: false,
  },
};

export const dialogTitleOverrides: Components<Theme>["MuiDialogTitle"] = {
  styleOverrides: {
    root: {
      padding: 20,
      fontSize: "1.125rem",
      fontWeight: 600,
    },
  },
};

export const dialogContentOverrides: Components<Theme>["MuiDialogContent"] = {
  styleOverrides: {
    root: {
      padding: 20,
      borderTop: "none",
    },
    dividers: ({ theme }) => ({
      borderTop: "1px solid",
      borderBottom: "1px solid",
      borderColor: theme.palette.divider,
    }),
  },
};

export const dialogActionsOverrides: Components<Theme>["MuiDialogActions"] = {
  styleOverrides: {
    root: {
      padding: 20,
      gap: 8,
    },
  },
};

export const backdropOverrides: Components<Theme>["MuiBackdrop"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(0, 0, 0, 0.72)"
          : "rgba(22, 28, 36, 0.64)",
    }),
    invisible: {
      backgroundColor: "transparent",
    },
  },
};
