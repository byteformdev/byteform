import { InputHTMLAttributes } from "react";

export type InputComponent = "input" | "textarea" | "select";
export type InputSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
    // Component type
    component?: InputComponent;

    // Appearance
    size?: InputSize;
    fullWidth?: boolean;
    unstyled?: boolean;

    // Content
    label?: string;
    description?: string;
    error?: string;
    success?: string;
    placeholder?: string;
    withAsterisk?: boolean;

    // State
    required?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;

    // Input attributes
    type?: string;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    inputMode?: "text" | "numeric" | "decimal" | "email" | "tel" | "url";
    name?: string;

    // Select/Textarea specific props
    options?: Array<{ value: string; label: string }>;
    rows?: number;
    cols?: number;
    resize?: "none" | "both" | "horizontal" | "vertical";

    // Textarea autosize props
    autoSize?: boolean;
    minRows?: number;
    maxRows?: number;

    // Custom sections
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;

    // Handlers
    onChange?: (value: string) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

    // Refs and styling
    value?: string;
    containerRef?: React.Ref<HTMLDivElement>;
    inputRef?: React.Ref<HTMLInputElement>;
    inputWrapperOrder?: string[];
    debounce?: number;

    // Accessibility
    ariaLabel?: string;
    ariaDescribedBy?: string;
    ariaControls?: string;

    // Styling classnames
    className?: string;
    classNames?: InputClassNames;
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
