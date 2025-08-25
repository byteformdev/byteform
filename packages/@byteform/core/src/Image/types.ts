import { ImgHTMLAttributes } from "react";

export type ImageFit = "contain" | "cover" | "fill" | "scale-down" | "none";
export type ImageRadius = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "full";
export type ImageSize = "xs" | "sm" | "md" | "lg" | "xl" | "auto";

export interface ImageProps
    extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
    src?: string;
    alt?: string;
    fallbackSrc?: string;
    placeholder?: React.ReactNode;
    fit?: ImageFit;
    radius?: ImageRadius;
    size?: ImageSize;
    width?: number | string;
    height?: number | string;
    lazy?: boolean;
    withPlaceholder?: boolean;
    onLoad?: () => void;
    onError?: () => void;
    className?: string;
    withHover?: boolean;
    withZoom?: boolean;
    aspectRatio?: number;
}
