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
 */
export function createComponentOverrides(): Components<Theme> {
  return {
    MuiButton: buttonOverrides,
    MuiCard: cardOverrides,
    MuiCardActionArea: cardActionAreaOverrides,
    MuiCardContent: cardContentOverrides,
    MuiCardHeader: cardHeaderOverrides,
    MuiPaper: paperOverrides,
    MuiTextField: textFieldOverrides,
    MuiInputBase: inputBaseOverrides,
    MuiOutlinedInput: outlinedInputOverrides,
    MuiFilledInput: filledInputOverrides,
    MuiInputLabel: inputLabelOverrides,
    MuiFormHelperText: formHelperTextOverrides,
    MuiTooltip: tooltipOverrides,
    MuiDialog: dialogOverrides,
    MuiDialogTitle: dialogTitleOverrides,
    MuiDialogContent: dialogContentOverrides,
    MuiDialogActions: dialogActionsOverrides,
    MuiBackdrop: backdropOverrides,
    MuiDrawer: drawerOverrides,
    MuiChip: chipOverrides,
    MuiIconButton: iconButtonOverrides,
    MuiMenu: menuOverrides,
    MuiMenuItem: menuItemOverrides,
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
