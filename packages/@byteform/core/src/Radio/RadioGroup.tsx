import { forwardRef, Children, cloneElement, isValidElement } from "react";
import { RadioGroupProps } from "./types";
import { cx, useTheme } from "../_theme";

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
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

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (disabled || readOnly) return;
            onChange?.(event.target.value);
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

        const renderChildren = () => {
            return Children.map(children, (child) => {
                if (!isValidElement(child)) return child;

                const childElement = child as React.ReactElement<any>;

                return cloneElement(childElement, {
                    name: name || childElement.props.name,
                    size: childElement.props.size || size,
                    checked:
                        value !== undefined
                            ? childElement.props.value === value
                            : childElement.props.checked,
                    defaultChecked:
                        defaultValue !== undefined
                            ? childElement.props.value === defaultValue
                            : childElement.props.defaultChecked,
                    disabled: disabled || childElement.props.disabled,
                    readOnly: readOnly || childElement.props.readOnly,
                    required: required || childElement.props.required,
                    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                        childElement.props.onChange?.(event);
                        handleChange(event);
                    },
                    ...childElement.props
                });
            });
        };

        return (
            <div
                ref={ref}
                className={cx("flex flex-col", classNames?.root, className)}
                {...props}
            >
                {renderLabel()}

                <div
                    className={cx(
                        "flex",
                        orientation === "horizontal"
                            ? "flex-row gap-4"
                            : "flex-col gap-2",
                        classNames?.container
                    )}
                >
                    {renderChildren()}
                </div>

                {renderDescription()}
                {renderError()}
            </div>
        );
    }
);

RadioGroup.displayName = "@byteform/core/RadioGroup";
