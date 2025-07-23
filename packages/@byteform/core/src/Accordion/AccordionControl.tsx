import { forwardRef } from "react";
import { AccordionControlProps } from "./types";
import { useAccordion, useAccordionItem } from "./context";
import { useTheme } from "../_theme";
import { IconChevronDown } from "@tabler/icons-react";

export const AccordionControl = forwardRef<
    HTMLButtonElement,
    AccordionControlProps
>(({ children, onClick, icon, className }, ref) => {
    const { theme, cx } = useTheme();

    const accordion = useAccordion();
    const item = useAccordionItem();

    const handleClick = () => {
        if (item.disabled) return;

        accordion.onChange(item.value);
        onClick?.();
    };

    const chevronElement = accordion.chevronIcon || (
        <IconChevronDown size={16} />
    );

    const chevronRotation =
        item.isActive && !accordion.disableChevronRotation
            ? "rotate-180"
            : "rotate-0";

    return (
        <button
            ref={ref}
            type="button"
            className={cx(
                "flex w-full items-center justify-between py-4 px-2 text-left font-medium transition-colors",
                item.disabled && "opacity-60 cursor-not-allowed",
                accordion.classNames?.control,
                className
            )}
            onClick={handleClick}
            aria-expanded={item.isActive}
            data-active={item.isActive || undefined}
        >
            {accordion.chevronPosition === "left" && (
                <span
                    className={cx(
                        "flex-shrink-0 transition-transform duration-200",
                        chevronRotation,
                        "mr-3",
                        accordion.classNames?.chevron
                    )}
                >
                    {chevronElement}
                </span>
            )}

            {icon && <span className="flex-shrink-0 mr-3">{icon}</span>}
            <span className={cx("flex-1", accordion.classNames?.label)}>
                {children}
            </span>

            {accordion.chevronPosition === "right" && (
                <span
                    className={cx(
                        "flex-shrink-0 transition-transform duration-200",
                        chevronRotation,
                        "ml-3",
                        accordion.classNames?.chevron
                    )}
                >
                    {chevronElement}
                </span>
            )}
        </button>
    );
});

AccordionControl.displayName = "@byteform/core/Accordion.Control";
