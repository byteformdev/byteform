import { forwardRef, useRef } from "react";
import { RadioProps, RadioSize } from "./types";
import { cx, useTheme } from "../_theme";
import { RadioGroup } from "./RadioGroup";

const sizeClasses = {
    xs: {
        radio: "w-3.5 h-3.5",
        dot: "w-1.5 h-1.5",
        text: "text-xs",
        gap: "gap-2"
    },
    sm: {
        radio: "w-4 h-4",
        dot: "w-2 h-2",
        text: "text-sm",
        gap: "gap-2"
    },
    md: {
        radio: "w-5 h-5",
        dot: "w-2.5 h-2.5",
        text: "text-sm",
        gap: "gap-3"
    },
    lg: {
        radio: "w-6 h-6",
        dot: "w-3 h-3",
        text: "text-base",
        gap: "gap-3"
    },
    xl: {
        radio: "w-7 h-7",
        dot: "w-3.5 h-3.5",
        text: "text-lg",
        gap: "gap-4"
    }
};

const getSize = (size: RadioSize) => {
    return sizeClasses[size] || sizeClasses.md;
};

const getStyles = (
    disabled: boolean,
    checked: boolean,
    theme: "light" | "dark"
) => {
    const baseStyles = [
        "relative inline-flex items-center justify-center rounded-full border transition-all duration-200 ease-in-out cursor-pointer outline-none"
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

    const checkedStyles = checked
        ? [
              "bg-[var(--byteform-primary)] border-[var(--byteform-primary)]",
              !disabled && "hover:bg-[var(--byteform-primary-hover)]"
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

const Radio = forwardRef<HTMLInputElement, RadioProps>(
    (
        {
            size = "md",
            label,
            description,
            error,
            withAsterisk,
            required,
            readOnly,
            disabled,
            autoFocus,
            checked,
            defaultChecked,
            onChange,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const localRef = useRef<HTMLInputElement>(null);
        const resolvedRef = (ref ||
            localRef) as React.RefObject<HTMLInputElement>;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (readOnly || disabled) return;
            onChange?.(e);
        };

        const sizeStyles = getSize(size);

        const renderDot = () => (
            <div
                className={cx(
                    "rounded-full transition-all duration-200 ease-in-out bg-[var(--byteform-white)]",
                    sizeStyles.dot,
                    checked ? "opacity-100 scale-100" : "opacity-0 scale-75",
                    classNames?.icon
                )}
            />
        );

        const renderLabel = () => {
            if (!label) return null;

            return (
                <label
                    className={cx(
                        "outline-none select-none",
                        !readOnly && "cursor-pointer",
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
                        disabled && "opacity-60 cursor-not-allowed",
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
                        disabled && "opacity-60 cursor-not-allowed",
                        classNames?.error
                    )}
                >
                    {error}
                </div>
            );
        };

        const renderRadioControl = () => (
            <div
                className={cx(
                    sizeStyles.radio,
                    getStyles(disabled ?? false, checked ?? false, theme),
                    classNames?.body
                )}
            >
                {renderDot()}

                <input
                    ref={resolvedRef}
                    type="radio"
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
        );

        const renderContent = () => {
            const elements = [];

            elements.push(
                <div key="radio" className={cx(classNames?.inner)}>
                    {renderRadioControl()}
                </div>
            );

            if (label) {
                elements.push(
                    <div key="label" className={cx(classNames?.labelWrapper)}>
                        {renderLabel()}
                    </div>
                );
            }

            return elements;
        };

        return (
            <div
                className={cx(
                    "inline-flex flex-col",
                    classNames?.root,
                    className
                )}
            >
                <div
                    className={cx(
                        "inline-flex items-center",
                        sizeStyles.gap,
                        classNames?.body
                    )}
                >
                    {renderContent()}
                </div>

                {renderDescription()}
                {renderError()}
            </div>
        );
    }
);

const ExtendedRadio = Object.assign(Radio, {
    Group: RadioGroup
});

ExtendedRadio.displayName = "@byteform/core/Radio";

export { ExtendedRadio as Radio };
