import { forwardRef } from "react";
import { SwitchProps, SwitchSize } from "./types";
import { useTheme } from "../_theme";

const sizeClasses = {
    xs: {
        track: "w-8 h-4",
        thumb: "w-3 h-3",
        thumbTranslate: "translate-x-4",
        trackLabel: "text-[8px]",
        label: "text-xs"
    },
    sm: {
        track: "w-9 h-5",
        thumb: "w-4 h-4",
        thumbTranslate: "translate-x-4",
        trackLabel: "text-[9px]",
        label: "text-xs"
    },
    md: {
        track: "w-11 h-6",
        thumb: "w-5 h-5",
        thumbTranslate: "translate-x-5",
        trackLabel: "text-xs",
        label: "text-sm"
    },
    lg: {
        track: "w-12 h-7",
        thumb: "w-6 h-6",
        thumbTranslate: "translate-x-5",
        trackLabel: "text-sm",
        label: "text-base"
    },
    xl: {
        track: "w-14 h-8",
        thumb: "w-7 h-7",
        thumbTranslate: "translate-x-6",
        trackLabel: "text-base",
        label: "text-lg"
    }
};

const getSize = (size: SwitchSize) => {
    return sizeClasses[size] || sizeClasses.md;
};

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
            onLabel,
            offLabel,
            thumbIcon,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (!disabled && !readOnly && onChange) {
                onChange(event.target.checked);
            }
        };

        const getSwitchStyles = () => {
            const baseStyles = [
                "relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer border outline-none"
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

            const disabledStyles = disabled
                ? ["opacity-60 cursor-not-allowed"]
                : [];

            return cx([
                ...baseStyles,
                ...themeStyles,
                ...checkedStyles,
                ...disabledStyles
            ]);
        };

        const currentSize = getSize(size);

        const renderLabel = () => {
            if (!label) return null;

            return (
                <label
                    className={cx(
                        "cursor-pointer select-none",
                        currentSize.label,
                        theme === "light"
                            ? "text-[var(--byteform-light-text)]"
                            : "text-[var(--byteform-dark-text)]",
                        disabled && "cursor-not-allowed",
                        classNames?.label
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        if (disabled || readOnly) return;

                        onChange?.(!checked);
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
                            checked={checked}
                            defaultChecked={defaultChecked}
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
                                getSwitchStyles(),
                                disabled && "cursor-not-allowed",
                                classNames?.track,
                                checked && classNames?.activeTrack
                            )}
                            onClick={
                                !disabled && !readOnly
                                    ? () => onChange?.(!checked)
                                    : undefined
                            }
                            role="switch"
                            aria-checked={checked}
                        >
                            {(onLabel || offLabel) && (
                                <div
                                    className={cx(
                                        "absolute inset-0 flex items-center justify-center text-white font-medium",
                                        currentSize.trackLabel,
                                        classNames?.trackLabel
                                    )}
                                >
                                    {checked ? onLabel : offLabel}
                                </div>
                            )}

                            <span
                                className={cx(
                                    "absolute rounded-full transition-transform duration-200 ease-in-out bg-[var(--byteform-white)] flex items-center justify-center",
                                    thumbIcon
                                        ? "bg-[var(--byteform-white)] text-[var(--byteform-black)] ring-0"
                                        : "ring-[var(--byteform-white)]",
                                    currentSize.thumb,
                                    "top-[1px] left-[1px]",
                                    checked && currentSize.thumbTranslate,
                                    classNames?.thumb,
                                    checked && classNames?.activeThumb
                                )}
                            >
                                {thumbIcon}
                            </span>
                        </div>
                    </div>

                    {renderLabel()}
                </div>

                {renderDescription()}
                {renderError()}
            </div>
        );
    }
);

Switch.displayName = "@byteform/core/Switch";
