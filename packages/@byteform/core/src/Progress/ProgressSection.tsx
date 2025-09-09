import { forwardRef, useMemo } from "react";
import { ProgressSectionProps } from "./types";
import { cx } from "../_theme";
import { useProgressContext } from "./context";

export const ProgressSection = forwardRef<HTMLDivElement, ProgressSectionProps>(
    (
        {
            children,
            value = 0,
            striped,
            animated,
            className,
            color,
            transitionDuration,
            ...props
        },
        ref
    ) => {
        const {
            classNames,
            orientation,
            transitionDuration: contextTransitionDuration
        } = useProgressContext();

        // Clamp value between 0 and 100 for safety
        const clampedValue = useMemo(
            () => Math.min(100, Math.max(0, value)),
            [value]
        );

        // Use provided transitionDuration or fall back to context value
        const finalTransitionDuration =
            transitionDuration ?? contextTransitionDuration;

        const isVertical = orientation === "vertical";

        const style = useMemo(
            () => ({
                [isVertical ? "height" : "width"]: `${clampedValue}%`,
                transition: `${
                    isVertical ? "height" : "width"
                } ${finalTransitionDuration}ms ease`,
                backgroundColor: color
            }),
            [clampedValue, isVertical, finalTransitionDuration, color]
        );

        return (
            <div
                ref={ref}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={clampedValue}
                aria-orientation={orientation}
                data-value={clampedValue}
                data-striped={striped ? "" : undefined}
                data-animated={animated ? "" : undefined}
                className={cx(
                    "relative bg-[var(--byteform-primary)]",
                    isVertical ? "w-full" : "h-full",
                    striped && "byteform-progress-striped",
                    animated && striped && "byteform-progress-animated-stripes",
                    classNames?.section,
                    className
                )}
                style={style}
                {...props}
            >
                {children}
            </div>
        );
    }
);

ProgressSection.displayName = "@byteform/core/Progress.Section";
