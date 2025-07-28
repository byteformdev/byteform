export interface UseDisclosureHandlers {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
}

export interface UseDisclosureCallbacks {
    onOpen?: () => void;
    onClose?: () => void;
}
