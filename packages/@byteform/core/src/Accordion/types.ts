import { ReactNode } from "react";

export type AccordionChevronPosition = "left" | "right";
export type AccordionValue = string | string[] | null;

export interface AccordionClassNames {
    wrapper?: string;
    item?: string;
    control?: string;
    label?: string;
    chevron?: string;
    panel?: string;
}

export interface AccordionProps {
    children: ReactNode;
    multiple?: boolean;
    value?: AccordionValue;
    defaultValue?: AccordionValue;
    onChange?: (value: AccordionValue) => void;
    chevronIcon?: ReactNode;
    chevronPosition?: AccordionChevronPosition;
    disableChevronRotation?: boolean;
    transitionDuration?: number;
    className?: string;
    classNames?: AccordionClassNames;
}

export interface AccordionContextProps
    extends Omit<AccordionProps, "children" | "onChange"> {
    onChange: (itemValue: string) => void;
}

export interface AccordionItemProps {
    children: ReactNode;
    value: string;
    disabled?: boolean;
    className?: string;
}

export interface AccordionItemContextProps {
    value: string;
    isActive: boolean;
    disabled: boolean;
}

export interface AccordionPanelProps {
    children: ReactNode;
    className?: string;
}

export interface AccordionControlProps {
    children: ReactNode;
    onClick?: () => void;
    icon?: ReactNode;
    className?: string;
}
