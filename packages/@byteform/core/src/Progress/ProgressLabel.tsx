import { forwardRef } from "react";
import { ProgressLabelProps, ProgressSize } from "./types";
import { useTheme } from "../_theme";

const sizeClasses = {
    xs: "text-[6px] leading-none",
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
    xl: "text-base"
};

const getSize = (size: ProgressSize) => {
    return sizeClasses[size] || sizeClasses.sm;
};

export const ProgressLabel = forwardRef<HTMLDivElement, ProgressLabelProps>(
    (
        { children, position = "left", size = "sm", className, ...props },
        ref
    ) => {
        const { theme, cx } = useTheme();

        return (
            <div
                ref={ref}
                className={cx(
                    "absolute font-medium whitespace-nowrap px-2 top-1/2 -translate-y-1/2",
                    position === "left" && "left-0",
                    position === "center" && "left-1/2 -translate-x-1/2",
                    position === "right" && "right-0",
                    getSize(size),
                    theme === "light"
                        ? "text-[var(--byteform-light-text)]"
                        : "text-[var(--byteform-dark-text)]",
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
