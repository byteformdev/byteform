import { createSafeContext } from "../_utils/createContext";
import { TableContextValue } from "./types";

export const [TableProvider, useTable] = createSafeContext<TableContextValue>(
    "Table components must be used within a Table component"
);
