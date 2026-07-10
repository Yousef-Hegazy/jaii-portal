/**
 * MUI Dialog Component Overrides
 *
 * Premium dialog styles with:
 * - Rounded corners
 * - Subtle shadow
 * - Smooth transitions
 */

import type { Theme, Components } from "@mui/material/styles";
import { dialogClasses } from "@mui/material/Dialog";
import { dialogTitleClasses } from "@mui/material/DialogTitle";
import { dialogContentClasses } from "@mui/material/DialogContent";
import { dialogActionsClasses } from "@mui/material/DialogActions";

export const dialogOverrides: Components<Theme>["MuiDialog"] = {
  styleOverrides: {
    root: {
      // Container styles
    },
    paper: {
      borderRadius: 16,
      boxShadow: "0 0 2px rgba(145, 158, 171, 0.20), 0 16px 48px rgba(145, 158, 171, 0.16)",
      margin: 16,
      maxHeight: "calc(100% - 32px)",
      maxWidth: "calc(100% - 32px)",
    },
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
    dividers: {
      borderTop: "1px solid",
      borderBottom: "1px solid",
      borderColor: "rgba(145, 158, 171, 0.16)",
    },
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
    root: {
      backgroundColor: "rgba(22, 28, 36, 0.64)",
    },
    invisible: {
      backgroundColor: "transparent",
    },
  },
};
