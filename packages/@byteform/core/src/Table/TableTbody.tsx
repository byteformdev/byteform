import { forwardRef } from "react";
import { TableTbodyProps } from "./types";
import { useTheme } from "../_theme";
import { useTable } from "./context";

export const TableTbody = forwardRef<HTMLTableSectionElement, TableTbodyProps>(
    ({ children, className, ...props }, ref) => {
        const { cx } = useTheme();
        const { classNames } = useTable();

        const getBodyClasses = () => {
            return cx(classNames?.tbody, className);
        };

        return (
            <tbody ref={ref} className={getBodyClasses()} {...props}>
                {children}
            </tbody>
        );
    }
);

TableTbody.displayName = "@byteform/core/Table.Tbody";
