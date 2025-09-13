import { colors, rgba } from "../colors";
import type { PrimaryColor } from "./ThemeProvider.types";

const DEFAULT_TEMPLATE = "--byteform";

export interface ThemeVars {
    [key: string]: string;
}

export const getThemeColors = (
    theme: "light" | "dark",
    primaryColor: PrimaryColor = "blue",
    variantOpacity = 0.6
) => {
    const vars: ThemeVars = {};

    if (theme === "dark") {
        vars[`${DEFAULT_TEMPLATE}-background`] = colors.dark[6];
        vars[`${DEFAULT_TEMPLATE}-background-hover`] = colors.dark[5];
        vars[`${DEFAULT_TEMPLATE}-border`] = colors.dark[4];
        vars[`${DEFAULT_TEMPLATE}-border-hover`] = colors.dark[3];
        vars[`${DEFAULT_TEMPLATE}-text`] = colors.white;
        vars[`${DEFAULT_TEMPLATE}-hint`] = colors.dark[2];
        vars[`${DEFAULT_TEMPLATE}-placeholder`] = colors.dark[2];
        vars[`${DEFAULT_TEMPLATE}-section`] = colors.dark[0];
    } else {
        vars[`${DEFAULT_TEMPLATE}-background`] = colors.light[3];
        vars[`${DEFAULT_TEMPLATE}-background-hover`] = colors.light[4];
        vars[`${DEFAULT_TEMPLATE}-border`] = colors.light[5];
        vars[`${DEFAULT_TEMPLATE}-border-hover`] = colors.light[6];
        vars[`${DEFAULT_TEMPLATE}-text`] = colors.dark[10];
        vars[`${DEFAULT_TEMPLATE}-hint`] = colors.dark[2];
        vars[`${DEFAULT_TEMPLATE}-placeholder`] = colors.dark[5];
        vars[`${DEFAULT_TEMPLATE}-section`] = colors.dark[1];
    }

    const primaryColorValue = colors[primaryColor][6];
    vars[`${DEFAULT_TEMPLATE}-primary`] = primaryColorValue;
    vars[`${DEFAULT_TEMPLATE}-primary-hover`] = colors[primaryColor][5];
    vars[`${DEFAULT_TEMPLATE}-primary-text`] = colors[primaryColor][0];
    vars[`${DEFAULT_TEMPLATE}-primary-light`] = rgba(
        primaryColorValue,
        variantOpacity
    );

    Object.entries(colors).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((shade, index) => {
                vars[`${DEFAULT_TEMPLATE}-${key}-${index}`] = shade;
                vars[`${DEFAULT_TEMPLATE}-${key}-light-${index}`] = rgba(
                    shade,
                    variantOpacity
                );
            });
        } else {
            vars[`${DEFAULT_TEMPLATE}-${key}`] = value;
        }
    });

    return vars;
};
