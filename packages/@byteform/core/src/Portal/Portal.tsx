import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { PortalProps } from "./types";

let portalTargets: Record<string, HTMLDivElement> = {};

export const Portal = ({
  children,
  target,
  reuseTargetNode = false,
}: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const [targetNode, setTargetNode] = useState<HTMLElement | null>(null);
  const targetRef = useRef<HTMLElement | string | null>(target);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  useEffect(() => {
    setMounted(true);

    const resolveTarget = (): HTMLElement | null => {
      const currentTarget = targetRef.current;

      if (!currentTarget) {
        return null;
      }

      if (currentTarget instanceof HTMLElement) {
        if (document.contains(currentTarget)) {
          return currentTarget;
        }
        console.warn("Portal target element is not in the DOM");
        return null;
      }

      if (typeof currentTarget === "string") {
        const element = document.querySelector(currentTarget);
        if (!element) {
          console.warn(`Portal target selector "${currentTarget}" not found`);
          return null;
        }
        return element as HTMLElement;
      }

      return null;
    };

    const attemptResolve = (attempts = 0) => {
      const resolvedTarget = resolveTarget();

      if (resolvedTarget) {
        setTargetNode(resolvedTarget);
        return;
      }

      if (!targetRef.current) {
        if (reuseTargetNode && portalTargets["default"]) {
          setTargetNode(portalTargets["default"]);
        } else {
          const newTarget = document.createElement("div");
          newTarget.setAttribute("data-portal", "true");
          document.body.appendChild(newTarget);

          if (reuseTargetNode) {
            portalTargets["default"] = newTarget;
          }

          setTargetNode(newTarget);
        }
        return;
      }

      if (typeof targetRef.current === "string" && attempts < 10) {
        setTimeout(() => attemptResolve(attempts + 1), 50);
        return;
      }

      console.error(`Portal could not resolve target:`, targetRef.current);
      const fallbackTarget = document.createElement("div");
      fallbackTarget.setAttribute("data-portal-fallback", "true");
      document.body.appendChild(fallbackTarget);
      setTargetNode(fallbackTarget);
    };

    attemptResolve();

    return () => {
      if (!reuseTargetNode && targetNode && !targetRef.current) {
        try {
          if (document.body.contains(targetNode)) {
            document.body.removeChild(targetNode);
          }
        } catch (error) {
          console.warn("Portal cleanup: Target node already removed", error);
        }
      }
    };
  }, [target, reuseTargetNode]);

  if (!mounted || !targetNode) return null;

  return createPortal(children, targetNode);
};

Portal.displayName = "@byteform/core/Portal";
