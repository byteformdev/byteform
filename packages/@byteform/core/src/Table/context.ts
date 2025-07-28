import { createContext, useContext } from "react";
import { TableContextValue } from "./types";

export const TableContext = createContext<TableContextValue | null>(null);

export const useTable = () => {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error(
            "Table components must be used within a Table component"
        );
    }

    return context;
};
