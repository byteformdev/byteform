import { forwardRef } from "react";
import { TitleProps, TitleOrder } from "./types";
import { useTheme } from "../_theme";
import { TextSize, TextAlign, TextWeight } from "../Text/types";

const getSize = (size: TextSize, order?: TitleOrder) => {
    if (typeof size === "number") return `text-[${size}px]`;

    if (!size && order) {
        const orderSizeMap = {
            1: "text-4xl",
            2: "text-3xl",
            3: "text-2xl",
            4: "text-xl",
            5: "text-lg",
            6: "text-base"
        };
        return orderSizeMap[order];
    }

    const map = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
        "5xl": "text-5xl",
        "6xl": "text-6xl",
        "7xl": "text-7xl",
        "8xl": "text-8xl",
        "9xl": "text-9xl"
    };

    return map[size as keyof typeof map] || `text-[${size}]`;
};

const getWeight = (weight: TextWeight, order?: TitleOrder) => {
    if (typeof weight === "number") return `font-[${weight}]`;

    if (!weight && order) {
        const orderWeightMap = {
            1: "font-bold",
            2: "font-bold",
            3: "font-semibold",
            4: "font-semibold",
            5: "font-medium",
            6: "font-medium"
        };
        return orderWeightMap[order];
    }

    const map = {
        thin: "font-thin",
        extralight: "font-extralight",
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black",
        100: "font-thin",
        200: "font-extralight",
        300: "font-light",
        400: "font-normal",
        500: "font-medium",
        600: "font-semibold",
        700: "font-bold",
        800: "font-extrabold",
        900: "font-black"
    };

    return map[weight as keyof typeof map] || `font-[${weight}]`;
};

const getAlign = (align: TextAlign) => {
    const map = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
        start: "text-start",
        end: "text-end"
    };

    return map[align as keyof typeof map] || "";
};

export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
    (
        {
            order = 1,
            size,
            weight,
            align,
            inline,
            inherit,
            italic,
            underline,
            dimmed,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const Element = `h${order}` as any;

        return (
            <Element
                ref={ref}
                className={cx(
                    dimmed &&
                        (theme === "light"
                            ? "text-[var(--byteform-light-hint)]"
                            : "text-[var(--byteform-dark-hint)]"),
                    !inherit && getSize(size, order),
                    !inherit && getWeight(weight, order),
                    !inherit && align && getAlign(align),
                    inline && "inline",
                    inherit && "text-inherit font-inherit",
                    italic && "italic",
                    underline && "underline",
                    className
                )}
                {...props}
            >
                {children}
            </Element>
        );
    }
);
