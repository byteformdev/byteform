export interface UseScrollLockOptions {
    restoreScrollPosition?: boolean;
    root?: HTMLElement;
}

export interface UseScrollLockReturnValue {
    readonly isLocked: boolean;
    readonly lock: () => void;
    readonly unlock: () => void;
    readonly toggle: () => void;
}
