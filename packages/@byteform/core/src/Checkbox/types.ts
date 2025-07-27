import { InputHTMLAttributes } from "react";

export type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface CheckboxClassNames {
    wrapper?: string;
    container?: string;
    input?: string;
    icon?: string;
    inner?: string;
    body?: string;
    labelWrapper?: string;
    label?: string;
    description?: string;
    error?: string;
}

export interface CheckboxProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
    size?: CheckboxSize;

    label?: string;
    description?: string;
    error?: string;
    indeterminate?: boolean;
    withAsterisk?: boolean;

    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;

    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    icon?: React.FC<{
        indeterminate?: boolean;
        className?: string;
    }>;

    inputRef?: React.Ref<HTMLInputElement>;

    className?: string;
    classNames?: CheckboxClassNames;
}
