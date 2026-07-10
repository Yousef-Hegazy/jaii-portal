/**
 * Jaii Portal Theme TypeScript Augmentation
 *
 * Extends MUI's Theme and ThemeOptions interfaces to include
 * custom Jaii-specific properties.
 */

declare module "@mui/material/styles" {
  interface Theme {
    /**
     * Jaii-specific theme extensions
     */
    jaii: {
      /** Currently active primary preset key */
      primaryPreset: string;
      /** Neutral grey scale */
      neutral: Record<number, string>;
      /** Semantic status colors */
      semantic: {
        success: { main: string; light: string; lighter: string; dark: string; darker: string; contrastText: string };
        warning: { main: string; light: string; lighter: string; dark: string; darker: string; contrastText: string };
        error: { main: string; light: string; lighter: string; dark: string; darker: string; contrastText: string };
        info: { main: string; light: string; lighter: string; dark: string; darker: string; contrastText: string };
      };
      /** Chart color configuration */
      chart: {
        series: string[];
        background: { light: string; dark: string };
        grid: { light: string; dark: string };
        text: { light: string; dark: string };
      };
      /** Extended palette tokens for the active primary preset */
      palette: {
        primary: {
          lighter: string;
          light: string;
          main: string;
          dark: string;
          darker: string;
          contrastText: string;
          hover: string;
          selected: string;
          focus: string;
          translucent: string;
        };
      };
      /** Shape configuration with custom radii */
      shape: {
        borderRadius: number;
        custom: {
          button: number;
          card: number;
          dialog: number;
          drawer: number;
          menu: number;
          paper: number;
          tooltip: number;
          chip: number;
          input: number;
        };
      };
      /** Custom shadows for premium feel */
      shadows: {
        card: string;
        cardHover: string;
        dropdown: string;
        modal: string;
        drawer: string;
        buttonPrimary: string;
        buttonPrimaryHover: string;
        inputFocus: string;
      };
    };
  }

  interface ThemeOptions {
    /**
     * Jaii-specific theme options
     */
    jaii?: {
      /** Primary color preset key (default: "cyan") */
      primaryPreset?: string;
      /** Radius preset key (default: "balanced") */
      radius?: string;
      /** Neutral grey scale */
      neutral?: Record<number, string>;
      /** Semantic status colors */
      semantic?: Theme["jaii"]["semantic"];
      /** Extended palette tokens */
      palette?: {
        primary?: Theme["jaii"]["palette"]["primary"];
      };
      /** Chart color configuration */
      chart?: Theme["jaii"]["chart"];
      /** Shape configuration */
      shape?: Theme["jaii"]["shape"];
      /** Custom shadow overrides */
      shadows?: Partial<Theme["jaii"]["shadows"]>;
    };
  }
}

/**
 * Augment Palette interface to include our custom colors
 */
declare module "@mui/material/styles" {
  interface Palette {
    neutral: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
  }

  interface PaletteOptions {
    neutral?: {
      main?: string;
      light?: string;
      dark?: string;
      contrastText?: string;
    };
  }
}

// Export empty object to make this a module
export {};
