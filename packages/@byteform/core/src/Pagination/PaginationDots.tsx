import { forwardRef, useMemo } from "react";
import { usePaginationContext } from "./context";
import { PaginationDotsProps } from "./types";
import { useTheme } from "../_theme";

const sizeStyles = {
    xs: "min-w-[24px] h-[24px] text-xs px-1",
    sm: "min-w-[28px] h-[28px] text-sm px-1.5",
    md: "min-w-[32px] h-[32px] text-base px-2",
    lg: "min-w-[40px] h-[40px] text-lg px-2.5",
    xl: "min-w-[48px] h-[48px] text-xl px-3"
};

export const PaginationDots = forwardRef<HTMLSpanElement, PaginationDotsProps>(
    ({ className, ...props }, ref) => {
        const { size, classNames } = usePaginationContext();
        const { theme, cx } = useTheme();

        const sizeClasses = useMemo(
            () => sizeStyles[size] || sizeStyles.md,
            [size]
        );

        return (
            <span
                ref={ref}
                className={cx(
                    "flex items-center justify-center rounded-md border border-transparent bg-transparent cursor-default select-none",
                    theme === "light"
                        ? "text-[var(--byteform-light-hint)]"
                        : "text-[var(--byteform-dark-hint)]",
                    sizeClasses,
                    classNames?.dots,
                    className
                )}
                aria-hidden="true"
                {...props}
            >
                ...
            </span>
        );
    }
);

PaginationDots.displayName = "@byteform/core/Pagination.Dots";
