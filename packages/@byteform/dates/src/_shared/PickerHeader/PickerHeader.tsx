import { forwardRef } from "react";
import { PickerHeaderProps } from "./types";
import { PickerControl } from "../PickerControl";
import { useTheme } from "@byteform/core";

export const PickerHeader = forwardRef<HTMLDivElement, PickerHeaderProps>(
    (
        {
            label,
            level = "month",
            hasNext = true,
            hasPrevious = true,
            onNext,
            onPrevious,
            onLevelClick,
            nextDisabled,
            previousDisabled,
            levelClickable,
            className,
            controlsOrder = ["previous", "level", "next"],
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const headerClasses = cx(
            "flex gap-2 items-center justify-between w-full px-2 py-1",
            className
        );

        const labelClasses = cx(
            "flex-1 text-center font-medium rounded-md h-7",
            theme === "light"
                ? "enabled:hover:bg-[var(--byteform-light-background-hover)] text-[var(--byteform-light-text)]"
                : "enabled:hover:bg-[var(--byteform-dark-background-hover)] text-[var(--byteform-dark-text)]",
            levelClickable && "cursor-pointer transition-colors duration-300"
        );

        const controlComponents = {
            previous: hasPrevious ? (
                <PickerControl
                    key="previous"
                    direction="previous"
                    onClick={onPrevious}
                    disabled={previousDisabled}
                />
            ) : null,
            level: (
                <button
                    key="level"
                    type="button"
                    className={labelClasses}
                    onClick={levelClickable ? onLevelClick : undefined}
                    disabled={!levelClickable}
                >
                    {label}
                </button>
            ),
            next: hasNext ? (
                <PickerControl
                    key="next"
                    direction="next"
                    onClick={onNext}
                    disabled={nextDisabled}
                />
            ) : null
        };

        return (
            <div ref={ref} className={headerClasses} {...props}>
                {controlsOrder
                    .map((control) => controlComponents[control])
                    .filter(Boolean)}
            </div>
        );
    }
);

PickerHeader.displayName = "@byteform/dates/PickerHeader";
