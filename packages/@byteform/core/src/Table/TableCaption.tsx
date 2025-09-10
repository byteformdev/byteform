import { forwardRef } from "react";
import { TableCaptionProps } from "./types";
import { useTheme } from "../_theme";
import { useTable } from "./context";

export const TableCaption = forwardRef<
    HTMLTableCaptionElement,
    TableCaptionProps
>(({ children, captionSide = "bottom", className, ...props }, ref) => {
    const { theme, cx } = useTheme();
    const { classNames } = useTable();

    const getCaptionClasses = () => {
        return cx(
            "p-3 text-sm",
            theme === "light"
                ? "text-[var(--byteform-light-hint)]"
                : "text-[var(--byteform-dark-hint)]",

            captionSide === "top" ? "caption-top" : "caption-bottom",

            classNames?.caption,
            className
        );
    };

    return (
        <caption ref={ref} className={getCaptionClasses()} {...props}>
            {children}
        </caption>
    );
});

TableCaption.displayName = "@byteform/core/Table.Caption";
