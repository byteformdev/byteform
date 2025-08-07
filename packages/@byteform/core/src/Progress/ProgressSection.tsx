import { forwardRef } from "react";
import { ProgressSectionProps } from "./types";
import { cx } from "../_theme";
import { useProgressContext } from "./context";

export const ProgressSection = forwardRef<HTMLDivElement, ProgressSectionProps>(
    (
        { children, value = 0, striped, animated, className, color, ...props },
        ref
    ) => {
        const { classNames } = useProgressContext();

        const style = {
            width: `${Math.min(100, Math.max(0, value))}%`,
            transition: "width 200ms ease"
        };

        return (
            <div
                ref={ref}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={value}
                className={cx(
                    "h-full relative bg-[var(--byteform-primary)]",
                    striped && "byteform-progress-striped",
                    animated &&
                        "byteform-progress-animated-stripes byteform-progress-striped",
                    classNames?.section,
                    className
                )}
                style={{
                    ...style,
                    backgroundColor: color
                }}
                {...props}
            >
                {children}
            </div>
        );
    }
);

ProgressSection.displayName = "@byteform/core/Progress.Section";
