import { ButtonAnimation } from "@/byteform/Button";

export type Theme = "light" | "dark";

export interface ThemeSettings {
    buttonAnimation?: ButtonAnimation;
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
