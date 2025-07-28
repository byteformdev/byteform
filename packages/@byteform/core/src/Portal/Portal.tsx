import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { PortalProps } from "./types";

let portalTargets: Record<string, HTMLDivElement> = {};

export const Portal = ({
    children,
    target,
    reuseTargetNode = false
}: PortalProps) => {
    const [mounted, setMounted] = useState(false);
    const [targetNode, setTargetNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setMounted(true);

        let resolvedTarget: HTMLElement | null = null;

        if (target) {
            if (target instanceof HTMLElement) {
                resolvedTarget = target;
            } else if (typeof target === "string") {
                resolvedTarget = document.querySelector(target);
            }
        }

        if (!resolvedTarget) {
            if (reuseTargetNode && portalTargets["default"]) {
                resolvedTarget = portalTargets["default"];
            } else {
                const newTarget = document.createElement("div");
                document.body.appendChild(newTarget);

                if (reuseTargetNode) {
                    portalTargets["default"] = newTarget;
                }

                resolvedTarget = newTarget;
            }
        }

        setTargetNode(resolvedTarget);

        return () => {
            if (
                !reuseTargetNode &&
                resolvedTarget &&
                resolvedTarget !== document.body &&
                !target
            ) {
                try {
                    if (document.body.contains(resolvedTarget)) {
                        document.body.removeChild(resolvedTarget);
                    }
                } catch (error) {
                    console.warn(
                        "Portal cleanup: Target node already removed",
                        error
                    );
                }
            }
        };
    }, [target, reuseTargetNode]);

    if (!mounted || !targetNode) return null;

    return createPortal(children, targetNode);
};

Portal.displayName = "@byteform/core/Portal";
