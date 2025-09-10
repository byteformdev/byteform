import { forwardRef } from "react";
import { TableTheadProps } from "./types";
import { useTheme } from "../_theme";
import { useTable } from "./context";

export const TableThead = forwardRef<HTMLTableSectionElement, TableTheadProps>(
    ({ children, className, ...props }, ref) => {
        const { cx } = useTheme();
        const { classNames } = useTable();

        const getHeaderClasses = () => {
            return cx(classNames?.thead, className);
        };

        return (
            <thead ref={ref} className={getHeaderClasses()} {...props}>
                {children}
            </thead>
        );
    }
);

TableThead.displayName = "@byteform/core/Table.Thead";
