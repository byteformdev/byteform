import { createContext, useContext } from "react";
import { HoverCardContextType, HoverCardGroupProps } from "./types";

export const HoverCardContext = createContext<HoverCardContextType | null>(
    null
);

export const useHoverCard = () => {
    const context = useContext(HoverCardContext);
    if (!context) {
        throw new Error(
            "HoverCard components must be used within a HoverCard component"
        );
    }
    return context;
};

export const HoverCardGroupContext = createContext<{
    openDelay?: number;
    closeDelay?: number;
} | null>(null);

export const useHoverCardGroup = () => {
    return useContext(HoverCardGroupContext);
};
