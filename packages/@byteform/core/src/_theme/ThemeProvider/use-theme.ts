import { useContext } from "react";
import { ThemeContext } from "./context";
import { cx } from "../cx";

export const useTheme = () => {
    const { theme, setTheme, lightVariantOpacity, settings } =
        useContext(ThemeContext);

    if (!theme || !setTheme)
        throw new Error("useTheme must be used within a ThemeProvider");

    return {
        theme,
        setTheme,
        cx,
        lightVariantOpacity,
        settings
    };
};
