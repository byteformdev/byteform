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
            size,
            className,
            color,
            ...props
        },
        ref
    ) => {
        return (
            <ProgressRoot size={size} {...props} ref={ref}>
                <ProgressSection
                    value={props.value ?? 0}
                    striped={striped}
                    animated={animated}
                    color={color}
                    className={className}
                >
                    {label && (
                        <ProgressLabel position={labelPosition} size={size}>
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
