"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Dot } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/custom-button";
import clsx from "clsx";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  thumbsCarouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  thumbsApi: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
  onThumbClick: (index: number) => void;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [thumbsCarouselRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback(
    (api: CarouselApi) => {
      if (!api) return;

      setSelectedIndex(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());

      if (!thumbsApi) return;
      thumbsApi.scrollTo(api.selectedScrollSnap());
    },
    [api, thumbsApi],
  );

  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!api || !thumbsApi) return;
      api.scrollTo(index);
    },
    [api, thumbsApi],
  );

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;

    onSelect(api);
    setScrollSnaps(api.scrollSnapList());
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        thumbsCarouselRef,
        api: api,
        thumbsApi,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        scrollTo,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
        onThumbClick,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8",
        {
          "top-1/2 -left-12 -translate-y-1/2": orientation === "horizontal",
          "-bottom-10 left-1/2 -translate-x-[125%]": orientation === "vertical",
        },
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute size-8",
        {
          "top-1/2 -right-12 -translate-y-1/2": orientation === "horizontal",
          "right-1/2 -bottom-10 translate-x-[125%]": orientation === "vertical",
        },
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

function DotButton({
  className,
  selected,
  onClick,
  children,
}: React.ComponentProps<typeof Button> & { selected: boolean }) {
  return (
    <Button
      variant="outline"
      size="iconSm"
      className={cn(`rounded-full`, selected ? "is-selected" : "", className)}
      type="button"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function CarouselDotNavigation({ className }: React.ComponentProps<"div">) {
  const { scrollSnaps, scrollTo } = useCarousel();

  return (
    <div
      className={cn(
        "mt-12 flex w-full items-center justify-center space-x-4",
        className,
      )}
    >
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          selected={false}
          onClick={() => {
            scrollTo(index);
          }}
        >
          {index}
        </DotButton>
      ))}
    </div>
  );
}

interface CarouselThumbsNavigationProps<T> {
  items: T[];
  renderThumb: (item: T, isSelected: boolean) => React.ReactNode;
  className?: string;
}

function CarouselThumbNavigation<T>({
  items,
  renderThumb,
  className,
}: CarouselThumbsNavigationProps<T>) {
  const { thumbsCarouselRef, onThumbClick, selectedIndex } = useCarousel();

  return (
    <div
      className={cn(
        "relative container mx-auto mt-8 w-full max-w-sm px-6",
        className,
      )}
      role="region"
      aria-roledescription="thumbs carousel"
      data-slot="carousel"
    >
      <div
        ref={thumbsCarouselRef}
        className="overflow-hidden"
        data-slot="carousel-content"
      >
        <div className={clsx("-ml-4 flex py-2")}>
          {items.map((item, index) => (
            <div
              key={index}
              role="group"
              aria-roledescription="slide"
              data-slot="carousel-item"
              className={cn(
                "min-w-0 shrink-0 grow-0 basis-full",
                "pl-4",
                "basis-1/5 md:basis-1/6",
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onThumbClick(index)}
              >
                {renderThumb(item, index === selectedIndex)}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDotNavigation,
  CarouselThumbNavigation,
};
