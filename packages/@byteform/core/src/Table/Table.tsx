import { forwardRef } from "react";
import { TableProps } from "./types";
import { useTheme } from "../_theme";
import { TableContext } from "./context";
import { TableTr } from "./TableTr";
import { TableTd } from "./TableTd";
import { TableTh } from "./TableTh";
import { TableThead } from "./TableThead";
import { TableTbody } from "./TableTbody";
import { TableTfoot } from "./TableTfoot";
import { TableCaption } from "./TableCaption";

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
                stickyHeader &&
                    "[&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:z-10",
                variant === "vertical" && "table-auto",
                classNames?.root,
                className
            );
        };

        return (
            <TableContext.Provider value={contextValue}>
                <table ref={ref} className={getTableClasses()} {...props}>
                    {children}
                </table>
            </TableContext.Provider>
        );
    }
);

const ExtendedTable = Object.assign(Table, {
    Tr: TableTr,
    Td: TableTd,
    Th: TableTh,
    Thead: TableThead,
    Tbody: TableTbody,
    Tfoot: TableTfoot,
    Caption: TableCaption
});

ExtendedTable.displayName = "@byteform/core/Table";

export { ExtendedTable as Table };
