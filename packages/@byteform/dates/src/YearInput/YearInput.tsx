import { Input, Transition, useTheme } from "@/byteform";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useClick,
    useDismiss,
    useRole,
    useInteractions
} from "@floating-ui/react";
import { forwardRef, useCallback, useRef, useState, useMemo } from "react";
import { YearPicker } from "../YearPicker";
import { YearInputProps } from "./types";
import dayjs from "dayjs";
import { IconX } from "@tabler/icons-react";

export const YearInput = forwardRef<HTMLDivElement, YearInputProps>(
    (
        {
            value,
            defaultValue,
            onChange,

            allowDeselect = false,
            type = "default",
            allowSingleDateInRange = false,
            minDate,
            maxDate,

            yearFormat = "YYYY",
            decadeFormat = "YYYY",
            displayFormat = "YYYY",

            columnsPerRow = 3,

            position = "bottom-start",
            closeOnSelect = true,
            placeholder = "Select year",
            clearable = false,
            readOnly = false,
            disabled = false,
            size = "sm",
            error,
            label,
            description,
            withAsterisk,
            className,

            ...inputProps
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const inputRef = useRef<HTMLInputElement>(null);
        const containerRef = useRef<HTMLDivElement>(null);

        const [isOpen, setIsOpen] = useState(false);
        const [internalValue, setInternalValue] = useState(
            defaultValue || null
        );

        const selectedValue = value !== undefined ? value : internalValue;

        const { x, y, strategy, refs, context } = useFloating({
            open: isOpen,
            onOpenChange: setIsOpen,
            middleware: [offset(5), flip(), shift({ padding: 5 })],
            whileElementsMounted: autoUpdate,
            placement: position
        });

        const click = useClick(context);
        const dismiss = useDismiss(context);
        const role = useRole(context, { role: "dialog" });

        const { getReferenceProps, getFloatingProps } = useInteractions([
            click,
            dismiss,
            role
        ]);

        const displayValue = useMemo(() => {
            if (!selectedValue) return "";

            if (Array.isArray(selectedValue)) {
                if (type === "range" && selectedValue.length === 2) {
                    const [start, end] = selectedValue.sort((a, b) =>
                        dayjs(a).diff(dayjs(b))
                    );
                    return `${dayjs(start).format(displayFormat)} - ${dayjs(
                        end
                    ).format(displayFormat)}`;
                } else if (type === "multiple") {
                    return selectedValue
                        .map((date) => dayjs(date).format(displayFormat))
                        .join(", ");
                } else if (selectedValue.length === 1) {
                    return dayjs(selectedValue[0]).format(displayFormat);
                }
                return "";
            }

            return dayjs(selectedValue).format(displayFormat);
        }, [selectedValue, displayFormat, type]);

        const handleYearPickerChange = useCallback(
            (newValue: typeof selectedValue) => {
                if (value === undefined) {
                    setInternalValue(newValue);
                }

                onChange?.(newValue);

                if (closeOnSelect && type === "default" && newValue) {
                    setIsOpen(false);
                }
            },
            [value, onChange, closeOnSelect, type]
        );

        const handleClear = useCallback(() => {
            const newValue = null;
            if (value === undefined) {
                setInternalValue(newValue);
            }
            onChange?.(newValue);
        }, [value, onChange]);

        const handleInputClick = useCallback(() => {
            if (!readOnly && !disabled) {
                setIsOpen(true);
            }
        }, [readOnly, disabled]);

        const rightSection = useMemo(() => {
            const elements = [];

            if (clearable && selectedValue && !readOnly && !disabled) {
                elements.push(
                    <button
                        type="button"
                        onClick={handleClear}
                        className={cx(
                            "hover:opacity-70",
                            theme === "light"
                                ? "text-[var(--byteform-light-hint)]"
                                : "text-[var(--byteform-dark-hint)]"
                        )}
                    >
                        <IconX size={14} />
                    </button>
                );
            }

            return elements.length > 1 ? (
                <div className="flex items-center space-x-1">{elements}</div>
            ) : (
                elements[0]
            );
        }, [
            clearable,
            selectedValue,
            readOnly,
            disabled,
            handleClear,
            theme,
            cx
        ]);

        return (
            <div ref={ref} className="relative">
                <Input
                    {...inputProps}
                    value={displayValue}
                    placeholder={placeholder}
                    readOnly={true}
                    disabled={disabled}
                    size={size}
                    error={error}
                    label={label}
                    description={description}
                    withAsterisk={withAsterisk}
                    className={className}
                    rightSection={rightSection}
                    inputRef={(node) => {
                        inputRef.current = node as HTMLInputElement;
                    }}
                    containerRef={(node) => {
                        containerRef.current = node;
                        refs.setReference(node);
                    }}
                    onClick={handleInputClick}
                    {...getReferenceProps()}
                />

                <div className="relative z-50">
                    <Transition
                        mounted={isOpen}
                        transition="fade-down"
                        duration={200}
                    >
                        <div
                            ref={refs.setFloating}
                            className={cx(
                                "z-50 shadow-md rounded-md overflow-hidden p-2",
                                "border",
                                theme === "light"
                                    ? "bg-[var(--byteform-light-background)] border-[var(--byteform-light-border)]"
                                    : "bg-[var(--byteform-dark-background)] border-[var(--byteform-dark-border)]"
                            )}
                            style={{
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                                minWidth: 275
                            }}
                            {...getFloatingProps()}
                        >
                            <YearPicker
                                value={selectedValue}
                                onChange={handleYearPickerChange}
                                allowDeselect={allowDeselect}
                                type={type}
                                allowSingleDateInRange={allowSingleDateInRange}
                                minDate={minDate}
                                maxDate={maxDate}
                                yearFormat={yearFormat}
                                decadeFormat={decadeFormat}
                                columnsPerRow={columnsPerRow}
                                disabled={disabled}
                            />
                        </div>
                    </Transition>
                </div>
            </div>
        );
    }
);

YearInput.displayName = "@byteform/dates/YearInput";
