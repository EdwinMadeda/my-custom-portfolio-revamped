import { navByName } from "@/config/site";
import SectionInnerContent from "@/components/section-inner-content";
import { HeroContent, HeroSkeleton } from "./hero-content";
import { PlatformLinksMobile } from "@/components/platform-links";

export default function Home() {
  const {
    name,
    label: heading,
    longDescription: subHeading,
  } = navByName("home");

  return (
    <section
      id={name}
      className="h-screen-minus-nav-height"
      aria-labelledby={name}
      aria-describedby={`${name}-desc`}
    >
      <SectionInnerContent className="flex h-full flex-col justify-center">
        {/* <HeroContent /> */}
        <HeroSkeleton />
        <PlatformLinksMobile className="mt-5" />
      </SectionInnerContent>
    </section>
  );
}
