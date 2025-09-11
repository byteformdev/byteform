import React, { InputHTMLAttributes } from "react";

export type RadioSize = "xs" | "sm" | "md" | "lg" | "xl";
export type RadioGroupOrientation = "horizontal" | "vertical";

export interface RadioClassNames {
    root?: string;
    wrapper?: string;
    container?: string;
    input?: string;
    radio?: string;
    dot?: string;
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

export interface RadioCardClassNames {
    root?: string;
    wrapper?: string;
    container?: string;
    input?: string;
    card?: string;
    content?: string;
    header?: string;
    body?: string;
    label?: string;
    description?: string;
    error?: string;
    radio?: string;
    dot?: string;
}

export interface RadioProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
    /**
     * The size of the radio button
     * @default "md"
     */
    size?: RadioSize;

    /**
     * Radio button label
     */
    label?: React.ReactNode;

    /**
     * Description text displayed below the label
     */
    description?: React.ReactNode;

    /**
     * Error message to display
     */
    error?: React.ReactNode;

    /**
     * Show asterisk next to label to indicate required field
     * @default false
     */
    withAsterisk?: boolean;

    /**
     * Whether the radio is required
     * @default false
     */
    required?: boolean;

    /**
     * Whether the radio is read-only
     * @default false
     */
    readOnly?: boolean;

    /**
     * Whether the radio is disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Whether the radio should focus on mount
     * @default false
     */
    autoFocus?: boolean;

    /**
     * Whether the radio is checked (controlled)
     */
    checked?: boolean;

    /**
     * Default checked state (uncontrolled)
     * @default false
     */
    defaultChecked?: boolean;

    /**
     * Change handler for the radio
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * Root className
     */
    className?: string;

    /**
     * Classnames for different parts of the radio
     */
    classNames?: RadioClassNames;
}

export interface RadioGroupProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    /**
     * Radio buttons to render
     */
    children: React.ReactNode;

    /**
     * Current selected value (controlled)
     */
    value?: string;

    /**
     * Default selected value (uncontrolled)
     */
    defaultValue?: string;

    /**
     * Called when value changes
     */
    onChange?: (value: string) => void;

    /**
     * Name attribute for all radio buttons
     */
    name?: string;

    /**
     * Layout orientation
     * @default "vertical"
     */
    orientation?: RadioGroupOrientation;

    /**
     * Size of all radio buttons
     * @default "md"
     */
    size?: RadioSize;

    /**
     * Group label
     */
    label?: React.ReactNode;

    /**
     * Description text displayed below the label
     */
    description?: React.ReactNode;

    /**
     * Error message to display
     */
    error?: React.ReactNode;

    /**
     * Show asterisk next to label to indicate required field
     * @default false
     */
    withAsterisk?: boolean;

    /**
     * Whether all radio buttons are required
     * @default false
     */
    required?: boolean;

    /**
     * Whether all radio buttons are disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Whether all radio buttons are read-only
     * @default false
     */
    readOnly?: boolean;

    /**
     * Root className
     */
    className?: string;

    /**
     * Classnames for different parts of the radio group
     */
    classNames?: RadioGroupClassNames;
}

export interface RadioCardProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
    /**
     * The size of the radio card
     * @default "md"
     */
    size?: RadioSize;

    /**
     * Radio card label
     */
    label?: React.ReactNode;

    /**
     * Description text displayed below the label
     */
    description?: React.ReactNode;

    /**
     * Error message to display
     */
    error?: React.ReactNode;

    /**
     * Show asterisk next to label to indicate required field
     * @default false
     */
    withAsterisk?: boolean;

    /**
     * Whether the radio card is required
     * @default false
     */
    required?: boolean;

    /**
     * Whether the radio card is read-only
     * @default false
     */
    readOnly?: boolean;

    /**
     * Whether the radio card is disabled
     * @default false
     */
    disabled?: boolean;

    /**
     * Whether the radio card should focus on mount
     * @default false
     */
    autoFocus?: boolean;

    /**
     * Whether the radio card is checked (controlled)
     */
    checked?: boolean;

    /**
     * Default checked state (uncontrolled)
     * @default false
     */
    defaultChecked?: boolean;

    /**
     * Change handler for the radio card
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * Icon to display in the radio card
     */
    icon?: React.ReactNode;

    /**
     * Whether to show the radio button indicator
     * @default true
     */
    withIndicator?: boolean;

    /**
     * Position of the radio indicator
     * @default "left"
     */
    indicatorPosition?: "left" | "right";

    /**
     * Root className
     */
    className?: string;

    /**
     * Classnames for different parts of the radio card
     */
    classNames?: RadioCardClassNames;
}
