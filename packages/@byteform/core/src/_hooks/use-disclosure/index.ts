import { useCallback, useState } from "react";
import { UseDisclosureCallbacks, UseDisclosureHandlers } from "./types";

export function useDisclosure(
    initialState: boolean = false,
    callbacks?: UseDisclosureCallbacks
): [boolean, UseDisclosureHandlers] {
    const [opened, setOpened] = useState(initialState);

    const open = useCallback(() => {
        setOpened((isOpened) => {
            if (!isOpened) {
                callbacks?.onOpen?.();
                return true;
            }
            return isOpened;
        });
    }, [callbacks]);

    const close = useCallback(() => {
        setOpened((isOpened) => {
            if (isOpened) {
                callbacks?.onClose?.();
                return false;
            }
            return isOpened;
        });
    }, [callbacks]);

    const toggle = useCallback(() => {
        opened ? close() : open();
    }, [opened, close, open]);

    return [opened, { open, close, toggle }];
}
