import React, { forwardRef, useRef, useMemo, useCallback } from "react";
import { RadioProps, RadioSize } from "./types";
import { cx, useTheme } from "../_theme";
import { RadioGroup } from "./RadioGroup";
import { RadioCard } from "./RadioCard";

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

const baseRadioStyles = [
    "relative inline-flex items-center justify-center rounded-full border transition-all duration-200 ease-in-out cursor-pointer outline-none"
];

const RadioComponent = forwardRef<HTMLInputElement, RadioProps>(
    (
        {
            size = "md",
            label,
            description,
            error,
            withAsterisk = false,
            required = false,
            readOnly = false,
            disabled = false,
            autoFocus = false,
            checked,
            defaultChecked = false,
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

        const sizeStyles = useMemo(() => getSize(size), [size]);

        const isChecked = checked !== undefined ? checked : false;
        const isDisabled = disabled;
        const isReadOnly = readOnly;

        const handleChange = useCallback(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                if (isReadOnly || isDisabled) return;
                onChange?.(event);
            },
            [onChange, isReadOnly, isDisabled]
        );

        const handleLabelClick = useCallback(
            (event: React.MouseEvent<HTMLElement>) => {
                if (isDisabled || isReadOnly) {
                    event.preventDefault();
                    return;
                }
                resolvedRef.current?.click();
            },
            [isDisabled, isReadOnly, resolvedRef]
        );

        const radioStyles = useMemo(() => {
            const themeStyles =
                theme === "light"
                    ? [
                          "bg-[var(--byteform-light-background)] border-[var(--byteform-light-border)]",
                          !isDisabled &&
                              !isReadOnly &&
                              "hover:bg-[var(--byteform-light-background-hover)]"
                      ]
                    : [
                          "bg-[var(--byteform-dark-background)] border-[var(--byteform-dark-border)]",
                          !isDisabled &&
                              !isReadOnly &&
                              "hover:bg-[var(--byteform-dark-background-hover)]"
                      ];

            const checkedStyles = isChecked
                ? [
                      "bg-[var(--byteform-primary)] border-[var(--byteform-primary)]",
                      !isDisabled &&
                          !isReadOnly &&
                          "hover:bg-[var(--byteform-primary-hover)]"
                  ]
                : [];

            const disabledStyles = isDisabled
                ? ["opacity-60 cursor-not-allowed"]
                : [];

            return cx([
                ...baseRadioStyles,
                ...themeStyles,
                ...checkedStyles,
                ...disabledStyles
            ]);
        }, [theme, isDisabled, isReadOnly, isChecked, cx]);

        const dotElement = useMemo(
            () => (
                <div
                    className={cx(
                        "rounded-full transition-all duration-200 ease-in-out bg-[var(--byteform-white)]",
                        sizeStyles.dot,
                        isChecked
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-75",
                        classNames?.dot
                    )}
                    data-checked={isChecked}
                    data-disabled={isDisabled}
                />
            ),
            [sizeStyles.dot, isChecked, isDisabled, classNames?.dot, cx]
        );

        const labelElement = useMemo(() => {
            if (!label) return null;

            return (
                <label
                    className={cx(
                        "outline-none select-none",
                        !isReadOnly && "cursor-pointer",
                        sizeStyles.text,
                        theme === "light"
                            ? "text-[var(--byteform-light-text)]"
                            : "text-[var(--byteform-dark-text)]",
                        isDisabled && "opacity-60 cursor-not-allowed",
                        classNames?.label
                    )}
                    onClick={handleLabelClick}
                    data-disabled={isDisabled}
                >
                    {label}
                    {withAsterisk && (
                        <span className="text-[var(--byteform-error)] ml-1">
                            *
                        </span>
                    )}
                </label>
            );
        }, [
            label,
            withAsterisk,
            isReadOnly,
            sizeStyles.text,
            theme,
            isDisabled,
            classNames?.label,
            handleLabelClick,
            cx
        ]);

        const descriptionElement = useMemo(() => {
            if (!description || error) return null;

            return (
                <div
                    className={cx(
                        "text-xs mt-1",
                        theme === "light"
                            ? "text-[var(--byteform-light-hint)]"
                            : "text-[var(--byteform-dark-hint)]",
                        isDisabled && "opacity-60",
                        classNames?.description
                    )}
                    data-disabled={isDisabled}
                >
                    {description}
                </div>
            );
        }, [
            description,
            error,
            theme,
            isDisabled,
            classNames?.description,
            cx
        ]);

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

        const radioControlElement = useMemo(
            () => (
                <div
                    className={cx(
                        sizeStyles.radio,
                        radioStyles,
                        classNames?.radio
                    )}
                    data-checked={isChecked}
                    data-disabled={isDisabled}
                    data-readonly={isReadOnly}
                >
                    {dotElement}

                    <input
                        ref={resolvedRef}
                        type="radio"
                        className={cx(
                            "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                            isDisabled && "cursor-not-allowed",
                            isReadOnly && "cursor-default",
                            classNames?.input
                        )}
                        checked={checked}
                        defaultChecked={defaultChecked}
                        required={required}
                        disabled={isDisabled}
                        readOnly={isReadOnly}
                        autoFocus={autoFocus}
                        onChange={handleChange}
                        data-checked={isChecked}
                        data-disabled={isDisabled}
                        data-readonly={isReadOnly}
                        {...props}
                    />
                </div>
            ),
            [
                sizeStyles.radio,
                radioStyles,
                classNames?.radio,
                classNames?.input,
                isChecked,
                isDisabled,
                isReadOnly,
                dotElement,
                resolvedRef,
                checked,
                defaultChecked,
                required,
                autoFocus,
                handleChange,
                props,
                cx
            ]
        );

        const contentElements = useMemo(() => {
            const elements = [];

            elements.push(
                <div key="radio" className={cx(classNames?.body)}>
                    {radioControlElement}
                </div>
            );

            if (label) {
                elements.push(
                    <div key="label" className={cx(classNames?.labelWrapper)}>
                        {labelElement}
                    </div>
                );
            }

            return elements;
        }, [
            radioControlElement,
            label,
            labelElement,
            classNames?.body,
            classNames?.labelWrapper,
            cx
        ]);

        return (
            <div
                className={cx(
                    "inline-flex flex-col",
                    classNames?.root,
                    className
                )}
                data-checked={isChecked}
                data-disabled={isDisabled}
                data-readonly={isReadOnly}
                data-size={size}
            >
                <div
                    className={cx(
                        "inline-flex items-center",
                        sizeStyles.gap,
                        classNames?.container
                    )}
                >
                    {contentElements}
                </div>

                {descriptionElement}
                {errorElement}
            </div>
        );
    }
);

const ExtendedRadio = Object.assign(RadioComponent, {
    Group: RadioGroup,
    Card: RadioCard
});

ExtendedRadio.displayName = "@byteform/core/Radio";

export { ExtendedRadio as Radio };
