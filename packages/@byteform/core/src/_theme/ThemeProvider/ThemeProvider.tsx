import { useEffect, useState } from "react";
import { Theme, ThemeProviderProps } from "./types";
import { ThemeContext } from "./context";
import { generateThemeVars, themeToVars } from "../colors/themeToVars";

const KEY = "byteform-theme";

export const ThemeProvider = ({
    children,
    theme,
    themeAutoSave,
    themeStorageKey = KEY,
    lightVariantOpacity = 0.6
}: ThemeProviderProps) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>(theme || "light");
    const [autosaveTheme, setAutosaveTheme] = useState<boolean>(
        themeAutoSave || false
    );

    useEffect(() => {
        if (autosaveTheme) {
            const savedTheme = localStorage.getItem(themeStorageKey);
            if (savedTheme) {
                setCurrentTheme(savedTheme as Theme);
            }
        }
    }, [autosaveTheme, themeStorageKey]);

    useEffect(() => {
        if (autosaveTheme) {
            localStorage.setItem(themeStorageKey, currentTheme);
        }
    }, [currentTheme, autosaveTheme, themeStorageKey]);

    useEffect(() => {
        const themeVars = generateThemeVars(lightVariantOpacity);

        Object.entries(themeVars).forEach(([property, value]) => {
            const cssProperty = property.startsWith("--")
                ? property
                : `--${property}`;
            document.body.style.setProperty(cssProperty, value);
        });

        return () => {
            Object.keys(themeVars).forEach((property) => {
                const cssProperty = property.startsWith("--")
                    ? property
                    : `--${property}`;
                document.body.style.removeProperty(cssProperty);
            });
        };
    }, [currentTheme, lightVariantOpacity]);

    return (
        <ThemeContext.Provider
            value={{
                theme: currentTheme,
                setTheme: setCurrentTheme,
                themeAutoSave: autosaveTheme,
                setThemeAutoSave: setAutosaveTheme,
                lightVariantOpacity
            }}
        >
            <div style={themeToVars()}>{children}</div>
        </ThemeContext.Provider>
    );
};
