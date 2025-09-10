import { forwardRef, useEffect, useMemo, useState } from "react";
import { SwitchProps, SwitchSize } from "./types";
import { useTheme } from "../_theme";

const sizeClasses = {
    xs: {
        track: "w-8 h-4",
        thumb: "w-2.5 h-2.5",
        thumbTranslate: "translate-x-4",
        thumbOffset: "top-0.5 left-0.5",
        trackLabel: "text-[8px]",
        label: "text-xs"
    },
    sm: {
        track: "w-9 h-5",
        thumb: "w-3 h-3",
        thumbTranslate: "translate-x-4",
        thumbOffset: "left-1",
        trackLabel: "text-[9px]",
        label: "text-xs"
    },
    md: {
        track: "w-11 h-6",
        thumb: "w-4 h-4",
        thumbTranslate: "translate-x-5",
        thumbOffset: "left-1",
        trackLabel: "text-xs",
        label: "text-sm"
    },
    lg: {
        track: "w-14 h-7",
        thumb: "w-5 h-5",
        thumbTranslate: "translate-x-7",
        thumbOffset: "left-1",
        trackLabel: "text-sm",
        label: "text-base"
    },
    xl: {
        track: "w-16 h-9",
        thumb: "w-6 h-6",
        thumbTranslate: "translate-x-7",
        thumbOffset: "left-1.5",
        trackLabel: "text-base",
        label: "text-lg"
    }
};

const getSize = (size: SwitchSize) => {
    return sizeClasses[size] || sizeClasses.md;
};

const baseSwitchStyles = [
    "relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer border outline-none"
];

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    (
        {
            size = "md",
            label,
            description,
            error,
            withAsterisk,
            required,
            disabled,
            readOnly,
            checked,
            defaultChecked,
            onChange,
            thumbIcon,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const isControlled = checked !== undefined;
        const [internalChecked, setInternalChecked] = useState(
            defaultChecked || false
        );

        useEffect(() => {
            if (!isControlled && defaultChecked !== undefined) {
                setInternalChecked(defaultChecked);
            }
        }, [defaultChecked, isControlled]);

        const currentChecked = isControlled ? checked : internalChecked;

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (disabled || readOnly) return;

            const newChecked = event.target.checked;

            if (!isControlled) {
                setInternalChecked(newChecked);
            }

            onChange?.(newChecked);
        };

        const handleToggle = () => {
            if (disabled || readOnly) return;

            const newChecked = !currentChecked;

            if (!isControlled) {
                setInternalChecked(newChecked);
            }

            onChange?.(newChecked);
        };

        const switchStyles = useMemo(() => {
            const themeStyles =
                theme === "light"
                    ? [
                          "bg-[var(--byteform-light-background)] border-[var(--byteform-light-border)]",
                          !disabled &&
                              !readOnly &&
                              "hover:bg-[var(--byteform-light-background-hover)]"
                      ]
                    : [
                          "bg-[var(--byteform-dark-background)] border-[var(--byteform-dark-border)]",
                          !disabled &&
                              !readOnly &&
                              "hover:bg-[var(--byteform-dark-background-hover)]"
                      ];

            const checkedStyles = currentChecked
                ? [
                      "bg-[var(--byteform-primary)] border-[var(--byteform-primary)]",
                      !disabled &&
                          !readOnly &&
                          "hover:bg-[var(--byteform-primary-hover)]"
                  ]
                : [];

            const disabledStyles = disabled
                ? ["opacity-60 cursor-not-allowed"]
                : [];

            return cx([
                ...baseSwitchStyles,
                ...themeStyles,
                ...checkedStyles,
                ...disabledStyles
            ]);
        }, [theme, disabled, readOnly, currentChecked, cx]);

        const currentSize = getSize(size);

        const renderLabel = useMemo(() => {
            if (!label) return null;

            return (
                <label
                    className={cx(
                        currentSize.label,
                        theme === "light"
                            ? "text-[var(--byteform-light-text)]"
                            : "text-[var(--byteform-dark-text)]",
                        disabled && "cursor-not-allowed",
                        !readOnly && "cursor-pointer",
                        classNames?.label
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        handleToggle();
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
        }, [
            label,
            withAsterisk,
            currentSize.label,
            theme,
            disabled,
            classNames?.label
        ]);

        const renderDescription = useMemo(() => {
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
        }, [description, error, theme, disabled, classNames?.description]);

        const renderError = useMemo(() => {
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
        }, [error, classNames?.error]);

        const renderThumbIcon = useMemo(() => {
            if (!thumbIcon) return null;

            return thumbIcon(currentChecked, size);
        }, [thumbIcon, currentChecked, size]);

        return (
            <div
                className={cx(
                    "flex flex-col gap-1",
                    className,
                    classNames?.wrapper
                )}
            >
                <div
                    className={cx(
                        "flex items-center gap-2",
                        classNames?.container
                    )}
                >
                    <div
                        className={cx("relative inline-flex", classNames?.body)}
                    >
                        <input
                            ref={ref}
                            type="checkbox"
                            className="sr-only"
                            checked={isControlled ? checked : undefined}
                            defaultChecked={
                                !isControlled ? defaultChecked : undefined
                            }
                            disabled={disabled}
                            readOnly={readOnly}
                            required={required}
                            onChange={handleChange}
                            {...props}
                        />

                        <div
                            className={cx(
                                "outline-none",
                                currentSize.track,
                                switchStyles,
                                disabled && "cursor-not-allowed",
                                readOnly && "cursor-default",
                                classNames?.track
                            )}
                            onClick={
                                !disabled && !readOnly
                                    ? handleToggle
                                    : undefined
                            }
                            role="switch"
                            aria-checked={currentChecked}
                            data-checked={currentChecked}
                        >
                            <span
                                className={cx(
                                    "absolute rounded-full bg-[var(--byteform-white)] flex items-center justify-center transition-transform duration-200",
                                    currentSize.thumb,
                                    currentSize.thumbOffset,
                                    currentChecked &&
                                        currentSize.thumbTranslate,
                                    classNames?.thumb
                                )}
                                data-checked={currentChecked}
                            >
                                {renderThumbIcon}
                            </span>
                        </div>
                    </div>

                    {renderLabel}
                </div>

                {renderDescription}
                {renderError}
            </div>
        );
    }
);

Switch.displayName = "@byteform/core/Switch";
