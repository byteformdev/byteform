import { forwardRef } from "react";
import { StepperProps, StepperSize, StepStatus } from "./types";
import { useTheme } from "../_theme";
import { IconCheck } from "@tabler/icons-react";

const sizeClasses = {
    xs: {
        icon: "w-4 h-4 text-xs",
        label: "text-xs",
        description: "text-xs",
        connector: "w-8 h-px"
    },
    sm: {
        icon: "w-6 h-6 text-sm",
        label: "text-sm",
        description: "text-xs",
        connector: "w-12 h-px"
    },
    md: {
        icon: "w-8 h-8 text-base",
        label: "text-base",
        description: "text-sm",
        connector: "w-16 h-px"
    },
    lg: {
        icon: "w-10 h-10 text-lg",
        label: "text-lg",
        description: "text-base",
        connector: "w-20 h-px"
    },
    xl: {
        icon: "w-12 h-12 text-xl",
        label: "text-xl",
        description: "text-lg",
        connector: "w-24 h-px"
    }
};

const getStepStatus = (stepIndex: number, activeStep: number): StepStatus => {
    if (stepIndex < activeStep) return "completed";
    if (stepIndex === activeStep) return "active";
    return "upcoming";
};

const getSizeClasses = (size: StepperSize) =>
    sizeClasses[size] || sizeClasses.md;

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
    (
        {
            steps,
            active = 0,
            size = "md",
            orientation = "horizontal",
            allowStepClick = false,
            onStepClick,
            iconPosition = "left",
            className,
            classNames,
            children,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const sizeStyles = getSizeClasses(size);

        const getStepVariant = (status: StepStatus) => {
            const isLight = theme === "light";

            const lightVariants = {
                completed: {
                    icon: "bg-[var(--byteform-success)] text-white border-[var(--byteform-success)]",
                    label: "text-[var(--byteform-light-text)]",
                    description: "text-[var(--byteform-light-section)]",
                    connector: "bg-[var(--byteform-success)]"
                },
                active: {
                    icon: "bg-[var(--byteform-primary)] text-white border-[var(--byteform-primary)]",
                    label: "text-[var(--byteform-primary)] font-semibold",
                    description: "text-[var(--byteform-light-section)]",
                    connector: "bg-[var(--byteform-light-border)]"
                },
                upcoming: {
                    icon: "bg-[var(--byteform-light-background)] text-[var(--byteform-light-section)] border-[var(--byteform-light-border)]",
                    label: "text-[var(--byteform-light-section)]",
                    description: "text-[var(--byteform-light-section)]",
                    connector: "bg-[var(--byteform-light-border)]"
                }
            };

            const darkVariants = {
                completed: {
                    icon: "bg-[var(--byteform-success)] text-white border-[var(--byteform-success)]",
                    label: "text-[var(--byteform-dark-text)]",
                    description: "text-[var(--byteform-dark-section)]",
                    connector: "bg-[var(--byteform-success)]"
                },
                active: {
                    icon: "bg-[var(--byteform-primary)] text-white border-[var(--byteform-primary)]",
                    label: "text-[var(--byteform-primary)] font-semibold",
                    description: "text-[var(--byteform-dark-section)]",
                    connector: "bg-[var(--byteform-dark-border)]"
                },
                upcoming: {
                    icon: "bg-[var(--byteform-dark-background)] text-[var(--byteform-dark-section)] border-[var(--byteform-dark-border)]",
                    label: "text-[var(--byteform-dark-section)]",
                    description: "text-[var(--byteform-dark-section)]",
                    connector: "bg-[var(--byteform-dark-border)]"
                }
            };

            return isLight ? lightVariants[status] : darkVariants[status];
        };

        const handleStepClick = (stepIndex: number) => {
            if (allowStepClick && onStepClick) {
                onStepClick(stepIndex);
            }
        };

        const renderStepIcon = (
            stepIndex: number,
            step: any,
            status: StepStatus
        ) => {
            const variant = getStepVariant(status);
            const isClickable =
                allowStepClick && (stepIndex < active || step.allowStepSelect);

            return (
                <div
                    className={cx(
                        "rounded-full border-2 flex items-center justify-center transition-all duration-200",
                        sizeStyles.icon,
                        variant.icon,
                        isClickable && "cursor-pointer hover:scale-105",
                        classNames?.stepIcon,
                        status === "completed" && classNames?.completedStep,
                        status === "active" && classNames?.activeStep,
                        status === "upcoming" && classNames?.upcomingStep
                    )}
                    onClick={() => isClickable && handleStepClick(stepIndex)}
                >
                    {step.icon || (
                        <span className="font-medium">
                            {status === "completed" ? (
                                <IconCheck size={16} />
                            ) : (
                                stepIndex + 1
                            )}
                        </span>
                    )}
                </div>
            );
        };

        const renderStepContent = (
            stepIndex: number,
            step: any,
            status: StepStatus
        ) => {
            const variant = getStepVariant(status);
            const isClickable =
                allowStepClick && (stepIndex < active || step.allowStepSelect);

            return (
                <div
                    className={cx(
                        "flex-1",
                        orientation === "horizontal" ? "ml-3" : "mt-2",
                        classNames?.stepContent
                    )}
                >
                    <div
                        className={cx(
                            "font-medium transition-colors duration-200",
                            sizeStyles.label,
                            variant.label,
                            isClickable && "cursor-pointer hover:opacity-80",
                            classNames?.stepLabel
                        )}
                        onClick={() =>
                            isClickable && handleStepClick(stepIndex)
                        }
                    >
                        {step.label}
                    </div>
                    {step.description && (
                        <div
                            className={cx(
                                "mt-1 transition-colors duration-200",
                                sizeStyles.description,
                                variant.description,
                                classNames?.stepDescription
                            )}
                        >
                            {step.description}
                        </div>
                    )}
                </div>
            );
        };

        const renderConnector = (stepIndex: number) => {
            if (stepIndex === steps.length - 1) return null;

            const status = getStepStatus(stepIndex, active);
            const variant = getStepVariant(status);

            if (orientation === "vertical") {
                return (
                    <div
                        className={cx(
                            "w-px h-8 mx-auto",
                            variant.connector,
                            classNames?.connector
                        )}
                    />
                );
            }

            return (
                <div
                    className={cx(
                        "flex-1 mx-4",
                        sizeStyles.connector,
                        variant.connector,
                        classNames?.connector
                    )}
                />
            );
        };

        const wrapperClasses = cx(
            "flex",
            orientation === "horizontal"
                ? "items-center"
                : "flex-col space-y-4",
            className,
            classNames?.wrapper
        );

        return (
            <div ref={ref} className={wrapperClasses} {...props}>
                {steps.map((step, index) => {
                    const status = getStepStatus(index, active);

                    return (
                        <div key={index} className="flex items-start flex-1">
                            {orientation === "horizontal" ? (
                                <>
                                    <div className="flex items-center">
                                        {renderStepIcon(index, step, status)}
                                        {renderStepContent(index, step, status)}
                                    </div>
                                    {renderConnector(index)}
                                </>
                            ) : (
                                <div className="w-full">
                                    <div className="flex items-start">
                                        <div className="flex flex-col items-center">
                                            {renderStepIcon(
                                                index,
                                                step,
                                                status
                                            )}
                                            {renderConnector(index)}
                                        </div>
                                        {renderStepContent(index, step, status)}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
                {children}
            </div>
        );
    }
);

Stepper.displayName = "@byteform/core/Stepper";
