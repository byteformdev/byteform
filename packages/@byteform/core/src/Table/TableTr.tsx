import { forwardRef } from "react";
import { TableTrProps } from "./types";
import { useTheme } from "../_theme";
import { useTable } from "./context";

export const TableTr = forwardRef<HTMLTableRowElement, TableTrProps>(
    ({ children, className, ...props }, ref) => {
        const { theme, cx } = useTheme();
        const { classNames } = useTable();

        const getRowClasses = () => {
            return cx(classNames?.tr, className);
        };

        return (
            <tr ref={ref} className={getRowClasses()} {...props}>
                {children}
            </tr>
        );
    }
);

TableTr.displayName = "@byteform/core/Table.Tr";
