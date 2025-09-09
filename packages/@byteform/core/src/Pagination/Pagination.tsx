import { forwardRef } from "react";
import { PaginationProps } from "./types";
import { PaginationRoot } from "./PaginationRoot";
import { PaginationControl } from "./PaginationControl";
import { PaginationEdge } from "./PaginationEdge";
import { PaginationPrevNext } from "./PaginationPrevNext";
import { PaginationDots } from "./PaginationDots";
import { PaginationLabel } from "./PaginationLabel";
import { usePaginationContext } from "./context";

const PaginationPages = () => {
    const { getPageNumbers } = usePaginationContext();
    const pageNumbers = getPageNumbers();

    return (
        <>
            {pageNumbers.map((pageNumber, i) =>
                pageNumber === "..." ? (
                    <PaginationDots key={`dots-${i}`} />
                ) : (
                    <PaginationControl
                        key={`page-${pageNumber}`}
                        page={pageNumber as number}
                    />
                )
            )}
        </>
    );
};

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
    (
        {
            total,
            page,
            defaultPage,
            onChange,
            siblings = 1,
            boundaries = 1,
            disabled = false,
            size = "md",
            variant = "filled",
            withControls = true,
            withEdges,
            withPages = true,
            label,
            ...props
        },
        ref
    ) => {
        return (
            <PaginationRoot
                ref={ref}
                total={total}
                page={page}
                defaultPage={defaultPage}
                onChange={onChange}
                siblings={siblings}
                boundaries={boundaries}
                disabled={disabled}
                size={size}
                variant={variant}
                {...props}
            >
                {withEdges && <PaginationEdge type="first" />}
                {withControls && <PaginationPrevNext type="previous" />}
                {withPages ? (
                    <PaginationPages />
                ) : (
                    <PaginationLabel>{label}</PaginationLabel>
                )}
                {withControls && <PaginationPrevNext type="next" />}
                {withEdges && <PaginationEdge type="last" />}
            </PaginationRoot>
        );
    }
);

const ExtendedPagination = Object.assign(Pagination, {
    Root: PaginationRoot,
    Control: PaginationControl,
    Edge: PaginationEdge,
    PrevNext: PaginationPrevNext,
    Dots: PaginationDots,
    Label: PaginationLabel
});

ExtendedPagination.displayName = "@byteform/core/Pagination";

export { ExtendedPagination as Pagination };
