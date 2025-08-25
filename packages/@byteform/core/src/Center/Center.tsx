import { forwardRef } from "react";
import { CenterProps } from "./types";
import { useTheme } from "../_theme";

export const Center = forwardRef<HTMLDivElement, CenterProps>(
    (
        { children, inline = false, className, component: Component, ...props },
        ref
    ) => {
        const { cx } = useTheme();

        const Element = Component || "div";

        return (
            <Element
                ref={ref}
                className={cx(
                    "flex justify-center items-center",
                    inline && "inline-flex",
                    className
                )}
                {...props}
            >
                {children}
            </Element>
        );
    }
);

Center.displayName = "Center";
