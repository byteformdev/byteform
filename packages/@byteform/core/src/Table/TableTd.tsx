import { forwardRef } from "react";
import { TableTdProps, TableSpacing } from "./types";
import { useTheme } from "../_theme";
import { useTable } from "./context";

const getSpacingClasses = (
    vertical: TableSpacing,
    horizontal: TableSpacing
): string => {
    const verticalMap = {
        xs: "py-1",
        sm: "py-2",
        md: "py-3",
        lg: "py-4",
        xl: "py-6"
    };

    const horizontalMap = {
        xs: "px-1",
        sm: "px-2",
        md: "px-3",
        lg: "px-4",
        xl: "px-6"
    };

    return `${verticalMap[vertical]} ${horizontalMap[horizontal]}`;
};

export const TableTd = forwardRef<HTMLTableCellElement, TableTdProps>(
    ({ children, className, ...props }, ref) => {
        const { theme, cx } = useTheme();
        const {
            withColumnBorders,
            variant,
            classNames,
            verticalSpacing,
            horizontalSpacing
        } = useTable();

        const getCellClasses = () => {
            return cx(
                "text-left align-top",

                getSpacingClasses(verticalSpacing, horizontalSpacing),

                withColumnBorders && [
                    theme === "light"
                        ? "border-r border-[var(--byteform-light-border)]"
                        : "border-r border-[var(--byteform-dark-border)]",
                    "last:border-r-0"
                ],

                variant === "vertical" && [
                    "first:font-medium first:w-1/4",
                    theme === "light"
                        ? "first:bg-[var(--byteform-light-background)]"
                        : "first:bg-[var(--byteform-dark-background)]"
                ],

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
