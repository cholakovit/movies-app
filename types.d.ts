import { PaletteMode } from "@mui/material";
import { PaletteOptions } from "@mui/material/styles";
import { AlertColor } from "@mui/material";
declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
    light: string;
    main: string;
    dark: string;
    contrastText: string;
    black?: string;
    fourth?: string; 
    white?: string;
    iconColor?: string;
    hoverBgButton?: string;
  }

  type Palette = {
    primary: PaletteColor;
  }

  // Merge the Palette interface with the Theme interface
  interface Theme extends Palette {
    breakpoints: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
      up: (key: number | string) => string;
      down: (key: number | string) => string;
      between: (start: number | string, end: number | string) => string;
      only: (key: number | string) => string;
      width: (key: number | string) => number;
    };
  }

  type ThemeOptions = {
    palette?: PaletteOptions;
  }
}

export type ColorModeContextValue = {
  toggleColorMode: () => void;
}
export type CustomPalette = {
  primary: {
    main: string;
    black: string;
    white: string;
    iconColor: string;
  };
  mode: PaletteMode;
}

export type ColorModeContextType = {
  toggleColorMode: () => void;
}

export type AlertWithTimeoutHookProps = {
  initialAlert: string | null
  timeout: number
}

export type AlertMessageProps = {
  alert: string | null;
  type: AlertColor;
}

type SkeletonProps = {
  flag: number;
  width: number;
  height: number;
  number: number;
};

type colorModeProps = {
  toggleColorMode: () => void; 
}

type Movie = {
  id: number;
  title: string;
  checked: boolean;
}

type MovieData = {
  id: number;
  title: string;
  overview: string;
  actors: string[]; 
  genres: string[]; 
  poster: string;
  release: string;
  rating: number;
  trailer: string; 
  director: string; 
  duration: number;
}