import { IconUserCircle } from "@tabler/icons-react";
import { AvatarProps } from "./types";
import { ElementType, forwardRef } from "react";
import { cx, useTheme } from "../_theme";

const sizeClasses = {
    xs: "text-xs w-6 h-6",
    sm: "text-sm w-8 h-8",
    md: "text-base w-10 h-10",
    lg: "text-lg w-12 h-12",
    xl: "text-xl w-14 h-14"
};

const getSize = (size: keyof typeof sizeClasses) =>
    sizeClasses[size] || sizeClasses.md;

const iconSizes: Record<keyof typeof sizeClasses, string> = {
    xs: "w-4 h-4",
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-9 h-9",
    xl: "w-10 h-10"
};

const renderContent = (
    children: React.ReactNode,
    src: string | undefined,
    alt: string | undefined,
    size: keyof typeof sizeClasses
) => {
    if (src)
        return (
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                loading="lazy"
            />
        );

    if (children) return children;

    return (
        <div className="flex items-center justify-center">
            <IconUserCircle className={cx(iconSizes[size], "text-current")} />
        </div>
    );
};

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    (
        {
            children,
            src,
            alt = "Avatar",
            size = "md",
            component: Component = "div",
            className,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const Element = Component as ElementType;
        return (
            <Element
                className={cx(
                    "inline-flex items-center justify-center overflow-hidden rounded-full outline-none",
                    getSize(size),
                    theme === "light"
                        ? "bg-[var(--byteform-light-background)] text-[var(--byteform-light-text)]"
                        : "bg-[var(--byteform-dark-background)] text-[var(--byteform-dark-text)]",
                    className
                )}
                ref={ref}
                {...props}
            >
                {renderContent(children, src, alt, size)}
            </Element>
        );
    }
);

Avatar.displayName = "@byteform/core/Avatar";

export { Avatar };
