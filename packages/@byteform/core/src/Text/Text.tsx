import { forwardRef } from "react";
import {
    TextAlign,
    TextProps,
    TextSize,
    TextTruncate,
    TextWeight
} from "./types";
import { useTheme } from "../_theme";

const getSize = (size: TextSize) => {
    if (typeof size === "number") return `text-[${size}px]`;

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

const getWeight = (weight: TextWeight) => {
    if (typeof weight === "number") return `font-[${weight}]`;

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

const getLineClamp = (lineClamp: number) => {
    if (!lineClamp) return "";
    return `line-clamp-${lineClamp}`;
};

const getTruncate = (truncate: TextTruncate) => {
    if (!truncate) return "";

    return truncate === "start" ? "truncate rtl text-left" : "truncate";
};

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
    (
        {
            size,
            weight,
            align,
            lineClamp,
            truncate,
            inline,
            inherit,
            italic,
            underline,
            span,
            dimmed,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const Component = span ? "span" : "p";

        return (
            <Component
                ref={ref}
                className={cx(
                    dimmed &&
                        (theme === "light"
                            ? "text-[var(--byteform-light-hint)]"
                            : "text-[var(--byteform-dark-hint)]"),
                    !inherit && size && getSize(size),
                    !inherit && weight && getWeight(weight),
                    !inherit && align && getAlign(align),
                    !inherit && lineClamp && getLineClamp(lineClamp),
                    !inherit && truncate && getTruncate(truncate),
                    inline && "inline",
                    inherit && "text-inherit font-inherit",
                    italic && "italic",
                    underline && "underline",
                    className
                )}
                {...props}
            >
                {children}
            </Component>
        );
    }
);
