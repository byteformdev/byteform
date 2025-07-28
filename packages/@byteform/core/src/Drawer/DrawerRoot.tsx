import { ReactNode } from "react";
import { useDrawerContext } from "./context";
import { cx } from "../_theme";

export const DrawerRoot = ({ children }: { children: ReactNode }) => {
    const { zIndex, classNames, opened, target, withinPortal } =
        useDrawerContext();

    const z = zIndex || 200;

    const isWithinTarget = withinPortal && target;
    const positionClass = isWithinTarget ? "absolute" : "fixed";

    return (
        <>
            <div
                className={cx(
                    `${positionClass} inset-0 flex overflow-hidden`,
                    classNames?.root
                )}
                style={{
                    zIndex: z + 1,
                    pointerEvents: opened ? "auto" : "none"
                }}
                role="dialog"
                aria-modal="true"
            >
                {children}
            </div>
        </>
    );
};

DrawerRoot.displayName = "@byteform/core/Drawer.Root";
