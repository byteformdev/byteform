import { ProgressContextValue } from "./types";
import { createSafeContext } from "../_utils/createContext";

export const [ProgressProvider, useProgressContext] =
    createSafeContext<ProgressContextValue>(
        "Progress component was not found in tree."
    );
