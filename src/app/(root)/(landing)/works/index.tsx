import SectionInnerContent from "@/components/section-inner-content";
import { GradientHeading, SubHeading } from "@/components/typography";

import { navByName } from "@/config/site";

import { projects } from "./works-constants";
import { WorkCard, WorkCardSkeleton } from "./work-card";

export default function Works() {
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
          {projects.map((project, index) => (
            <WorkCard key={index} project={project} index={index} />
            // <WorkCardSkeleton key={index} />
          ))}
        </div>
      </SectionInnerContent>
    </section>
  );
}
