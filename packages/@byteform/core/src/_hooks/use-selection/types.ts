export interface UseSelectionInput<T> {
    data: T[];
    defaultSelection?: T[];
    resetSelectionOnDataChange?: boolean;
}

export interface UseSelectionHandlers<T> {
    select: (selected: T) => void;
    deselect: (deselected: T) => void;
    toggle: (toggled: T) => void;
    isAllSelected: () => boolean;
    isSomeSelected: () => boolean;
    setSelection: (selection: T[]) => void;
    resetSelection: () => void;
}

export type UseSelectionReturnValue<T> = readonly [
    T[],
    UseSelectionHandlers<T>
];
