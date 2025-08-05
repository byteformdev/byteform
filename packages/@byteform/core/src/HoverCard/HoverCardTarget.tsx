import { cloneElement, forwardRef, ReactElement } from "react";
import { HoverCardTargetProps } from "./types";
import { useHoverCard } from "./context";

export const HoverCardTarget = forwardRef<HTMLElement, HoverCardTargetProps>(
    ({ children, refProp = "ref", ...others }, ref) => {
        const ctx = useHoverCard();

        if (!children || typeof children !== "object") {
            throw new Error(
                "HoverCard.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
            );
        }

        const child = children as ReactElement<any>;

        const targetProps = ctx.getReferenceProps({
            ...others,
            ...child.props,
            "aria-expanded": ctx.opened || undefined,
            "aria-haspopup": "dialog",
            "aria-controls": ctx.opened ? ctx.dropdownId : undefined,
            id: ctx.targetId,
            onMouseEnter: (event: React.MouseEvent) => {
                child.props.onMouseEnter?.(event);
            },
            onMouseLeave: (event: React.MouseEvent) => {
                child.props.onMouseLeave?.(event);
            },
            onFocus: (event: React.FocusEvent) => {
                child.props.onFocus?.(event);
            },
            onBlur: (event: React.FocusEvent) => {
                child.props.onBlur?.(event);
            }
        });

        return cloneElement(child, {
            ...targetProps,
            [refProp]: (node: HTMLElement) => {
                ctx.refs.setReference(node);
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    (ref as any).current = node;
                }
                const childRef = (child as any).ref;
                if (typeof childRef === "function") {
                    childRef(node);
                } else if (childRef) {
                    (childRef as any).current = node;
                }
            }
        });
    }
);

HoverCardTarget.displayName = "@byteform/core/HoverCard.Target";
