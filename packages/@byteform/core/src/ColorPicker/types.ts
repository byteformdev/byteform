import { HTMLAttributes } from "react";

export type ColorPickerFormat =
    | "hex"
    | "hexa"
    | "rgb"
    | "rgba"
    | "hsl"
    | "hsla"
    | "hsv"
    | "hsva";
type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ColorPickerClassNames {
    root?: string;
    swatch?: string;
    swatches?: string;
    body?: string;
    sliders?: string;
    saturation?: string;
    hueSlider?: string;
    alphaSlider?: string;
    colorPreview?: string;
}

export interface ColorPickerProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    format?: ColorPickerFormat;
    fullWidth?: boolean;
    withPicker?: boolean;
    hideAlpha?: boolean;
    hidePreview?: boolean;
    swatches?: string[];
    swatchesGridColumns?: GridColumns;
    className?: string;
    classNames?: ColorPickerClassNames;
}

export interface HSVColor {
    h: number;
    s: number;
    v: number;
    a: number;
}

export interface RGBColor {
    r: number;
    g: number;
    b: number;
    a: number;
}
