import { HTMLAttributes, ReactNode } from "react";

export type CarouselOrientation = "horizontal" | "vertical";
export type CarouselAlign = "start" | "center" | "end";

export interface CarouselClassNames {
    root?: string;
    container?: string;
    viewport?: string;
    slide?: string;
    controls?: string;
    control?: string;
    indicators?: string;
    indicator?: string;
}

export interface CarouselProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    children: ReactNode;
    orientation?: CarouselOrientation;
    height?: number | string;
    align?: CarouselAlign;
    slideSize?: string | number;
    slideGap?: string | number;
    controlsOffset?: string | number;
    controlSize?: number;
    getEmblaApi?: (embla: any) => void;
    onSlideChange?: (index: number) => void;
    initialSlide?: number;
    withIndicators?: boolean;
    withControls?: boolean;
    includeGapInSize?: boolean;
    draggable?: boolean;
    dragFree?: boolean;
    loop?: boolean;
    speed?: number;
    className?: string;
    classNames?: CarouselClassNames;
}

export interface CarouselSlideProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    size?: string | number;
    className?: string;
}

export interface CarouselIndicatorsProps
    extends HTMLAttributes<HTMLDivElement> {
    total: number;
    active: number;
    onIndicatorClick?: (index: number) => void;
    className?: string;
}

export interface CarouselControlProps
    extends HTMLAttributes<HTMLButtonElement> {
    direction: "prev" | "next";
    disabled?: boolean;
    size?: number;
    className?: string;
}
