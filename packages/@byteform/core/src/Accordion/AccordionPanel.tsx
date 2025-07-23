import { forwardRef, useEffect, useRef, useState } from "react";
import { AccordionPanelProps } from "./types";
import { useAccordion, useAccordionItem } from "./context";
import { cx } from "../_theme";

export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
    ({ children, className }, ref) => {
        const accordion = useAccordion();
        const item = useAccordionItem();
        const contentRef = useRef<HTMLDivElement>(null);
        const [height, setHeight] = useState<number | string>(0);

        useEffect(() => {
            if (contentRef.current) {
                if (item.isActive) {
                    const scrollHeight = contentRef.current.scrollHeight;
                    setHeight(scrollHeight);
                } else {
                    setHeight(0);
                }
            }
        }, [item.isActive]);

        return (
            <div
                ref={ref}
                className={cx(
                    "overflow-hidden transition-all ease-in-out",
                    accordion.classNames?.panel,
                    className
                )}
                style={{
                    height: height,
                    transitionDuration: `${accordion.transitionDuration}ms`
                }}
                data-active={item.isActive || undefined}
            >
                <div ref={contentRef} className="py-4 px-2">
                    {children}
                </div>
            </div>
        );
    }
);

AccordionPanel.displayName = "@byteform/core/Accordion.Panel";
