import { IconUserCircle } from "@tabler/icons-react";
import { AvatarProps } from "./types";
import { ElementType, forwardRef, useMemo } from "react";
import { cx, useTheme } from "../_theme";
import { AvatarGroup } from "./AvatarGroup";

const sizeClasses = {
    xs: "text-xs w-6 h-6",
    sm: "text-sm w-7 h-7",
    md: "text-base w-9 h-9",
    lg: "text-lg w-10 h-10",
    xl: "text-xl w-12 h-12"
};

const getSize = (size: keyof typeof sizeClasses) =>
    sizeClasses[size] || sizeClasses.md;

const iconSizes: Record<keyof typeof sizeClasses, string> = {
    xs: "w-4 h-4",
    sm: "w-5 h-5",
    md: "w-7 h-7",
    lg: "w-8 h-8",
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

        const currentSize = useMemo(() => getSize(size), [size]);

        const Element = Component as ElementType;
        return (
            <Element
                className={cx(
                    "inline-flex items-center justify-center rounded-full overflow-hidden outline-none",
                    currentSize,
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

const ExtendedAvatar = Object.assign(Avatar, {
    Group: AvatarGroup
});

ExtendedAvatar.displayName = "@byteform/core/Avatar";

export { ExtendedAvatar as Avatar };
