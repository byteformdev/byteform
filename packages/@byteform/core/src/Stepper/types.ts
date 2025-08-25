import { ReactNode, HTMLAttributes } from "react";

export type StepperSize = "xs" | "sm" | "md" | "lg" | "xl";
export type StepperOrientation = "horizontal" | "vertical";
export type StepStatus = "completed" | "active" | "upcoming";

export interface StepItem {
    label: string;
    description?: string;
    icon?: ReactNode;
    allowStepSelect?: boolean;
}

export interface StepperClassNames {
    wrapper?: string;
    step?: string;
    stepIcon?: string;
    stepContent?: string;
    stepLabel?: string;
    stepDescription?: string;
    connector?: string;
    completedStep?: string;
    activeStep?: string;
    upcomingStep?: string;
}

export interface StepperProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
    /** Array of step items */
    steps: StepItem[];
    /** Current active step index (0-based) */
    active: number;
    /** Step size */
    size?: StepperSize;
    /** Stepper orientation */
    orientation?: StepperOrientation;
    /** Allow clicking on steps to navigate */
    allowStepClick?: boolean;
    /** Callback when a step is clicked */
    onStepClick?: (stepIndex: number) => void;
    /** Show step icons */
    iconPosition?: "left" | "top";
    /** Custom class names for different parts */
    classNames?: StepperClassNames;
    /** Root className */
    className?: string;
    /** Children to render custom content */
    children?: ReactNode;
}
