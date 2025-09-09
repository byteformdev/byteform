import { forwardRef } from "react";
import { ProgressRootProps, ProgressSize, ProgressOrientation } from "./types";
import { useTheme } from "../_theme";
import { ProgressProvider } from "./context";

const horizontalSizeClasses = {
    xs: "h-1",
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
    xl: "h-5"
} as const;

const verticalSizeClasses = {
    xs: "w-1",
    sm: "w-2",
    md: "w-3",
    lg: "w-4",
    xl: "w-5"
} as const;

const getSizeClass = (
    size: ProgressSize,
    orientation: ProgressOrientation
): string => {
    return orientation === "horizontal"
        ? horizontalSizeClasses[size] || horizontalSizeClasses.sm
        : verticalSizeClasses[size] || verticalSizeClasses.sm;
};

export const ProgressRoot = forwardRef<HTMLDivElement, ProgressRootProps>(
    (
        {
            children,
            size = "sm",
            orientation = "horizontal",
            classNames,
            className,
            transitionDuration = 200,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const isVertical = orientation === "vertical";

        return (
            <ProgressProvider
                value={{
                    size,
                    orientation,
                    classNames,
                    transitionDuration
                }}
            >
                <div
                    ref={ref}
                    data-orientation={orientation}
                    data-size={size}
                    className={cx(
                        "flex relative overflow-hidden rounded-md",
                        isVertical
                            ? "flex-col h-52 flex-col-reverse"
                            : "w-full",
                        theme === "light"
                            ? "bg-[var(--byteform-light-background)]"
                            : "bg-[var(--byteform-dark-background)]",
                        getSizeClass(size, orientation),
                        classNames?.root,
                        classNames?.track,
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </ProgressProvider>
        );
    }
);

ProgressRoot.displayName = "@byteform/core/Progress.Root";
