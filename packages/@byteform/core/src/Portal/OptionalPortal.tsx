import React, { forwardRef } from "react";
import { Portal } from "./Portal";
import { OptionalPortalProps } from "./types";

export const OptionalPortal = forwardRef<HTMLDivElement, OptionalPortalProps>(
    ({ withinPortal = true, children, ...props }, ref) => {
        if (!withinPortal) {
            return <>{children}</>;
        }

        return (
            <Portal ref={ref} {...props}>
                {children}
            </Portal>
        );
    }
);

OptionalPortal.displayName = "@byteform/core/OptionalPortal";
