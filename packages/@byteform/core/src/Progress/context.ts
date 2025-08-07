import { createContext, useContext } from "react";
import { ProgressContextValue } from "./types";

export const ProgressContext = createContext<ProgressContextValue | null>(null);

export const useProgressContext = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error(
            "Progress components must be used within a Progress.Root"
        );
    }
    return context;
};
