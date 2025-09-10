import { forwardRef } from "react";
import { TableProps, TableSpacing } from "./types";
import { useTheme } from "../_theme";
import { TableProvider } from "./context";
import { TableTr } from "./TableTr";
import { TableTd } from "./TableTd";
import { TableTh } from "./TableTh";
import { TableThead } from "./TableThead";
import { TableTbody } from "./TableTbody";
import { TableTfoot } from "./TableTfoot";
import { TableCaption } from "./TableCaption";

const getVerticalSpacingClass = (spacing: TableSpacing): string => {
    const spacingMap = {
        xs: "py-1",
        sm: "py-2",
        md: "py-3",
        lg: "py-4",
        xl: "py-6"
    };
    return spacingMap[spacing];
};

const getHorizontalSpacingClass = (spacing: TableSpacing): string => {
    const spacingMap = {
        xs: "px-1",
        sm: "px-2",
        md: "px-3",
        lg: "px-4",
        xl: "px-6"
    };
    return spacingMap[spacing];
};

const Table = forwardRef<HTMLTableElement, TableProps>(
    (
        {
            children,
            stickyHeader = false,
            striped = false,
            highlightOnHover = false,
            withTableBorder = false,
            withColumnBorders = false,
            withRowBorders = true,
            verticalSpacing = "md",
            horizontalSpacing = "md",
            variant = "default",
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const contextValue = {
            striped,
            highlightOnHover,
            withColumnBorders,
            withRowBorders,
            verticalSpacing,
            horizontalSpacing,
            variant,
            classNames
        };

        const getTableClasses = () => {
            return cx(
                "w-full border-collapse",

                theme === "light"
                    ? "text-[var(--byteform-light-text)]"
                    : "text-[var(--byteform-dark-text)]",

                withTableBorder &&
                    (theme === "light"
                        ? "border border-[var(--byteform-light-border)]"
                        : "border border-[var(--byteform-dark-border)]"),

                stickyHeader && [
                    "[&_thead_th]:sticky",
                    "[&_thead_th]:top-0",
                    "[&_thead_th]:z-10",
                    theme === "light"
                        ? "[&_thead_th]:bg-[var(--byteform-light-bg)]"
                        : "[&_thead_th]:bg-[var(--byteform-dark-bg)]"
                ],

                highlightOnHover && [
                    theme === "light"
                        ? "[&_tbody_tr]:hover:bg-[var(--byteform-light-hover)]"
                        : "[&_tbody_tr]:hover:bg-[var(--byteform-dark-hover)]"
                ],

                striped && [
                    theme === "light"
                        ? "[&_tbody_tr:nth-child(even)]:bg-[var(--byteform-light-striped)]"
                        : "[&_tbody_tr:nth-child(even)]:bg-[var(--byteform-dark-striped)]"
                ],

                withRowBorders && [
                    theme === "light"
                        ? "[&_tr]:border-b [&_tr]:border-[var(--byteform-light-border)]"
                        : "[&_tr]:border-b [&_tr]:border-[var(--byteform-dark-border)]"
                ],

                withColumnBorders && [
                    theme === "light"
                        ? "[&_th]:border-r [&_th]:border-[var(--byteform-light-border)] [&_td]:border-r [&_td]:border-[var(--byteform-light-border)]"
                        : "[&_th]:border-r [&_th]:border-[var(--byteform-dark-border)] [&_td]:border-r [&_td]:border-[var(--byteform-dark-border)]"
                ],

                `[&_th]:${getVerticalSpacingClass(verticalSpacing)}`,
                `[&_th]:${getHorizontalSpacingClass(horizontalSpacing)}`,
                `[&_td]:${getVerticalSpacingClass(verticalSpacing)}`,
                `[&_td]:${getHorizontalSpacingClass(horizontalSpacing)}`,

                variant === "vertical" && "table-auto",

                classNames?.root,
                className
            );
        };

        return (
            <TableProvider value={contextValue}>
                <table ref={ref} className={getTableClasses()} {...props}>
                    {children}
                </table>
            </TableProvider>
        );
    }
);

Table.displayName = "@byteform/core/Table";

const ExtendedTable = Object.assign(Table, {
    Tr: TableTr,
    Td: TableTd,
    Th: TableTh,
    Thead: TableThead,
    Tbody: TableTbody,
    Tfoot: TableTfoot,
    Caption: TableCaption
});

export { ExtendedTable as Table };
