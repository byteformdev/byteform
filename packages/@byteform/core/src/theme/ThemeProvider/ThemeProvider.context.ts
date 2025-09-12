import { createSafeContext } from "../../utils";
import type { ThemeContextType } from "./ThemeProvider.types";

export const [ThemeContextProvider, useThemeContext] =
    createSafeContext<ThemeContextType>(
        "ThemeProvider was not found in the tree"
    );
