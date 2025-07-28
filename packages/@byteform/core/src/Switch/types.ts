export type SwitchSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SwitchClassNames {
    wrapper?: string;
    container?: string;
    track?: string;
    activeTrack?: string;
    thumb?: string;
    activeThumb?: string;
    body?: string;
    label?: string;
    description?: string;
    error?: string;
    trackLabel?: string;
}

export interface SwitchProps {
    size?: SwitchSize;

    label?: string;
    description?: string;
    error?: string;
    withAsterisk?: boolean;

    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;

    onChange?: (checked: boolean) => void;

    onLabel?: React.ReactNode;
    offLabel?: React.ReactNode;
    thumbIcon?: React.ReactNode;

    className?: string;
    classNames?: SwitchClassNames;
}
