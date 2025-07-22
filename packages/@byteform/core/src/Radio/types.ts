import { InputHTMLAttributes } from "react";

export type RadioSize = "xs" | "sm" | "md" | "lg" | "xl";
export type RadioGroupOrientation = "horizontal" | "vertical";

export interface RadioClassNames {
    root?: string;
    input?: string;
    icon?: string;
    inner?: string;
    body?: string;
    labelWrapper?: string;
    label?: string;
    description?: string;
    error?: string;
}

export interface RadioGroupClassNames {
    root?: string;
    container?: string;
    label?: string;
    description?: string;
    error?: string;
}

export interface RadioProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
    size?: RadioSize;

    label?: string;
    description?: string;
    error?: string;
    withAsterisk?: boolean;

    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;

    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    className?: string;
    classNames?: RadioClassNames;
}

export interface RadioGroupProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    children: React.ReactNode;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    orientation?: RadioGroupOrientation;
    size?: RadioSize;

    label?: string;
    description?: string;
    error?: string;
    withAsterisk?: boolean;

    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;

    className?: string;
    classNames?: RadioGroupClassNames;
}
