import {
    ButtonAlign,
    ButtonAnimation,
    ButtonSize,
    ButtonVariant
} from "./Button.types";

const sizes = {
    normal: {
        xs: "text-xs px-2.5 py-1 min-h-6",
        sm: "text-sm px-3 py-1.5 min-h-7",
        md: "text-base px-4 py-2 min-h-8",
        lg: "text-lg px-5 py-2.5 min-h-10",
        xl: "text-xl px-6 py-3 min-h-12"
    },
    compact: {
        xs: "text-xs px-2 py-0.5 min-h-5",
        sm: "text-sm px-2.5 py-1 min-h-6",
        md: "text-sm px-3 py-1.25 min-h-7",
        lg: "text-base px-3.5 py-1.5 min-h-8",
        xl: "text-lg px-4 py-2 min-h-9"
    }
};

export const getSize = (size: ButtonSize = "md", compact: boolean = false) => {
    const sizeMap = compact ? sizes.compact : sizes.normal;

    return sizeMap[size] || sizeMap.md;
};

const variants = {
    default: {
        base: "bg-[var(--byteform-primary)] text-[var(--byteform-primary-text)]",
        hover: "hover:bg-[var(--byteform-primary-hover)]"
    },
    filled: {
        base: "bg-[var(--byteform-background)] text-[var(--byteform-text)]",
        hover: "hover:bg-[var(--byteform-background-hover)]"
    },
    outline: {
        base: "bg-transparent text-[var(--byteform-primary)] border border-[var(--byteform-primary)]",
        hover: "hover:bg-[var(--byteform-primary-light)]"
    },
    ghost: {
        base: "bg-transparent text-[var(--byteform-text)]",
        hover: "hover:bg-[var(--byteform-background-hover)]"
    }
};

export const getVariant = (
    variant: ButtonVariant = "default",
    disabled: boolean = false
) => {
    const v = variants[variant] || variants.default;

    return disabled ? v.base : `${v.base} ${v.hover}`;
};

const animations = {
    default: "active:translate-y-0.5",
    bump: "active:scale-105 active:translate-y-0.5",
    fade: "active:opacity-80"
};

export const getAnimation = (
    animation: ButtonAnimation = "default",
    disabled: boolean = false
) => {
    if (disabled) return "";
    if (animation === "none") return "";

    return animations[animation] || animations.default;
};

export const getDisabled = (disabled: boolean = false) => {
    if (disabled) return "opacity-60 cursor-not-allowed";
};

const alignments = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end"
};

export const getAlign = (align: ButtonAlign = "center") => {
    return alignments[align] || alignments.center;
};
