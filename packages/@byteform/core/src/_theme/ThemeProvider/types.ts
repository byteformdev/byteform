import { ButtonAnimation } from "../../Button/types";

export type Theme = "light" | "dark";

export interface CompactSettings {
    button?: boolean;
    tooltip?: boolean;
}

export interface ThemeSettings {
    buttonAnimation?: ButtonAnimation;
    compact?: CompactSettings;
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
