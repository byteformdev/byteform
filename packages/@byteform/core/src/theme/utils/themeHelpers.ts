import type { ExtendedRadiusValues, ExtendedShadowValues } from "../../types";
import { RADIUS_MAP, SHADOW_MAP } from "../defaults";
import type { ThemeSettings } from "../ThemeProvider/ThemeProvider.types";

export type RadiusSize = keyof ExtendedRadiusValues;
export type ShadowSize = keyof ExtendedShadowValues;

export function getRadius(
    size: RadiusSize = "default",
    themeSettings?: ThemeSettings
): string {
    const actualSize =
        size === "default" && themeSettings?.defaultRadius
            ? themeSettings.defaultRadius
            : size;
    return RADIUS_MAP[actualSize] || RADIUS_MAP.default;
}

export function getShadow(
    size: ShadowSize = "default",
    themeSettings?: ThemeSettings
): string {
    const actualSize =
        size === "default" && themeSettings?.defaultShadow
            ? themeSettings.defaultShadow
            : size;
    return SHADOW_MAP[actualSize] || SHADOW_MAP.default;
}
