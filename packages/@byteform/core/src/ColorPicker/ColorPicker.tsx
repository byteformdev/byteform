import { forwardRef, Ref, useEffect, useState } from "react";
import { ColorPickerProps, HSVColor } from "./types";
import { cx } from "../_theme";
import {
    formatColor,
    hsvToRgb,
    parseColor,
    rgbToHex,
    requiresAlpha
} from "./utils";
import { ColorSwatch } from "../ColorSwatch";
import { Saturation } from "./Saturation/index";
import { HueSlider } from "./HueSlider/index";
import { AlphaSlider } from "./AlphaSlider/index";
import { SimpleGrid } from "../SimpleGrid";

const ColorPickerBase = (props: ColorPickerProps, ref: Ref<HTMLDivElement>) => {
    const {
        value,
        defaultValue = "#ffffff",
        onChange,
        format = "hex",
        fullWidth,
        withPicker = true,
        hideAlpha,
        hidePreview,
        swatches,
        swatchesGridColumns = 7,
        className,
        classNames,
        ...rest
    } = props;

    const [color, setColor] = useState<HSVColor>(() => {
        try {
            return parseColor(value || defaultValue);
        } catch (e) {
            return parseColor("#ffffff");
        }
    });

    useEffect(() => {
        if (value) {
            try {
                setColor(parseColor(value));
            } catch (e) {
                console.error("Invalid color value:", value);
            }
        }
    }, [value]);

    const handleChange = (newColor: HSVColor) => {
        setColor(newColor);
        onChange?.(formatColor(newColor, format));
    };

    const handleHueChange = (hue: number) => {
        handleChange({ ...color, h: hue });
    };

    const handleAlphaChange = (alpha: number) => {
        handleChange({ ...color, a: alpha });
    };

    const handleSaturationChange = (newColor: HSVColor) => {
        handleChange(newColor);
    };

    const handleSwatchClick = (swatchColor: string) => {
        try {
            const parsed = parseColor(swatchColor);
            setColor(parsed);
            onChange?.(formatColor(parsed, format));
        } catch (e) {
            console.error("Invalid swatch color:", swatchColor);
        }
    };

    const rgbColor = hsvToRgb(color);
    const hexColor = rgbToHex(rgbColor, false);
    const colorWithAlpha = formatColor(color, "rgba");

    const shouldShowAlpha = requiresAlpha(format) && !hideAlpha;

    const renderSwatch = (swatch: string, index: number) => {
        return (
            <ColorSwatch
                key={`${swatch}-${index}`}
                color={swatch}
                onClick={() => handleSwatchClick(swatch)}
                className={cx(
                    "cursor-pointer rounded-md hover:scale-110 transition-transform",
                    classNames?.swatch
                )}
            />
        );
    };

    return (
        <div
            className={cx(
                "w-56",
                fullWidth && "w-full",
                classNames?.root,
                className
            )}
        >
            <div
                className={cx("flex flex-col gap-2", classNames?.body)}
                {...rest}
            >
                {withPicker && (
                    <>
                        <Saturation
                            value={color}
                            onChange={handleSaturationChange}
                            color={hexColor}
                            className={classNames?.saturation}
                        />

                        <div
                            className={cx(
                                "flex items-center gap-2",
                                classNames?.sliders
                            )}
                        >
                            <div className="flex items-center w-full flex-col gap-2">
                                <HueSlider
                                    value={color.h}
                                    onChange={handleHueChange}
                                    className={cx(
                                        "w-full",
                                        classNames?.hueSlider
                                    )}
                                />

                                {shouldShowAlpha && (
                                    <AlphaSlider
                                        value={color.a}
                                        onChange={handleAlphaChange}
                                        color={hexColor}
                                        className={cx(
                                            "w-full",
                                            classNames?.alphaSlider
                                        )}
                                    />
                                )}
                            </div>

                            {!hidePreview && shouldShowAlpha && (
                                <ColorSwatch
                                    color={colorWithAlpha}
                                    className={cx(
                                        "w-9 h-7",
                                        classNames?.swatch
                                    )}
                                />
                            )}
                        </div>
                    </>
                )}

                {swatches && swatches.length > 0 && (
                    <SimpleGrid cols={swatchesGridColumns} gap="sm">
                        {swatches.map(renderSwatch)}
                    </SimpleGrid>
                )}
            </div>
        </div>
    );
};

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
    (props, ref) => ColorPickerBase(props, ref)
);

ColorPicker.displayName = "@byteform/core/ColorPicker";
