import type { ExtendedShadowValues } from "../../types";

export const SHADOW_MAP: Record<keyof ExtendedShadowValues, string> = {
    none: "shadow-none",
    xs: "shadow-sm",
    sm: "shadow",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
    default: "shadow-md"
};
