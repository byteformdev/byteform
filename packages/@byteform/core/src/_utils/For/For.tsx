import { Fragment } from "react";
import { ForProps } from "./types";

export function For<T = any>({
    each,
    children,
    fallback,
    keyed = true,
    keyExtractor
}: ForProps<T>) {
    if (!each || each.length === 0) {
        return <>{fallback}</>;
    }

    const getKey = (item: T, index: number): string | number => {
        if (keyExtractor) {
            return keyExtractor(item, index);
        }

        if (typeof item === "object" && item !== null && "id" in item) {
            return (item as any).id;
        }

        if (typeof item === "string" || typeof item === "number") {
            return item;
        }

        return index;
    };

    return (
        <>
            {each.map((item, index) => {
                if (keyed) {
                    return (
                        <Fragment key={getKey(item, index)}>
                            {children(item, index)}
                        </Fragment>
                    );
                }

                return <Fragment key={index}>{children(item, index)}</Fragment>;
            })}
        </>
    );
}

For.displayName = "@byteform/core/For";
