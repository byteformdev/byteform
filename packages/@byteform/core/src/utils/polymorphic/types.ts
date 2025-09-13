import {
    ComponentPropsWithoutRef,
    ComponentPropsWithRef,
    ElementType,
    PropsWithChildren,
    ReactElement
} from "react";

/**
 * Base props for polymorphic components
 */
export type PolymorphicAsProp<C extends ElementType> = {
    as?: C;
};

/**
 * Extract the ref type for a given component
 */
export type PolymorphicRef<C extends ElementType> =
    ComponentPropsWithRef<C>["ref"];

/**
 * Props to omit from the component when using polymorphic behavior
 * We omit 'as' and any conflicting props from the component's own props
 */
type PropsToOmit<C extends ElementType, P> = keyof (PolymorphicAsProp<C> & P);

/**
 * Polymorphic component props without ref
 */
export type PolymorphicComponentProps<
    C extends ElementType,
    Props = {}
> = PropsWithChildren<Props & PolymorphicAsProp<C>> &
    Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

/**
 * Polymorphic component props with ref
 */
export type PolymorphicComponentPropsWithRef<
    C extends ElementType,
    Props = {}
> = PolymorphicComponentProps<C, Props> & {
    ref?: PolymorphicRef<C>;
};

/**
 * Type for the polymorphic component function
 */
export type PolymorphicComponent<
    DefaultElement extends ElementType,
    Props = {}
> = {
    <C extends ElementType = DefaultElement>(
        props: PolymorphicComponentPropsWithRef<C, Props>
    ): ReactElement | null;
    displayName?: string;
};

/**
 * Helper type for creating polymorphic forwardRef components
 */
export type PolymorphicForwardRefExoticComponent<
    DefaultElement extends ElementType,
    Props = {}
> = {
    <C extends ElementType = DefaultElement>(
        props: PolymorphicComponentPropsWithRef<C, Props>
    ): ReactElement | null;
    displayName?: string;
};
