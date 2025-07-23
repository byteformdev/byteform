import { ReactNode } from "react";
import { useModalContext } from "./context";
import { cx } from "../_theme";

export const ModalRoot = ({ children }: { children: ReactNode }) => {
    const { zIndex, classNames, centered, target, withinPortal } =
        useModalContext();

    const z = zIndex || 200;

    const isWithinTarget = withinPortal && target;
    const positionClass = isWithinTarget ? "absolute" : "fixed";

    return (
        <div
            className={cx(
                `${positionClass} inset-0 flex overflow-y-auto justify-center`,
                centered ? "items-center justify-center" : "h-fit",
                classNames?.root
            )}
            style={{
                zIndex: z + 1
            }}
            role="dialog"
            aria-modal="true"
        >
            {children}
        </div>
    );
};

ModalRoot.displayName = "@byteform/core/Modal.Root";
