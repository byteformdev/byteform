import { forwardRef, useCallback, useMemo, useState } from "react";
import { PaginationProvider } from "./context";
import { PaginationRootProps } from "./types";
import { useTheme } from "../_theme";

const getRange = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const PaginationRoot = forwardRef<HTMLDivElement, PaginationRootProps>(
    (
        {
            children,
            total,
            page,
            defaultPage = 1,
            onChange,
            siblings = 1,
            boundaries = 1,
            disabled = false,
            size = "md",
            variant = "filled",
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { cx } = useTheme();
        const [internalPage, setInternalPage] = useState(defaultPage);

        const currentPage = page ?? internalPage;

        const handlePageChange = useCallback(
            (newPage: number) => {
                if (
                    !disabled &&
                    newPage >= 1 &&
                    newPage <= total &&
                    newPage !== currentPage
                ) {
                    if (onChange) {
                        onChange(newPage);
                    } else {
                        setInternalPage(newPage);
                    }
                }
            },
            [disabled, total, currentPage, onChange]
        );

        const getPageNumbers = useCallback(() => {
            const totalNumbers = siblings * 2 + 3;
            const totalBlocks = totalNumbers + 2;

            if (total <= totalBlocks) {
                return getRange(1, total);
            }

            const leftSiblingIndex = Math.max(
                currentPage - siblings,
                1 + boundaries
            );
            const rightSiblingIndex = Math.min(
                currentPage + siblings,
                total - boundaries
            );

            const shouldShowLeftDots = leftSiblingIndex > boundaries + 1;
            const shouldShowRightDots = rightSiblingIndex < total - boundaries;

            const leftBoundary = getRange(1, boundaries);
            const rightBoundary = getRange(total - boundaries + 1, total);

            if (!shouldShowLeftDots && shouldShowRightDots) {
                const leftItemCount = 3 + 2 * siblings;
                return [...getRange(1, leftItemCount), "...", ...rightBoundary];
            }

            if (shouldShowLeftDots && !shouldShowRightDots) {
                const rightItemCount = 3 + 2 * siblings;
                return [
                    ...leftBoundary,
                    "...",
                    ...getRange(total - rightItemCount + 1, total)
                ];
            }

            if (shouldShowLeftDots && shouldShowRightDots) {
                return [
                    ...leftBoundary,
                    "...",
                    ...getRange(leftSiblingIndex, rightSiblingIndex),
                    "...",
                    ...rightBoundary
                ];
            }

            return getRange(1, total);
        }, [siblings, boundaries, currentPage, total]);

        const contextValue = useMemo(
            () => ({
                total,
                page: currentPage,
                onChange: handlePageChange,
                siblings,
                boundaries,
                disabled,
                size,
                variant,
                classNames,
                getPageNumbers
            }),
            [
                total,
                currentPage,
                handlePageChange,
                siblings,
                boundaries,
                disabled,
                size,
                variant,
                classNames,
                getPageNumbers
            ]
        );

        return (
            <PaginationProvider value={contextValue}>
                <div
                    ref={ref}
                    className={cx(
                        "flex items-center gap-1",
                        classNames?.root,
                        className
                    )}
                    role="navigation"
                    aria-label="Pagination"
                    {...props}
                >
                    {children}
                </div>
            </PaginationProvider>
        );
    }
);

PaginationRoot.displayName = "@byteform/core/Pagination.Root";
