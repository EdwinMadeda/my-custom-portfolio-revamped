import { EmblaCarouselType } from "embla-carousel";
import React, { useCallback, useEffect } from "react";

interface UseThumbNavigationReturnType {
  onThumbClick: (index: number) => void;
}

export default function useThumbNavigation(
  emblaMainApi: EmblaCarouselType | undefined,
  emblaThumbsApi: EmblaCarouselType | undefined,
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>,
): UseThumbNavigationReturnType {
  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return { onThumbClick };
}
