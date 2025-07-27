import { Muted } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SingleFeaturedTechnologiesAndTools } from ".";
import { urlFor } from "@/sanity/lib/image";
import ImageWithFallback from "@/components/image-with-fallback";

export function SkillOrToolCard({
  skillOrTool,
}: {
  skillOrTool: SingleFeaturedTechnologiesAndTools;
}) {
  return (
    <SkillOrToolCardTemplate
      figureInnerContent={
        <>
          <div className="bg-primary/10 dark:bg-primary/50 text-primary inline-block h-10 w-10 rounded-full p-1 dark:text-white">
            {skillOrTool?.techLogo && (
              <ImageWithFallback
                src={`${urlFor(skillOrTool.techLogo)
                  .width(40)
                  .height(40)
                  .quality(80)
                  .auto("format")
                  .url()}`}
                alt={`Logo of ${skillOrTool.techName ?? ""}`}
                width={skillOrTool.techLogo.asset.metadata?.dimensions?.width}
                height={skillOrTool.techLogo.asset.metadata?.dimensions?.height}
                aspectRatio={
                  skillOrTool.techLogo.asset.metadata?.dimensions?.aspectRatio
                }
                blurHash={skillOrTool.techLogo.asset.metadata?.blurHash}
                blurDataURL={skillOrTool.techLogo.asset.metadata?.lqip}
              />
            )}
          </div>
          <figcaption className="leading-none font-semibold">
            {skillOrTool?.techName}
          </figcaption>
        </>
      }
      cardDescriptionContent={
        <Muted className="font-normal">{skillOrTool.techDescription}</Muted>
      }
    />
  );
}

interface SkillOrToolCardSkeletonProps {
  className?: string;
}

export function SkillOrToolCardSkeleton({
  className,
}: SkillOrToolCardSkeletonProps) {
  return (
    <SkillOrToolCardTemplate
      className={className}
      figureInnerContent={
        <>
          <Skeleton className="h-10 w-10 rounded-full sm:h-12 sm:w-12" />
          <Skeleton className="h-4 w-24 sm:w-32" />
        </>
      }
      cardDescriptionContent={
        <>
          <Skeleton className="h-3 w-full sm:w-4/5" />
          <Skeleton className="h-3 w-full sm:w-4/5" />
        </>
      }
    />
  );
}

interface SkillOrToolCardTemplateProps {
  className?: string;
  figureInnerContent: React.ReactNode;
  cardDescriptionContent: React.ReactNode;
}

export function SkillOrToolCardTemplate({
  className,
  figureInnerContent,
  cardDescriptionContent,
}: SkillOrToolCardTemplateProps) {
  return (
    <div className={cn("p-1", className)}>
      <Card
        className={clsx(
          "h-fit w-full max-w-sm transition-transform duration-300 ease-in-out hover:scale-105",
          "@min-carousel-mobile/carousel-viewport:@max-carousel-tablet/carousel-viewport:min-w-xs",
          "@min-carousel-mobile/carousel-viewport:min-w-sm",
        )}
      >
        <CardContent
          className={clsx(
            "flex flex-col items-center space-y-3 rounded-xl p-2 px-6 sm:p-6",
            "space-y-3",
            "@min-carousel-mobile/carousel-viewport:space-y-2",
            "@min-carousel-mobile/carousel-viewport:text-center",
          )}
        >
          <figure
            className={clsx(
              "flex w-full items-center justify-center gap-3",
              "@min-carousel-mobile/carousel-viewport:flex-col",
            )}
          >
            {figureInnerContent}
          </figure>
          {cardDescriptionContent}
        </CardContent>
      </Card>
    </div>
  );
}
