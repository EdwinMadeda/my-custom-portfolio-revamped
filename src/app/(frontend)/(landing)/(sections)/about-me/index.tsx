import SectionInnerContent from "@/components/section-inner-content";
import { GradientHeading, SubHeading } from "@/components/typography";
import { navByName } from "@/config/site";
import { AboutMeContent, AboutMeContentSkeleton } from "./about-me-content";
import { ProfileType } from "@/types";

export type AboutMeType = ProfileType["about"];

export default function AboutMe({ about }: { about: AboutMeType }) {
  const {
    name,
    label: heading,
    longDescription: subHeading,
  } = navByName("about-me");

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
        {about ? <AboutMeContent about={about} /> : <AboutMeContentSkeleton />}
      </SectionInnerContent>
    </section>
  );
}
