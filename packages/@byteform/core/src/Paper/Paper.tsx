import { forwardRef } from "react";
import { PaperProps } from "./types";
import { useTheme } from "../_theme";

export const Paper = forwardRef<HTMLDivElement, PaperProps>(
    (
        {
            children,
            withBorder = false,
            className,
            component: Component,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();

        const Element = Component || "div";

        return (
            <Element
                ref={ref}
                className={cx(
                    "rounded-md p-4 overflow-hidden outline-none",
                    theme === "light"
                        ? "bg-[var(--byteform-light-background)] border-[var(--byteform-light-border)] text-[var(--byteform-light-text)]"
                        : "bg-[var(--byteform-dark-background)] border-[var(--byteform-dark-border)] text-[var(--byteform-dark-text)]",
                    withBorder && "border",
                    className
                )}
                {...props}
            >
                {children}
            </Element>
        );
    }
);
