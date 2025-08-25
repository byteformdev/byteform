import { ReactNode } from "react";

export type AccordionChevronPosition = "left" | "right";
export type AccordionValue = string | string[] | null;

export interface AccordionClassNames {
    /** Class name for the root wrapper */
    wrapper?: string;

    /** Class name for the item wrapper */
    item?: string;

    /** Class name for the clickable control */
    control?: string;

    /** Class name for the item label */
    label?: string;

    /** Class name for the chevron icon */
    chevron?: string;

    /** Class name for the content panel */
    panel?: string;
}

export interface AccordionProps {
    /** Content of the accordion */
    children: ReactNode;

    /** Whether multiple items can be open at once
     * @default false
     */
    multiple?: boolean;

    /** Controlled value of the accordion */
    value?: AccordionValue;

    /** Default value for uncontrolled usage */
    defaultValue?: AccordionValue;

    /** Called when the value changes */
    onChange?: (value: AccordionValue) => void;

    /** Custom chevron icon to replace the default */
    chevronIcon?: ReactNode;

    /** Position of the chevron icon
     * @default "right"
     */
    chevronPosition?: AccordionChevronPosition;

    /** Whether to disable the automatic chevron rotation animation */
    disableChevronRotation?: boolean;

    /** Transition duration in milliseconds
     * @default 200
     */
    transitionDuration?: number;

    /** Root wrapper class name */
    className?: string;

    /** Object to apply custom class names to internal parts */
    classNames?: AccordionClassNames;
}

export interface AccordionContextProps
    extends Omit<AccordionProps, "children" | "onChange"> {
    /** Change handler passed to each item */
    onChange: (itemValue: string) => void;
}

export interface AccordionItemProps {
    /** Item content (usually Accordion.Control + Accordion.Panel) */
    children: ReactNode;

    /** Unique value that identifies this item */
    value: string;

    /** If true, item cannot be expanded/collapsed */
    disabled?: boolean;

    /** Custom class name for the item wrapper */
    className?: string;
}

export interface AccordionItemContextProps {
    /** Item’s unique value */
    value: string;

    /** Whether this item is currently open */
    isActive: boolean;

    /** Whether this item is disabled */
    disabled: boolean;
}

export interface AccordionPanelProps {
    /** Content displayed inside the panel when open */
    children: ReactNode;

    /** Custom class name for the panel */
    className?: string;
}

export interface AccordionControlProps {
    /** Control label (usually text or custom node) */
    children: ReactNode;

    /** Optional click handler */
    onClick?: () => void;

    /** Optional custom icon displayed next to label */
    icon?: ReactNode;

    /** Custom class name for the control */
    className?: string;
}
