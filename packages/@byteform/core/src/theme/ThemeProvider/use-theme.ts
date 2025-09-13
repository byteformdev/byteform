import { useThemeContext } from "./ThemeProvider.context";
import { cx } from "../../utils";
import {
    getRadius as baseGetRadius,
    getShadow as baseGetShadow,
    type RadiusSize,
    type ShadowSize
} from "../utils/themeHelpers";

export function useTheme() {
    const {
        theme,
        setTheme,
        toggleTheme,
        persistTheme,
        primaryColor,
        setPrimaryColor,
        variantOpacity,
        setVariantOpacity,
        themeSettings,
        components
    } = useThemeContext();

    if (!theme || !setTheme)
        throw new Error("ThemeProvider not found in the tree");

    const getRadiusEnhanced = (size: RadiusSize = "default") =>
        baseGetRadius(size, themeSettings);
    const getShadowEnhanced = (size: ShadowSize = "default") =>
        baseGetShadow(size, themeSettings);

    return {
        cx,
        theme,
        setTheme,
        toggleTheme,
        persistTheme,
        primaryColor,
        setPrimaryColor,
        variantOpacity,
        setVariantOpacity,
        themeSettings,
        getRadius: getRadiusEnhanced,
        getShadow: getShadowEnhanced,
        components
    };
}
