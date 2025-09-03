import { InputProps, InputClassNames } from "../Input";

export interface NumberInputClassNames extends InputClassNames {
    incrementButton?: string;
    decrementButton?: string;
    controlButtons?: string;
}

export type NumberInputControlsPosition = "left" | "right";

export interface NumberInputProps
    extends Omit<InputProps, "type" | "onChange" | "classNames" | "value"> {
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    value?: number;
    onChange?: (value: number) => void;
    defaultValue?: number;
    hideControls?: boolean;
    controlsPosition?: NumberInputControlsPosition;
    allowDecimal?: boolean;
    allowNegative?: boolean;
    decimalScale?: number;
    decimalSeparator?: string;
    thousandSeparator?: string;
    prefix?: string;
    suffix?: string;
    allowKeyboard?: boolean;
    allowScrollWheel?: boolean;
    classNames?: NumberInputClassNames;
}
