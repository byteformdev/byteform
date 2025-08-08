import { createContext, useContext } from "react";
import { ThemeContextType } from "./types";

export const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    setTheme: () => {},
    themeAutoSave: false,
    setThemeAutoSave: () => {},
    lightVariantOpacity: 0.6,
    settings: {}
});

export const useTheme = () => {
    return useContext(ThemeContext);
};
