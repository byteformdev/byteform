import { forwardRef } from "react";
import { HoverCardGroupProps } from "./types";
import { HoverCardGroupContext } from "./context";

export const HoverCardGroup = forwardRef<HTMLDivElement, HoverCardGroupProps>(
    ({ children, openDelay = 0, closeDelay = 0, ...others }, ref) => {
        const contextValue = {
            openDelay,
            closeDelay
        };

        return (
            <HoverCardGroupContext.Provider value={contextValue}>
                <div ref={ref} {...others}>
                    {children}
                </div>
            </HoverCardGroupContext.Provider>
        );
    }
);

HoverCardGroup.displayName = "@byteform/core/HoverCard.Group";
