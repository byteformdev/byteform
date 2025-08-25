import { forwardRef } from "react";
import {
    GridProps,
    GridColumns,
    GridGap,
    GridFlow,
    GridJustify,
    GridAlign,
    GridJustifyItems,
    GridAlignItems
} from "./types";
import { useTheme } from "../_theme";
import { GridCol } from "./GridCol";

const gapStyles: Record<GridGap, string> = {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
};

const columnStyles: Record<GridColumns, string> = {
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

const flowStyles: Record<GridFlow, string> = {
    row: "grid-flow-row",
    col: "grid-flow-col",
    dense: "grid-flow-dense",
    "row-dense": "grid-flow-row-dense",
    "col-dense": "grid-flow-col-dense"
};

const justifyStyles: Record<GridJustify, string> = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
};

const alignStyles: Record<GridAlign, string> = {
    start: "content-start",
    end: "content-end",
    center: "content-center",
    between: "content-between",
    around: "content-around",
    evenly: "content-evenly"
};

const justifyItemsStyles: Record<GridJustifyItems, string> = {
    start: "justify-items-start",
    end: "justify-items-end",
    center: "justify-items-center",
    stretch: "justify-items-stretch"
};

const alignItemsStyles: Record<GridAlignItems, string> = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch"
};

const responsiveColumnStyles = {
    xs: {
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
    },
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

const GridComponent = forwardRef<HTMLDivElement, GridProps>(
    (
        {
            children,
            columns = 1,
            gap,
            gapX,
            gapY,
            flow,
            autoFit = false,
            minColWidth = "250px",
            justify,
            align,
            justifyItems,
            alignItems,
            className,
            component: Component,
            responsive,
            style,
            ...props
        },
        ref
    ) => {
        const { cx } = useTheme();

        const Element = Component || "div";

        const responsiveClasses = responsive
            ? Object.entries(responsive)
                  .map(([breakpoint, cols]) => {
                      if (
                          cols &&
                          responsiveColumnStyles[
                              breakpoint as keyof typeof responsiveColumnStyles
                          ]
                      ) {
                          return responsiveColumnStyles[
                              breakpoint as keyof typeof responsiveColumnStyles
                          ][cols];
                      }
                      return "";
                  })
                  .filter(Boolean)
            : [];

        const gridStyle = autoFit
            ? {
                  ...style,
                  gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}, 1fr))`
              }
            : style;

        return (
            <Element
                ref={ref}
                className={cx(
                    "grid",
                    !autoFit && columnStyles[columns],
                    gap && gapStyles[gap],
                    gapX && `gap-x-${gapStyles[gapX].split("-")[1]}`,
                    gapY && `gap-y-${gapStyles[gapY].split("-")[1]}`,
                    flow && flowStyles[flow],
                    justify && justifyStyles[justify],
                    align && alignStyles[align],
                    justifyItems && justifyItemsStyles[justifyItems],
                    alignItems && alignItemsStyles[alignItems],
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

GridComponent.displayName = "@byteform/core/Grid";

export const Grid = Object.assign(GridComponent, {
    Col: GridCol
});
