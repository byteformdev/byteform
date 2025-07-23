import { forwardRef } from "react";
import { TableTbodyProps } from "./types";
import { useTable } from "./context";

export const TableTbody = forwardRef<HTMLTableSectionElement, TableTbodyProps>(
    ({ children, className, ...props }, ref) => {
        const { classNames } = useTable();

        return (
            <tbody
                ref={ref}
                className={`${classNames?.tbody || ""} ${
                    className || ""
                }`.trim()}
                {...props}
            >
                {children}
            </tbody>
        );
    }
);

TableTbody.displayName = "@byteform/core/Table.Tbody";
