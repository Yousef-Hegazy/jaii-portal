/**
 * MUI TextField Component Overrides
 *
 * Premium input styles with:
 * - Consistent border radius
 * - Subtle focus ring
 * - Proper RTL support
 */

import type { Theme, Components } from "@mui/material/styles";

export const textFieldOverrides: Components<Theme>["MuiTextField"] = {
  styleOverrides: {
    root: {
      // Ensure consistent sizing
    },
  },
  defaultProps: {
    variant: "outlined",
    size: "medium",
  },
};

export const inputBaseOverrides: Components<Theme>["MuiInputBase"] = {
  styleOverrides: {
    root: {
      borderRadius: 8,
    },
    input: {
      "&::placeholder": {
        opacity: 0.6,
      },
    },
    adornedStart: {
      paddingLeft: 12,
    },
    adornedEnd: {
      paddingRight: 12,
    },
  },
};

export const outlinedInputOverrides: Components<Theme>["MuiOutlinedInput"] = {
  styleOverrides: {
    root: {
      borderRadius: 8,
      transition: "border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(145, 158, 171, 0.32)",
        },
      },
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderWidth: 1.5,
        },
      },
    },
    notchedOutline: {
      borderColor: "rgba(145, 158, 171, 0.24)",
      transition: "border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    },
    input: {
      padding: "12px 14px",
    },
  },
};

export const filledInputOverrides: Components<Theme>["MuiFilledInput"] = {
  styleOverrides: {
    root: {
      borderRadius: "8px 8px 0 0",
      backgroundColor: "rgba(145, 158, 171, 0.08)",
      "&:hover": {
        backgroundColor: "rgba(145, 158, 171, 0.12)",
      },
      "&.Mui-focused": {
        backgroundColor: "rgba(145, 158, 171, 0.08)",
      },
    },
  },
};

export const inputLabelOverrides: Components<Theme>["MuiInputLabel"] = {
  styleOverrides: {
    root: {
      fontWeight: 500,
    },
    outlined: {
      transform: "translate(14px, 12px) scale(1)",
      "&.MuiInputLabel-shrink": {
        transform: "translate(14px, -9px) scale(0.75)",
      },
    },
  },
};

export const formHelperTextOverrides: Components<Theme>["MuiFormHelperText"] = {
  styleOverrides: {
    root: {
      marginTop: 4,
      fontSize: "12px",
    },
  },
};
