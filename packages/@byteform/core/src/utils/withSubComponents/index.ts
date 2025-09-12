import { ComponentType } from "react";
import { Subcomponents } from "./types";

export function withSubcomponents<
    T extends ComponentType<any>,
    U extends Subcomponents
>(component: T, sub: U): T & U {
    return Object.assign(component, sub);
}
