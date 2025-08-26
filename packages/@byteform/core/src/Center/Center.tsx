import { forwardRef } from "react";
import { CenterProps } from "./types";
import { useTheme } from "../_theme";

export const Center = forwardRef<HTMLDivElement, CenterProps>(
    (
        {
            children,
            inline = false,
            component: Component,
            absolute = false,
            className,
            ...props
        },
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
                    absolute &&
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
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
