import { InputProps } from "../Input";
import { ColorPickerFormat, ColorPickerProps } from "../ColorPicker/types";
import { ColorSwatchProps } from "../ColorSwatch";
import { TransitionProps } from "../Transition";
import { Placement } from "@floating-ui/react";

export interface ColorInputClassNames {
    colorSwatch?: string;
    colorPicker?: string;
}

export interface ColorInputProps extends Omit<InputProps, "onChange"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    format?: ColorPickerFormat;
    hidePreview?: boolean;
    showEyeDropper?: boolean;
    colorSwatchProps?: ColorSwatchProps;
    colorPickerProps?: ColorPickerProps;
    withPicker?: boolean;
    position?: Placement;
    transitionProps?: TransitionProps;
    classNames?: ColorInputClassNames & InputProps["classNames"];
}
