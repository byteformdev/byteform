import { useThemeContext } from "./ThemeProvider.context";
import { cx } from "../../utils";

export function useTheme() {
    const {
        theme,
        setTheme,
        toggleTheme,
        persistTheme,
        primaryColor,
        setPrimaryColor,
        variantOpacity,
        setVariantOpacity
    } = useThemeContext();

    if (!theme || !setTheme)
        throw new Error("ThemeProvider not found in the tree");

    return {
        cx,
        theme,
        setTheme,
        toggleTheme,
        persistTheme,
        primaryColor,
        setPrimaryColor,
        variantOpacity,
        setVariantOpacity
    };
}
