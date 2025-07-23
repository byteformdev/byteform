export interface UseCounterHandlers {
    readonly increment: () => void;
    readonly decrement: () => void;
    readonly set: (value: number) => void;
    readonly reset: () => void;
}

export interface UseCounterOptions {
    min?: number;
    max?: number;
    step?: number;
}
