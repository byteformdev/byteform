import { forwardRef, useId, useEffect, useRef, useState } from "react";
import { HoverCardProps } from "./types";
import { HoverCardContext } from "./context";
import { HoverCardTarget } from "./HoverCardTarget";
import { HoverCardDropdown } from "./HoverCardDropdown";
import { HoverCardGroup } from "./HoverCardGroup";
import { cx } from "../_theme";
import { useHoverCardGroup } from "./context";
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    arrow,
    useInteractions,
    useHover,
    useDismiss,
    useRole,
    safePolygon,
    Placement
} from "@floating-ui/react";

const defaultProps = (props: HoverCardProps) => {
    return {
        opened: props.opened,
        onChange: props.onChange,
        defaultOpened: props.defaultOpened || false,
        position: props.position || "bottom",
        offset: props.offset || 5,
        withArrow: props.withArrow || false,
        arrowSize: props.arrowSize || 7,
        arrowRadius: props.arrowRadius || 0,
        disabled: props.disabled || false,
        openDelay: props.openDelay || 0,
        closeDelay: props.closeDelay || 0,
        zIndex: props.zIndex || 300,
        children: props.children,
        classNames: props.classNames
    };
};

const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>((props, ref) => {
    props = defaultProps(props);

    const groupContext = useHoverCardGroup();

    const openDelay = groupContext?.openDelay ?? props.openDelay!;
    const closeDelay = groupContext?.closeDelay ?? props.closeDelay!;

    const [isOpened, setIsOpened] = useState(props.defaultOpened);
    const arrowRef = useRef<SVGSVGElement | null>(null);

    const targetId = useId();
    const dropdownId = useId();

    const currentOpened = props.opened !== undefined ? props.opened : isOpened;

    const convertPosition = (pos: string): Placement => {
        return pos as Placement;
    };

    const { refs, floatingStyles, context, middlewareData } = useFloating({
        open: currentOpened && !props.disabled,
        onOpenChange: (open) => {
            if (props.disabled) return;

            if (props.opened === undefined) {
                setIsOpened(open);
            }
            props.onChange?.(open);
        },
        placement: convertPosition(props.position!),
        middleware: [
            offset(
                typeof props.offset === "number"
                    ? props.offset
                    : {
                          mainAxis: props.offset?.mainAxis ?? 5,
                          crossAxis: props.offset?.crossAxis ?? 0
                      }
            ),
            flip({
                fallbackPlacements: [
                    "top",
                    "bottom",
                    "left",
                    "right",
                    "top-start",
                    "top-end",
                    "bottom-start",
                    "bottom-end",
                    "left-start",
                    "left-end",
                    "right-start",
                    "right-end"
                ].filter((p) => p !== props.position) as Placement[]
            }),
            shift({ padding: 8 }),
            ...(props.withArrow ? [arrow({ element: arrowRef })] : [])
        ],
        whileElementsMounted: autoUpdate
    });

    const hover = useHover(context, {
        enabled: !props.disabled,
        delay: { open: openDelay, close: closeDelay },
        handleClose: safePolygon()
    });

    const dismiss = useDismiss(context, {
        enabled: !props.disabled
    });

    const role = useRole(context, {
        role: "dialog"
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        dismiss,
        role
    ]);

    const contextValue = {
        opened: Boolean(currentOpened && !props.disabled),
        setOpened: props.onChange
            ? (o: boolean) =>
                  !props.disabled && props.onChange && props.onChange(o)
            : (o: boolean) => !props.disabled && setIsOpened(o),
        refs,
        floatingStyles,
        getReferenceProps,
        getFloatingProps,
        context,
        targetId,
        dropdownId,
        middlewareData,
        position: props.position,
        withArrow: props.withArrow,
        arrowSize: props.arrowSize,
        arrowRadius: props.arrowRadius,
        disabled: props.disabled,
        openDelay,
        closeDelay,
        zIndex: props.zIndex,
        children: props.children,
        classNames: props.classNames,
        arrowRef
    };

    return (
        <HoverCardContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={cx("relative inline-block", props.classNames?.root)}
                data-hovercard-opened={
                    (currentOpened && !props.disabled) || undefined
                }
                data-position={props.position}
                data-disabled={props.disabled || undefined}
            >
                {props.children}
            </div>
        </HoverCardContext.Provider>
    );
});

HoverCard.displayName = "@byteform/core/HoverCard";

const ExtendedHoverCard = Object.assign(HoverCard, {
    Target: HoverCardTarget,
    Dropdown: HoverCardDropdown,
    Group: HoverCardGroup
});

export { ExtendedHoverCard as HoverCard };
