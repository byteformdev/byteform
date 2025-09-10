import { ElementType, forwardRef, ReactNode, useMemo } from "react";
import { ButtonProps, ButtonSize } from "./types";
import { useTheme } from "../_theme";
import { Loader } from "../Loader";
import { ButtonGroup } from "./ButtonGroup";

const compactStyles = {
    xs: "text-xs px-2 py-0.5 min-h-6",
    sm: "text-sm px-2.5 py-1 min-h-7",
    md: "text-sm px-3 py-1.5 min-h-8",
    lg: "text-base px-3.5 py-2 min-h-9",
    xl: "text-lg px-4 py-2.5 min-h-10"
};

const styles = {
    xs: "text-xs px-2 py-1 min-h-7",
    sm: "text-sm px-3 py-1.5 min-h-8",
    md: "text-base px-3 py-2 min-h-10",
    lg: "text-lg px-4 py-2.5 min-h-12",
    xl: "text-xl px-5 py-3 min-h-14"
};

const getSize = (size: ButtonSize, compact?: boolean) => {
    if (compact) return compactStyles[size] ?? compactStyles.sm;
    return styles[size] ?? styles.sm;
};

const getVariant = (theme: "light" | "dark", variant: string) => {
    const isLight = theme === "light";

    const lightVariants = {
        filled: "bg-[var(--byteform-light-background)] hover:bg-[var(--byteform-light-background-hover)] text-[var(--byteform-light-text)]",
        outline:
            "border border-[var(--byteform-light-border)] hover:border-[var(--byteform-light-border-hover)] text-[var(--byteform-light-text)]",
        dashed: "border border-dashed border-[var(--byteform-light-border)] hover:border-[var(--byteform-light-border-hover)] text-[var(--byteform-light-text)]",
        danger: "bg-[var(--byteform-red-light-5)] hover:bg-[var(--byteform-red-light-6)] text-[var(--byteform-red-light-text)]",
        ghost: "hover:bg-[var(--byteform-light-background-hover)] text-[var(--byteform-light-text)]"
    };

    const darkVariants = {
        filled: "bg-[var(--byteform-dark-background)] hover:bg-[var(--byteform-dark-background-hover)] text-[var(--byteform-dark-text)]",
        outline:
            "border border-[var(--byteform-dark-border)] hover:border-[var(--byteform-dark-border-hover)] text-[var(--byteform-dark-text)]",
        dashed: "border border-dashed border-[var(--byteform-dark-border)] hover:border-[var(--byteform-dark-border-hover)] text-[var(--byteform-dark-text)]",
        danger: "bg-[var(--byteform-red-light-5)] hover:bg-[var(--byteform-red-light-6)] text-[var(--byteform-red-2)]",
        ghost: "hover:bg-[var(--byteform-dark-background-hover)] text-[var(--byteform-dark-text)]"
    };

    const palette = isLight ? lightVariants : darkVariants;
    const variantClasses = palette[variant as keyof typeof palette];

    return (
        variantClasses || (isLight ? lightVariants.filled : darkVariants.filled)
    );
};

const getGrid = (align: "left" | "center" | "right") =>
    align === "center"
        ? "grid-cols-[1fr_auto_1fr]"
        : "grid-cols-[auto_1fr_auto]";

const getLabelJustify = (align: "left" | "center" | "right") => {
    switch (align) {
        case "left":
            return "justify-start";
        case "right":
            return "justify-end";
        default:
            return "justify-center";
    }
};

const getAnimation = (
    animation: string | undefined,
    buttonAnimation: string | undefined
) => {
    const activeAnimation = animation || buttonAnimation || "transform";

    switch (activeAnimation) {
        case "opacity":
            return "active:opacity-85";
        case "scale":
            return "active:scale-[0.98]";
        case "bounce":
            return "active:translate-y-0.5 active:scale-[0.98]";
        default:
            return "active:translate-y-0.5";
    }
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            type = "button",
            component: Component = "button",
            leftSection,
            rightSection,
            variant = "filled",
            size = "sm",
            disabled,
            active,
            loading,
            loaderPosition = "left",
            loaderProps = {
                size: 16,
                stroke: 2
            },
            fullWidth,
            href,
            target,
            align = "center",
            animation,
            useAnimation = true,
            compact = false,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx, settings } = useTheme();

        const renderSection = (
            content: ReactNode,
            position: "left" | "right"
        ) => {
            if (!content) return null;

            const baseClass =
                "row-start-1 flex items-center justify-center h-full";
            const sectionClass =
                position === "left"
                    ? classNames?.leftSection
                    : classNames?.rightSection;
            const gridPos =
                position === "left"
                    ? "col-start-1 justify-self-start"
                    : "col-start-3 justify-self-end";

            return (
                <div
                    className={cx(
                        baseClass,
                        gridPos,
                        theme === "light"
                            ? "text-[var(--byteform-light-section)]"
                            : "text-[var(--byteform-dark-section)]",
                        (disabled || loading) && "cursor-not-allowed",
                        sectionClass
                    )}
                >
                    {content}
                </div>
            );
        };

        const renderLoader = () => {
            if (!loading) return null;

            return <Loader {...loaderProps} />;
        };

        const gridClasses = useMemo(() => getGrid(align), [align]);
        const isCompact = compact || settings.button?.compact;

        const sizeClasses = useMemo(
            () => getSize(size, isCompact),
            [size, isCompact]
        );
        const variantClasses = useMemo(
            () => getVariant(theme, variant),
            [theme, variant]
        );
        const animationClasses = useMemo(
            () => getAnimation(animation, settings.button?.animation),
            [animation, settings.button?.animation]
        );

        const Element = Component as ElementType;

        return (
            <Element
                className={cx(
                    "inline-grid items-center gap-2 font-medium cursor-pointer relative rounded-md whitespace-nowrap select-none outline-none transition-colors duration-150",
                    useAnimation && (!disabled || !loading) && animationClasses,
                    sizeClasses,
                    variantClasses,
                    gridClasses,
                    fullWidth && "w-full",
                    (disabled || loading) &&
                        "opacity-60 cursor-not-allowed active:translate-y-0",
                    classNames?.wrapper,
                    className
                )}
                disabled={disabled || loading}
                ref={ref}
                href={href}
                target={target}
                {...props}
            >
                {renderSection(
                    loading && loaderPosition === "left"
                        ? renderLoader()
                        : leftSection,
                    "left"
                )}

                <div
                    className={cx(
                        "row-start-1 col-start-2 flex items-center",
                        getLabelJustify(align)
                    )}
                >
                    {children}
                </div>

                {renderSection(
                    loading && loaderPosition === "right"
                        ? renderLoader()
                        : rightSection,
                    "right"
                )}
            </Element>
        );
    }
);

const ExtendedButton = Object.assign(Button, {
    Group: ButtonGroup
});

ExtendedButton.displayName = "@byteform/core/Button";

export { ExtendedButton as Button };
