import { RefObject } from "react";

export interface UseHoverReturnValue<T extends HTMLElement = HTMLElement> {
    hovered: boolean;
    ref: RefObject<T | null>;
}
