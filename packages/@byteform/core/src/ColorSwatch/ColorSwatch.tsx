import React, { forwardRef } from "react";
import { ColorSwatchProps } from "./types";
import { cx } from "../_theme";

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
        const Element = Component as React.ElementType;

        const transparencyGridStyle = {
            backgroundColor: "#ccc",
            backgroundImage: `
                linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%),
                linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%)
            `,
            backgroundSize: "12px 12px",
            backgroundPosition: "0 0, 6px 6px"
        };

        return (
            <Element
                ref={ref}
                className={cx(
                    "relative inline-flex items-center justify-center rounded-md overflow-hidden w-6 h-6 outline-none",
                    classNames?.root,
                    className
                )}
                style={backgroundGrid ? transparencyGridStyle : undefined}
                {...props}
            >
                <div
                    className={cx("absolute inset-0", classNames?.colorOverlay)}
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
