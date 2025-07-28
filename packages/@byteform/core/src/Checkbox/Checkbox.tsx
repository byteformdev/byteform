import { forwardRef, useEffect, useRef } from "react";
import { CheckboxProps, CheckboxSize } from "./types";
import { cx, useTheme } from "../_theme";
import { IconCheck, IconMinus } from "@tabler/icons-react";

const sizeClasses = {
    xs: {
        checkbox: "w-3.5 h-3.5",
        icon: 12,
        text: "text-xs",
        gap: "gap-2"
    },
    sm: {
        checkbox: "w-4 h-4",
        icon: 14,
        text: "text-sm",
        gap: "gap-2"
    },
    md: {
        checkbox: "w-5 h-5",
        icon: 16,
        text: "text-sm",
        gap: "gap-3"
    },
    lg: {
        checkbox: "w-6 h-6",
        icon: 18,
        text: "text-base",
        gap: "gap-3"
    },
    xl: {
        checkbox: "w-7 h-7",
        icon: 20,
        text: "text-lg",
        gap: "gap-4"
    }
};

const getSize = (size: CheckboxSize) => {
    return sizeClasses[size] || sizeClasses.md;
};

const getStyles = (
    disabled: boolean,
    indeterminate: boolean,
    checked: boolean,
    theme: "light" | "dark"
) => {
    const baseStyles = [
        "relative inline-flex items-center justify-center rounded-md border transition-all duration-200 ease-in-out cursor-pointer outline-none",
        !disabled && "hover:border-[var(--byteform-primary-hover)]"
    ];

    const themeStyles =
        theme === "light"
            ? [
                  "bg-[var(--byteform-light-background)] border-[var(--byteform-light-border)]",
                  !disabled &&
                      "hover:bg-[var(--byteform-light-background-hover)]"
              ]
            : [
                  "bg-[var(--byteform-dark-background)] border-[var(--byteform-dark-border)]",
                  !disabled &&
                      "hover:bg-[var(--byteform-dark-background-hover)]"
              ];

    const checkedStyles =
        checked || indeterminate
            ? [
                  "bg-[var(--byteform-primary)] border-[var(--byteform-primary)]",
                  !disabled &&
                      "hover:bg-[var(--byteform-primary-hover)] hover:border-[var(--byteform-primary-hover)]"
              ]
            : [];

    const disabledStyles = disabled ? ["opacity-60 cursor-not-allowed"] : [];

    return cx([
        ...baseStyles,
        ...themeStyles,
        ...checkedStyles,
        ...disabledStyles
    ]);
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            size = "md",
            label,
            description,
            error,
            indeterminate,
            withAsterisk,
            required,
            readOnly,
            disabled,
            autoFocus,
            checked,
            defaultChecked,
            onChange,
            icon: Icon,
            inputRef,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const localRef = useRef<HTMLInputElement>(null);
        const resolvedRef = (ref ||
            inputRef ||
            localRef) as React.RefObject<HTMLInputElement>;

        useEffect(() => {
            if (resolvedRef.current) {
                resolvedRef.current.indeterminate = indeterminate ?? false;
            }
        }, [indeterminate, resolvedRef]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (readOnly || disabled) return;
            onChange?.(e);
        };

        const sizeStyles = getSize(size);

        const renderIcon = () => {
            if (Icon)
                return (
                    <Icon
                        indeterminate={indeterminate}
                        className={cx(
                            "transition-all duration-200 ease-in-out",
                            checked || indeterminate
                                ? "opacity-100 scale-100 text-white"
                                : "opacity-0 scale-75",
                            classNames?.icon
                        )}
                    />
                );

            return (
                <div
                    className={cx(
                        "transition-all duration-200 ease-in-out flex items-center justify-center text-white",
                        checked || indeterminate
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-75",
                        classNames?.icon
                    )}
                >
                    {indeterminate ? (
                        <IconMinus size={sizeStyles.icon} strokeWidth={2.5} />
                    ) : (
                        <IconCheck size={sizeStyles.icon} strokeWidth={2.5} />
                    )}
                </div>
            );
        };

        const renderLabel = () => {
            if (!label) return null;

            return (
                <label
                    className={cx(
                        "cursor-pointer select-none",
                        sizeStyles.text,
                        theme === "light"
                            ? "text-[var(--byteform-light-text)]"
                            : "text-[var(--byteform-dark-text)]",
                        disabled && "opacity-60 cursor-not-allowed",
                        classNames?.label
                    )}
                    onClick={(e) => {
                        if (disabled || readOnly) {
                            e.preventDefault();
                            return;
                        }
                        resolvedRef.current?.click();
                    }}
                >
                    {label}
                    {withAsterisk && (
                        <span className="text-[var(--byteform-error)] ml-1">
                            *
                        </span>
                    )}
                </label>
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

        return (
            <div
                className={cx(
                    "inline-flex flex-col",
                    classNames?.wrapper,
                    className
                )}
            >
                <div
                    className={cx(
                        "inline-flex items-center",
                        sizeStyles.gap,
                        classNames?.container
                    )}
                >
                    <div
                        className={cx(
                            sizeStyles.checkbox,
                            getStyles(
                                disabled ?? false,
                                indeterminate ?? false,
                                checked ?? false,
                                theme
                            ),
                            classNames?.body
                        )}
                    >
                        {renderIcon()}

                        <input
                            ref={resolvedRef}
                            type="checkbox"
                            className={cx(
                                "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                                disabled && "cursor-not-allowed",
                                readOnly && "cursor-default",
                                classNames?.input
                            )}
                            checked={checked}
                            defaultChecked={defaultChecked}
                            required={required}
                            disabled={disabled}
                            readOnly={readOnly}
                            autoFocus={autoFocus}
                            onChange={handleChange}
                            {...props}
                        />
                    </div>

                    {renderLabel()}
                </div>

                {renderDescription()}
                {renderError()}
            </div>
        );
    }
);

Checkbox.displayName = "@byteform/core/Checkbox";
