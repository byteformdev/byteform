export type SwitchSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SwitchClassNames {
    wrapper?: string;
    container?: string;
    track?: string;
    thumb?: string;
    body?: string;
    label?: string;
    description?: string;
    error?: string;
    trackLabel?: string;
}

export interface SwitchProps {
    /**
     * The size of the switch
     * @default "md"
     */
    size?: SwitchSize;

    label?: string;
    description?: string;
    error?: string;
    withAsterisk?: boolean;
    required?: boolean;

    /**
     * Whether the switch is disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Whether the switch is read only
     * @default false
     */
    readOnly?: boolean;

    checked?: boolean;

    /**
     * The default checked state of the switch
     * @default false
     */
    defaultChecked?: boolean;

    onChange?: (checked: boolean) => void;

    /**
     * The icon to display when the switch is checked
     */
    thumbIcon?: (checked: boolean, size: SwitchSize) => React.ReactNode;

    className?: string;
    classNames?: SwitchClassNames;
}
