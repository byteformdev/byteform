import { forwardRef } from "react";
import { SimpleGridProps, SimpleGridColumns, SimpleGridGap } from "./types";
import { cx } from "../_theme";

const gapStyles: Record<SimpleGridGap, string> = {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
};

const columnStyles: Record<SimpleGridColumns, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12"
};

const responsiveColumnStyles = {
    sm: {
        1: "sm:grid-cols-1",
        2: "sm:grid-cols-2",
        3: "sm:grid-cols-3",
        4: "sm:grid-cols-4",
        5: "sm:grid-cols-5",
        6: "sm:grid-cols-6",
        7: "sm:grid-cols-7",
        8: "sm:grid-cols-8",
        9: "sm:grid-cols-9",
        10: "sm:grid-cols-10",
        11: "sm:grid-cols-11",
        12: "sm:grid-cols-12"
    },
    md: {
        1: "md:grid-cols-1",
        2: "md:grid-cols-2",
        3: "md:grid-cols-3",
        4: "md:grid-cols-4",
        5: "md:grid-cols-5",
        6: "md:grid-cols-6",
        7: "md:grid-cols-7",
        8: "md:grid-cols-8",
        9: "md:grid-cols-9",
        10: "md:grid-cols-10",
        11: "md:grid-cols-11",
        12: "md:grid-cols-12"
    },
    lg: {
        1: "lg:grid-cols-1",
        2: "lg:grid-cols-2",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
        5: "lg:grid-cols-5",
        6: "lg:grid-cols-6",
        7: "lg:grid-cols-7",
        8: "lg:grid-cols-8",
        9: "lg:grid-cols-9",
        10: "lg:grid-cols-10",
        11: "lg:grid-cols-11",
        12: "lg:grid-cols-12"
    },
    xl: {
        1: "xl:grid-cols-1",
        2: "xl:grid-cols-2",
        3: "xl:grid-cols-3",
        4: "xl:grid-cols-4",
        5: "xl:grid-cols-5",
        6: "xl:grid-cols-6",
        7: "xl:grid-cols-7",
        8: "xl:grid-cols-8",
        9: "xl:grid-cols-9",
        10: "xl:grid-cols-10",
        11: "xl:grid-cols-11",
        12: "xl:grid-cols-12"
    }
};

export const SimpleGrid = forwardRef<HTMLDivElement, SimpleGridProps>(
    (
        {
            children,
            cols = 1,
            gap = "md",
            minChildWidth,
            component: Component,
            className,
            breakpoints,
            style,
            ...props
        },
        ref
    ) => {
        const Element = Component || "div";

        const responsiveClasses = breakpoints
            ? Object.entries(breakpoints)
                  .map(([breakpoint, columns]) => {
                      if (
                          columns &&
                          responsiveColumnStyles[
                              breakpoint as keyof typeof responsiveColumnStyles
                          ]
                      ) {
                          return responsiveColumnStyles[
                              breakpoint as keyof typeof responsiveColumnStyles
                          ][columns];
                      }
                      return "";
                  })
                  .filter(Boolean)
            : [];

        const gridStyle = minChildWidth
            ? {
                  ...style,
                  gridTemplateColumns: `repeat(auto-fit, minmax(${minChildWidth}, 1fr))`
              }
            : style;

        return (
            <Element
                ref={ref}
                className={cx(
                    "grid",
                    !minChildWidth && columnStyles[cols],
                    gapStyles[gap],
                    ...responsiveClasses,
                    className
                )}
                style={gridStyle}
                {...props}
            >
                {children}
            </Element>
        );
    }
);

SimpleGrid.displayName = "@byteform/core/SimpleGrid";
