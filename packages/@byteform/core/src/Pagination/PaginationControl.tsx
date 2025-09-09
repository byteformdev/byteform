import { ElementType, forwardRef, useMemo } from "react";
import { usePaginationContext } from "./context";
import {
    PaginationControlProps,
    PaginationSize,
    PaginationVariant
} from "./types";
import { useTheme } from "../_theme";

const sizeStyles = {
    xs: "min-w-[24px] h-[24px] text-xs px-1",
    sm: "min-w-[28px] h-[28px] text-sm px-1.5",
    md: "min-w-[32px] h-[32px] text-base px-2",
    lg: "min-w-[40px] h-[40px] text-lg px-2.5",
    xl: "min-w-[48px] h-[48px] text-xl px-3"
};

const getVariantStyles = (
    theme: "light" | "dark",
    variant: PaginationVariant,
    active: boolean
) => {
    if (active) {
        return "bg-[var(--byteform-primary-light)] text-white border border-[var(--byteform-primary-light)]";
    }

    const isLight = theme === "light";

    const lightVariants = {
        filled: "bg-[var(--byteform-light-background)] hover:bg-[var(--byteform-light-background-hover)] text-[var(--byteform-light-text)] border border-[var(--byteform-light-border)]",
        outline:
            "border border-[var(--byteform-light-border)] hover:bg-[var(--byteform-light-background-hover)] text-[var(--byteform-light-text)]",
        ghost: "hover:bg-[var(--byteform-light-background-hover)] text-[var(--byteform-light-text)]"
    };

    const darkVariants = {
        filled: "bg-[var(--byteform-dark-background)] hover:bg-[var(--byteform-dark-background-hover)] text-[var(--byteform-dark-text)] border border-[var(--byteform-dark-border)]",
        outline:
            "border border-[var(--byteform-dark-border)] hover:bg-[var(--byteform-dark-background-hover)] text-[var(--byteform-dark-text)]",
        ghost: "hover:bg-[var(--byteform-dark-background-hover)] text-[var(--byteform-dark-text)]"
    };

    const palette = isLight ? lightVariants : darkVariants;
    return palette[variant] || palette.filled;
};

export const PaginationControl = forwardRef<
    HTMLButtonElement,
    PaginationControlProps
>(
    (
        {
            page,
            active: activeProp,
            disabled: disabledProp,
            className,
            component: Component = "button",
            children,
            onClick,
            ...props
        },
        ref
    ) => {
        const {
            page: currentPage,
            onChange,
            disabled: contextDisabled,
            size,
            variant,
            classNames
        } = usePaginationContext();
        const { theme, cx } = useTheme();

        const isActive = activeProp ?? page === currentPage;
        const isDisabled = disabledProp ?? contextDisabled ?? isActive;

        const handleClick = () => {
            if (!isDisabled && typeof page === "number" && onClick) {
                onClick();
            } else if (!isDisabled && typeof page === "number") {
                onChange(page);
            }
        };

        const sizeClasses = useMemo(
            () => sizeStyles[size] || sizeStyles.md,
            [size]
        );
        const variantClasses = useMemo(
            () => getVariantStyles(theme, variant, isActive),
            [theme, variant, isActive]
        );

        const Element = Component as ElementType;

        return (
            <Element
                ref={ref}
                className={cx(
                    "flex items-center justify-center cursor-pointer select-none rounded-md font-medium transition-colors duration-150",
                    sizeClasses,
                    variantClasses,
                    isDisabled && "opacity-60 cursor-not-allowed",
                    classNames?.control,
                    className
                )}
                disabled={isDisabled}
                onClick={handleClick}
                aria-current={isActive ? "page" : undefined}
                data-active={isActive}
                {...props}
            >
                {children ?? page}
            </Element>
        );
    }
);

PaginationControl.displayName = "@byteform/core/Pagination.Control";
