import { forwardRef } from "react";
import { usePaginationContext } from "./context";
import { PaginationLabelProps } from "./types";
import { useTheme } from "../_theme";

export const PaginationLabel = forwardRef<HTMLDivElement, PaginationLabelProps>(
    ({ children, className, ...props }, ref) => {
        const { total, page, classNames } = usePaginationContext();
        const { theme, cx } = useTheme();

        return (
            <div
                ref={ref}
                className={cx(
                    "flex items-center px-2 font-medium",
                    theme === "light"
                        ? "text-[var(--byteform-light-hint)]"
                        : "text-[var(--byteform-dark-hint)]",
                    classNames?.label,
                    className
                )}
                aria-live="polite"
                aria-atomic="true"
                {...props}
            >
                {children || `${page} of ${total}`}
            </div>
        );
    }
);

PaginationLabel.displayName = "@byteform/core/Pagination.Label";
