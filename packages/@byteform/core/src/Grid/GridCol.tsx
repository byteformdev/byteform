import { forwardRef } from "react";
import {
    GridColProps,
    GridColumns,
    GridItemJustify,
    GridItemAlign
} from "./types";
import { useTheme } from "../_theme";

const spanStyles: Record<GridColumns, string> = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12"
};

const startStyles: Record<GridColumns, string> = {
    1: "col-start-1",
    2: "col-start-2",
    3: "col-start-3",
    4: "col-start-4",
    5: "col-start-5",
    6: "col-start-6",
    7: "col-start-7",
    8: "col-start-8",
    9: "col-start-9",
    10: "col-start-10",
    11: "col-start-11",
    12: "col-start-12"
};

const endStyles: Record<GridColumns, string> = {
    1: "col-end-1",
    2: "col-end-2",
    3: "col-end-3",
    4: "col-end-4",
    5: "col-end-5",
    6: "col-end-6",
    7: "col-end-7",
    8: "col-end-8",
    9: "col-end-9",
    10: "col-end-10",
    11: "col-end-11",
    12: "col-end-12"
};

const justifySelfStyles: Record<GridItemJustify, string> = {
    auto: "justify-self-auto",
    start: "justify-self-start",
    end: "justify-self-end",
    center: "justify-self-center",
    stretch: "justify-self-stretch"
};

const alignSelfStyles: Record<GridItemAlign, string> = {
    auto: "self-auto",
    start: "self-start",
    end: "self-end",
    center: "self-center",
    stretch: "self-stretch",
    baseline: "self-baseline"
};

const responsiveSpanStyles = {
    xs: {
        1: "col-span-1",
        2: "col-span-2",
        3: "col-span-3",
        4: "col-span-4",
        5: "col-span-5",
        6: "col-span-6",
        7: "col-span-7",
        8: "col-span-8",
        9: "col-span-9",
        10: "col-span-10",
        11: "col-span-11",
        12: "col-span-12"
    },
    sm: {
        1: "sm:col-span-1",
        2: "sm:col-span-2",
        3: "sm:col-span-3",
        4: "sm:col-span-4",
        5: "sm:col-span-5",
        6: "sm:col-span-6",
        7: "sm:col-span-7",
        8: "sm:col-span-8",
        9: "sm:col-span-9",
        10: "sm:col-span-10",
        11: "sm:col-span-11",
        12: "sm:col-span-12"
    },
    md: {
        1: "md:col-span-1",
        2: "md:col-span-2",
        3: "md:col-span-3",
        4: "md:col-span-4",
        5: "md:col-span-5",
        6: "md:col-span-6",
        7: "md:col-span-7",
        8: "md:col-span-8",
        9: "md:col-span-9",
        10: "md:col-span-10",
        11: "md:col-span-11",
        12: "md:col-span-12"
    },
    lg: {
        1: "lg:col-span-1",
        2: "lg:col-span-2",
        3: "lg:col-span-3",
        4: "lg:col-span-4",
        5: "lg:col-span-5",
        6: "lg:col-span-6",
        7: "lg:col-span-7",
        8: "lg:col-span-8",
        9: "lg:col-span-9",
        10: "lg:col-span-10",
        11: "lg:col-span-11",
        12: "lg:col-span-12"
    },
    xl: {
        1: "xl:col-span-1",
        2: "xl:col-span-2",
        3: "xl:col-span-3",
        4: "xl:col-span-4",
        5: "xl:col-span-5",
        6: "xl:col-span-6",
        7: "xl:col-span-7",
        8: "xl:col-span-8",
        9: "xl:col-span-9",
        10: "xl:col-span-10",
        11: "xl:col-span-11",
        12: "xl:col-span-12"
    }
};

export const GridCol = forwardRef<HTMLDivElement, GridColProps>(
    (
        {
            children,
            span,
            start,
            end,
            grow = false,
            justify,
            align,
            className,
            component: Component,
            responsive,
            ...props
        },
        ref
    ) => {
        const { cx } = useTheme();

        const Element = Component || "div";

        const responsiveClasses = responsive
            ? Object.entries(responsive)
                  .map(([breakpoint, spanValue]) => {
                      if (
                          spanValue &&
                          responsiveSpanStyles[
                              breakpoint as keyof typeof responsiveSpanStyles
                          ]
                      ) {
                          return responsiveSpanStyles[
                              breakpoint as keyof typeof responsiveSpanStyles
                          ][spanValue];
                      }
                      return "";
                  })
                  .filter(Boolean)
            : [];

        return (
            <Element
                ref={ref}
                className={cx(
                    span && spanStyles[span],
                    start && startStyles[start],
                    end && endStyles[end],
                    grow && "flex-grow",
                    justify && justifySelfStyles[justify],
                    align && alignSelfStyles[align],
                    ...responsiveClasses,
                    className
                )}
                {...props}
            >
                {children}
            </Element>
        );
    }
);

GridCol.displayName = "@byteform/core/Grid.Col";
