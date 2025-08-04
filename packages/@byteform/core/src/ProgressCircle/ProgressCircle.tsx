import { forwardRef } from "react";
import { cx, useTheme } from "../_theme";
import {
    ProgressCircleLabelProps,
    ProgressCircleProps,
    ProgressCircleSectionProps
} from "./types";

export const ProgressCircleRoot = forwardRef<
    HTMLDivElement,
    ProgressCircleProps
>((props, ref) => {
    const {
        size = 64,
        className,
        children,
        thickness = 4,
        classNames,
        ...others
    } = props;

    const { theme, cx } = useTheme();

    const sizeStyle = {
        width: `${size}px`,
        height: `${size}px`
    };

    return (
        <div
            ref={ref}
            className={cx(
                "relative inline-flex items-center justify-center",
                classNames?.wrapper,
                className
            )}
            style={sizeStyle}
            {...others}
        >
            {children}
        </div>
    );
});

ProgressCircleRoot.displayName = "@byteform/core/ProgressCircle.Root";

export const ProgressCircleSection = forwardRef<
    HTMLDivElement,
    ProgressCircleSectionProps
>((props, ref) => {
    const {
        value = 0,
        className,
        children,
        rounded,
        thickness = 6,
        transitionDuration = 300,
        color = "var(--byteform-primary)",
        classNames,
        ...others
    } = props;

    const { theme } = useTheme();
    const normalizedValue = rounded
        ? Math.min(100, Math.max(0, value))
        : Math.min(100, Math.max(0, value));
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset =
        circumference - (normalizedValue / 100) * circumference;

    const backgroundStroke =
        theme === "light"
            ? "var(--byteform-light-background)"
            : "var(--byteform-dark-background)";

    return (
        <div
            ref={ref}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={value}
            className={cx("absolute inset-0", classNames?.section)}
            {...others}
        >
            <svg
                className={cx(
                    "w-full h-full transform -rotate-90",
                    classNames?.svg
                )}
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke={backgroundStroke}
                    strokeWidth={thickness}
                    className={cx(
                        theme === "light"
                            ? "stroke-[var(--byteform-light-background)]"
                            : "stroke-[var(--byteform-dark-background)]",
                        classNames?.track
                    )}
                />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke={color}
                    strokeWidth={thickness}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap={rounded ? "round" : "butt"}
                    className={cx(
                        "transition-all ease-out",
                        classNames?.progress,
                        className
                    )}
                    style={{
                        transitionDuration: `${transitionDuration}ms`
                    }}
                />
            </svg>
            {children}
        </div>
    );
});

ProgressCircleSection.displayName = "@byteform/core/ProgressCircle.Section";

export const ProgressCircleLabel = forwardRef<
    HTMLDivElement,
    ProgressCircleLabelProps
>((props, ref) => {
    const { className, children, position = "center", classNames } = props;
    const { theme, cx } = useTheme();

    return (
        <div
            ref={ref}
            className={cx(
                "text-sm font-medium whitespace-nowrap",
                position === "center" &&
                    "absolute inset-0 flex items-center justify-center",
                position === "bottom" && "mt-2 text-center",
                theme === "light"
                    ? "text-[var(--byteform-light-text)]"
                    : "text-[var(--byteform-dark-text)]",
                classNames?.label,
                className
            )}
        >
            {children}
        </div>
    );
});

ProgressCircleLabel.displayName = "@byteform/core/ProgressCircle.Label";

const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(
    (props, ref) => {
        const {
            label,
            labelPosition = "center",
            rounded,
            thickness = 6,
            transitionDuration = 300,
            color = "var(--byteform-primary)",
            className,
            classNames,
            ...others
        } = props;

        return (
            <div
                className={cx(
                    labelPosition === "bottom"
                        ? "flex flex-col items-center"
                        : "relative",
                    classNames?.container
                )}
            >
                <ProgressCircleRoot
                    {...others}
                    ref={ref}
                    classNames={classNames}
                >
                    <ProgressCircleSection
                        value={props.value ?? 0}
                        rounded={rounded}
                        thickness={thickness}
                        transitionDuration={transitionDuration}
                        color={color}
                        classNames={classNames}
                        className={className}
                    >
                        {label && labelPosition === "center" && (
                            <ProgressCircleLabel
                                position={labelPosition}
                                classNames={classNames}
                            >
                                {label}
                            </ProgressCircleLabel>
                        )}
                    </ProgressCircleSection>
                </ProgressCircleRoot>
                {label && labelPosition === "bottom" && (
                    <ProgressCircleLabel
                        position={labelPosition}
                        classNames={classNames}
                    >
                        {label}
                    </ProgressCircleLabel>
                )}
            </div>
        );
    }
);

ProgressCircle.displayName = "@byteform/core/ProgressCircle";

const ExtendedProgressCircle = Object.assign(ProgressCircle, {
    Root: ProgressCircleRoot,
    Section: ProgressCircleSection,
    Label: ProgressCircleLabel
});

export { ExtendedProgressCircle as ProgressCircle };
