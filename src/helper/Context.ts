import { createContext, useContext } from "react";
import { ColorModeContextValue } from "../../types";

export const ColorModeContext = createContext<ColorModeContextValue>({
  toggleColorMode: () => {}
});

export const useColorMode = () => useContext(ColorModeContext);