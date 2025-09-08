import React, { useEffect, useState, useMemo, useCallback } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { InputProps } from "./types";
import { useTheme } from "../_theme";

const inputSizes = {
    xs: "text-xs px-2 py-1 min-h-6",
    sm: "text-sm px-3 py-1.5 min-h-8",
    md: "text-base px-3 py-2 min-h-10",
    lg: "text-lg px-4 py-2.5 min-h-12",
    xl: "text-xl px-5 py-3 min-h-14"
} as const;

export const Input = ({
    component = "input",

    size = "sm",
    fullWidth,
    unstyled = false,

    label,
    description,
    error,
    success,
    placeholder,
    withAsterisk,

    required,
    readOnly,
    disabled,
    autoFocus,

    type = "text",
    minLength,
    maxLength,
    pattern,

    options,
    rows = 3,
    cols,
    resize = "vertical",

    leftSection,
    rightSection,

    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onEnterPress,

    value: controlledValue,
    defaultValue,
    inputRef,
    containerRef,
    inputWrapperOrder = ["label", "description", "input", "error", "success"],
    debounce,

    className,
    classNames,
    ...props
}: InputProps) => {
    const { theme, cx } = useTheme();

    const isControlled = controlledValue !== undefined;

    const normalizeValue = useCallback(
        (value: string | number | undefined): string => {
            if (value === undefined || value === null) return "";
            return String(value);
        },
        []
    );

    const [localValue, setLocalValue] = useState(() => {
        return isControlled ? "" : normalizeValue(defaultValue);
    });

    useEffect(() => {
        if (isControlled) {
            setLocalValue(normalizeValue(controlledValue));
        }
    }, [isControlled, controlledValue, normalizeValue]);

    useEffect(() => {
        if (!debounce || !onChange) return;

        const timeout = setTimeout(() => {
            const valueToUse = isControlled
                ? normalizeValue(controlledValue)
                : localValue;
            const syntheticEvent = {
                target: { value: valueToUse },
                currentTarget: { value: valueToUse }
            } as React.ChangeEvent<HTMLInputElement>;
            (onChange as any)(syntheticEvent);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [
        localValue,
        debounce,
        onChange,
        isControlled,
        controlledValue,
        normalizeValue
    ]);

    const handleChange = useCallback(
        (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
        ) => {
            const newValue = e.target.value;

            if (!isControlled) {
                setLocalValue(newValue);
            }

            if (onChange && !debounce) {
                (onChange as any)(e);
            }
        },
        [isControlled, debounce, onChange]
    );

    const sizeClasses = useMemo(() => {
        return inputSizes[size] || inputSizes.sm;
    }, [size]);

    const themeClasses = useMemo(
        () => ({
            text:
                theme === "light"
                    ? "text-[var(--byteform-light-text)]"
                    : "text-[var(--byteform-dark-text)]",
            placeholder:
                theme === "light"
                    ? "placeholder:text-[var(--byteform-light-placeholder)]"
                    : "placeholder:text-[var(--byteform-dark-placeholder)]",
            background:
                theme === "light"
                    ? "bg-[var(--byteform-light-background)] border border-[var(--byteform-light-border)]"
                    : "bg-[var(--byteform-dark-background)] border border-[var(--byteform-dark-border)]",
            section:
                theme === "light"
                    ? "text-[var(--byteform-light-section)]"
                    : "text-[var(--byteform-dark-section)]",
            hint:
                theme === "light"
                    ? "text-[var(--byteform-light-hint)]"
                    : "text-[var(--byteform-dark-hint)]"
        }),
        [theme]
    );

    const renderSection = useCallback(
        (content: React.ReactNode, side: "left" | "right") => {
            if (!content) return null;

            const sectionClasses = cx(
                "flex items-center justify-center h-full",
                themeClasses.section,
                side === "left" ? "pl-2" : "pr-2",
                side === "left"
                    ? classNames?.leftSection
                    : classNames?.rightSection,
                disabled && "opacity-60 cursor-not-allowed"
            );

            return <div className={sectionClasses}>{content}</div>;
        },
        [
            cx,
            themeClasses.section,
            classNames?.leftSection,
            classNames?.rightSection,
            disabled
        ]
    );

    const renderLabel = useCallback(() => {
        if (!label) return null;

        const labelClasses = cx(
            "ml-1 flex items-center gap-1 text-sm",
            themeClasses.text,
            disabled && "opacity-60 cursor-not-allowed",
            classNames?.label
        );

        return (
            <label className={labelClasses}>
                {label}
                {withAsterisk && (
                    <span
                        className={cx(
                            "text-[var(--byteform-error)] text-xs",
                            classNames?.required
                        )}
                    >
                        *
                    </span>
                )}
            </label>
        );
    }, [
        label,
        cx,
        themeClasses.text,
        disabled,
        classNames?.label,
        withAsterisk,
        classNames?.required
    ]);

    const renderDescription = useCallback(() => {
        if (!description || error || success) return null;

        const descriptionClasses = cx(
            "ml-1 text-xs",
            themeClasses.hint,
            classNames?.description
        );

        return <p className={descriptionClasses}>{description}</p>;
    }, [
        description,
        error,
        success,
        cx,
        themeClasses.hint,
        classNames?.description
    ]);

    const renderError = useCallback(() => {
        if (!error) return null;

        const errorClasses = cx(
            "ml-1 text-xs text-[var(--byteform-error)]",
            classNames?.error
        );

        return <p className={errorClasses}>{error}</p>;
    }, [error, cx, classNames?.error]);

    const renderSuccess = useCallback(() => {
        if (!success || error) return null;

        const successClasses = cx(
            "ml-1 text-xs text-[var(--byteform-success)]",
            classNames?.success
        );

        return <p className={successClasses}>{success}</p>;
    }, [success, error, cx, classNames?.success]);

    const containerClasses = useMemo(
        () =>
            cx(
                "flex items-center overflow-hidden transition-colors rounded-md outline-none",
                !unstyled && [
                    themeClasses.background,
                    error && "border-[var(--byteform-error)]",
                    !readOnly &&
                        "focus-within:border-[var(--byteform-primary)]",
                    !error && success && "border-[var(--byteform-success)]",
                    disabled && "opacity-60 cursor-not-allowed"
                ],
                fullWidth && "w-full",
                classNames?.container
            ),
        [
            cx,
            unstyled,
            themeClasses.background,
            error,
            readOnly,
            success,
            disabled,
            fullWidth,
            classNames?.container
        ]
    );

    let renderFormControl: () => React.ReactElement;

    const baseInputStyles = useMemo(
        () =>
            cx(
                !unstyled && [
                    "w-full border-none bg-transparent outline-none flex items-center justify-center h-full leading-normal",
                    sizeClasses,
                    themeClasses.placeholder
                ],
                disabled && "opacity-60 cursor-not-allowed"
            ),
        [cx, unstyled, sizeClasses, themeClasses.placeholder, disabled]
    );

    const currentValue = useMemo(() => {
        return isControlled ? normalizeValue(controlledValue) : localValue;
    }, [isControlled, controlledValue, localValue, normalizeValue]);

    const handleKeyDown = useCallback(
        (
            e: React.KeyboardEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
        ) => {
            onKeyDown?.(e as any);
            if (onEnterPress && e.key === "Enter") {
                if (component === "textarea" && !e.shiftKey) {
                    e.preventDefault();
                }
                if (component !== "textarea" || !e.shiftKey) {
                    onEnterPress(e as any);
                }
            }
        },
        [onKeyDown, onEnterPress, component]
    );

    const renderComponentByType = useCallback(() => {
        if (typeof component === "object" || typeof component === "function") {
            if (React.isValidElement(component)) {
                return React.cloneElement(
                    component as React.ReactElement,
                    {
                        ...props,
                        value: currentValue,
                        onChange: handleChange,
                        ref: inputRef
                    } as any
                );
            }

            const Component = component as React.ComponentType<any>;
            return (
                <Component
                    value={currentValue}
                    onChange={handleChange}
                    ref={inputRef}
                    {...props}
                />
            );
        }

        const baseElementProps = {
            autoFocus,
            disabled,
            readOnly,
            placeholder,
            required,
            "aria-invalid": !!error,
            "aria-label": (props as any).ariaLabel,
            "aria-describedby": (props as any).ariaDescribedBy,
            "aria-controls": (props as any).ariaControls,
            name: (props as any).name,
            value: currentValue
        };

        switch (component) {
            case "select":
                return (
                    <select
                        {...baseElementProps}
                        ref={inputRef as React.Ref<HTMLSelectElement>}
                        onChange={
                            handleChange as React.ChangeEventHandler<HTMLSelectElement>
                        }
                        onFocus={
                            onFocus as React.FocusEventHandler<HTMLSelectElement>
                        }
                        onBlur={
                            onBlur as React.FocusEventHandler<HTMLSelectElement>
                        }
                        onKeyDown={
                            handleKeyDown as React.KeyboardEventHandler<HTMLSelectElement>
                        }
                        className={cx(
                            baseInputStyles,
                            "appearance-none",
                            themeClasses.background,
                            themeClasses.text,
                            classNames?.input
                        )}
                    >
                        {options?.map(
                            (option: { value: string; label: string }) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            )
                        )}
                    </select>
                );

            case "textarea":
                const isAutoSize = (props as any).autoSize;
                const textareaClasses = cx(
                    baseInputStyles,
                    "byteform-scrollbar",
                    isAutoSize
                        ? "resize-none"
                        : resize === "vertical"
                        ? "resize-y"
                        : resize === "horizontal"
                        ? "resize-x"
                        : resize === "both"
                        ? "resize"
                        : resize === "none"
                        ? "resize-none"
                        : "resize-y",
                    themeClasses.text,
                    classNames?.input
                );

                const textareaProps = {
                    ...baseElementProps,
                    onChange:
                        handleChange as React.ChangeEventHandler<HTMLTextAreaElement>,
                    onFocus:
                        onFocus as React.FocusEventHandler<HTMLTextAreaElement>,
                    onBlur: onBlur as React.FocusEventHandler<HTMLTextAreaElement>,
                    onKeyDown:
                        handleKeyDown as React.KeyboardEventHandler<HTMLTextAreaElement>,
                    className: textareaClasses
                };

                if (isAutoSize) {
                    return (
                        <TextareaAutosize
                            {...textareaProps}
                            ref={inputRef as React.Ref<HTMLTextAreaElement>}
                            minRows={(props as any).minRows || rows}
                            maxRows={(props as any).maxRows}
                        />
                    );
                }

                return (
                    <textarea
                        {...textareaProps}
                        ref={inputRef as React.Ref<HTMLTextAreaElement>}
                        rows={rows}
                        cols={cols}
                    />
                );

            default:
                const inputProps: React.InputHTMLAttributes<HTMLInputElement> =
                    {
                        ...baseElementProps,
                        type,
                        inputMode: (props as any).inputMode,
                        minLength,
                        maxLength,
                        pattern,
                        onChange:
                            handleChange as React.ChangeEventHandler<HTMLInputElement>,
                        onFocus:
                            onFocus as React.FocusEventHandler<HTMLInputElement>,
                        onBlur: onBlur as React.FocusEventHandler<HTMLInputElement>,
                        onKeyDown:
                            handleKeyDown as React.KeyboardEventHandler<HTMLInputElement>,
                        className: cx(
                            baseInputStyles,
                            "[-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                            themeClasses.text,
                            classNames?.input
                        )
                    };

                if (type === "number") {
                    const { min, max, step } = props as any;
                    if (min !== undefined) inputProps.min = min;
                    if (max !== undefined) inputProps.max = max;
                    if (step !== undefined) inputProps.step = step;
                }

                const additionalProps = { ...(props as any) };
                delete additionalProps.ariaLabel;
                delete additionalProps.ariaDescribedBy;
                delete additionalProps.ariaControls;
                delete additionalProps.name;
                delete additionalProps.inputMode;
                delete additionalProps.min;
                delete additionalProps.max;
                delete additionalProps.step;

                return (
                    <input
                        ref={inputRef as React.Ref<HTMLInputElement>}
                        {...inputProps}
                        {...additionalProps}
                    />
                );
        }
    }, [
        component,
        currentValue,
        handleChange,
        inputRef,
        props,
        baseInputStyles,
        themeClasses,
        classNames?.input,
        options,
        resize,
        rows,
        cols,
        type,
        minLength,
        maxLength,
        pattern,
        autoFocus,
        disabled,
        readOnly,
        placeholder,
        required,
        error,
        onFocus,
        onBlur,
        handleKeyDown,
        cx
    ]);

    renderFormControl = useCallback(
        () => (
            <div ref={containerRef} className={containerClasses}>
                {leftSection && renderSection(leftSection, "left")}
                <div className="flex-1 flex items-center">
                    {renderComponentByType()}
                </div>
                {rightSection && renderSection(rightSection, "right")}
            </div>
        ),
        [
            containerRef,
            containerClasses,
            leftSection,
            renderSection,
            rightSection,
            renderComponentByType
        ]
    );

    const renderMap = useMemo(
        () =>
            ({
                label: renderLabel,
                input: renderFormControl,
                description: renderDescription,
                error: renderError,
                success: renderSuccess
            } as const),
        [
            renderLabel,
            renderFormControl,
            renderDescription,
            renderError,
            renderSuccess
        ]
    );

    const wrapperClasses = useMemo(
        () =>
            cx(
                !unstyled && "flex flex-col items-start space-y-0.5",
                !unstyled && themeClasses.text,
                fullWidth && "w-full",
                classNames?.wrapper,
                className
            ),
        [
            cx,
            unstyled,
            themeClasses.text,
            fullWidth,
            classNames?.wrapper,
            className
        ]
    );

    const orderedElements = useMemo(() => {
        return inputWrapperOrder.map((key) => (
            <React.Fragment key={key}>
                {renderMap[key as keyof typeof renderMap]?.()}
            </React.Fragment>
        ));
    }, [inputWrapperOrder, renderMap]);

    return <div className={wrapperClasses}>{orderedElements}</div>;
};
