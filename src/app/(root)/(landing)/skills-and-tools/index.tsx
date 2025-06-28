"use client";

import SectionInnerContent from "@/components/section-inner-content";
import { GradientHeading, SubHeading } from "@/components/typography";

import { navByName } from "@/config/site";
import useResponsive from "@/hooks/useResponsive";
import { chunkArray } from "@/lib/utils";
import clsx from "clsx";
import { useMemo } from "react";
import { EmblaOptionsType } from "embla-carousel";
import MyCustomCarousel from "../../../../components/my-custom-carousel";
import {
  skills_and_tools,
  skills_and_tools_breakpoints,
} from "./skills_and_tools-constants";
import { SkillOrToolCard, SkillOrToolCardSkeleton } from "./skill-or-tool-card";

export default function SkillsAndTools() {
  const {
    name,
    label: heading,
    longDescription: subHeading,
  } = navByName("skills");

  const {
    isSmallMobile,
    isMobile,
    isTablet,
    isLargeTablet,
    isDesktop,
    isSmallDevice,
  } = useResponsive(skills_and_tools_breakpoints);

  const getItemsPerSlide = (): number => {
    if (isSmallMobile) return 3;
    if (isMobile) return 4;
    if (isTablet) return 4;
    if (isLargeTablet) return 4;
    if (isDesktop) return 6;
    return 3;
  };

  const itemsPerSlide = getItemsPerSlide();

  const CHUNKED_SKILLS_AND_TOOLS = useMemo(
    () => chunkArray(skills_and_tools, itemsPerSlide),
    [skills_and_tools, itemsPerSlide],
  );

  const OPTIONS: EmblaOptionsType = {
    axis: isSmallDevice ? "y" : "x",
    align: "start",
    slidesToScroll: "auto",
    loop: true,
  };

  const SLIDES = CHUNKED_SKILLS_AND_TOOLS.map((chunk, chunkIdx) => (
    <div
      key={chunkIdx}
      className={clsx("grid w-full", {
        "gap-2": isSmallMobile || isMobile || isTablet || isLargeTablet,
        "gap-4": isDesktop,
        "grid-cols-1": isSmallMobile,
        "grid-cols-2": isMobile || isTablet || isLargeTablet,
        "grid-cols-3": isDesktop,
      })}
    >
      {chunk.map((skillOrTool, index) => (
        <SkillOrToolCard key={index} skillOrTool={skillOrTool} />
      ))}
    </div>
  ));

  const SlidesSkeleton = (
    <div
      className={clsx(
        "grid w-full gap-2",
        "[@media(max-width:639px)]:grid-cols-1",
        "[@media(min-width:640px)_and_(max-width:1279px)]:grid-cols-2",
        "[@media(min-width:640px)_and_(max-width:1279px)]:gap-2",
        "[@media(min-width:1280px)]:grid-cols-3",
        "[@media(min-width:1280px)]:gap-4",
      )}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <SkillOrToolCardSkeleton
          key={index}
          className={clsx(
            index >= 3 && "[@media(max-width:639px)]:hidden",
            index >= 4 &&
              "[@media(min-width:640px)_and_(max-width:1279px)]:hidden",
          )}
        />
      ))}
    </div>
  );

  return (
    <>
      <section
        id={name}
        className="content"
        aria-labelledby={name}
        aria-describedby={`${name}-desc`}
      >
        <GradientHeading>{heading}</GradientHeading>
        <SubHeading>{subHeading}</SubHeading>
        <SectionInnerContent>
          <MyCustomCarousel
            slides={SLIDES}
            options={OPTIONS}
            navigationType="arrow_plus_dot"
            slideSize="100%"
            slideHeight={31.4}
            className="pt-2"
            layoutStable={{
              condition:
                isSmallMobile ||
                isMobile ||
                isTablet ||
                isLargeTablet ||
                isDesktop,
              fallback: SlidesSkeleton,
            }}
          />
        </SectionInnerContent>
      </section>
    </>
  );
}
