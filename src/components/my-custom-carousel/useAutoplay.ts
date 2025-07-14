import { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";

interface UseAutoPlayReturnType {
  isPlaying: boolean;
  wasPlaying: boolean;
  toggleAutoPlay: () => void;
  onNavigation: (callback: () => void) => void;
  pauseOnMouseEnter: () => void;
  resumeOnMouseLeave: () => void;
}

export default function useAutoplay(
  emblaApi: EmblaCarouselType | undefined,
  enableAutoplay: boolean,
): UseAutoPlayReturnType {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);
  const autoplay = emblaApi?.plugins()?.autoplay;

  const onNavigation = useCallback(
    (callback: () => void) => {
      if (!autoplay) return;
      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;
      resetOrStop();
      callback();
    },
    [autoplay],
  );

  const toggleAutoPlay = useCallback(() => {
    if (!autoplay) return;
    const shouldPlay = !autoplay.isPlaying();
    autoplay[shouldPlay ? "play" : "stop"]();
    setIsPlaying(shouldPlay);
    setWasPlaying(shouldPlay);
  }, [autoplay]);

  const pauseOnMouseEnter = useCallback(() => {
    if (autoplay && autoplay?.isPlaying()) {
      autoplay.stop();
      setWasPlaying(true);
      setIsPlaying(false);
    } else {
      setWasPlaying(false);
    }
  }, [autoplay]);

  const resumeOnMouseLeave = useCallback(() => {
    if (autoplay && !autoplay?.isPlaying() && wasPlaying) {
      autoplay.play();
      setIsPlaying(true);
    }
  }, [autoplay, wasPlaying]);

  useEffect(() => {
    if (!autoplay) return;

    setIsPlaying(autoplay.isPlaying());
    setWasPlaying(autoplay.isPlaying());

    const handlePlay = () => setIsPlaying(true);
    const handleStop = () => setIsPlaying(false);

    emblaApi
      .on("autoplay:play", handlePlay)
      .on("autoplay:stop", handleStop)
      .on("reInit", () => {
        setIsPlaying(autoplay.isPlaying());
        setWasPlaying(autoplay.isPlaying());
      });

    return () => {
      emblaApi.off("autoplay:play", handlePlay);
      emblaApi.off("autoplay:stop", handleStop);
    };
  }, [emblaApi, autoplay]);

  if (!enableAutoplay) {
    return {
      isPlaying,
      wasPlaying,
      toggleAutoPlay,
      onNavigation,
      pauseOnMouseEnter,
      resumeOnMouseLeave,
    };
  }
  return {
    isPlaying: false,
    wasPlaying: false,
    toggleAutoPlay: () => {},
    onNavigation: (callback: () => void) => callback(),
    pauseOnMouseEnter: () => {},
    resumeOnMouseLeave: () => {},
  };
}
