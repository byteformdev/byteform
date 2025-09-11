import React, {
    forwardRef,
    Children,
    cloneElement,
    isValidElement,
    useMemo,
    useCallback,
    useState,
    useEffect
} from "react";
import { RadioGroupProps } from "../types";
import { useTheme } from "../../_theme";

const RadioGroupComponent = forwardRef<HTMLDivElement, RadioGroupProps>(
    (
        {
            children,
            value,
            defaultValue,
            onChange,
            name,
            orientation = "vertical",
            size = "md",
            label,
            description,
            error,
            withAsterisk = false,
            required = false,
            disabled = false,
            readOnly = false,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const isControlled = value !== undefined;
        const [internalValue, setInternalValue] = useState(defaultValue || "");

        useEffect(() => {
            if (!isControlled && defaultValue !== undefined) {
                setInternalValue(defaultValue);
            }
        }, [defaultValue, isControlled]);

        const currentValue = isControlled ? value : internalValue;

        const handleChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                if (disabled || readOnly) return;

                const newValue = event.target.value;

                if (!isControlled) {
                    setInternalValue(newValue);
                }

                onChange?.(newValue);
            },
            [onChange, disabled, readOnly, isControlled]
        );

        const labelElement = useMemo(() => {
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
                    data-disabled={disabled}
                >
                    {label}
                    {withAsterisk && (
                        <span className="text-[var(--byteform-error)] ml-1">
                            *
                        </span>
                    )}
                </div>
            );
        }, [label, withAsterisk, theme, disabled, classNames?.label, cx]);

        const descriptionElement = useMemo(() => {
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
                    data-disabled={disabled}
                >
                    {description}
                </div>
            );
        }, [description, error, theme, disabled, classNames?.description, cx]);

        const errorElement = useMemo(() => {
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
        }, [error, classNames?.error, cx]);

        const renderedChildren = useMemo(() => {
            return Children.map(children, (child) => {
                if (!isValidElement(child)) return child;

                const childElement = child as React.ReactElement<any>;
                const childValue = childElement.props.value;
                const isChecked =
                    currentValue !== undefined && childValue === currentValue;

                return cloneElement(childElement, {
                    name: name || childElement.props.name,
                    size: childElement.props.size || size,

                    checked: isChecked,

                    disabled: disabled || childElement.props.disabled,
                    readOnly: readOnly || childElement.props.readOnly,
                    required: required || childElement.props.required,

                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                        childElement.props.onChange?.(event);
                        handleChange(event);
                    },

                    ...childElement.props,

                    "data-group-value": currentValue,
                    "data-is-selected": isChecked
                });
            });
        }, [
            children,
            currentValue,
            name,
            size,
            disabled,
            readOnly,
            required,
            handleChange
        ]);

        const containerClassName = useMemo(() => {
            return cx(
                "flex",
                orientation === "horizontal"
                    ? "flex-row gap-4"
                    : "flex-col gap-2",
                classNames?.container
            );
        }, [orientation, classNames?.container, cx]);

        return (
            <div
                ref={ref}
                className={cx("flex flex-col", classNames?.root, className)}
                role="radiogroup"
                aria-required={required}
                aria-disabled={disabled}
                data-orientation={orientation}
                data-disabled={disabled}
                data-readonly={readOnly}
                data-size={size}
                data-value={currentValue}
                {...props}
            >
                {labelElement}

                <div className={containerClassName}>{renderedChildren}</div>

                {descriptionElement}
                {errorElement}
            </div>
        );
    }
);

RadioGroupComponent.displayName = "@byteform/core/RadioGroup";

export const RadioGroup = React.memo(RadioGroupComponent);
