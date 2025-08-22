import React, {
    cloneElement,
    isValidElement,
    useEffect,
    useState
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import { InputProps, InputSize } from "./types";
import { useTheme } from "../_theme";

const inputSizes = {
    xs: "text-xs px-2 py-1 min-h-6",
    sm: "text-sm px-3 py-1.5 min-h-8",
    md: "text-base px-3 py-2 min-h-10",
    lg: "text-lg px-4 py-2.5 min-h-12",
    xl: "text-xl px-5 py-3 min-h-14"
};

const getSizeClasses = (size: InputSize = "sm") => {
    return inputSizes[size] || inputSizes.sm;
};

export const Input = ({
    // Component type
    component = "input",

    // Appearance
    size = "sm",
    fullWidth,
    unstyled = false,

    // Content
    label,
    description,
    error,
    success,
    placeholder,
    withAsterisk,

    // State
    required,
    readOnly,
    disabled,
    autoFocus,

    // Input attributes
    type = "text",
    minLength,
    maxLength,
    pattern,

    // Select/Textarea specific props
    options,
    rows = 3,
    cols,
    resize = "vertical",

    // Custom sections
    leftSection,
    rightSection,

    // Handlers
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onEnterPress,

    // Refs and styling
    value: controlledValue,
    inputRef,
    containerRef,
    inputWrapperOrder = ["label", "input", "description", "error", "success"],
    debounce,

    // Styling classnames
    className,
    classNames,
    ...props
}: InputProps) => {
    const { theme, cx } = useTheme();

    const [localValue, setLocalValue] = useState(controlledValue ?? "");

    useEffect(() => {
        if (controlledValue !== undefined) {
            setLocalValue(controlledValue);
        }
    }, [controlledValue]);

    useEffect(() => {
        if (!debounce || !onChange) return;

        const timeout = setTimeout(() => {
            const syntheticEvent = {
                target: { value: localValue },
                currentTarget: { value: localValue }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [localValue, debounce, onChange]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setLocalValue(e.target.value);
        onChange?.(e);
    };

    const renderSection = (
        content: React.ReactNode,
        side: "left" | "right"
    ) => {
        if (!content) return null;

        const baseClasses = "flex items-center justify-center h-full";
        const colorClasses =
            theme === "light"
                ? "text-[var(--byteform-light-section)]"
                : "text-[var(--byteform-dark-section)]";
        const sideClasses = side === "left" ? "pl-2" : "pr-2";
        const sectionClasses =
            side === "left"
                ? classNames?.leftSection
                : classNames?.rightSection;

        return (
            <div
                className={cx(
                    baseClasses,
                    colorClasses,
                    sideClasses,
                    sectionClasses,
                    disabled && "opacity-60 cursor-not-allowed"
                )}
            >
                {content}
            </div>
        );
    };

    const renderLabel = () =>
        label && (
            <label
                className={cx(
                    "ml-1 flex items-center gap-1 text-sm",
                    theme === "light"
                        ? "text-[var(--byteform-light-text)]"
                        : "text-[var(--byteform-dark-text)]",
                    disabled && "opacity-60 cursor-not-allowed",
                    classNames?.label
                )}
            >
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

    const renderDescription = () =>
        description &&
        !error &&
        !success && (
            <p
                className={cx(
                    "ml-1 text-xs",
                    theme === "light"
                        ? "text-[var(--byteform-light-hint)]"
                        : "text-[var(--byteform-dark-hint)]",
                    classNames?.description
                )}
            >
                {description}
            </p>
        );

    const renderError = () =>
        error && (
            <p
                className={cx(
                    "ml-1 text-xs text-[var(--byteform-error)]",
                    classNames?.error
                )}
            >
                {error}
            </p>
        );

    const renderSuccess = () =>
        success &&
        !error && (
            <p
                className={cx(
                    "ml-1 text-xs text-[var(--byteform-success)]",
                    classNames?.success
                )}
            >
                {success}
            </p>
        );

    const renderFormControl = () => (
        <div
            ref={containerRef}
            className={cx(
                "flex items-center overflow-hidden transition-colors rounded-md outline-none",
                !unstyled && [
                    theme === "light"
                        ? "bg-[var(--byteform-light-background)] border border-[var(--byteform-light-border)]"
                        : "bg-[var(--byteform-dark-background)] border border-[var(--byteform-dark-border)]",
                    error && "border-[var(--byteform-error)]",
                    !readOnly &&
                        "focus-within:border-[var(--byteform-primary)]",
                    !error && success && "border-[var(--byteform-success)]",
                    disabled && "opacity-60 cursor-not-allowed"
                ],
                fullWidth && "w-full",
                classNames?.container
            )}
        >
            {leftSection && renderSection(leftSection, "left")}

            <div className="flex-1 flex items-center">
                {renderComponentByType()}
            </div>

            {rightSection && renderSection(rightSection, "right")}
        </div>
    );

    const renderComponentByType = () => {
        if (typeof component === "object" || typeof component === "function") {
            if (React.isValidElement(component)) {
                return React.cloneElement(
                    component as React.ReactElement,
                    {
                        ...props,
                        value:
                            controlledValue !== undefined
                                ? controlledValue
                                : localValue,
                        onChange: handleChange,
                        ref: inputRef
                    } as any
                );
            }

            const Component = component as React.ComponentType<any>;
            return (
                <Component
                    value={
                        controlledValue !== undefined
                            ? controlledValue
                            : localValue
                    }
                    onChange={handleChange}
                    ref={inputRef}
                    {...props}
                />
            );
        }

        const baseStyles = cx(
            !unstyled &&
                "w-full border-none bg-transparent outline-none flex items-center justify-center h-full leading-normal",
            !unstyled && getSizeClasses(size),
            !unstyled && theme === "light"
                ? "placeholder:text-[var(--byteform-light-placeholder)]"
                : "placeholder:text-[var(--byteform-dark-placeholder)]",
            disabled && "opacity-60 cursor-not-allowed"
        );

        switch (component) {
            case "select":
                return (
                    <select
                        ref={inputRef as React.Ref<HTMLSelectElement>}
                        autoFocus={autoFocus}
                        disabled={disabled}
                        aria-invalid={!!error}
                        aria-label={props.ariaLabel}
                        aria-describedby={props.ariaDescribedBy}
                        aria-controls={props.ariaControls}
                        name={props.name}
                        value={
                            controlledValue !== undefined
                                ? controlledValue
                                : localValue
                        }
                        onChange={handleChange as any}
                        onFocus={onFocus as any}
                        onBlur={onBlur as any}
                        onKeyDown={(e) => {
                            onKeyDown?.(e as any);
                            if (onEnterPress && e.key === "Enter") {
                                onEnterPress(e as any);
                            }
                        }}
                        className={cx(
                            baseStyles,
                            "appearance-none",
                            theme === "light"
                                ? "bg-[var(--byteform-light-background)] text-[var(--byteform-light-text)]"
                                : "bg-[var(--byteform-dark-background)] text-[var(--byteform-dark-text)]",
                            classNames?.input
                        )}
                        required={required}
                    >
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case "textarea":
                const isAutoSize = (props as any).autoSize;

                if (isAutoSize) {
                    return (
                        <TextareaAutosize
                            ref={inputRef as React.Ref<HTMLTextAreaElement>}
                            autoFocus={autoFocus}
                            disabled={disabled}
                            readOnly={readOnly}
                            placeholder={placeholder}
                            aria-invalid={!!error}
                            aria-label={props.ariaLabel}
                            aria-describedby={props.ariaDescribedBy}
                            aria-controls={props.ariaControls}
                            name={props.name}
                            required={required}
                            value={
                                controlledValue !== undefined
                                    ? controlledValue
                                    : localValue
                            }
                            onChange={handleChange as any}
                            onFocus={onFocus as any}
                            onBlur={onBlur as any}
                            onKeyDown={(
                                e: React.KeyboardEvent<HTMLTextAreaElement>
                            ) => {
                                onKeyDown?.(e as any);
                                if (
                                    onEnterPress &&
                                    e.key === "Enter" &&
                                    !e.shiftKey
                                ) {
                                    e.preventDefault();
                                    onEnterPress(e as any);
                                }
                            }}
                            minRows={(props as any).minRows || rows}
                            maxRows={(props as any).maxRows}
                            className={cx(
                                baseStyles,
                                "resize-none byteform-scrollbar",
                                theme === "light"
                                    ? "text-[var(--byteform-light-text)]"
                                    : "text-[var(--byteform-dark-text)]",
                                classNames?.input
                            )}
                        />
                    );
                }

                return (
                    <textarea
                        ref={inputRef as React.Ref<HTMLTextAreaElement>}
                        autoFocus={autoFocus}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        aria-invalid={!!error}
                        aria-label={props.ariaLabel}
                        aria-describedby={props.ariaDescribedBy}
                        aria-controls={props.ariaControls}
                        name={props.name}
                        required={required}
                        value={
                            controlledValue !== undefined
                                ? controlledValue
                                : localValue
                        }
                        onChange={handleChange as any}
                        onFocus={onFocus as any}
                        onBlur={onBlur as any}
                        onKeyDown={(e) => {
                            onKeyDown?.(e as any);
                            if (
                                onEnterPress &&
                                e.key === "Enter" &&
                                !e.shiftKey
                            ) {
                                e.preventDefault();
                                onEnterPress(e as any);
                            }
                        }}
                        rows={rows}
                        cols={cols}
                        className={cx(
                            baseStyles,
                            "byteform-scrollbar",
                            resize === "vertical"
                                ? "resize-y"
                                : resize === "horizontal"
                                ? "resize-x"
                                : resize === "both"
                                ? "resize"
                                : resize === "none"
                                ? "resize-none"
                                : "resize-y",
                            theme === "light"
                                ? "text-[var(--byteform-light-text)]"
                                : "text-[var(--byteform-dark-text)]",
                            classNames?.input
                        )}
                    />
                );

            case "input":
            default:
                return (
                    <input
                        type={type}
                        ref={inputRef as React.Ref<HTMLInputElement>}
                        autoFocus={autoFocus}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        aria-invalid={!!error}
                        aria-label={props.ariaLabel}
                        aria-describedby={props.ariaDescribedBy}
                        aria-controls={props.ariaControls}
                        name={props.name}
                        inputMode={props.inputMode}
                        required={required}
                        value={
                            controlledValue !== undefined
                                ? controlledValue
                                : localValue
                        }
                        onChange={handleChange}
                        onFocus={onFocus as any}
                        onBlur={onBlur as any}
                        onKeyDown={(e) => {
                            onKeyDown?.(e as any);
                            if (onEnterPress && e.key === "Enter") {
                                onEnterPress(e as any);
                            }
                        }}
                        minLength={minLength}
                        maxLength={maxLength}
                        pattern={pattern}
                        className={cx(
                            baseStyles,
                            "[-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                            theme === "light"
                                ? "text-[var(--byteform-light-text)]"
                                : "text-[var(--byteform-dark-text)]",
                            classNames?.input
                        )}
                        {...props}
                    />
                );
        }
    };

    const renderMap = {
        label: renderLabel,
        input: renderFormControl,
        description: renderDescription,
        error: renderError,
        success: renderSuccess
    } as const;

    return (
        <div
            className={cx(
                !unstyled && "flex flex-col items-start space-y-0.5",
                !unstyled && theme === "light"
                    ? "text-[var(--byteform-light-text)]"
                    : "text-[var(--byteform-dark-text)]",
                fullWidth && "w-full",
                classNames?.wrapper,
                className
            )}
        >
            {inputWrapperOrder.map((key) => (
                <React.Fragment key={key}>
                    {renderMap[key as keyof typeof renderMap]?.()}
                </React.Fragment>
            ))}
        </div>
    );
};
