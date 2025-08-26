import { ReactNode } from "react";

export interface ForProps<T = any> {
    /** The items to iterate over. */
    each: T[];

    /** The children to render for each item. */
    children: (item: T, index: number) => ReactNode;

    /** The fallback to render if the items are empty. */
    fallback?: ReactNode;

    /**
     * Whether to use keyed mode.
     *
     * @default true
     */
    keyed?: boolean;

    /** The key extractor function. */
    keyExtractor?: (item: T, index: number) => string | number;
}
