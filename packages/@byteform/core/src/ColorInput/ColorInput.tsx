import { useEffect, useRef, useState } from "react";
import { useTheme } from "../_theme";
import { ColorInputProps } from "./types";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useClick,
    useDismiss,
    useRole,
    useInteractions
} from "@floating-ui/react";
import { parseColor, formatColor } from "../ColorPicker";
import { ColorSwatch } from "../ColorSwatch";
import { IconPencil } from "@tabler/icons-react";
import { Input } from "../Input";
import { Transition } from "../Transition";
import { ColorPicker } from "../ColorPicker";
import { IconButton } from "../IconButton";

export const ColorInput = ({
    value = "#ffffff",
    defaultValue = "#ffffff",
    onChange,
    format = "hex",
    hidePreview,
    showEyeDropper,
    colorSwatchProps,
    colorPickerProps,
    withPicker = true,
    position = "bottom-start",
    transitionProps,
    classNames,
    ...props
}: ColorInputProps) => {
    const { theme, cx } = useTheme();

    const [currentColor, setCurrentColor] = useState(value || defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);

    const { x, y, strategy, refs, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(5), flip(), shift()],
        placement: position,
        whileElementsMounted: autoUpdate
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "dialog" });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role
    ]);

    useEffect(() => {
        if (value) {
            setCurrentColor(value);
        }
    }, [value]);

    const handleColorChange = (newColor: string) => {
        setCurrentColor(newColor);
        onChange?.(newColor);
    };

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const inputValue = e.target.value;
        try {
            parseColor(inputValue);
            handleColorChange(inputValue);
        } catch (e) {
            setCurrentColor(inputValue);
            onChange?.(inputValue);
        }
    };

    const activateEyedropper = async () => {
        try {
            if ("EyeDropper" in window) {
                // @ts-ignore - EyeDropper API is not yet in TypeScript types
                const eyeDropper = new window.EyeDropper();
                const result = await eyeDropper.open();
                handleColorChange(result.sRGBHex);
            } else {
                alert("Eyedropper not supported in this browser");
            }
        } catch (e) {
            console.error("Error using eyedropper:", e);
        }
    };

    const getDisplayValue = () => {
        try {
            const parsedColor = parseColor(currentColor);
            return formatColor(parsedColor, format);
        } catch (e) {
            return currentColor;
        }
    };

    const getPreviewColor = () => {
        try {
            const parsedColor = parseColor(currentColor);
            return formatColor(parsedColor, "rgba");
        } catch (e) {
            return currentColor;
        }
    };

    const colorSwatch = (
        <ColorSwatch
            color={getPreviewColor()}
            className={cx("rounded-md w-6 h-6", classNames?.colorSwatch)}
            backgroundGrid
            {...colorSwatchProps}
        />
    );

    const eyedropperButton = (
        <IconButton onClick={activateEyedropper} useAnimation={false}>
            <IconPencil size={18} />
        </IconButton>
    );

    return (
        <div className="relative">
            <Input
                value={getDisplayValue()}
                onChange={handleInputChange}
                leftSection={hidePreview ? null : colorSwatch}
                rightSection={showEyeDropper ? eyedropperButton : null}
                inputRef={(node: HTMLInputElement) => {
                    inputRef.current = node as HTMLInputElement;
                }}
                containerRef={(node: HTMLDivElement) => {
                    containerRef.current = node;
                    refs.setReference(node);
                }}
                {...getReferenceProps()}
                {...props}
            />

            {withPicker && (
                <div className="relative z-50">
                    <Transition
                        mounted={isOpen}
                        transition="fade-down"
                        duration={200}
                        {...transitionProps}
                    >
                        <div
                            ref={refs.setFloating}
                            className={cx(
                                "z-50 shadow-lg rounded-md overflow-hidden p-2 flex",
                                theme === "light"
                                    ? "bg-[var(--byteform-light-background)]"
                                    : "bg-[var(--byteform-dark-background)]",

                                classNames?.colorPicker
                            )}
                            style={{
                                position: strategy,
                                top: y ?? 0,
                                left: x ?? 0,
                                minWidth: 200
                            }}
                            {...getFloatingProps()}
                        >
                            <ColorPicker
                                value={currentColor}
                                onChange={handleColorChange}
                                format={format}
                                fullWidth
                                {...colorPickerProps}
                            />
                        </div>
                    </Transition>
                </div>
            )}
        </div>
    );
};

ColorInput.displayName = "@byteform/core/ColorInput";
