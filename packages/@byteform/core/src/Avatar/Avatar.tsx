import { IconUserCircle } from "@tabler/icons-react";
import { AvatarProps } from "./types";
import { ElementType, forwardRef } from "react";
import { useTheme } from "../_theme";
import { AvatarGroup } from "./AvatarGroup";

const renderContent = (
    children: React.ReactNode,
    src: string | undefined,
    alt: string | undefined
) => {
    if (src) return <img src={src} alt={alt} />;

    if (children) return children;

    return (
        <div className="flex items-center justify-center">
            <IconUserCircle />
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

        const getSize = () => {
            const sizes = {
                xs: "text-xs w-6 h-6",
                sm: "text-sm w-8 h-8",
                md: "text-base w-10 h-10",
                lg: "text-lg w-12 h-12",
                xl: "text-xl w-14 h-14"
            };

            return sizes[size] || sizes.md;
        };

        const Element = Component as ElementType;
        return (
            <Element
                className={cx(
                    "inline-flex items-center justify-center overflow-hidden rounded-full",
                    getSize(),
                    theme === "light"
                        ? "bg-[var(--byteform-light-background)] text-[var(--byteform-light-text)]"
                        : "bg-[var(--byteform-dark-background)] text-[var(--byteform-dark-text)]",
                    className
                )}
                ref={ref}
                {...props}
            >
                {renderContent(children, src, alt)}
            </Element>
        );
    }
);

Avatar.displayName = "@byteform/core/Avatar";

export { Avatar };
