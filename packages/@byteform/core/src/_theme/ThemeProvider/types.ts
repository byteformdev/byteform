import { ButtonAnimation } from "../../Button/types";

export type Theme = "light" | "dark";

export interface ButtonThemeSettings {
    compact?: boolean;
    animation?: ButtonAnimation;
}

export interface TooltipThemeSettings {
    compact?: boolean;
}

export interface ThemeSettings {
    button?: ButtonThemeSettings;
    tooltip?: TooltipThemeSettings;
}

export interface ThemeProviderProps {
    children: React.ReactNode;
    theme?: Theme;
    themeAutoSave?: boolean;
    themeStorageKey?: string;
    lightVariantOpacity?: number;
    settings?: ThemeSettings;
}

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    themeAutoSave: boolean;
    setThemeAutoSave: (themeAutoSave: boolean) => void;
    lightVariantOpacity: number;
    settings: ThemeSettings;
}
