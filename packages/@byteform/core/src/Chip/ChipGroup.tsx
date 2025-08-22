import {
    forwardRef,
    Children,
    cloneElement,
    isValidElement,
    useState,
    useEffect,
    ReactElement
} from "react";
import { ChipGroupProps, ChipProps } from "./types";
import { cx, useTheme } from "../_theme";

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
    (
        {
            children,
            value,
            defaultValue,
            multiple = false,
            onChange,
            name,
            orientation = "horizontal",
            size = "md",
            variant = "filled",
            label,
            description,
            error,
            withAsterisk,
            required,
            disabled,
            readOnly,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const [internalValue, setInternalValue] = useState<string | string[]>(
            value ?? defaultValue ?? (multiple ? [] : "")
        );

        const currentValue = value ?? internalValue;

        useEffect(() => {
            if (value !== undefined) {
                setInternalValue(value);
            }
        }, [value]);

        const handleChipChange = (checked: boolean, chipValue?: string) => {
            if (disabled || readOnly || !chipValue) return;

            let newValue: string | string[];

            if (multiple) {
                const currentArray = Array.isArray(currentValue)
                    ? currentValue
                    : [];
                if (checked) {
                    newValue = [...currentArray, chipValue];
                } else {
                    newValue = currentArray.filter((val) => val !== chipValue);
                }
            } else {
                newValue = checked ? chipValue : "";
            }

            if (value === undefined) {
                setInternalValue(newValue);
            }

            onChange?.(newValue);
        };

        const isChipChecked = (chipValue: string) => {
            if (multiple) {
                return (
                    Array.isArray(currentValue) &&
                    currentValue.includes(chipValue)
                );
            }
            return currentValue === chipValue;
        };

        const renderLabel = () => {
            if (!label) return null;

            return (
                <div
                    className={cx(
                        "text-sm font-medium mb-2",
                        theme === "light"
                            ? "text-[var(--byteform-light-text)]"
                            : "text-[var(--byteform-dark-text)]",
                        disabled && "opacity-60",
                        classNames?.label
                    )}
                >
                    {label}
                    {withAsterisk && (
                        <span className="text-[var(--byteform-error)] ml-1">
                            *
                        </span>
                    )}
                </div>
            );
        };

        const renderDescription = () => {
            if (!description || error) return null;

            return (
                <div
                    className={cx(
                        "text-xs mt-1",
                        theme === "light"
                            ? "text-[var(--byteform-light-hint)]"
                            : "text-[var(--byteform-dark-hint)]",
                        disabled && "opacity-60",
                        classNames?.description
                    )}
                >
                    {description}
                </div>
            );
        };

        const renderError = () => {
            if (!error) return null;

            return (
                <div
                    className={cx(
                        "text-xs text-[var(--byteform-error)] mt-1",
                        classNames?.error
                    )}
                >
                    {error}
                </div>
            );
        };

        const enhancedChildren = Children.map(children, (child) => {
            if (!isValidElement(child)) {
                return child;
            }

            const chipChild = child as ReactElement<ChipProps>;

            if (!chipChild.props.value) {
                return child;
            }

            return cloneElement(chipChild, {
                ...chipChild.props,
                checked: isChipChecked(chipChild.props.value),
                disabled: disabled || chipChild.props.disabled,
                readOnly: readOnly || chipChild.props.readOnly,
                size: chipChild.props.size || size,
                variant: chipChild.props.variant || variant,
                onChange: (checked: boolean, chipValue?: string) => {
                    chipChild.props.onChange?.(checked, chipValue);
                    handleChipChange(checked, chipValue);
                }
            });
        });

        return (
            <div
                ref={ref}
                className={cx(
                    "inline-flex flex-col",
                    classNames?.wrapper,
                    className
                )}
                {...props}
            >
                {renderLabel()}

                <div
                    className={cx(
                        "flex flex-wrap",
                        orientation === "horizontal"
                            ? "flex-row gap-2"
                            : "flex-col gap-1",
                        classNames?.container
                    )}
                >
                    {enhancedChildren}
                </div>

                {renderDescription()}
                {renderError()}
            </div>
        );
    }
);

ChipGroup.displayName = "@byteform/core/Chip.Group";
