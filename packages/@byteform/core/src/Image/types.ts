import { ImgHTMLAttributes } from "react";

export type ImageFit = "contain" | "cover" | "fill" | "scale-down" | "none";
export type ImageRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type ImageSize = "xs" | "sm" | "md" | "lg" | "xl" | "auto";

export interface ImageProps
    extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
    src?: string;
    fallbackSrc?: string;
    placeholder?: React.ReactNode;
    fit?: ImageFit;
    radius?: ImageRadius;
    size?: ImageSize;
    lazy?: boolean;
    withPlaceholder?: boolean;
    aspectRatio?: number;
}
