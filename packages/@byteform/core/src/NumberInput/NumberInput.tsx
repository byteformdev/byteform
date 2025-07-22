import React, { useState, useCallback, useRef, useEffect } from "react";
import { Input } from "../Input/Input";
import { NumberInputProps } from "./types";
import { useTheme } from "../_theme";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

export const NumberInput = ({
    min,
    max,
    step = 1,
    precision = 0,
    value,
    defaultValue = 0,
    hideControls,
    onChange,
    disabled,
    classNames,
    allowDecimal = false,
    allowNegative = true,
    decimalScale,
    decimalSeparator = ".",
    thousandSeparator = ",",
    prefix,
    suffix,
    allowKeyboard = true,
    allowScrollWheel = true,
    ...props
}: NumberInputProps) => {
    const { theme, cx } = useTheme();

    const inputRef = useRef<HTMLInputElement>(null);

    const [internalValue, setInternalValue] = useState<number>(
        value !== undefined ? value : defaultValue
    );
    const currentValue = value !== undefined ? value : internalValue;

    const [displayValue, setDisplayValue] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const formatValue = useCallback(
        (num: number): string => {
            let formatted = String(num);

            const effectiveDecimalScale =
                decimalScale !== undefined ? decimalScale : precision;

            if (effectiveDecimalScale !== undefined) {
                const factor = Math.pow(10, effectiveDecimalScale);
                formatted = (Math.round(num * factor) / factor).toFixed(
                    effectiveDecimalScale
                );
            }

            if (thousandSeparator) {
                const parts = formatted.split(decimalSeparator);
                parts[0] = parts[0].replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    thousandSeparator
                );
                formatted = parts.join(decimalSeparator);
            }

            if (decimalSeparator !== ".") {
                formatted = formatted.replace(".", decimalSeparator);
            }

            if (prefix) formatted = `${prefix}${formatted}`;
            if (suffix) formatted = `${formatted}${suffix}`;

            return formatted;
        },
        [
            precision,
            decimalScale,
            decimalSeparator,
            thousandSeparator,
            prefix,
            suffix
        ]
    );

    const parseValue = useCallback(
        (valueString: string): number => {
            let parsed = valueString;
            if (prefix) parsed = parsed.replace(prefix, "");
            if (suffix) parsed = parsed.replace(suffix, "");

            if (decimalSeparator !== ".") {
                parsed = parsed.replace(decimalSeparator, ".");
            }

            if (thousandSeparator) {
                parsed = parsed.replace(
                    new RegExp(`\\${thousandSeparator}`, "g"),
                    ""
                );
            }

            const num = Number(parsed);
            return isNaN(num) ? 0 : num;
        },
        [prefix, suffix, decimalSeparator, thousandSeparator]
    );

    const clampValue = useCallback(
        (val: number): number => {
            let clampedValue = val;
            if (min !== undefined && clampedValue < min) clampedValue = min;
            if (max !== undefined && clampedValue > max) clampedValue = max;
            return clampedValue;
        },
        [min, max]
    );

    const applyPrecision = useCallback(
        (val: number): number => {
            if (precision !== undefined) {
                const factor = Math.pow(10, precision);
                return Math.round(val * factor) / factor;
            }
            return val;
        },
        [precision]
    );

    const updateValue = useCallback(
        (newValue: number) => {
            const clampedValue = clampValue(newValue);
            const finalValue = applyPrecision(clampedValue);

            if (value === undefined) {
                setInternalValue(finalValue);
            }
            onChange?.(finalValue);
        },
        [value, clampValue, applyPrecision, onChange]
    );

    const handleChange = useCallback(
        (valueString: string) => {
            setIsTyping(true);
            setDisplayValue(valueString);

            if (valueString === "") {
                updateValue(0);
                return;
            }

            const isValidChar = new RegExp(
                `^[0-9${allowNegative ? "\\-" : ""}${
                    allowDecimal ? "\\" + decimalSeparator : ""
                }${thousandSeparator ? "\\" + thousandSeparator : ""}${
                    prefix ? prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : ""
                }${
                    suffix ? suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : ""
                }]*$`
            );

            if (!isValidChar.test(valueString)) {
                return;
            }

            if (allowDecimal && valueString === decimalSeparator) {
                updateValue(0);
                return;
            }

            if (allowNegative && valueString === "-") {
                updateValue(0);
                return;
            }

            const newValue = parseValue(valueString);
            updateValue(newValue);
        },
        [
            allowDecimal,
            allowNegative,
            decimalSeparator,
            thousandSeparator,
            prefix,
            suffix,
            parseValue,
            updateValue
        ]
    );

    const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
            setIsTyping(false);
            setDisplayValue("");
            props.onBlur?.(event);
        },
        [props.onBlur]
    );

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (allowKeyboard && !disabled) {
                if (event.key === "ArrowUp") {
                    event.preventDefault();
                    const newValue = currentValue + step;
                    if (!allowNegative && newValue < 0) return;
                    updateValue(newValue);
                    return;
                }

                if (event.key === "ArrowDown") {
                    event.preventDefault();
                    const newValue = currentValue - step;
                    if (!allowNegative && newValue < 0) return;
                    updateValue(newValue);
                    return;
                }
            }

            if (event.key === "Enter") {
                setIsTyping(false);
                setDisplayValue("");
                event.currentTarget.blur();
            }

            props.onKeyDown?.(event);
        },
        [
            allowKeyboard,
            disabled,
            currentValue,
            step,
            allowNegative,
            updateValue,
            props.onKeyDown
        ]
    );

    const increment = useCallback(() => {
        const newValue = currentValue + step;
        if (!allowNegative && newValue < 0) return;
        updateValue(newValue);
    }, [currentValue, step, allowNegative, updateValue]);

    const decrement = useCallback(() => {
        const newValue = currentValue - step;
        if (!allowNegative && newValue < 0) return;
        updateValue(newValue);
    }, [currentValue, step, allowNegative, updateValue]);

    const handleIncrementClick = useCallback(
        (event: React.MouseEvent) => {
            if (disabled) return;
            event.preventDefault();
            increment();
        },
        [disabled, increment]
    );

    const handleDecrementClick = useCallback(
        (event: React.MouseEvent) => {
            if (disabled) return;
            event.preventDefault();
            decrement();
        },
        [disabled, decrement]
    );

    const handleWheel = useCallback(
        (event: React.WheelEvent<HTMLInputElement>) => {
            if (
                !allowScrollWheel ||
                document.activeElement !== inputRef.current ||
                disabled
            ) {
                return;
            }

            event.preventDefault();

            const delta = -Math.sign(event.deltaY);

            if (delta > 0) {
                increment();
            } else if (delta < 0) {
                decrement();
            }
        },
        [allowScrollWheel, disabled, increment, decrement]
    );

    useEffect(() => {
        if (value !== undefined && !isTyping) {
            setDisplayValue("");
        }
    }, [value, isTyping]);

    const isIncrementDisabled =
        disabled || (max !== undefined && currentValue >= max);
    const isDecrementDisabled =
        disabled ||
        (min !== undefined && currentValue <= min) ||
        (!allowNegative && currentValue - step < 0);

    const controlButtons = (
        <div
            className={cx(
                "inline-flex flex-col max-h-full h-full border-l",
                theme === "light"
                    ? "border-[var(--byteform-light-border)]"
                    : "border-[var(--byteform-dark-border)]",
                classNames?.controlButtons
            )}
        >
            <button
                type="button"
                className={cx(
                    "w-6 flex-1 flex items-center justify-center border-b",
                    theme === "light"
                        ? "border-[var(--byteform-light-border)] text-[var(--byteform-light-text)]"
                        : "border-[var(--byteform-dark-border)] text-[var(--byteform-dark-text)]",
                    isIncrementDisabled && "opacity-60 cursor-not-allowed",
                    !isIncrementDisabled &&
                        "hover:bg-[var(--byteform-primary-light)]",
                    classNames?.incrementButton
                )}
                onClick={handleIncrementClick}
                disabled={isIncrementDisabled}
            >
                <IconChevronUp size={15} />
            </button>
            <button
                type="button"
                onClick={handleDecrementClick}
                disabled={isDecrementDisabled}
                className={cx(
                    "w-6 flex-1 flex items-center justify-center",
                    theme === "light"
                        ? "border-[var(--byteform-light-border)] text-[var(--byteform-light-text)]"
                        : "border-[var(--byteform-dark-border)] text-[var(--byteform-dark-text)]",
                    isDecrementDisabled && "opacity-60 cursor-not-allowed",
                    !isDecrementDisabled &&
                        "hover:bg-[var(--byteform-primary-light)]",
                    classNames?.decrementButton
                )}
            >
                <IconChevronDown size={15} />
            </button>
        </div>
    );

    return (
        <Input
            inputRef={inputRef}
            type="text"
            inputMode={allowDecimal ? "decimal" : "numeric"}
            value={
                isTyping && displayValue !== ""
                    ? displayValue
                    : formatValue(currentValue)
            }
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onWheel={handleWheel}
            rightSection={hideControls ? null : controlButtons}
            disabled={disabled}
            classNames={{
                rightSection: "p-0",
                ...classNames
            }}
            {...props}
        />
    );
};

NumberInput.displayName = "@byteform/core/NumberInput";
