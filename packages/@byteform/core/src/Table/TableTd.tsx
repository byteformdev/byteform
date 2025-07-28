import { forwardRef } from "react";
import { TableTdProps } from "./types";
import { useTheme } from "../_theme";
import { useTable } from "./context";

export const TableTd = forwardRef<HTMLTableCellElement, TableTdProps>(
    ({ children, className, ...props }, ref) => {
        const { theme, cx } = useTheme();
        const { withColumnBorders, variant, classNames } = useTable();

        const getCellClasses = () => {
            return cx(
                "p-3 text-left align-top",
                withColumnBorders &&
                    (theme === "light"
                        ? "border-r border-[var(--byteform-light-border)] last:border-r-0"
                        : "border-r border-[var(--byteform-dark-border)] last:border-r-0"),
                variant === "vertical" &&
                    "border-b first:font-medium first:w-1/4",
                variant === "vertical" &&
                    theme === "light" &&
                    "first:bg-[var(--byteform-light-background)]",
                variant === "vertical" &&
                    theme === "dark" &&
                    "first:bg-[var(--byteform-dark-background)]",
                classNames?.td,
                className
            );
        };

        return (
            <td ref={ref} className={getCellClasses()} {...props}>
                {children}
            </td>
        );
    }
);

TableTd.displayName = "@byteform/core/Table.Td";
