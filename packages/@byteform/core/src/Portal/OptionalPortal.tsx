import React from "react";
import { Portal } from "./Portal";
import { OptionalPortalProps } from "./types";

export const OptionalPortal = ({
    children,
    withinPortal = true,
    target,
    ...others
}: OptionalPortalProps) => {
    if (withinPortal) {
        return (
            <Portal target={target} {...others}>
                {children}
            </Portal>
        );
    }

    return <>{children}</>;
};

OptionalPortal.displayName = "@byteform/core/Portal.Optional";
