import { ReactNode, HTMLAttributes } from "react";

export type ChipSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ChipVariant = "filled" | "outline";

export interface ChipClassNames {
    wrapper?: string;
    body?: string;
    icon?: string;
    label?: string;
    input?: string;
}

export interface ChipProps
    extends Omit<HTMLAttributes<HTMLLabelElement>, "onChange"> {
    size?: ChipSize;
    variant?: ChipVariant;

    children?: ReactNode;
    value?: string;

    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    readOnly?: boolean;

    onChange?: (checked: boolean, value?: string) => void;

    icon?: React.ComponentType<{ size?: number; className?: string }>;

    className?: string;
    classNames?: ChipClassNames;
}

export interface ChipGroupClassNames {
    wrapper?: string;
    container?: string;
    label?: string;
    description?: string;
    error?: string;
}

export interface ChipGroupProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
    children?: ReactNode;

    value?: string | string[];
    defaultValue?: string | string[];
    multiple?: boolean;

    onChange?: (value: string | string[]) => void;

    name?: string;
    orientation?: "horizontal" | "vertical";
    size?: ChipSize;
    variant?: ChipVariant;

    label?: string;
    description?: string;
    error?: string;
    withAsterisk?: boolean;

    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;

    className?: string;
    classNames?: ChipGroupClassNames;
}
