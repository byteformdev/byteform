import React from "react";

export interface BasePortalProps extends React.ComponentPropsWithoutRef<"div"> {
    target?: HTMLElement | string;
    reuseTargetNode?: boolean;
}

export interface PortalProps extends BasePortalProps {
    children: React.ReactNode;
}

export interface OptionalPortalProps extends PortalProps {
    withinPortal?: boolean;
}
