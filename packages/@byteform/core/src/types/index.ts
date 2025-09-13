export type ComponentRadius =
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "full"
    | "default";

export type ComponentShadow =
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "default";

export type ExtendedRadiusValues = {
    [key in ComponentRadius]: string;
};
export type ExtendedShadowValues = {
    [key in ComponentShadow]: string;
};

export interface ComponentStylingProps {
    radius?: ComponentRadius;
    shadow?: ComponentShadow;
}
