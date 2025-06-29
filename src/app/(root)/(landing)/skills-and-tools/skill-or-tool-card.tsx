import { Muted } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import React from "react";
import { SkillOrTool } from "./skills_and_tools-constants";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkillOrToolCardProps {
  skillOrTool: SkillOrTool;
}

export function SkillOrToolCard({ skillOrTool }: SkillOrToolCardProps) {
  return (
    <SkillOrToolCardTemplate
      figureInnerContent={
        <>
          <div>
            <span className="bg-primary/10 dark:bg-primary/50 text-primary inline-block rounded-full p-2 sm:p-3 dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {skillOrTool.icon}
              </svg>
            </span>
          </div>
          <figcaption className="leading-none font-semibold">
            {skillOrTool.title}
          </figcaption>
        </>
      }
      cardDescriptionContent={<Muted>{skillOrTool.description}</Muted>}
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
            "flex cursor-default flex-col items-center space-y-3 rounded-xl p-2 px-6 sm:p-6",
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
