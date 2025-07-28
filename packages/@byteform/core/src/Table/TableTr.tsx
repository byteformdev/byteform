import { forwardRef } from "react";
import { TableTrProps } from "./types";
import { useTheme } from "../_theme";
import { useTable } from "./context";

export const TableTr = forwardRef<HTMLTableRowElement, TableTrProps>(
    ({ children, className, ...props }, ref) => {
        const { theme, cx } = useTheme();
        const { striped, highlightOnHover, withRowBorders, classNames } =
            useTable();

        const getRowClasses = () => {
            return cx(
                withRowBorders &&
                    (theme === "light"
                        ? "border-b border-[var(--byteform-light-border)]"
                        : "border-b border-[var(--byteform-dark-border)]"),
                striped &&
                    (theme === "light"
                        ? "even:bg-[var(--byteform-light-background)]"
                        : "even:bg-[var(--byteform-dark-background)]"),
                highlightOnHover &&
                    (theme === "light"
                        ? "hover:bg-[var(--byteform-light-background-hover)]"
                        : "hover:bg-[var(--byteform-dark-background-hover)]"),
                classNames?.tr,
                className
            );
        };

        return (
            <tr ref={ref} className={getRowClasses()} {...props}>
                {children}
            </tr>
        );
    }
);

TableTr.displayName = "@byteform/core/Table.Tr";
