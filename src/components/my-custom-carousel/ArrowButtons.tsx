import { PrevArrowSvg, NextArrowSvg } from "@/components/svg-icons/arrow-svgs";
import { Button } from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { EmblaCarouselType } from "embla-carousel";
import { ArrowLeft } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface UseArrowNavigationReturnType {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
}

export default function useArrowNavigation(
  emblaApi: EmblaCarouselType | undefined,
): UseArrowNavigationReturnType {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
}

export function PrevButton({
  ariaLabel,
  orientation,
  ...props
}: Omit<BaseButtonProps, "icon" | "iconLabel">) {
  return (
    <BaseButton
      ariaLabel={ariaLabel ?? "Previous"}
      icon={
        <PrevArrowSvg
          className={cn("!size-4", {
            "rotate-90": orientation === "vertical",
          })}
        />
      }
      {...props}
    />
  );
}

export function NextButton({
  ariaLabel,
  orientation,
  ...props
}: Omit<BaseButtonProps, "icon" | "iconLabel">) {
  return (
    <BaseButton
      ariaLabel={ariaLabel ?? "Next"}
      icon={
        <NextArrowSvg
          className={cn("!size-4", {
            "rotate-90": orientation === "vertical",
          })}
        />
      }
      {...props}
    />
  );
}

interface BaseButtonProps extends React.ComponentProps<"button"> {
  icon: React.ReactElement;
  ariaLabel?: string;
  orientation?: "vertical" | "horizontal";
}

function BaseButton({ icon, ariaLabel, ...props }: BaseButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={ariaLabel}
      className="size-[2.5rem] touch-manipulation appearance-none"
      style={{
        WebkitTapHighlightColor: "var(--border)",
      }}
      {...props}
    >
      {icon}
    </Button>
  );
}
