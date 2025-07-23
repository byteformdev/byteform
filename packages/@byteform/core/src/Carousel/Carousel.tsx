import {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
    Children,
    isValidElement,
    ReactElement
} from "react";
import { CarouselProps } from "./types";
import { useTheme } from "../_theme";
import { CarouselSlide } from "./CarouselSlide";
import { CarouselIndicators } from "./CarouselIndicators";
import { CarouselControl } from "./CarouselControl";

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
    (
        {
            children,
            orientation = "horizontal",
            height,
            align = "center",
            slideSize = "100%",
            slideGap = "md",
            controlsOffset = "sm",
            controlSize = 32,
            getEmblaApi,
            onSlideChange,
            initialSlide = 0,
            withIndicators = false,
            withControls = true,
            includeGapInSize = true,
            draggable = true,
            dragFree = false,
            loop = false,
            speed = 10,
            className,
            classNames,
            ...props
        },
        ref
    ) => {
        const { theme, cx } = useTheme();
        const [currentSlide, setCurrentSlide] = useState(initialSlide);
        const [canScrollPrev, setCanScrollPrev] = useState(false);
        const [canScrollNext, setCanScrollNext] = useState(false);
        const containerRef = useRef<HTMLDivElement>(null);
        const viewportRef = useRef<HTMLDivElement>(null);
        const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

        const slides = Children.toArray(children).filter(
            (child) => isValidElement(child) && child.type === CarouselSlide
        ) as ReactElement[];

        const totalSlides = slides.length;

        const getGapSize = () => {
            const gaps = {
                xs: "0.5rem",
                sm: "0.75rem",
                md: "1rem",
                lg: "1.5rem",
                xl: "2rem"
            };

            if (typeof slideGap === "string" && slideGap in gaps) {
                return gaps[slideGap as keyof typeof gaps];
            }

            return typeof slideGap === "number" ? `${slideGap}px` : slideGap;
        };

        const getSlideSize = () => {
            if (typeof slideSize === "number") {
                return `${slideSize}px`;
            }
            return slideSize;
        };

        const getGapSizeInPixels = () => {
            const gapStr = getGapSize();
            if (gapStr.endsWith("rem")) {
                return parseFloat(gapStr) * 16;
            }
            if (gapStr.endsWith("px")) {
                return parseFloat(gapStr);
            }
            return 16;
        };

        const getSlideSizeInPixels = () => {
            if (!viewportRef.current) return 0;

            const slideStr = getSlideSize();
            const viewportWidth = viewportRef.current.clientWidth;

            if (slideStr.endsWith("%")) {
                return (parseFloat(slideStr) / 100) * viewportWidth;
            }
            if (slideStr.endsWith("px")) {
                return parseFloat(slideStr);
            }
            return viewportWidth;
        };

        const scrollToSlide = useCallback(
            (index: number) => {
                if (!viewportRef.current || index < 0 || index >= totalSlides)
                    return;

                const slideWidth = getSlideSizeInPixels();
                const gap = getGapSizeInPixels();
                const targetScroll = index * (slideWidth + gap);

                viewportRef.current.scrollTo({
                    left: targetScroll,
                    behavior: "smooth"
                });

                setCurrentSlide(index);
                onSlideChange?.(index);
            },
            [onSlideChange, totalSlides]
        );

        const scrollPrev = useCallback(() => {
            const prevIndex =
                loop && currentSlide === 0
                    ? totalSlides - 1
                    : Math.max(0, currentSlide - 1);
            scrollToSlide(prevIndex);
        }, [currentSlide, totalSlides, loop, scrollToSlide]);

        const scrollNext = useCallback(() => {
            const nextIndex =
                loop && currentSlide === totalSlides - 1
                    ? 0
                    : Math.min(totalSlides - 1, currentSlide + 1);
            scrollToSlide(nextIndex);
        }, [currentSlide, totalSlides, loop, scrollToSlide]);

        const updateScrollButtons = useCallback(() => {
            if (!viewportRef.current) return;

            const { scrollLeft, scrollWidth, clientWidth } =
                viewportRef.current;

            setCanScrollPrev(loop || scrollLeft > 5);
            setCanScrollNext(
                loop || scrollLeft < scrollWidth - clientWidth - 5
            );
        }, [loop]);

        const handleScroll = useCallback(() => {
            if (!viewportRef.current || !draggable) return;

            const { scrollLeft } = viewportRef.current;
            const slideWidth = getSlideSizeInPixels();
            const gap = getGapSizeInPixels();
            const slideIndex = Math.round(scrollLeft / (slideWidth + gap));

            const clampedIndex = Math.max(
                0,
                Math.min(slideIndex, totalSlides - 1)
            );

            if (clampedIndex !== currentSlide) {
                setCurrentSlide(clampedIndex);
                onSlideChange?.(clampedIndex);
            }

            updateScrollButtons();
        }, [
            currentSlide,
            onSlideChange,
            updateScrollButtons,
            draggable,
            totalSlides
        ]);

        const debouncedHandleScroll = useCallback(() => {
            const timeoutId = setTimeout(handleScroll, 50);
            return () => clearTimeout(timeoutId);
        }, [handleScroll]);

        useEffect(() => {
            updateScrollButtons();
        }, [updateScrollButtons, currentSlide]);

        useEffect(() => {
            const viewport = viewportRef.current;
            if (!viewport) return;

            viewport.addEventListener("scroll", handleScroll, {
                passive: true
            });
            return () => viewport.removeEventListener("scroll", handleScroll);
        }, [handleScroll]);

        useEffect(() => {
            const timeoutId = setTimeout(() => {
                scrollToSlide(currentSlide);
            }, 100);

            return () => clearTimeout(timeoutId);
        }, [slideSize, slideGap]);

        useEffect(() => {
            if (
                initialSlide !== currentSlide &&
                initialSlide >= 0 &&
                initialSlide < totalSlides
            ) {
                setCurrentSlide(initialSlide);
                setTimeout(() => scrollToSlide(initialSlide), 0);
            }
        }, [initialSlide, totalSlides]);

        const isVertical = orientation === "vertical";

        return (
            <div
                ref={ref}
                className={cx("relative", classNames?.root, className)}
                style={{ height }}
                {...props}
            >
                <div
                    ref={containerRef}
                    className={cx(
                        "relative overflow-hidden rounded-md",
                        theme === "light"
                            ? "bg-[var(--byteform-light-background)]"
                            : "bg-[var(--byteform-dark-background)]",
                        classNames?.container
                    )}
                    style={{ height: isVertical ? height : undefined }}
                >
                    {withControls && (
                        <div
                            className={cx(
                                "absolute inset-0 flex items-center justify-between pointer-events-none z-10",
                                classNames?.controls
                            )}
                            style={{
                                padding:
                                    typeof controlsOffset === "number"
                                        ? `${controlsOffset}px`
                                        : controlsOffset
                            }}
                        >
                            <CarouselControl
                                direction="prev"
                                onClick={scrollPrev}
                                disabled={!canScrollPrev}
                                size={controlSize}
                                className={cx(
                                    "pointer-events-auto",
                                    classNames?.control
                                )}
                            />
                            <CarouselControl
                                direction="next"
                                onClick={scrollNext}
                                disabled={!canScrollNext}
                                size={controlSize}
                                className={cx(
                                    "pointer-events-auto",
                                    classNames?.control
                                )}
                            />
                        </div>
                    )}

                    <div
                        ref={viewportRef}
                        className={cx(
                            "overflow-x-auto overflow-y-hidden scrollbar-hide",
                            !draggable && "pointer-events-none",
                            classNames?.viewport
                        )}
                        style={{
                            scrollSnapType: dragFree ? "none" : "x mandatory",
                            scrollBehavior: "smooth"
                        }}
                    >
                        <div
                            className={cx(
                                "flex",
                                isVertical ? "flex-col" : "flex-row",
                                classNames?.slide
                            )}
                            style={{
                                gap: getGapSize(),
                                height: isVertical ? "100%" : undefined
                            }}
                        >
                            {slides.map((slide, index) => (
                                <div
                                    key={index}
                                    ref={(el) => {
                                        slideRefs.current[index] = el;
                                    }}
                                    className="flex-none scroll-snap-align-start"
                                    style={{
                                        width: isVertical
                                            ? "100%"
                                            : getSlideSize(),
                                        height: isVertical
                                            ? getSlideSize()
                                            : "100%"
                                    }}
                                >
                                    {slide}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {withIndicators && (
                    <CarouselIndicators
                        total={totalSlides}
                        active={currentSlide}
                        onIndicatorClick={scrollToSlide}
                        className={cx("mt-4", classNames?.indicators)}
                    />
                )}
            </div>
        );
    }
);

const ExtendedCarousel = Object.assign(Carousel, {
    Slide: CarouselSlide,
    Indicators: CarouselIndicators,
    Control: CarouselControl
});

ExtendedCarousel.displayName = "@byteform/core/Carousel";

export { ExtendedCarousel as Carousel };
