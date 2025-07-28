import { forwardRef } from "react";
import { ProgressRootProps, ProgressSize } from "./types";
import { useTheme } from "../_theme";

const sizeClasses = {
    xs: "h-1",
    sm: "h-3",
    md: "h-4",
    lg: "h-5",
    xl: "h-7"
};

const getSize = (size: ProgressSize) => {
    return sizeClasses[size] || sizeClasses.sm;
};

export const ProgressRoot = forwardRef<HTMLDivElement, ProgressRootProps>(
    ({ children, size = "sm", ...props }, ref) => {
        const { theme, cx } = useTheme();

        return (
            <div
                ref={ref}
                className={cx(
                    "relative w-full overflow-hidden rounded-md",
                    theme === "light"
                        ? "bg-[var(--byteform-light-background)]"
                        : "bg-[var(--byteform-dark-background)]",
                    getSize(size)
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

ProgressRoot.displayName = "@byteform/core/Progress.Root";
