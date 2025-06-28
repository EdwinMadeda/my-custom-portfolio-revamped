import { Muted } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import React from "react";
import {
  SkillOrTool,
  skills_and_tools_breakpoints,
} from "./skills_and_tools-constants";
import useResponsive from "@/hooks/useResponsive";
import { Skeleton } from "@/components/ui/custom-skeleton";
import { cn } from "@/lib/utils";

interface SkillOrToolCardProps {
  skillOrTool: SkillOrTool;
}

export function SkillOrToolCard({ skillOrTool }: SkillOrToolCardProps) {
  const { isSmallMobile } = useResponsive(skills_and_tools_breakpoints);

  return (
    <div className="p-1">
      <Card className="h-full transition-transform duration-300 ease-in-out hover:scale-105">
        <CardContent
          className={clsx(
            "flex cursor-default flex-col items-center space-y-3 rounded-xl p-2 px-6 sm:p-6",
            { "space-y-2 text-center": !isSmallMobile },
          )}
        >
          <figure
            className={clsx("flex w-full items-center justify-center gap-3", {
              "flex-col": !isSmallMobile,
            })}
          >
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
          </figure>
          <Muted className={clsx({ isSmallMobile })}>
            {skillOrTool.description}
          </Muted>
        </CardContent>
      </Card>
    </div>
  );
}

interface SkillOrToolCardSkeletonProps {
  className?: string;
}

export function SkillOrToolCardSkeleton({
  className,
}: SkillOrToolCardSkeletonProps) {
  return (
    <div className={cn("p-1", className)}>
      <Card className="h-full transition-transform duration-300 ease-in-out hover:scale-105">
        <CardContent
          className={clsx(
            "flex cursor-default flex-col items-center rounded-xl p-2 px-6 sm:p-6",
            "[@media(min-width:639px)]:space-y-2",
            "[@media(min-width:639px)]:text-center",
            "[@media(max-width:639px)]:space-y-3",
          )}
        >
          <figure
            className={clsx(
              "flex w-full items-center justify-center gap-3",
              "[@media(min-width:639px)]:flex-col",
            )}
          >
            <Skeleton className="h-10 w-10 rounded-full sm:h-12 sm:w-12" />
            <Skeleton className="h-4 w-24 sm:w-32" />
          </figure>
          <Skeleton className="h-3 w-full sm:w-4/5" />
          <Skeleton className="h-3 w-full sm:w-4/5" />
        </CardContent>
      </Card>
    </div>
  );
}
