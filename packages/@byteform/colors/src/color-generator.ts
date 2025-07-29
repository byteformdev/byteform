import chroma from "chroma-js";
import { ColorsTuple } from "./types";

const LIGHT_MAP = [0.97, 0.92, 0.84, 0.74, 0.62, 0.5, 0.42, 0.34, 0.24, 0.16];
const SATURATION_MAP = [0.35, 0.3, 0.2, 0.12, 0.06, 0.0, 0.06, 0.12, 0.2, 0.3];

const getClosestColor = (color: chroma.Color) => {
    const lightnessGoal = color.get("hsl.l");
    return LIGHT_MAP.reduce((prev, curr) =>
        Math.abs(curr - lightnessGoal) < Math.abs(prev - lightnessGoal)
            ? curr
            : prev
    );
};

export const generateColorMap = (color: string) => {
    const colorObject = chroma(color);
    const closestLightness = getClosestColor(colorObject);
    const baseColor = LIGHT_MAP.findIndex((l) => l === closestLightness);

    const colors = LIGHT_MAP.map((l) => colorObject.set("hsl.l", l))
        .map((c) => chroma(c))
        .map((c, i) => {
            const saturationDelta =
                SATURATION_MAP[i] - SATURATION_MAP[baseColor];
            return saturationDelta >= 0
                ? c.saturate(saturationDelta)
                : c.desaturate(saturationDelta * -1);
        });

    colors[baseColor] = chroma(color);

    return {
        baseColor,
        colors
    };
};

export const generateColors = (color: string): ColorsTuple => {
    return generateColorMap(color).colors.map((c) =>
        c.hex()
    ) as unknown as ColorsTuple;
};
