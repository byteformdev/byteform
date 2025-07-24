import { forwardRef } from "react";
import { PickerControlProps } from "./types";
import { useTheme } from "@byteform/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export const PickerControl = forwardRef<HTMLButtonElement, PickerControlProps>(
    ({ direction, disabled = false, className, ...props }, ref) => {
        const { theme, cx } = useTheme();

        const classes = cx(
            "inline-flex items-center justify-center rounded-md outline-none transition-colors duration-200 w-7 h-7 active:translate-y-0.5",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            theme === "light"
                ? "enabled:hover:bg-[var(--byteform-light-background-hover)] text-[var(--byteform-light-text)]"
                : "enabled:hover:bg-[var(--byteform-dark-background-hover)] text-[var(--byteform-dark-text)]",
            className
        );

        return (
            <button
                ref={ref}
                type="button"
                disabled={disabled}
                className={classes}
                {...props}
            >
                {direction === "previous" ? (
                    <IconChevronLeft size={16} />
                ) : (
                    <IconChevronRight size={16} />
                )}
            </button>
        );
    }
);

PickerControl.displayName = "@byteform/dates/PickerControl";
