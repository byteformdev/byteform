import { forwardRef, useEffect, useState } from "react";
import { AccordionProps, AccordionValue } from "./types";
import { useTheme } from "../_theme";
import { AccordionContext } from "./context";
import { AccordionItem } from "./AccordionItem";
import { AccordionControl } from "./AccordionControl";
import { AccordionPanel } from "./AccordionPanel";

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
    (
        {
            children,
            multiple = false,
            value,
            defaultValue = null,
            onChange,
            chevronIcon,
            chevronPosition = "right",
            disableChevronRotation = false,
            transitionDuration = 200,
            className,
            classNames
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [localValue, setLocalValue] =
            useState<AccordionValue>(defaultValue);

        const currentValue = value !== undefined ? value : localValue;

        useEffect(() => {
            if (value !== undefined) {
                setLocalValue(value);
            }
        }, [value]);

        const handleChange = (itemValue: string) => {
            let newValue: AccordionValue;

            if (multiple) {
                const currentArray = Array.isArray(currentValue)
                    ? currentValue
                    : [];

                if (currentArray.includes(itemValue)) {
                    newValue = currentArray.filter((v) => v !== itemValue);
                    if (newValue.length === 0) newValue = null;
                } else {
                    newValue = [...currentArray, itemValue];
                }
            } else {
                newValue = currentValue === itemValue ? null : itemValue;
            }

            if (value === undefined) {
                setLocalValue(newValue);
            }
            onChange?.(newValue);
        };

        const contextValue = {
            value: currentValue,
            onChange: handleChange,
            multiple,
            chevronIcon,
            chevronPosition,
            disableChevronRotation,
            transitionDuration,
            classNames
        };

        return (
            <AccordionContext.Provider value={contextValue}>
                <div
                    ref={ref}
                    className={cx(
                        "rounded-md overflow-hidden",
                        theme === "light"
                            ? "text-[var(--byteform-light-text)]"
                            : "text-[var(--byteform-dark-text)]",
                        classNames?.wrapper,
                        className
                    )}
                    data-multiple={multiple || undefined}
                >
                    {children}
                </div>
            </AccordionContext.Provider>
        );
    }
);

const ExtendedAccordion = Object.assign(Accordion, {
    Item: AccordionItem,
    Control: AccordionControl,
    Panel: AccordionPanel
});

ExtendedAccordion.displayName = "@byteform/core/Accordion";

export { ExtendedAccordion as Accordion };
