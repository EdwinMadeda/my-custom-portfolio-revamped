import { Card } from "@/components/ui/card";
import React, { Fragment } from "react";
import { techStackInfo } from "./project-details-constants";
import Divider from "@/components/divider";
import clsx from "clsx";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SINGLE_PROJECT_QUERYResult } from "../../../../../../sanity.types";
import { ExternalLink } from "react-external-link";
import { SiPanasonic } from "react-icons/si";

type SingleProjectDetails = NonNullable<SINGLE_PROJECT_QUERYResult>;

type TechnologyUsed = NonNullable<
  SingleProjectDetails["technologiesUsed"]
>[number];

type TechCategory = TechnologyUsed["techCategory"];

type TechStackSidebarProps = Pick<SingleProjectDetails, "title"> & {
  technologiesUsed: TechnologyUsed[];
};

function groupByTechCategory(techs: TechnologyUsed[]) {
  if (!techs) return [];
  return techs.reduce<Record<string, TechnologyUsed[]>>((acc, tech) => {
    const category = tech.techCategory?.categoryName ?? "";
    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(tech);
    return acc;
  }, {});
}

export function TechStackSidebar({
  title,
  technologiesUsed,
}: TechStackSidebarProps) {
  const techsByTechCategory = groupByTechCategory(technologiesUsed);

  return (
    <TechStackSidebarTemplate>
      <>
        <div className="mb-2.5 px-6 leading-7 font-semibold capitalize">
          Technologies used for {title}
        </div>
        {Object.entries(techsByTechCategory).map(([categoryName, items]) => (
          <div key={categoryName}>
            {items.map(
              ({ _id, techName, techDescription, websiteUrl }, index) => (
                <Fragment key={_id}>
                  {index === 0 && <Divider title={categoryName} />}
                  <div
                    className={clsx(`mb-5 px-6 last:mb-0`, {
                      "pt-5": index === 0,
                    })}
                  >
                    <div className="mb-2 text-xs font-semibold">
                      {websiteUrl ? (
                        <ExternalLink href="">{techName}</ExternalLink>
                      ) : (
                        <span>{techName}</span>
                      )}
                    </div>
                    <div className="text-muted-foreground overflow-hidden text-xs md:text-sm">
                      {techDescription}
                    </div>
                  </div>
                </Fragment>
              ),
            )}
          </div>
        ))}
      </>
    </TechStackSidebarTemplate>
  );
}

export function TechStackSidebarSkeleton() {
  return (
    <TechStackSidebarTemplate className="md:max-w-[20rem]">
      <>
        {/* Heading */}
        <div className="mb-4 px-6">
          <Skeleton className="h-4 w-3/4" />
        </div>
        {/* Simulated categories */}
        {[...Array(3)].map((_, catIdx) => (
          <div key={catIdx} className="px-6 pt-5">
            {/* Divider / Category Title */}
            <Skeleton className="mb-4 h-3 w-1/3" />

            {/* Tech items */}
            {[...Array(2)].map((_, itemIdx) => (
              <div key={itemIdx} className="mb-6">
                <Skeleton className="mb-2 h-3 w-1/4" /> {/* label */}
                <Skeleton className="h-3 w-full md:w-5/6" /> {/* content */}
              </div>
            ))}
          </div>
        ))}
      </>
    </TechStackSidebarTemplate>
  );
}

function TechStackSidebarTemplate({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <aside
      className={cn(
        "top-20 mb-8 pt-8 md:sticky md:max-w-[20rem] md:min-w-[18rem] md:self-start",
        className,
      )}
    >
      <Card className="border-border flex flex-col py-6 md:py-8">
        {children}
      </Card>
    </aside>
  );
}
