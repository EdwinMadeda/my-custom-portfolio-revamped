import SectionInnerContent from "@/components/section-inner-content";
import { GradientHeading, SubHeading } from "@/components/typography";

import { navByName } from "@/config/site";

import { WorkCard, WorkCardSkeleton } from "./work-card";
import { ProfileType } from "@/types";

export type WorksType = ProfileType["works"];

export type FeaturedProjects = NonNullable<WorksType>["featuredProjects"];

export type SingleFeaturedProject = NonNullable<FeaturedProjects>[number];

export default function Works({ works }: { works: WorksType }) {
  const {
    name,
    label: heading,
    shortDescription: subHeading,
  } = navByName("works");

  return (
    <section
      id={name}
      className="content"
      aria-labelledby={name}
      aria-describedby={`${name}-desc`}
    >
      <GradientHeading>{heading}</GradientHeading>
      <SubHeading>{subHeading}</SubHeading>
      <SectionInnerContent>
        <div className="-m-4 mx-auto mt-4 flex flex-wrap">
          {works?.featuredProjects ? (
            <>
              {works.featuredProjects.map((project, index) => (
                <WorkCard key={project._id} project={project} index={index} />
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <WorkCardSkeleton key={index} />
              ))}
            </>
          )}
        </div>
      </SectionInnerContent>
    </section>
  );
}
