import { forwardRef } from "react";
import { TableThProps } from "./types";
import { useTheme } from "../_theme";
import { useTable } from "./context";

export const TableTh = forwardRef<HTMLTableCellElement, TableThProps>(
    ({ children, className, ...props }, ref) => {
        const { theme, cx } = useTheme();
        const { withColumnBorders, classNames } = useTable();

        const getHeaderClasses = () => {
            return cx(
                "p-3 text-left font-semibold align-top",
                withColumnBorders &&
                    (theme === "light"
                        ? "border-r border-[var(--byteform-light-border)] last:border-r-0"
                        : "border-r border-[var(--byteform-dark-border)] last:border-r-0"),
                classNames?.th,
                className
            );
        };

        return (
            <th ref={ref} className={getHeaderClasses()} {...props}>
                {children}
            </th>
        );
    }
);

TableTh.displayName = "@byteform/core/Table.Th";
