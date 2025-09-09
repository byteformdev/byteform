import { useRef, useState, useEffect, forwardRef } from "react";
import { createPortal } from "react-dom";
import { PortalProps } from "./types";

function createPortalNode(props: React.ComponentPropsWithoutRef<"div">) {
    const node = document.createElement("div");
    node.setAttribute("data-portal", "true");
    typeof props.className === "string" &&
        node.classList.add(...props.className.split(" ").filter(Boolean));
    typeof props.style === "object" && Object.assign(node.style, props.style);
    typeof props.id === "string" && node.setAttribute("id", props.id);
    return node;
}

function getTargetNode({
    target,
    reuseTargetNode,
    ...others
}: Omit<PortalProps, "children">): HTMLElement {
    if (target) {
        if (typeof target === "string") {
            return (
                document.querySelector<HTMLElement>(target) ||
                createPortalNode(others)
            );
        }

        return target;
    }

    if (reuseTargetNode) {
        const existingNode = document.querySelector<HTMLElement>(
            "[data-byteform-shared-portal-node]"
        );

        if (existingNode) {
            return existingNode;
        }

        const node = createPortalNode(others);
        node.setAttribute("data-byteform-shared-portal-node", "true");
        document.body.appendChild(node);
        return node;
    }

    return createPortalNode(others);
}

export const Portal = forwardRef<HTMLDivElement, PortalProps>((props, ref) => {
    const { children, target, reuseTargetNode = true, ...others } = props;

    const [mounted, setMounted] = useState(false);
    const nodeRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        setMounted(true);
        nodeRef.current = getTargetNode({ target, reuseTargetNode, ...others });

        if (ref) {
            if (typeof ref === "function") {
                ref(nodeRef.current as HTMLDivElement);
            } else {
                ref.current = nodeRef.current as HTMLDivElement;
            }
        }

        if (!target && !reuseTargetNode && nodeRef.current) {
            document.body.appendChild(nodeRef.current);
        }

        return () => {
            if (!target && !reuseTargetNode && nodeRef.current) {
                try {
                    if (document.body.contains(nodeRef.current)) {
                        document.body.removeChild(nodeRef.current);
                    }
                } catch (error) {}
            }
        };
    }, [target, reuseTargetNode]);

    if (!mounted || !nodeRef.current) {
        return null;
    }

    return createPortal(<>{children}</>, nodeRef.current);
});

Portal.displayName = "@byteform/core/Portal";
