export type Theme = "light" | "dark";

export interface ThemeProviderProps {
    children: React.ReactNode;
    theme?: Theme;
    themeAutoSave?: boolean;
    themeStorageKey?: string;
    lightVariantOpacity?: number;
}

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    themeAutoSave: boolean;
    setThemeAutoSave: (themeAutoSave: boolean) => void;
    lightVariantOpacity: number;
}
