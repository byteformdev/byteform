import { forwardRef } from "react";
import { TableTfootProps } from "./types";
import { useTheme } from "../_theme";
import { useTable } from "./context";

export const TableTfoot = forwardRef<HTMLTableSectionElement, TableTfootProps>(
    ({ children, className, ...props }, ref) => {
        const { theme, cx } = useTheme();
        const { classNames } = useTable();

        const getFooterClasses = () => {
            return cx(
                theme === "light"
                    ? "bg-[var(--byteform-light-background)]"
                    : "bg-[var(--byteform-dark-background)]",
                classNames?.tfoot,
                className
            );
        };

        return (
            <tfoot ref={ref} className={getFooterClasses()} {...props}>
                {children}
            </tfoot>
        );
    }
);

TableTfoot.displayName = "@byteform/core/Table.Tfoot";
