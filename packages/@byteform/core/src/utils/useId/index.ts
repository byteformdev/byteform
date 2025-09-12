import { useId } from "react";

export function useComponentId(propId?: any): string {
    const id = useId();
    return propId ?? id;
}
