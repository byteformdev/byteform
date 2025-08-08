import { forwardRef, Children, cloneElement, isValidElement } from "react";
import { AvatarGroupProps } from "./types";
import { cx } from "../../_theme";
import { Avatar } from "../Avatar";

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
    (
        {
            children,
            size = "md",
            spacing = 12,
            limit,
            total,
            renderSurplus,
            className,
            ...others
        },
        ref
    ) => {
        const all = Children.toArray(children).filter(Boolean);
        const visible = typeof limit === "number" ? all.slice(0, limit) : all;

        const displayed: React.ReactNode[] = visible.map((child, index) => {
            if (!isValidElement(child)) return child;
            const el = child as React.ReactElement<any>;
            const mergedStyle =
                index === 0
                    ? el.props.style
                    : { ...(el.props.style || {}), marginLeft: -spacing };

            return cloneElement(el, {
                size: el.props.size ?? size,
                className: el.props.className,
                style: mergedStyle
            });
        });

        const surplus = Math.max(0, (total ?? all.length) - visible.length);

        if (surplus > 0) {
            const custom = renderSurplus?.(surplus);
            if (custom != null) {
                if (isValidElement(custom)) {
                    const prevStyle = (custom as any).props?.style;
                    const merged =
                        displayed.length > 0
                            ? { ...(prevStyle || {}), marginLeft: -spacing }
                            : prevStyle;
                    displayed.push(
                        cloneElement(custom as any, { style: merged })
                    );
                } else {
                    displayed.push(custom as any);
                }
            } else {
                displayed.push(
                    <Avatar
                        key={`avatar-${surplus}`}
                        size={size}
                        className="font-medium"
                        style={
                            displayed.length > 0
                                ? { marginLeft: -spacing }
                                : undefined
                        }
                    >
                        +{surplus}
                    </Avatar>
                );
            }
        }

        return (
            <div
                ref={ref}
                className={cx("flex items-center", className)}
                {...others}
            >
                {displayed}
            </div>
        );
    }
);

AvatarGroup.displayName = "@byteform/core/Avatar.Group";
