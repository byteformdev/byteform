import { forwardRef, useMemo } from "react";
import { BadgeProps, BadgeVariant } from "./types";
import { useTheme } from "../_theme";

const sizeClasses = {
    xs: "text-[11px] px-1 py-0.5 min-h-[16px]",
    sm: "text-xs px-2 py-1 min-h-[20px]",
    md: "text-sm px-2.5 py-1.5 min-h-[24px]",
    lg: "text-sm px-3 py-2 min-h-[28px]",
    xl: "text-base px-3.5 py-2.5 min-h-[32px]"
};

const getSize = (size: keyof typeof sizeClasses) =>
    sizeClasses[size] || sizeClasses.sm;

const getVariant = (variant: BadgeVariant) => {
    switch (variant) {
        case "outline":
            return "border border-[var(--byteform-primary)] text-[var(--byteform-dark-text)]";
        default:
            return "bg-[var(--byteform-primary)] text-[var(--byteform-dark-text)]";
    }
};

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
    (
        {
            children,
            variant = "filled",
            size = "sm",
            leftSection,
            rightSection,
            fullWidth = false,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { cx } = useTheme();

        const renderSection = (
            content: React.ReactNode,
            position: "left" | "right"
        ) => {
            if (!content) return null;

            const getPosition = useMemo(() => {
                switch (position) {
                    case "right":
                        return "ml-2";
                    default:
                        return "mr-2";
                }
            }, [position]);

            return (
                <div
                    className={cx(
                        "inline-flex items-center",
                        getPosition,
                        classNames?.section
                    )}
                >
                    {content}
                </div>
            );
        };

        return (
            <div
                ref={ref}
                {...props}
                className={cx(
                    "inline-flex items-center whitespace-nowrap font-medium w-fit rounded-md outline-none",
                    getSize(size),
                    getVariant(variant),
                    fullWidth && "w-full",
                    className,
                    classNames?.wrapper
                )}
            >
                {renderSection(leftSection, "left")}
                <span className={classNames?.label}>{children}</span>
                {renderSection(rightSection, "right")}
            </div>
        );
    }
);

Badge.displayName = "@byteform/core/Badge";
