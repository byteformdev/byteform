import {
    ComponentType,
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
    ReactElement,
    TextareaHTMLAttributes,
    SelectHTMLAttributes
} from "react";

export type InputComponent =
    | "input"
    | "textarea"
    | "select"
    | ComponentType<any>
    | ReactElement;
export type InputSize = "xs" | "sm" | "md" | "lg" | "xl";

interface BaseInputProps {
    component?: InputComponent;

    size?: InputSize;
    fullWidth?: boolean;
    unstyled?: boolean;

    label?: string;
    description?: string;
    error?: string;
    success?: string;
    placeholder?: string;
    withAsterisk?: boolean;

    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;

    type?: HTMLInputTypeAttribute;
    minLength?: number;
    maxLength?: number;
    pattern?: string;

    options?: Array<{ value: string; label: string }>;
    rows?: number;
    cols?: number;
    resize?: "none" | "both" | "horizontal" | "vertical";

    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;

    containerRef?: React.Ref<HTMLDivElement>;
    inputWrapperOrder?: string[];
    debounce?: number;

    ariaLabel?: string;
    ariaDescribedBy?: string;
    ariaControls?: string;

    className?: string;
    classNames?: InputClassNames;
}

interface InputHandlers {
    onChange?: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    onFocus?: (
        e: React.FocusEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    onBlur?: (
        e: React.FocusEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    onKeyDown?: (
        e: React.KeyboardEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    onEnterPress?: (
        e: React.KeyboardEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    onWheel?: (
        e: React.WheelEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
}

export interface InputProps extends BaseInputProps, InputHandlers {
    component?: InputComponent;

    inputMode?:
        | "none"
        | "text"
        | "tel"
        | "url"
        | "email"
        | "numeric"
        | "decimal"
        | "search";

    value?: string | number;

    defaultValue?: string | number;

    inputRef?: React.Ref<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >;

    min?: number;
    max?: number;
    step?: number;

    autoSize?: boolean;
    minRows?: number;
    maxRows?: number;

    accept?: string;
    alt?: string;
    autoComplete?: string;
    capture?: boolean | "user" | "environment";
    checked?: boolean;
    crossOrigin?: string;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    height?: number | string;
    list?: string;
    multiple?: boolean;
    src?: string;
    width?: number | string;
}

export interface InputClassNames {
    wrapper?: string;
    container?: string;
    label?: string;
    description?: string;
    required?: string;
    error?: string;
    success?: string;
    input?: string;
    leftSection?: string;
    rightSection?: string;
}
