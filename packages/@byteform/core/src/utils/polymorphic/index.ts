import { forwardRef, ElementType } from "react";
import {
    PolymorphicComponentPropsWithRef,
    PolymorphicRef,
    PolymorphicForwardRefExoticComponent
} from "./types";

export * from "./types";

/**
 * Utility function to create a polymorphic component with forwardRef
 * This ensures proper TypeScript inference and ref forwarding
 */
export function createPolymorphicComponent<
    DefaultElement extends ElementType,
    Props = {}
>(displayName: string) {
    return <C extends ElementType = DefaultElement>(
        render: (
            props: PolymorphicComponentPropsWithRef<C, Props>,
            ref: PolymorphicRef<C>
        ) => React.ReactElement | null
    ): PolymorphicForwardRefExoticComponent<DefaultElement, Props> => {
        const Component = forwardRef(render as any) as any;
        Component.displayName = displayName;
        return Component;
    };
}
