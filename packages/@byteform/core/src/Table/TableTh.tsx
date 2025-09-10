import { forwardRef } from "react";
import { TableThProps, TableSpacing } from "./types";
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

export const TableTh = forwardRef<HTMLTableCellElement, TableThProps>(
    ({ children, className, ...props }, ref) => {
        const { theme, cx } = useTheme();
        const {
            withColumnBorders,
            classNames,
            verticalSpacing,
            horizontalSpacing
        } = useTable();

        const getHeaderClasses = () => {
            return cx(
                "text-left font-semibold align-top",

                getSpacingClasses(verticalSpacing, horizontalSpacing),

                withColumnBorders && [
                    theme === "light"
                        ? "border-r border-[var(--byteform-light-border)]"
                        : "border-r border-[var(--byteform-dark-border)]",
                    "last:border-r-0"
                ],

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
