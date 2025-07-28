import { forwardRef } from "react";
import { TableTheadProps } from "./types";
import { useTable } from "./context";
import { cx } from "../_theme";

export const TableThead = forwardRef<HTMLTableSectionElement, TableTheadProps>(
    ({ children, className, ...props }, ref) => {
        const { classNames } = useTable();

        return (
            <thead
                ref={ref}
                className={cx(classNames?.thead, className)}
                {...props}
            >
                {children}
            </thead>
        );
    }
);

TableThead.displayName = "@byteform/core/Table.Thead";
