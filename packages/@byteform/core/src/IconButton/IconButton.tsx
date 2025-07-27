import { ElementType, forwardRef, ReactNode } from "react";
import { IconButtonProps, IconButtonSize } from "./types";
import { useTheme } from "../_theme";

const compactStyles = {
    xs: "text-xs p-0.5",
    sm: "text-sm p-1",
    md: "text-base p-1.5",
    lg: "text-lg p-2",
    xl: "text-xl p-2.5"
};

const styles = {
    xs: "text-xs p-1",
    sm: "text-sm p-1.5",
    md: "text-base p-2",
    lg: "text-lg p-2.5",
    xl: "text-xl p-3"
};

const getSize = (size: IconButtonSize, compact?: boolean) => {
    if (compact) return compactStyles[size] || compactStyles.sm;
    return styles[size] || styles.sm;
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            children,
            type = "button",
            component: Component = "button",
            variant = "ghost",
            size = "sm",
            disabled,
            active,
            fullWidth,
            useAnimation = true,
            compact = false,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const getVariant = () => {
            const isLight = theme === "light";

            const lightVariants = {
                filled: "bg-[var(--byteform-light-background)] hover:bg-[var(--byteform-light-background-hover)] text-[var(--byteform-light-text)]",
                outline:
                    "border border-[var(--byteform-light-border)] hover:border-[var(--byteform-light-border-hover)] text-[var(--byteform-light-text)]",
                danger: "bg-[var(--byteform-red-light-5)] hover:bg-[var(--byteform-red-light-6)] text-[var(--byteform-red-light-text)]",
                ghost: "hover:bg-[var(--byteform-light-background-hover)] text-[var(--byteform-light-text)]"
            };

            const darkVariants = {
                filled: "bg-[var(--byteform-dark-background)] hover:bg-[var(--byteform-dark-background-hover)] text-[var(--byteform-dark-text)]",
                outline:
                    "border border-[var(--byteform-dark-border)] hover:border-[var(--byteform-dark-border-hover)] text-[var(--byteform-dark-text)]",
                danger: "bg-[var(--byteform-red-light-5)] hover:bg-[var(--byteform-red-light-6)] text-[var(--byteform-red-2)]",
                ghost: "hover:bg-[var(--byteform-dark-background-hover)] text-[var(--byteform-dark-text)]"
            };

            const palette = isLight ? lightVariants : darkVariants;
            const variantClasses = palette[variant];

            return (
                variantClasses ||
                (isLight ? lightVariants.filled : darkVariants.filled)
            );
        };

        const Element = Component as ElementType;

        return (
            <Element
                ref={ref}
                type="button"
                disabled={disabled}
                className={cx(
                    "inline-flex w-fit items-center justify-center rounded-md cursor-pointer transition-all duration-150 select-none outline-none",
                    useAnimation && "active:translate-y-0.5",
                    getSize(size, compact),
                    getVariant(),
                    disabled &&
                        "opacity-60 cursor-not-allowed active:translate-y-0",
                    disabled && classNames?.disabled,
                    classNames?.wrapper,
                    className
                )}
                {...props}
            >
                <span className={cx("flex items-center", classNames?.icon)}>
                    {children}
                </span>
            </Element>
        );
    }
);

IconButton.displayName = "@byteform/core/IconButton";

export { IconButton };
