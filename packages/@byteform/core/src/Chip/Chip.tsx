import { forwardRef, useId, useMemo } from "react";
import { ChipProps, ChipSize, ChipVariant } from "./types";
import { cx, useTheme } from "../_theme";
import { IconCheck } from "@tabler/icons-react";
import { ChipGroup } from "./ChipGroup";

const sizeClasses = {
    xs: {
        chip: "h-6 px-2 text-xs",
        icon: 12,
        gap: "gap-1"
    },
    sm: {
        chip: "h-7 px-2.5 text-xs",
        icon: 14,
        gap: "gap-1.5"
    },
    md: {
        chip: "h-8 px-3 text-sm",
        icon: 16,
        gap: "gap-2"
    },
    lg: {
        chip: "h-9 px-3.5 text-sm",
        icon: 18,
        gap: "gap-2"
    },
    xl: {
        chip: "h-10 px-4 text-base",
        icon: 20,
        gap: "gap-2.5"
    }
};

const getSize = (size: ChipSize) => {
    return sizeClasses[size] || sizeClasses.md;
};

const chipStylesConfig = {
    light: {
        filled: {
            checked: {
                base: "bg-[var(--byteform-primary)] text-white",
                hover: "hover:bg-[var(--byteform-primary-hover)] hover:border-[var(--byteform-primary-hover)]"
            },
            unchecked: {
                base: "bg-[var(--byteform-light-background)] text-[var(--byteform-light-text)]",
                hover: "hover:bg-[var(--byteform-light-background-hover)] hover:border-[var(--byteform-light-border-hover)]"
            }
        },
        outline: {
            checked: {
                base: "border-[var(--byteform-primary)] text-[var(--byteform-primary)]",
                hover: "hover:bg-[var(--byteform-light-background-hover)] hover:border-[var(--byteform-primary-hover)]"
            },
            unchecked: {
                base: "bg-[var(--byteform-light-0)] border-[var(--byteform-light-border)] text-[var(--byteform-light-text)]",
                hover: "hover:bg-[var(--byteform-light-1)] hover:border-[var(--byteform-light-border-hover)]"
            }
        }
    },
    dark: {
        filled: {
            checked: {
                base: "bg-[var(--byteform-primary)] text-white",
                hover: "hover:bg-[var(--byteform-primary-hover)] hover:border-[var(--byteform-primary-hover)]"
            },
            unchecked: {
                base: "bg-[var(--byteform-dark-background)] text-[var(--byteform-dark-text)]",
                hover: "hover:bg-[var(--byteform-dark-background-hover)]"
            }
        },
        outline: {
            checked: {
                base: "border-[var(--byteform-primary)] text-[var(--byteform-primary)]",
                hover: "hover:bg-[var(--byteform-dark-background-hover)] hover:border-[var(--byteform-primary-hover)]"
            },
            unchecked: {
                base: "bg-transparent border-[var(--byteform-dark-border)] text-[var(--byteform-dark-text)]",
                hover: "hover:bg-[var(--byteform-dark-background-hover)] hover:border-[var(--byteform-dark-border-hover)]"
            }
        }
    }
};

const getStyles = (
    variant: ChipVariant,
    checked: boolean,
    disabled: boolean,
    theme: "light" | "dark"
) => {
    const baseStyles = [
        "inline-flex items-center justify-center rounded-full transition-all duration-200 ease-in-out cursor-pointer outline-none select-none font-medium",
        variant === "outline" && "border"
    ];

    const themeConfig = chipStylesConfig[theme];
    const variantConfig = themeConfig[variant];
    const stateConfig = variantConfig[checked ? "checked" : "unchecked"];

    const themeStyles = [
        stateConfig.base,
        ...(disabled ? [] : [stateConfig.hover])
    ];

    const disabledStyles = disabled
        ? ["opacity-60 cursor-not-allowed hover:scale-100"]
        : [];

    return cx([...baseStyles, ...themeStyles, ...disabledStyles]);
};

const Chip = forwardRef<HTMLLabelElement, ChipProps>(
    (
        {
            size = "md",
            variant = "filled",
            children,
            value,
            checked,
            defaultChecked,
            disabled,
            readOnly,
            onChange,
            icon: Icon,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const id = useId();

        const sizeStyles = useMemo(() => getSize(size), [size]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (readOnly || disabled) return;
            onChange?.(e.target.checked, value);
        };

        const renderIcon = () => {
            if (!checked && !defaultChecked) return null;

            const IconComponent = Icon || IconCheck;

            return (
                <IconComponent
                    size={sizeStyles.icon}
                    className={cx(
                        "transition-all duration-200 ease-in-out",
                        variant === "outline" && checked
                            ? "text-[var(--byteform-primary)]"
                            : "",
                        classNames?.icon
                    )}
                />
            );
        };

        return (
            <label
                ref={ref}
                className={cx(
                    sizeStyles.chip,
                    sizeStyles.gap,
                    getStyles(
                        variant,
                        checked ?? defaultChecked ?? false,
                        disabled ?? false,
                        theme
                    ),
                    classNames?.body,
                    className
                )}
                {...props}
            >
                <input
                    type="checkbox"
                    id={id}
                    value={value}
                    checked={checked}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    readOnly={readOnly}
                    onChange={handleChange}
                    className={cx("sr-only", classNames?.input)}
                />

                {renderIcon()}

                {children && (
                    <span className={cx("truncate", classNames?.label)}>
                        {children}
                    </span>
                )}
            </label>
        );
    }
);

const ExtendedChip = Object.assign(Chip, {
    Group: ChipGroup
});

ExtendedChip.displayName = "@byteform/core/Chip";

export { ExtendedChip as Chip };
