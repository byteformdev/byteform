import { useCallback, useState } from "react";
import { UseCounterHandlers, UseCounterOptions } from "./types";

export function useCounter(
    initialValue: number = 0,
    options?: UseCounterOptions
): [number, UseCounterHandlers] {
    const { min, max, step = 1 } = options || {};
    const [count, setCount] = useState(initialValue);

    const increment = useCallback(() => {
        setCount((current) => {
            const newValue = current + step;
            if (max !== undefined && newValue > max) {
                return max;
            }
            return newValue;
        });
    }, [step, max]);

    const decrement = useCallback(() => {
        setCount((current) => {
            const newValue = current - step;
            if (min !== undefined && newValue < min) {
                return min;
            }
            return newValue;
        });
    }, [step, min]);

    const set = useCallback(
        (value: number) => {
            setCount((current) => {
                let newValue = value;
                if (min !== undefined && newValue < min) {
                    newValue = min;
                }
                if (max !== undefined && newValue > max) {
                    newValue = max;
                }
                return newValue;
            });
        },
        [min, max]
    );

    const reset = useCallback(() => {
        setCount(initialValue);
    }, [initialValue]);

    return [count, { increment, decrement, set, reset }];
}
