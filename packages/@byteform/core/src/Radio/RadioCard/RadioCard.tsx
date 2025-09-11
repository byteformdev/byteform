import React, { forwardRef, useRef, useMemo, useCallback } from "react";
import { RadioCardProps, RadioSize } from "../types";
import { useTheme } from "../../_theme";

const sizeClasses = {
    xs: {
        card: "p-2",
        radio: "w-3.5 h-3.5",
        dot: "w-1.5 h-1.5",
        text: "text-xs",
        description: "text-xs",
        gap: "gap-2"
    },
    sm: {
        card: "p-3",
        radio: "w-4 h-4",
        dot: "w-2 h-2",
        text: "text-sm",
        description: "text-xs",
        gap: "gap-2"
    },
    md: {
        card: "p-4",
        radio: "w-5 h-5",
        dot: "w-2.5 h-2.5",
        text: "text-sm",
        description: "text-sm",
        gap: "gap-3"
    },
    lg: {
        card: "p-5",
        radio: "w-6 h-6",
        dot: "w-3 h-3",
        text: "text-base",
        description: "text-sm",
        gap: "gap-3"
    },
    xl: {
        card: "p-6",
        radio: "w-7 h-7",
        dot: "w-3.5 h-3.5",
        text: "text-lg",
        description: "text-base",
        gap: "gap-4"
    }
};

const getSize = (size: RadioSize) => {
    return sizeClasses[size] || sizeClasses.md;
};

const baseCardStyles = [
    "relative rounded-lg border transition-all duration-200 ease-in-out cursor-pointer outline-none"
];

const baseRadioStyles = [
    "relative inline-flex items-center justify-center rounded-full border transition-all duration-200 ease-in-out outline-none"
];

const RadioCardComponent = forwardRef<HTMLInputElement, RadioCardProps>(
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
            icon,
            withIndicator = true,
            indicatorPosition = "left",
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

        const handleCardClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement>) => {
                if (isDisabled || isReadOnly) {
                    event.preventDefault();
                    return;
                }
                resolvedRef.current?.click();
            },
            [isDisabled, isReadOnly, resolvedRef]
        );

        const cardStyles = useMemo(() => {
            const themeStyles =
                theme === "light"
                    ? [
                          "bg-[var(--byteform-light-background)] border-[var(--byteform-light-border)]",
                          !isDisabled &&
                              !isReadOnly &&
                              "hover:bg-[var(--byteform-light-background-hover)] hover:border-[var(--byteform-light-border-hover)]"
                      ]
                    : [
                          "bg-[var(--byteform-dark-background)] border-[var(--byteform-dark-border)]",
                          !isDisabled &&
                              !isReadOnly &&
                              "hover:bg-[var(--byteform-dark-background-hover)] hover:border-[var(--byteform-dark-border-hover)]"
                      ];

            const disabledStyles = isDisabled
                ? ["opacity-60 cursor-not-allowed"]
                : [];

            return cx([...baseCardStyles, ...themeStyles, ...disabledStyles]);
        }, [theme, isDisabled, isReadOnly, cx]);

        const radioStyles = useMemo(() => {
            const themeStyles =
                theme === "light"
                    ? [
                          "bg-[var(--byteform-light-background)] border-[var(--byteform-light-border)]"
                      ]
                    : [
                          "bg-[var(--byteform-dark-background)] border-[var(--byteform-dark-border)]"
                      ];

            const checkedStyles = isChecked
                ? [
                      "bg-[var(--byteform-primary)] border-[var(--byteform-primary)]"
                  ]
                : [];

            return cx([...baseRadioStyles, ...themeStyles, ...checkedStyles]);
        }, [theme, isChecked, cx]);

        const radioIndicatorElement = useMemo(() => {
            if (!withIndicator) return null;

            return (
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
                </div>
            );
        }, [
            withIndicator,
            sizeStyles.radio,
            sizeStyles.dot,
            radioStyles,
            isChecked,
            isDisabled,
            isReadOnly,
            classNames?.radio,
            classNames?.dot,
            cx
        ]);

        const headerElement = useMemo(() => {
            if (!label && !icon && !withIndicator) return null;

            return (
                <div
                    className={cx(
                        "flex items-center",
                        sizeStyles.gap,
                        indicatorPosition === "right" ? "justify-between" : "",
                        classNames?.header
                    )}
                >
                    {indicatorPosition === "left" && radioIndicatorElement}

                    <div className="flex items-center gap-2 flex-1">
                        {icon && (
                            <div className="flex items-center justify-center flex-shrink-0">
                                {icon}
                            </div>
                        )}

                        {label && (
                            <div
                                className={cx(
                                    "font-medium select-none",
                                    sizeStyles.text,
                                    theme === "light"
                                        ? "text-[var(--byteform-light-text)]"
                                        : "text-[var(--byteform-dark-text)]",
                                    classNames?.label
                                )}
                                data-disabled={isDisabled}
                            >
                                {label}
                                {withAsterisk && (
                                    <span className="text-[var(--byteform-error)] ml-1">
                                        *
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {indicatorPosition === "right" && radioIndicatorElement}
                </div>
            );
        }, [
            label,
            icon,
            withIndicator,
            withAsterisk,
            indicatorPosition,
            radioIndicatorElement,
            sizeStyles.gap,
            sizeStyles.text,
            theme,
            isDisabled,
            classNames?.header,
            classNames?.label,
            cx
        ]);

        const bodyElement = useMemo(() => {
            if (!description) return null;

            return (
                <div
                    className={cx(
                        sizeStyles.description,
                        theme === "light"
                            ? "text-[var(--byteform-light-hint)]"
                            : "text-[var(--byteform-dark-hint)]",
                        label && "mt-1",
                        classNames?.body
                    )}
                    data-disabled={isDisabled}
                >
                    {description}
                </div>
            );
        }, [
            description,
            label,
            sizeStyles.description,
            theme,
            isDisabled,
            classNames?.body,
            cx
        ]);

        const errorElement = useMemo(() => {
            if (!error) return null;

            return (
                <div
                    className={cx(
                        "text-xs text-[var(--byteform-error)] mt-2",
                        classNames?.error
                    )}
                >
                    {error}
                </div>
            );
        }, [error, classNames?.error, cx]);

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
                        sizeStyles.card,
                        cardStyles,
                        classNames?.card
                    )}
                    onClick={handleCardClick}
                    role="radio"
                    aria-checked={isChecked}
                    aria-disabled={isDisabled}
                    data-checked={isChecked}
                    data-disabled={isDisabled}
                    data-readonly={isReadOnly}
                    data-size={size}
                >
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

                    <div
                        className={cx(
                            "relative z-10 pointer-events-none",
                            classNames?.content
                        )}
                    >
                        {headerElement}
                        {bodyElement}
                    </div>
                </div>

                {errorElement}
            </div>
        );
    }
);

RadioCardComponent.displayName = "@byteform/core/RadioCard";

export const RadioCard = React.memo(RadioCardComponent);
