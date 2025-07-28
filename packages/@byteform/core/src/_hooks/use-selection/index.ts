import { useCallback, useEffect, useState } from "react";
import {
    UseSelectionInput,
    UseSelectionHandlers,
    UseSelectionReturnValue
} from "./types";

export function useSelection<T>(
    input: UseSelectionInput<T>
): UseSelectionReturnValue<T> {
    const {
        data,
        defaultSelection = [],
        resetSelectionOnDataChange = false
    } = input;
    const [selection, setSelection] = useState<T[]>(defaultSelection);

    useEffect(() => {
        if (resetSelectionOnDataChange) {
            setSelection([]);
        }
    }, [data, resetSelectionOnDataChange]);

    const select = useCallback((selected: T) => {
        setSelection((prev) => {
            if (!prev.includes(selected)) {
                return [...prev, selected];
            }
            return prev;
        });
    }, []);

    const deselect = useCallback((deselected: T) => {
        setSelection((prev) => prev.filter((item) => item !== deselected));
    }, []);

    const toggle = useCallback((toggled: T) => {
        setSelection((prev) => {
            if (prev.includes(toggled)) {
                return prev.filter((item) => item !== toggled);
            }
            return [...prev, toggled];
        });
    }, []);

    const isAllSelected = useCallback(() => {
        return (
            data.length > 0 && data.every((item) => selection.includes(item))
        );
    }, [data, selection]);

    const isSomeSelected = useCallback(() => {
        return (
            selection.length > 0 &&
            data.some((item) => selection.includes(item))
        );
    }, [data, selection]);

    const setSelectionHandler = useCallback((newSelection: T[]) => {
        setSelection(newSelection);
    }, []);

    const resetSelection = useCallback(() => {
        setSelection([]);
    }, []);

    const handlers: UseSelectionHandlers<T> = {
        select,
        deselect,
        toggle,
        isAllSelected,
        isSomeSelected,
        setSelection: setSelectionHandler,
        resetSelection
    };

    return [selection, handlers] as const;
}
