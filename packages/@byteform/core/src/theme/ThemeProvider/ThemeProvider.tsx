import { ResolvedTheme, ThemeProviderProps } from "./ThemeProvider.types";
import { ThemeContextProvider } from "./ThemeProvider.context";
import { useEffect, useState } from "react";
import { getThemeColors, ThemeVars } from "./themeToVars";

const KEY = "byteform-theme";

export function ThemeProvider({
    children,
    theme = "system",
    persistTheme = true,
    storageKey = KEY,
    primaryColor = "blue",
    variantOpacity = 0.6,
    themeSettings,
    components
}: ThemeProviderProps) {
    const [persist, setPersist] = useState(persistTheme);
    const [currentTheme, setCurrentTheme] = useState<ResolvedTheme>(
        theme === "system" ? "light" : theme
    );

    const [currentPrimaryColor, setCurrentPrimaryColor] =
        useState(primaryColor);
    const [currentVariantOpacity, setCurrentVariantOpacity] =
        useState(variantOpacity);

    useEffect(() => {
        if (typeof window === "undefined") return;

        let resolvedTheme: ResolvedTheme | undefined;

        if (persist && typeof localStorage !== "undefined") {
            const saved = localStorage.getItem(storageKey);
            if (saved === "dark" || saved === "light") {
                resolvedTheme = saved;
            }
        }

        if (!resolvedTheme && theme === "system") {
            resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "light";
        }

        if (!resolvedTheme && theme !== "system") {
            resolvedTheme = theme;
        }

        if (!resolvedTheme) {
            resolvedTheme = "light";
        }

        setCurrentTheme((prev) =>
            prev !== resolvedTheme ? resolvedTheme : prev
        );
    }, [theme, persist, storageKey]);

    useEffect(() => {
        if (theme !== "system" || typeof window === "undefined") return;

        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const listener = (e: MediaQueryListEvent) =>
            setCurrentTheme(e.matches ? "dark" : "light");
        mq.addEventListener("change", listener);

        return () => mq.removeEventListener("change", listener);
    }, [theme]);

    useEffect(() => {
        if (persist && typeof localStorage !== "undefined") {
            localStorage.setItem(storageKey, currentTheme);
        }
    }, [currentTheme, persist, storageKey]);

    useEffect(() => {
        if (typeof document === "undefined") return;

        const vars: ThemeVars = getThemeColors(
            currentTheme,
            currentPrimaryColor,
            currentVariantOpacity
        );
        const root = document.documentElement;

        Object.entries(vars).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }, [currentTheme, currentPrimaryColor, currentVariantOpacity]);

    const toggleTheme = () =>
        setCurrentTheme((prev) => (prev === "dark" ? "light" : "dark"));

    return (
        <ThemeContextProvider
            value={{
                theme: currentTheme,
                setTheme: setCurrentTheme,
                toggleTheme,
                persistTheme: persist,
                setPersistTheme: setPersist,
                primaryColor: currentPrimaryColor,
                setPrimaryColor: setCurrentPrimaryColor,
                variantOpacity: currentVariantOpacity,
                setVariantOpacity: setCurrentVariantOpacity,
                themeSettings,
                components
            }}
        >
            {children}
        </ThemeContextProvider>
    );
}
