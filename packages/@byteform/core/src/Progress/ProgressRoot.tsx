import { forwardRef } from "react";
import { ProgressRootProps, ProgressSize } from "./types";
import { useTheme } from "../_theme";
import { ProgressContext } from "./context";

const sizeClasses = {
    xs: "h-1",
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
    xl: "h-5"
};

const getSize = (size: ProgressSize) => {
    return sizeClasses[size] || sizeClasses.sm;
};

export const ProgressRoot = forwardRef<HTMLDivElement, ProgressRootProps>(
    ({ children, size = "sm", classNames, ...props }, ref) => {
        const { theme, cx } = useTheme();

        return (
            <ProgressContext.Provider value={{ classNames }}>
                <div
                    ref={ref}
                    className={cx(
                        "relative w-full overflow-hidden rounded-md",
                        theme === "light"
                            ? "bg-[var(--byteform-light-background)]"
                            : "bg-[var(--byteform-dark-background)]",
                        classNames?.track,
                        getSize(size)
                    )}
                    {...props}
                >
                    {children}
                </div>
            </ProgressContext.Provider>
        );
    }
);

ProgressRoot.displayName = "@byteform/core/Progress.Root";
