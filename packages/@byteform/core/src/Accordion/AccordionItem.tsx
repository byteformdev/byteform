import { forwardRef } from "react";
import { AccordionItemProps } from "./types";
import { useTheme } from "../_theme";
import { AccordionItemContext, useAccordion } from "./context";

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ children, value, disabled = false, className }, ref) => {
        const { theme, cx } = useTheme();

        const accordion = useAccordion();

        const isActive = Array.isArray(accordion.value)
            ? accordion.value.includes(value)
            : accordion.value === value;

        const contextValue = {
            value,
            isActive,
            disabled
        };

        return (
            <AccordionItemContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cx(
                        "border-b first:border-t",
                        theme === "light"
                            ? "border-[var(--byteform-light-border)]"
                            : "border-[var(--byteform-dark-border)]",
                        accordion.classNames?.item,
                        className
                    )}
                    data-active={isActive || undefined}
                >
                    {children}
                </div>
            </AccordionItemContext.Provider>
        );
    }
);

AccordionItem.displayName = "@byteform/core/Accordion.Item";
