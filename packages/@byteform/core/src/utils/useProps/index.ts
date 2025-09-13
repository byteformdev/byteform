import { useTheme } from "../../theme";

export function useProps<
    T extends Record<string, any>,
    D extends Partial<Record<string, any>> | null = null
>(
    component: string,
    defaultProps: D,
    props: T
): T &
    (D extends null
        ? {}
        : { [K in Extract<keyof T, keyof D>]-?: D[K] | NonNullable<T[K]> }) {
    const { components } = useTheme();
    const componentProps = components?.[component]?.defaultProps as
        | Partial<Record<string, any>>
        | undefined;

    return {
        ...(defaultProps ?? {}),
        ...(componentProps ?? {}),
        ...props
    } as any;
}
