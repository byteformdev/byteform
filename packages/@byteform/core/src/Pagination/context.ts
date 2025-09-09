import { createSafeContext } from "../_utils/createContext";
import { PaginationContextValue } from "./types";

export const [PaginationProvider, usePaginationContext] =
    createSafeContext<PaginationContextValue>(
        "Pagination component was not found in the tree"
    );
