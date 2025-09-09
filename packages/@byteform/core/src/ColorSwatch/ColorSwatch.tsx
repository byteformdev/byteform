import React, { forwardRef } from "react";
import { ColorSwatchProps } from "./types";
import { cx, useTheme } from "../_theme";

export const ColorSwatch = forwardRef<HTMLDivElement, ColorSwatchProps>(
    (
        {
            children,
            color,
            component: Component = "div",
            backgroundGrid = true,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme } = useTheme();

        const Element = Component as React.ElementType;

        return (
            <Element
                ref={ref}
                className={cx(
                    "relative inline-flex items-center justify-center rounded-md overflow-hidden w-6 h-6 outline-none",
                    classNames?.root,
                    className
                )}
                {...props}
            >
                {backgroundGrid && (
                    <div
                        className={cx(
                            "absolute inset-0",
                            theme === "light"
                                ? "color-transparency-grid-light"
                                : "color-transparency-grid-dark"
                        )}
                    />
                )}

                <div
                    className={cx(
                        "absolute inset-0 rounded-inherit",
                        classNames?.colorOverlay
                    )}
                    style={{ backgroundColor: color }}
                />

                {children && (
                    <div className={cx("relative z-10", classNames?.child)}>
                        {children}
                    </div>
                )}
            </Element>
        );
    }
);

ColorSwatch.displayName = "@byteform/core/ColorSwatch";
