import { forwardRef } from "react";
import { useTheme } from "../_theme";
import { StackProps, StackAlign, StackJustify, StackGap } from "./types";

const alignStyles: Record<StackAlign, string> = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    stretch: "items-stretch"
};

const justifyStyles: Record<StackJustify, string> = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
    stretch: "justify-stretch"
};

const gapStyles: Record<string, string> = {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8"
};

const responsiveAlignStyles = {
    xs: {
        start: "xs:items-start",
        end: "xs:items-end",
        center: "xs:items-center",
        stretch: "xs:items-stretch"
    },
    sm: {
        start: "sm:items-start",
        end: "sm:items-end",
        center: "sm:items-center",
        stretch: "sm:items-stretch"
    },
    md: {
        start: "md:items-start",
        end: "md:items-end",
        center: "md:items-center",
        stretch: "md:items-stretch"
    },
    lg: {
        start: "lg:items-start",
        end: "lg:items-end",
        center: "lg:items-center",
        stretch: "lg:items-stretch"
    },
    xl: {
        start: "xl:items-start",
        end: "xl:items-end",
        center: "xl:items-center",
        stretch: "xl:items-stretch"
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

export const Stack = forwardRef<HTMLDivElement, StackProps>(
    (
        {
            children,
            align = "stretch",
            justify = "start",
            gap = "md",
            grow = false,
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

        const getGapClass = (gapValue: StackGap) => {
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

                    if (breakpointProps?.align) {
                        responsiveClasses.push(
                            responsiveAlignStyles[bp]?.[
                                breakpointProps.align
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

        return (
            <Element
                ref={ref}
                className={cx(
                    "flex flex-col",
                    alignStyles[align],
                    justifyStyles[justify],
                    getGapClass(gap),
                    grow && "flex-1",
                    ...responsiveClasses.filter(Boolean),
                    className
                )}
                style={style}
                {...props}
            >
                {children}
            </Element>
        );
    }
);

Stack.displayName = "@byteform/core/Stack";
