import { forwardRef } from "react";
import { ProgressLabelProps, ProgressSize } from "./types";
import { useTheme } from "../_theme";
import { useProgressContext } from "./context";

const sizeClasses = {
    xs: "text-[6px] leading-none",
    sm: "text-[8px]",
    md: "text-[10px]",
    lg: "text-sm",
    xl: "text-base"
} as const;

const getSizeClass = (size: ProgressSize): string => {
    return sizeClasses[size] || sizeClasses.sm;
};

export const ProgressLabel = forwardRef<HTMLDivElement, ProgressLabelProps>(
    ({ children, position = "center", className, ...props }, ref) => {
        const { classNames, size, orientation } = useProgressContext();
        const { theme, cx } = useTheme();

        const isVertical = orientation === "vertical";

        const horizontalPositions = {
            left: "left-0",
            center: "left-1/2 -translate-x-1/2",
            right: "right-0"
        };

        const verticalPositions = {
            left: "top-0",
            center: "top-1/2 -translate-y-1/2",
            right: "bottom-0"
        };

        const positionClass = isVertical
            ? verticalPositions[position]
            : horizontalPositions[position];

        return (
            <div
                ref={ref}
                data-position={position}
                data-orientation={orientation}
                className={cx(
                    "absolute font-medium whitespace-nowrap px-2 pointer-events-none select-none",
                    isVertical
                        ? "left-1/2 -translate-x-1/2 rotate-90"
                        : "top-1/2 -translate-y-1/2",
                    positionClass,
                    getSizeClass(size),
                    theme === "light"
                        ? "text-[var(--byteform-light-text)]"
                        : "text-[var(--byteform-dark-text)]",
                    classNames?.label,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

ProgressLabel.displayName = "@byteform/core/Progress.Label";
