import type { ExtendedRadiusValues } from "../../types";

export const RADIUS_MAP: Record<keyof ExtendedRadiusValues, string> = {
    none: "rounded-none",
    xs: "rounded-[1px]",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",

    default: "rounded-md"
};
