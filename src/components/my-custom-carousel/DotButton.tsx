import clsx from "clsx";
import { EmblaCarouselType } from "embla-carousel";
import React, { useCallback, useEffect, useState } from "react";

interface useDotNavigationReturnType {
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
}

export function useDotNavigation(
  emblaApi: EmblaCarouselType | undefined,
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>,
): useDotNavigationReturnType {
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );
  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return { scrollSnaps, onDotButtonClick };
}

export default function DotButton({
  isSelected,
  ...props
}: React.ComponentPropsWithRef<"button"> & {
  isSelected: boolean;
}) {
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        "m-0 inline-flex size-[2.2rem] cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-[50%] border-none bg-transparent p-0 no-underline md:size-[2.6rem]",
        "after:flex after:size-[0.8rem] after:items-center after:rounded-[50%] after:content-[''] md:after:size-[1rem]",
        isSelected
          ? "after:inset-shadow-[0_0_0_0.12rem_var(--primary)]"
          : "after:inset-shadow-[0_0_0_0.12rem_var(--foreground)]",
        "focus:outline-none",
        "focus-within:after:outline-2",
        "focus-within:after:outline-primary",
        "focus-within:after:outline-offset-2",
      )}
    />
  );
}
