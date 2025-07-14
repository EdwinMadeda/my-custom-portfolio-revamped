import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import DotButton, { useDotNavigation } from "./DotButton";
import useArrowNavigation, { NextButton, PrevButton } from "./ArrowButtons";
import React, { useState } from "react";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/custom-button";

import { Heading6 } from "@/components/typography";
import useAutoplay from "./useAutoplay";
import Thumbnail from "./thumbnail";
import useThumbNavigation from "./useThumbNavigation";
import { FaPlay, FaStop } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface LayoutStable {
  condition: boolean;
  fallback?: React.ReactNode;
}

interface CarouselProps {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  enableAutoplay?: boolean;
  navigationType?: NavigationType;
  slideSize?: "25" | "33.33%" | "50%" | "100%";
  slideHeight?: number;
  slideSpacing?: number;
  renderThumbContent?: (index: number, isSelected: boolean) => React.ReactNode;
  className?: string;
  layoutStable?: LayoutStable;
}

type NavigationType =
  | "arrow"
  | "arrow_plus_dot"
  | "arrow_plus_thumbnail"
  | "dot"
  | "thumbnail";

const sizeMultipliers = new Map<string, number>([
  ["25", 4],
  ["33.33%", 3],
  ["50%", 2],
  ["100%", 1],
]);

export default function MyCustomCarousel({
  slides,
  options,
  plugins = [Autoplay({ playOnInit: false, delay: 10000 })],
  enableAutoplay = false,
  navigationType = "arrow_plus_dot",
  slideSize = "100%",
  slideHeight = 19,
  slideSpacing = 1,
  renderThumbContent,
  className,
  layoutStable = { condition: true },
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const { scrollSnaps, onDotButtonClick } = useDotNavigation(
    emblaApi,
    setSelectedIndex,
  );

  const { onThumbClick } = useThumbNavigation(
    emblaApi,
    emblaThumbsApi,
    setSelectedIndex,
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = useArrowNavigation(emblaApi);

  const {
    isPlaying,
    wasPlaying,
    toggleAutoPlay,
    onNavigation,
    pauseOnMouseEnter,
    resumeOnMouseLeave,
  } = useAutoplay(emblaApi, enableAutoplay);

  const isHorizontal = getOrientationFromAxis(options?.axis) === "horizontal";
  const isVertical = getOrientationFromAxis(options?.axis) === "vertical";
  const showArrowNavigation = [
    "arrow",
    "arrow_plus_dot",
    "arrow_plus_thumbnail",
  ].includes(navigationType);
  const showDotNavigation = ["dot", "arrow_plus_dot"].includes(navigationType);
  const showThumbnailNavigation = [
    "thumbnail",
    "arrow_plus_thumbnail",
  ].includes(navigationType);

  return (
    <div
      className={cn(
        "relative",
        {
          "touch-pan-x": isHorizontal,
          "touch-pan-y": isVertical,
        },
        className,
      )}
      style={
        {
          "--slide-height": `${slideHeight}rem`,
          "--slide-spacing": `${slideSpacing}rem`,
          "--slide-size": slideSize,
        } as React.CSSProperties
      }
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div
          className={clsx(
            "flex touch-pinch-zoom",
            {
              "ml-[calc(var(--slide-spacing)_*__-1)] flex-row": isHorizontal,
              "mt-[calc(var(--slide-spacing)_*__-1)] flex-col": isVertical,
            },
            "@container/carousel-viewport",
          )}
          style={{
            height: "calc(var(--slide-spacing) + var(--slide-height))",
          }}
        >
          {!layoutStable || layoutStable?.condition ? (
            <>
              {slides.map((slide, index) => (
                <div
                  className={clsx(
                    "flex-[0_0_var(--slide-size)] [transform:translate3d(0,0,0)] transform",
                    {
                      "min-w-0 pl-[var(--slide-spacing)]": isHorizontal,
                      "min-h-0 pt-[var(--slide-spacing)]": isVertical,
                    },
                  )}
                  key={index}
                >
                  <div
                    className={clsx(
                      "flex items-start justify-start rounded-lg select-none",
                      {
                        "h-[var(--slide-height)]": isHorizontal,
                        "h-full": isVertical,
                      },
                    )}
                    onMouseEnter={pauseOnMouseEnter}
                    onMouseLeave={resumeOnMouseLeave}
                  >
                    {slide}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>{layoutStable?.fallback && layoutStable.fallback}</>
          )}
        </div>
      </div>

      <div
        className={clsx(
          "relative mt-[1.8rem]",
          showArrowNavigation
            ? "grid grid-cols-[auto_1fr] items-center justify-between gap-[1.2rem]"
            : "flex flex-col-reverse gap-2 md:flex-row md:justify-center",
        )}
      >
        <div
          className={clsx({
            "grid grid-cols-[1fr_1fr_auto] items-center gap-[0.6rem]":
              showArrowNavigation,
          })}
        >
          {showArrowNavigation && (
            <>
              <PrevButton
                onClick={() => onNavigation(onPrevButtonClick)}
                disabled={prevBtnDisabled}
                orientation={getOrientationFromAxis(options?.axis)}
              />
              <NextButton
                onClick={() => onNavigation(onNextButtonClick)}
                disabled={nextBtnDisabled}
                orientation={getOrientationFromAxis(options?.axis)}
              />
            </>
          )}

          {enableAutoplay && (
            <Button
              variant="link"
              onClick={toggleAutoPlay}
              aria-label={
                isPlaying
                  ? "Stop carousel"
                  : wasPlaying
                    ? "Continue carousel"
                    : "Play carousel"
              }
            >
              {isPlaying ? (
                <FaStop className="size-3" />
              ) : (
                <FaPlay className="size-3" />
              )}

              <Heading6 className="w-[5rem] text-start">
                {isPlaying ? "Stop" : wasPlaying ? "Continue" : "Autoplay"}
              </Heading6>
            </Button>
          )}
        </div>

        {showThumbnailNavigation && (
          <div
            style={
              {
                "--thumbs-slide-spacing": "0.8rem",
                "--thumbs-slide-size": "2.8rem",
              } as React.CSSProperties
            }
            className="mx-auto w-full max-w-sm overflow-hidden lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          >
            <div className="overflow-hidden" ref={emblaThumbsRef}>
              <div
                className="flex flex-row py-1"
                style={{
                  marginLeft: "calc(var(--thumbs-slide-spacing) * -1)",
                }}
              >
                {scrollSnaps.map((_, index) => {
                  const isSelected = index === selectedIndex;
                  const multiplier = sizeMultipliers.get(slideSize) || 1;
                  const calculatedIndex = index * multiplier;

                  return (
                    <Thumbnail
                      key={index}
                      isSelected={isSelected}
                      aria-label={`Thumbnail for slide ${index + 1}`}
                      onClick={() => onThumbClick(index)}
                    >
                      {renderThumbContent
                        ? renderThumbContent(calculatedIndex, isSelected)
                        : index + 1}
                    </Thumbnail>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {showDotNavigation && (
          <div
            className="flex flex-wrap items-center justify-end"
            style={{ marginRight: "calc((2.6rem - 1.4rem) / 2 * -1)" }}
          >
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onNavigation(() => onDotButtonClick(index))}
                isSelected={index === selectedIndex}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

type Orientation = "horizontal" | "vertical";
function getOrientationFromAxis(
  axis?: "x" | "y" | string | undefined,
): Orientation {
  if (axis) {
    return axis === "x"
      ? "horizontal"
      : axis === "y"
        ? "vertical"
        : "horizontal";
  }
  return "horizontal";
}
