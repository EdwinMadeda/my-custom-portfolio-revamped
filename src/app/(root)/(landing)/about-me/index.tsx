import SectionInnerContent from "@/components/section-inner-content";
import { GradientHeading, SubHeading } from "@/components/typography";
import { navByName } from "@/config/site";
import { AboutMeContent, AboutMeContentSkeleton } from "./about-me-content";

export default function AboutMe() {
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
        {/* <AboutMeContent /> */}
        <AboutMeContentSkeleton />
      </SectionInnerContent>
    </section>
  );
}
