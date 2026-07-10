/**
 * MUI Component Overrides Index
 *
 * Exports all component style overrides for the Jaii theme.
 */

import type { Components, Theme } from "@mui/material/styles";

import { buttonOverrides } from "./button";
import {
  cardOverrides,
  cardActionAreaOverrides,
  cardContentOverrides,
  cardHeaderOverrides,
} from "./card";
import { paperOverrides } from "./paper";
import {
  textFieldOverrides,
  inputBaseOverrides,
  outlinedInputOverrides,
  filledInputOverrides,
  inputLabelOverrides,
  formHelperTextOverrides,
} from "./textField";
import { tooltipOverrides } from "./tooltip";
import {
  dialogOverrides,
  dialogTitleOverrides,
  dialogContentOverrides,
  dialogActionsOverrides,
  backdropOverrides,
} from "./dialog";
import { drawerOverrides } from "./drawer";
import { chipOverrides } from "./chip";
import { iconButtonOverrides } from "./iconButton";
import { menuOverrides, menuItemOverrides } from "./menu";

/**
 * Creates complete component overrides for MUI theme.
 *
 * @param compact - Whether compact density mode is enabled
 * @param highContrast - Whether high contrast mode is enabled
 */
export function createComponentOverrides(
  compact?: boolean,
  highContrast?: boolean,
): Components<Theme> {
  return {
    MuiButton: buttonOverrides,
    MuiCard: cardOverrides,
    MuiCardActionArea: cardActionAreaOverrides,
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: compact ? 12 : 16,
          "&:last-child": {
            paddingBottom: compact ? 12 : 24,
          },
        },
      },
    },
    MuiCardHeader: {
      ...cardHeaderOverrides,
      styleOverrides: {
        ...(cardHeaderOverrides as any)?.styleOverrides,
        root: {
          padding: compact ? "8px 12px" : "16px",
        },
      },
    },
    MuiPaper: paperOverrides,
    MuiTextField: textFieldOverrides,
    MuiInputBase: inputBaseOverrides,
    MuiOutlinedInput: outlinedInputOverrides,
    MuiFilledInput: filledInputOverrides,
    MuiInputLabel: inputLabelOverrides,
    MuiFormHelperText: formHelperTextOverrides,
    MuiTooltip: tooltipOverrides,
    MuiDialog: dialogOverrides,
    MuiDialogTitle: {
      ...dialogTitleOverrides,
      styleOverrides: {
        ...(dialogTitleOverrides as any)?.styleOverrides,
        root: {
          padding: compact ? "12px 16px" : "16px 24px",
        },
      },
    },
    MuiDialogContent: {
      ...dialogContentOverrides,
      styleOverrides: {
        ...(dialogContentOverrides as any)?.styleOverrides,
        root: {
          padding: compact ? "8px 16px" : "12px 24px",
        },
      },
    },
    MuiDialogActions: {
      ...dialogActionsOverrides,
      styleOverrides: {
        ...(dialogActionsOverrides as any)?.styleOverrides,
        root: {
          padding: compact ? "8px 16px" : "12px 24px",
        },
      },
    },
    MuiBackdrop: backdropOverrides,
    MuiDrawer: drawerOverrides,
    MuiChip: chipOverrides,
    MuiIconButton: iconButtonOverrides,
    MuiMenu: menuOverrides,
    MuiMenuItem: menuItemOverrides,
    // Compact mode adjustments for table-like components
    ...(compact
      ? {
          MuiTableCell: {
            styleOverrides: {
              root: {
                padding: "6px 12px",
              },
            },
          } as any,
          MuiToolbar: {
            styleOverrides: {
              root: {
                minHeight: "48px !important" as any,
                paddingLeft: "8px !important" as any,
                paddingRight: "8px !important" as any,
              },
            },
          } as any,
        }
      : {}),
  };
}

// Re-export individual overrides for direct access
export {
  buttonOverrides,
  cardOverrides,
  cardActionAreaOverrides,
  cardContentOverrides,
  cardHeaderOverrides,
  paperOverrides,
  textFieldOverrides,
  inputBaseOverrides,
  outlinedInputOverrides,
  filledInputOverrides,
  inputLabelOverrides,
  formHelperTextOverrides,
  tooltipOverrides,
  dialogOverrides,
  dialogTitleOverrides,
  dialogContentOverrides,
  dialogActionsOverrides,
  backdropOverrides,
  drawerOverrides,
  chipOverrides,
  iconButtonOverrides,
  menuOverrides,
  menuItemOverrides,
};
