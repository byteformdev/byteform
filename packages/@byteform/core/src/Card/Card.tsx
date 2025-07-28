import { Children, forwardRef, isValidElement } from "react";
import { Paper, PaperProps } from "../Paper";
import { cx } from "../_theme";
import { CardSection } from "./CardSection";

const Card = forwardRef<HTMLDivElement, PaperProps>(
    ({ children, className, ...props }, ref) => {
        return (
            <Paper ref={ref} className={cx("p-0", className)} {...props}>
                {Children.map(children, (child) => {
                    if (!isValidElement(child) || child.type !== CardSection) {
                        return <div className="p-4">{child}</div>;
                    }

                    return child;
                })}
            </Paper>
        );
    }
);

const ExtendedCard = Object.assign(Card, {
    Section: CardSection
});

ExtendedCard.displayName = "@byteform/core/Card";

export { ExtendedCard as Card };
