import React, { ElementType, forwardRef, useMemo } from "react";
import { usePaginationContext } from "./context";
import {
    PaginationPrevNextProps,
    PaginationSize,
    PaginationVariant
} from "./types";
import { useTheme } from "../_theme";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const sizeStyles = {
    xs: "min-w-[24px] h-[24px] text-xs px-1",
    sm: "min-w-[28px] h-[28px] text-sm px-1.5",
    md: "min-w-[32px] h-[32px] text-base px-2",
    lg: "min-w-[40px] h-[40px] text-lg px-2.5",
    xl: "min-w-[48px] h-[48px] text-xl px-3"
};

const getIconSize = (size: PaginationSize) => {
    const iconSizes = {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20
    };
    return iconSizes[size] || 16;
};

const getVariantStyles = (
    theme: "light" | "dark",
    variant: PaginationVariant,
    isDisabled: boolean
) => {
    const isLight = theme === "light";

    const lightVariants = {
        filled: [
            "bg-[var(--byteform-light-background)]",
            "text-[var(--byteform-light-text)]",
            "border border-[var(--byteform-light-border)]",
            !isDisabled && "hover:bg-[var(--byteform-light-background-hover)]"
        ],
        outline: [
            "border border-[var(--byteform-light-border)]",
            "text-[var(--byteform-light-text)]",
            !isDisabled && "hover:bg-[var(--byteform-light-background-hover)]"
        ],
        ghost: [
            "text-[var(--byteform-light-text)]",
            !isDisabled && "hover:bg-[var(--byteform-light-background-hover)]"
        ]
    };

    const darkVariants = {
        filled: [
            "bg-[var(--byteform-dark-background)]",
            "text-[var(--byteform-dark-text)]",
            "border border-[var(--byteform-dark-border)]",
            !isDisabled && "hover:bg-[var(--byteform-dark-background-hover)]"
        ],
        outline: [
            "border border-[var(--byteform-dark-border)]",
            "text-[var(--byteform-dark-text)]",
            !isDisabled && "hover:bg-[var(--byteform-dark-background-hover)]"
        ],
        ghost: [
            "text-[var(--byteform-dark-text)]",
            !isDisabled && "hover:bg-[var(--byteform-dark-background-hover)]"
        ]
    };

    const palette = isLight ? lightVariants : darkVariants;

    return (palette[variant] || palette.filled).filter(Boolean).join(" ");
};

export const PaginationPrevNext = forwardRef<
    HTMLButtonElement,
    PaginationPrevNextProps
>(
    (
        {
            type,
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
            total,
            page,
            onChange,
            disabled: contextDisabled,
            size,
            variant,
            classNames
        } = usePaginationContext();
        const { theme, cx } = useTheme();

        const isDisabled =
            disabledProp ||
            contextDisabled ||
            (type === "previous" ? page === 1 : page === total);

        const handleClick = () => {
            if (!isDisabled && onClick) {
                onClick();
            } else if (!isDisabled) {
                const targetPage = type === "previous" ? page - 1 : page + 1;
                onChange(targetPage);
            }
        };

        const sizeClasses = useMemo(
            () => sizeStyles[size] || sizeStyles.md,
            [size]
        );
        const variantClasses = useMemo(
            () => getVariantStyles(theme, variant, isDisabled),
            [theme, variant, isDisabled]
        );
        const iconSize = useMemo(() => getIconSize(size), [size]);

        const defaultIcon =
            type === "previous" ? IconChevronLeft : IconChevronRight;

        const Element = Component as ElementType;

        return (
            <Element
                ref={ref}
                className={cx(
                    "flex items-center justify-center cursor-pointer select-none rounded-md font-medium transition-colors duration-150",
                    sizeClasses,
                    variantClasses,
                    isDisabled && "opacity-60 cursor-not-allowed",
                    classNames?.prevNext,
                    className
                )}
                disabled={isDisabled}
                onClick={handleClick}
                data-disabled={isDisabled}
                {...props}
            >
                {children ??
                    React.createElement(defaultIcon, { size: iconSize })}
            </Element>
        );
    }
);

PaginationPrevNext.displayName = "@byteform/core/Pagination.PrevNext";
