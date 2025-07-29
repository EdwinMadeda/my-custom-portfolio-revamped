"use client";

import SectionInnerContent from "@/components/section-inner-content";
import { GradientHeading, SubHeading } from "@/components/typography";

import { navByName } from "@/config/site";
import useResponsive from "@/hooks/useResponsive";
import { chunkArray } from "@/lib/utils";
import clsx from "clsx";
import React, { Fragment, useMemo } from "react";
import { EmblaOptionsType } from "embla-carousel";
import MyCustomCarousel from "@/components/my-custom-carousel";
import { SkillOrToolCard, SkillOrToolCardSkeleton } from "./skill-or-tool-card";
import { carouselBreakpoints } from "@/components/my-custom-carousel/carousel-breakpoints";
import { ProfileType } from "@/types";
import { ExternalLink } from "react-external-link";

export type SkillsAndToolsType = ProfileType["technologiesAndTools"];

export type FeaturedTechnologiesAndTools =
  NonNullable<SkillsAndToolsType>["featuredTechnologiesAndTools"];

export type SingleFeaturedTechnologiesAndTools =
  NonNullable<FeaturedTechnologiesAndTools>[number];

export default function SkillsAndTools({
  skillsAndTools,
}: {
  skillsAndTools: SkillsAndToolsType;
}) {
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
  } = useResponsive(carouselBreakpoints);

  const getItemsPerSlide = (): number => {
    if (isSmallMobile) return 3;
    if (isMobile) return 4;
    if (isTablet) return 4;
    if (isLargeTablet) return 4;
    if (isDesktop) return 6;
    return 3;
  };

  const isLayoutStable =
    isSmallMobile ||
    isMobile ||
    isTablet ||
    isLargeTablet ||
    isDesktop ||
    isSmallDevice;

  const itemsPerSlide = getItemsPerSlide();

  const CHUNKED_SKILLS_AND_TOOLS = useMemo(() => {
    const featuredTechnologiesAndTools =
      skillsAndTools?.featuredTechnologiesAndTools;
    return featuredTechnologiesAndTools
      ? chunkArray(featuredTechnologiesAndTools.slice(0, 8), itemsPerSlide)
      : [skillsAndTools?.featuredTechnologiesAndTools];
  }, [itemsPerSlide, skillsAndTools?.featuredTechnologiesAndTools]);

  const OPTIONS: EmblaOptionsType = {
    axis: isSmallDevice ? "y" : "x",
    align: "start",
    slidesToScroll: "auto",
    loop: false,
  };

  const SLIDES = CHUNKED_SKILLS_AND_TOOLS.map((chunk, chunkIndex) => (
    <WorkSlide key={chunkIndex}>
      {chunk?.map((skillOrTool) => (
        <Fragment key={skillOrTool._id}>
          {skillOrTool.websiteUrl ? (
            <ExternalLink href={skillOrTool.websiteUrl}>
              <SkillOrToolCard skillOrTool={skillOrTool} />
            </ExternalLink>
          ) : (
            <SkillOrToolCard skillOrTool={skillOrTool} />
          )}
        </Fragment>
      ))}
    </WorkSlide>
  ));

  const SlidesSkeleton = (
    <WorkSlide>
      {Array.from({ length: 6 }).map((_, index) => (
        <SkillOrToolCardSkeleton
          key={index}
          className={clsx({
            "@max-carousel-mobile/carousel-viewport:hidden": index >= 3,
            "@min-carousel-mobile/carousel-viewport:@max-carousel-desktop/carousel-viewport:hidden":
              index >= 4,
            "@min-carousel-desktop/carousel-viewport:hidden": index >= 6,
          })}
        />
      ))}
    </WorkSlide>
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
              condition: isLayoutStable,
              fallback: SlidesSkeleton,
            }}
          />
        </SectionInnerContent>
      </section>
    </>
  );

  function WorkSlide({ children }: { children: React.ReactNode }) {
    return (
      <div
        className={clsx("h-fit w-fit", [
          "grid gap-2",

          "@max-carousel-mobile/carousel-viewport:w-full",
          "@max-carousel-mobile/carousel-viewport:grid-cols-1",
          "@min-carousel-sm-mobile/carousel-viewport:@max-carousel-tablet/carousel-viewport:grid-cols-2",
          "@min-carousel-mobile/carousel-viewport:@max-carousel-desktop/carousel-viewport:grid-cols-2",
          "@min-carousel-mobile/carousel-viewport:h-full",
          "@min-carousel-sm-desktop/carousel-viewport:grid-cols-3",
          "@min-carousel-sm-desktop/carousel-viewport:gap-4",
        ])}
      >
        {children}
      </div>
    );
  }
}
