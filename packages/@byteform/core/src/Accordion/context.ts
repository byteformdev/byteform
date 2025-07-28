import { createContext, useContext } from "react";
import { AccordionContextProps, AccordionItemContextProps } from "./types";

export const AccordionContext = createContext<AccordionContextProps | null>(
    null
);

export const AccordionItemContext =
    createContext<AccordionItemContextProps | null>(null);

export const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error(
            "Accordion components must be used within an Accordion component"
        );
    }

    return context;
};

export const useAccordionItem = () => {
    const context = useContext(AccordionItemContext);
    if (!context) {
        throw new Error(
            "AccordionControl and AccordionPanel must be used within an AccordionItem component"
        );
    }
    return context;
};
