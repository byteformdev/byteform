import { forwardRef } from "react";
import { ProgressProps } from "./types";
import "./Progress.css";
import { ProgressRoot } from "./ProgressRoot";
import { ProgressSection } from "./ProgressSection";
import { ProgressLabel } from "./ProgressLabel";

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
    (
        {
            label,
            labelPosition,
            striped,
            animated,
            color,
            value = 0,
            size = "sm",
            orientation = "horizontal",
            transitionDuration = 200,
            classNames,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <ProgressRoot
                size={size}
                orientation={orientation}
                transitionDuration={transitionDuration}
                classNames={classNames}
                className={className}
                ref={ref}
                {...props}
            >
                <ProgressSection
                    value={value}
                    striped={striped}
                    animated={animated}
                    color={color}
                >
                    {label && (
                        <ProgressLabel position={labelPosition}>
                            {label}
                        </ProgressLabel>
                    )}
                </ProgressSection>
            </ProgressRoot>
        );
    }
);

const ExtendedProgress = Object.assign(Progress, {
    Root: ProgressRoot,
    Section: ProgressSection,
    Label: ProgressLabel
});

ExtendedProgress.displayName = "@byteform/core/Progress";

export { ExtendedProgress as Progress };
