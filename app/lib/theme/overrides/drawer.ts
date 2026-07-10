/**
 * MUI Drawer Component Overrides
 *
 * Premium drawer styles with:
 * - Rounded corners for temporary drawers
 * - Subtle shadow
 * - Proper RTL edge handling
 * - Theme-aware borders (light/dark)
 */

import type { Theme, Components } from "@mui/material/styles";

export const drawerOverrides: Components<Theme>["MuiDrawer"] = {
  styleOverrides: {
    root: ({ ownerState, theme }) => ({
      // RTL-aware positioning
      ...(ownerState.anchor === "left" && {
        "& .MuiDrawer-paper": {
          borderRight: "1px solid",
          borderColor: theme.palette.divider,
        },
      }),
      ...(ownerState.anchor === "right" && {
        "& .MuiDrawer-paper": {
          borderLeft: "1px solid",
          borderColor: theme.palette.divider,
        },
      }),
    }),
    paper: ({ theme }) => ({
      boxShadow: theme.jaii.shadows.drawer,
      "&.MuiDrawer-paperAnchorLeft": {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      "&.MuiDrawer-paperAnchorRight": {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      "&.MuiDrawer-paperAnchorBottom": {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
      "&.MuiDrawer-paperAnchorTop": {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
    }),
  },
  defaultProps: {
    elevation: 0,
  },
};
