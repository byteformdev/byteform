import { ComponentRadius, ComponentShadow } from "../../types";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export type PrimaryColor =
    | "blue"
    | "red"
    | "green"
    | "yellow"
    | "purple"
    | "orange"
    | "pink"
    | "rose"
    | "cyan"
    | "teal"
    | "indigo"
    | "lime"
    | "gray"
    | "amber";

export interface ThemeSettings {
    defaultRadius?: ComponentRadius;
    defaultShadow?: ComponentShadow;
}

export interface ThemeProviderProps {
    children: React.ReactNode;
    theme?: Theme;
    persistTheme?: boolean;
    storageKey?: string;
    primaryColor?: PrimaryColor;
    variantOpacity?: number;
    themeSettings?: ThemeSettings;
    components?: Record<string, { defaultProps: Record<string, any> }>;
}

export interface ThemeContextType {
    theme: ResolvedTheme;
    setTheme: (theme: ResolvedTheme) => void;
    toggleTheme: () => void;
    persistTheme: boolean;
    setPersistTheme: (persistTheme: boolean) => void;
    primaryColor: PrimaryColor;
    setPrimaryColor: (color: PrimaryColor) => void;
    variantOpacity: number;
    setVariantOpacity: (opacity: number) => void;
    themeSettings?: ThemeSettings;
    components?: Record<string, { defaultProps: Record<string, any> }>;
}
