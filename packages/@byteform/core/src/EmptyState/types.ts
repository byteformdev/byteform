import { HTMLAttributes, ReactNode } from "react";

export type EmptyStateSize = "xs" | "sm" | "md" | "lg" | "xl";
export type EmptyStateVariant = "default" | "subtle" | "bordered";

export interface EmptyStateClassNames {
    wrapper?: string;
    icon?: string;
    title?: string;
    description?: string;
    actions?: string;
}

export interface EmptyStateProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Icon or illustration to display */
    icon?: ReactNode;
    /** Title text */
    title?: ReactNode;
    /** Description text */
    description?: ReactNode;
    /** Action buttons or elements */
    actions?: ReactNode;
    /** Size variant */
    size?: EmptyStateSize;
    /** Visual variant */
    variant?: EmptyStateVariant;
    /** Additional class names for different parts */
    classNames?: EmptyStateClassNames;
    /** Root className */
    className?: string;
}
