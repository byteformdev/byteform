import { forwardRef } from "react";
import { useTheme } from "../_theme";
import {
    GroupProps,
    GroupDirection,
    GroupWrap,
    GroupJustify,
    GroupAlign,
    GroupGap
} from "./types";

const directionStyles: Record<GroupDirection, string> = {
    row: "flex-row",
    column: "flex-col",
    "row-reverse": "flex-row-reverse",
    "column-reverse": "flex-col-reverse"
};

const wrapStyles: Record<GroupWrap, string> = {
    nowrap: "flex-nowrap",
    wrap: "flex-wrap",
    "wrap-reverse": "flex-wrap-reverse"
};

const justifyStyles: Record<GroupJustify, string> = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
    stretch: "justify-stretch"
};

const alignStyles: Record<GroupAlign, string> = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch"
};

const gapStyles: Record<string, string> = {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
};

const responsiveDirectionStyles = {
    xs: {
        row: "xs:flex-row",
        column: "xs:flex-col",
        "row-reverse": "xs:flex-row-reverse",
        "column-reverse": "xs:flex-col-reverse"
    },
    sm: {
        row: "sm:flex-row",
        column: "sm:flex-col",
        "row-reverse": "sm:flex-row-reverse",
        "column-reverse": "sm:flex-col-reverse"
    },
    md: {
        row: "md:flex-row",
        column: "md:flex-col",
        "row-reverse": "md:flex-row-reverse",
        "column-reverse": "md:flex-col-reverse"
    },
    lg: {
        row: "lg:flex-row",
        column: "lg:flex-col",
        "row-reverse": "lg:flex-row-reverse",
        "column-reverse": "lg:flex-col-reverse"
    },
    xl: {
        row: "xl:flex-row",
        column: "xl:flex-col",
        "row-reverse": "xl:flex-row-reverse",
        "column-reverse": "xl:flex-col-reverse"
    }
};

const responsiveJustifyStyles = {
    xs: {
        start: "xs:justify-start",
        end: "xs:justify-end",
        center: "xs:justify-center",
        between: "xs:justify-between",
        around: "xs:justify-around",
        evenly: "xs:justify-evenly",
        stretch: "xs:justify-stretch"
    },
    sm: {
        start: "sm:justify-start",
        end: "sm:justify-end",
        center: "sm:justify-center",
        between: "sm:justify-between",
        around: "sm:justify-around",
        evenly: "sm:justify-evenly",
        stretch: "sm:justify-stretch"
    },
    md: {
        start: "md:justify-start",
        end: "md:justify-end",
        center: "md:justify-center",
        between: "md:justify-between",
        around: "md:justify-around",
        evenly: "md:justify-evenly",
        stretch: "md:justify-stretch"
    },
    lg: {
        start: "lg:justify-start",
        end: "lg:justify-end",
        center: "lg:justify-center",
        between: "lg:justify-between",
        around: "lg:justify-around",
        evenly: "lg:justify-evenly",
        stretch: "lg:justify-stretch"
    },
    xl: {
        start: "xl:justify-start",
        end: "xl:justify-end",
        center: "xl:justify-center",
        between: "xl:justify-between",
        around: "xl:justify-around",
        evenly: "xl:justify-evenly",
        stretch: "xl:justify-stretch"
    }
};

const responsiveAlignStyles = {
    xs: {
        start: "xs:items-start",
        end: "xs:items-end",
        center: "xs:items-center",
        baseline: "xs:items-baseline",
        stretch: "xs:items-stretch"
    },
    sm: {
        start: "sm:items-start",
        end: "sm:items-end",
        center: "sm:items-center",
        baseline: "sm:items-baseline",
        stretch: "sm:items-stretch"
    },
    md: {
        start: "md:items-start",
        end: "md:items-end",
        center: "md:items-center",
        baseline: "md:items-baseline",
        stretch: "md:items-stretch"
    },
    lg: {
        start: "lg:items-start",
        end: "lg:items-end",
        center: "lg:items-center",
        baseline: "lg:items-baseline",
        stretch: "lg:items-stretch"
    },
    xl: {
        start: "xl:items-start",
        end: "xl:items-end",
        center: "xl:items-center",
        baseline: "xl:items-baseline",
        stretch: "xl:items-stretch"
    }
};

const responsiveWrapStyles = {
    xs: {
        nowrap: "xs:flex-nowrap",
        wrap: "xs:flex-wrap",
        "wrap-reverse": "xs:flex-wrap-reverse"
    },
    sm: {
        nowrap: "sm:flex-nowrap",
        wrap: "sm:flex-wrap",
        "wrap-reverse": "sm:flex-wrap-reverse"
    },
    md: {
        nowrap: "md:flex-nowrap",
        wrap: "md:flex-wrap",
        "wrap-reverse": "md:flex-wrap-reverse"
    },
    lg: {
        nowrap: "lg:flex-nowrap",
        wrap: "lg:flex-wrap",
        "wrap-reverse": "lg:flex-wrap-reverse"
    },
    xl: {
        nowrap: "xl:flex-nowrap",
        wrap: "xl:flex-wrap",
        "wrap-reverse": "xl:flex-wrap-reverse"
    }
};

const responsiveGapStyles = {
    xs: {
        xs: "xs:gap-1",
        sm: "xs:gap-2",
        md: "xs:gap-4",
        lg: "xs:gap-6",
        xl: "xs:gap-8"
    },
    sm: {
        xs: "sm:gap-1",
        sm: "sm:gap-2",
        md: "sm:gap-4",
        lg: "sm:gap-6",
        xl: "sm:gap-8"
    },
    md: {
        xs: "md:gap-1",
        sm: "md:gap-2",
        md: "md:gap-4",
        lg: "md:gap-6",
        xl: "md:gap-8"
    },
    lg: {
        xs: "lg:gap-1",
        sm: "lg:gap-2",
        md: "lg:gap-4",
        lg: "lg:gap-6",
        xl: "lg:gap-8"
    },
    xl: {
        xs: "xl:gap-1",
        sm: "xl:gap-2",
        md: "xl:gap-4",
        lg: "xl:gap-6",
        xl: "xl:gap-8"
    }
};

export const Group = forwardRef<HTMLDivElement, GroupProps>(
    (
        {
            children,
            direction = "row",
            wrap = "nowrap",
            justify = "start",
            align = "stretch",
            gap = "md",
            grow = false,
            preventGrowOverflow = false,
            className,
            component: Component,
            breakpoints,
            style,
            ...props
        },
        ref
    ) => {
        const { cx } = useTheme();

        const Element = Component || "div";

        const getGapClass = (gapValue: GroupGap) => {
            if (typeof gapValue === "number") {
                return `gap-[${gapValue}px]`;
            }
            return gapStyles[gapValue] || gapStyles.md;
        };

        const responsiveClasses: string[] = [];

        if (breakpoints) {
            Object.entries(breakpoints).forEach(
                ([breakpoint, breakpointProps]) => {
                    const bp = breakpoint as keyof typeof breakpoints;

                    if (breakpointProps?.direction) {
                        responsiveClasses.push(
                            responsiveDirectionStyles[bp]?.[
                                breakpointProps.direction
                            ] || ""
                        );
                    }

                    if (breakpointProps?.justify) {
                        responsiveClasses.push(
                            responsiveJustifyStyles[bp]?.[
                                breakpointProps.justify
                            ] || ""
                        );
                    }

                    if (breakpointProps?.align) {
                        responsiveClasses.push(
                            responsiveAlignStyles[bp]?.[
                                breakpointProps.align
                            ] || ""
                        );
                    }

                    if (breakpointProps?.wrap) {
                        responsiveClasses.push(
                            responsiveWrapStyles[bp]?.[breakpointProps.wrap] ||
                                ""
                        );
                    }

                    if (
                        breakpointProps?.gap &&
                        typeof breakpointProps.gap !== "number"
                    ) {
                        responsiveClasses.push(
                            responsiveGapStyles[bp]?.[
                                breakpointProps.gap as keyof typeof responsiveGapStyles
                            ] || ""
                        );
                    }
                }
            );
        }

        const groupStyle = preventGrowOverflow
            ? { ...style, minWidth: 0 }
            : style;

        return (
            <Element
                ref={ref}
                className={cx(
                    "flex",
                    directionStyles[direction],
                    wrapStyles[wrap],
                    justifyStyles[justify],
                    alignStyles[align],
                    getGapClass(gap),
                    grow && "flex-1",
                    preventGrowOverflow && "min-w-0",
                    ...responsiveClasses.filter(Boolean),
                    className
                )}
                style={groupStyle}
                {...props}
            >
                {grow ? children : children}
            </Element>
        );
    }
);

Group.displayName = "@byteform/core/Group";
