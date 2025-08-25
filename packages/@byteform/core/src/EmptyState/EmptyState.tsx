import { forwardRef } from "react";
import { EmptyStateProps, EmptyStateSize, EmptyStateVariant } from "./types";
import { useTheme } from "../_theme";

const sizeClasses = {
    xs: {
        wrapper: "p-4 gap-2",
        icon: "w-8 h-8",
        title: "text-sm",
        description: "text-xs"
    },
    sm: {
        wrapper: "p-6 gap-3",
        icon: "w-10 h-10",
        title: "text-base",
        description: "text-sm"
    },
    md: {
        wrapper: "p-8 gap-4",
        icon: "w-12 h-12",
        title: "text-lg",
        description: "text-base"
    },
    lg: {
        wrapper: "p-10 gap-5",
        icon: "w-16 h-16",
        title: "text-xl",
        description: "text-lg"
    },
    xl: {
        wrapper: "p-12 gap-6",
        icon: "w-20 h-20",
        title: "text-2xl",
        description: "text-xl"
    }
};

const getSizeClasses = (size: EmptyStateSize) =>
    sizeClasses[size] || sizeClasses.md;

const getVariantClasses = (variant: EmptyStateVariant, theme: string) => {
    switch (variant) {
        case "subtle":
            return theme === "light"
                ? "bg-[var(--byteform-light-background)]/50"
                : "bg-[var(--byteform-dark-background)]/50";
        case "bordered":
            return theme === "light"
                ? "bg-[var(--byteform-light-background)] border border-[var(--byteform-light-border)]"
                : "bg-[var(--byteform-dark-background)] border border-[var(--byteform-dark-border)]";
        default:
            return "";
    }
};

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
    (
        {
            icon,
            title,
            description,
            actions,
            size = "md",
            variant = "default",
            classNames,
            className,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const sizes = getSizeClasses(size);
        const variantClasses = getVariantClasses(variant, theme);

        const textColor =
            theme === "light"
                ? "text-[var(--byteform-light-text)]"
                : "text-[var(--byteform-dark-text)]";

        const mutedTextColor =
            theme === "light"
                ? "text-[var(--byteform-light-text)]/70"
                : "text-[var(--byteform-dark-text)]/70";

        const iconColor =
            theme === "light"
                ? "text-[var(--byteform-light-text)]/50"
                : "text-[var(--byteform-dark-text)]/50";

        return (
            <div
                ref={ref}
                className={cx(
                    "flex flex-col items-center justify-center text-center rounded-lg",
                    sizes.wrapper,
                    variantClasses,
                    className
                )}
                {...props}
            >
                {icon && (
                    <div
                        className={cx(
                            "flex items-center justify-center",
                            sizes.icon,
                            iconColor,
                            classNames?.icon
                        )}
                    >
                        {icon}
                    </div>
                )}

                {title && (
                    <div
                        className={cx(
                            "font-semibold",
                            sizes.title,
                            textColor,
                            classNames?.title
                        )}
                    >
                        {title}
                    </div>
                )}

                {description && (
                    <div
                        className={cx(
                            "max-w-md",
                            sizes.description,
                            mutedTextColor,
                            classNames?.description
                        )}
                    >
                        {description}
                    </div>
                )}

                {actions && (
                    <div
                        className={cx(
                            "flex flex-col sm:flex-row gap-2 mt-2",
                            classNames?.actions
                        )}
                    >
                        {actions}
                    </div>
                )}
            </div>
        );
    }
);

EmptyState.displayName = "EmptyState";
