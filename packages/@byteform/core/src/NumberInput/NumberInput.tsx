import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { Input } from "../Input/Input";
import { NumberInputProps } from "./types";
import { useTheme } from "../_theme";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

export const NumberInput = ({
  min,
  max,
  step = 1,
  precision = 0,
  value,
  defaultValue = 0,
  hideControls,
  controlsPosition = "right",
  onChange,
  disabled,
  classNames,
  allowDecimal = false,
  allowNegative = true,
  decimalScale,
  decimalSeparator = ".",
  thousandSeparator = ",",
  prefix,
  suffix,
  allowKeyboard = true,
  allowScrollWheel = true,
  ...props
}: NumberInputProps) => {
  const { theme, cx } = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);

  const effectiveStep = useMemo(() => {
    if (precision > 0) {
      const precisionStep = Math.pow(10, -precision);
      return Math.min(step, precisionStep);
    }
    return step;
  }, [step, precision]);

  const [internalValue, setInternalValue] = useState<number>(
    value !== undefined ? value : defaultValue
  );
  const currentValue = value !== undefined ? value : internalValue;

  const [displayValue, setDisplayValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const clampValue = useCallback(
    (val: number): number => {
      let clampedValue = val;
      if (min !== undefined && clampedValue < min) clampedValue = min;
      if (max !== undefined && clampedValue > max) clampedValue = max;
      return clampedValue;
    },
    [min, max]
  );

  const applyPrecision = useCallback(
    (val: number): number => {
      if (precision !== undefined) {
        const factor = Math.pow(10, precision);
        return Math.round(val * factor) / factor;
      }
      return val;
    },
    [precision]
  );

  const updateValue = useCallback(
    (newValue: number) => {
      const clampedValue = clampValue(newValue);
      const finalValue = applyPrecision(clampedValue);

      if (value === undefined) {
        setInternalValue(finalValue);
      }
      onChange?.(finalValue);
    },
    [value, clampValue, applyPrecision, onChange]
  );

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const valueString = e.target.value;
      setIsTyping(true);
      setDisplayValue(valueString);

      if (valueString === "") {
        updateValue(0);
        return;
      }

      if (allowNegative && valueString === "-") {
        updateValue(0);
        return;
      }

      const newValue = Number(valueString);
      if (!isNaN(newValue)) {
        updateValue(newValue);
      }
    },
    [allowNegative, updateValue]
  );

  const handleBlur = useCallback(
    (
      event: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setIsTyping(false);
      setDisplayValue("");
      props.onBlur?.(event);
    },
    [props.onBlur]
  );

  const handleKeyDown = useCallback(
    (
      event: React.KeyboardEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      if (allowKeyboard && !disabled) {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          const newValue = currentValue + effectiveStep;
          if (!allowNegative && newValue < 0) return;
          updateValue(newValue);
          return;
        }

        if (event.key === "ArrowDown") {
          event.preventDefault();
          const newValue = currentValue - effectiveStep;
          if (!allowNegative && newValue < 0) return;
          updateValue(newValue);
          return;
        }
      }

      if (event.key === "Enter") {
        setIsTyping(false);
        setDisplayValue("");
        event.currentTarget.blur();
      }

      props.onKeyDown?.(event);
    },
    [
      allowKeyboard,
      disabled,
      currentValue,
      effectiveStep,
      allowNegative,
      updateValue,
      props.onKeyDown,
    ]
  );

  const increment = useCallback(() => {
    const newValue = currentValue + effectiveStep;
    if (!allowNegative && newValue < 0) return;
    updateValue(newValue);
  }, [currentValue, effectiveStep, allowNegative, updateValue]);

  const decrement = useCallback(() => {
    const newValue = currentValue - effectiveStep;
    if (!allowNegative && newValue < 0) return;
    updateValue(newValue);
  }, [currentValue, effectiveStep, allowNegative, updateValue]);

  const handleIncrementClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) return;
      event.preventDefault();
      increment();
    },
    [disabled, increment]
  );

  const handleDecrementClick = useCallback(
    (event: React.MouseEvent) => {
      if (disabled) return;
      event.preventDefault();
      decrement();
    },
    [disabled, decrement]
  );

  const handleWheel = useCallback(
    (
      event: React.WheelEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      if (
        !allowScrollWheel ||
        document.activeElement !== inputRef.current ||
        disabled
      ) {
        return;
      }

      event.preventDefault();

      const delta = -Math.sign(event.deltaY);

      if (delta > 0) {
        increment();
      } else if (delta < 0) {
        decrement();
      }
    },
    [allowScrollWheel, disabled, increment, decrement]
  );

  useEffect(() => {
    if (value !== undefined && !isTyping) {
      setDisplayValue("");
    }
  }, [value, isTyping]);

  const isIncrementDisabled =
    disabled || (max !== undefined && currentValue >= max);
  const isDecrementDisabled =
    disabled ||
    (min !== undefined && currentValue <= min) ||
    (!allowNegative && currentValue - effectiveStep < 0);

  const controlButtons = () => (
    <div
      className={cx(
        "inline-flex flex-col max-h-full h-full",
        controlsPosition === "right" && "border-l",
        controlsPosition === "left" && "border-r",
        theme === "light"
          ? "border-[var(--byteform-light-border)]"
          : "border-[var(--byteform-dark-border)]",
        classNames?.controlButtons
      )}
    >
      <button
        type="button"
        className={cx(
          "w-6 h-full flex-1 flex items-center justify-center",
          theme === "light"
            ? "text-[var(--byteform-light-text)]"
            : "text-[var(--byteform-dark-text)]",
          isIncrementDisabled
            ? "opacity-60 cursor-not-allowed"
            : theme === "light"
            ? "hover:bg-[var(--byteform-light-background-hover)]"
            : "hover:bg-[var(--byteform-dark-background-hover)]",
          classNames?.incrementButton
        )}
        onClick={handleIncrementClick}
        disabled={isIncrementDisabled}
      >
        <IconChevronUp size={16} />
      </button>
      <button
        type="button"
        onClick={handleDecrementClick}
        disabled={isDecrementDisabled}
        className={cx(
          "w-6 h-full flex-1 flex items-center justify-center",
          theme === "light"
            ? "text-[var(--byteform-light-text)]"
            : "text-[var(--byteform-dark-text)]",
          isDecrementDisabled
            ? "opacity-60 cursor-not-allowed"
            : theme === "light"
            ? "hover:bg-[var(--byteform-light-background-hover)]"
            : "hover:bg-[var(--byteform-dark-background-hover)]",
          classNames?.decrementButton
        )}
      >
        <IconChevronDown size={16} />
      </button>
    </div>
  );

  return (
    <Input
      inputRef={inputRef}
      type="number"
      inputMode={allowDecimal ? "decimal" : "numeric"}
      step={effectiveStep}
      min={min}
      max={max}
      value={isTyping && displayValue !== "" ? displayValue : currentValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
      rightSection={
        hideControls
          ? null
          : controlsPosition === "right"
          ? controlButtons()
          : null
      }
      leftSection={
        hideControls
          ? null
          : controlsPosition === "left"
          ? controlButtons()
          : null
      }
      disabled={disabled}
      classNames={{
        leftSection:
          controlsPosition === "left"
            ? "p-0 flex items-center justify-center"
            : undefined,
        rightSection:
          controlsPosition === "right"
            ? "p-0 flex items-center justify-center"
            : undefined,
        ...classNames,
      }}
      {...props}
    />
  );
};

NumberInput.displayName = "@byteform/core/NumberInput";
