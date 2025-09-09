import { useRef, useState, useEffect, RefObject } from "react";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    arrow,
    useHover,
    useDismiss,
    useRole,
    useInteractions,
    Placement,
    useClick,
    inline,
    Middleware
} from "@floating-ui/react";
import { TooltipMiddlewares, UseTooltipProps } from "./types";

function getDefaultMiddlewares(middlewares: TooltipMiddlewares | undefined) {
    if (middlewares === undefined) {
        return { shift: true, flip: true };
    }

    const current = { ...middlewares };
    if (middlewares.shift === undefined) {
        current.shift = true;
    }

    if (middlewares.flip === undefined) {
        current.flip = true;
    }

    return current;
}

function getMiddlewares(
    props: UseTooltipProps,
    arrowRef: RefObject<SVGSVGElement | null>
) {
    const options = getDefaultMiddlewares(props.middlewares);
    const middlewares: Middleware[] = [offset(props.offset)];

    if (options.shift) {
        middlewares.push(
            shift(
                typeof options.shift === "boolean"
                    ? { padding: 8 }
                    : { padding: 8, ...options.shift }
            )
        );
    }

    if (options.flip) {
        middlewares.push(
            typeof options.flip === "boolean" ? flip() : flip(options.flip)
        );
    }

    if (options.inline) {
        middlewares.push(
            typeof options.inline === "boolean"
                ? inline()
                : inline(options.inline)
        );
    } else if (props.inline) {
        middlewares.push(inline());
    }

    if (props.withArrow) {
        middlewares.push(arrow({ element: arrowRef }));
    }

    return middlewares;
}

export function useTooltip(props: UseTooltipProps = {}) {
    const [open, setOpen] = useState(props.opened || false);
    const arrowRef = useRef<SVGSVGElement | null>(null);

    const convertPosition = (pos: string): Placement => {
        return pos as Placement;
    };

    const middlewares = getMiddlewares(props, arrowRef);

    const floating = useFloating({
        placement: convertPosition(props.position!),
        open,
        onOpenChange: (opened) => {
            if (opened === undefined) return;
            setOpen(opened);
            if (props.onPositionChange && floating.placement) {
                props.onPositionChange(floating.placement);
            }
        },
        middleware: middlewares,
        whileElementsMounted: autoUpdate
    });

    const { x, y, strategy, refs, middlewareData, context } = floating;

    const hover = useHover(context, {
        enabled:
            (props.trigger === "hover" || props.trigger === "click-hover") &&
            !props.disabled,
        delay: { open: props.openDelay, close: props.closeDelay }
    });

    const click = useClick(context, {
        enabled:
            (props.trigger === "click" || props.trigger === "click-hover") &&
            !props.disabled
    });

    const dismiss = useDismiss(context, {
        enabled: !props.disabled
    });

    const role = useRole(context, { role: "tooltip" });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        click,
        dismiss,
        role
    ]);

    useEffect(() => {
        if (props.opened !== undefined) {
            setOpen(props.opened);
        }
    }, [props.opened]);

    return {
        opened: open,
        setOpened: setOpen,
        floating,
        context,
        arrowRef,
        getReferenceProps,
        getFloatingProps,
        x,
        y,
        strategy,
        refs,
        middlewareData
    };
}
