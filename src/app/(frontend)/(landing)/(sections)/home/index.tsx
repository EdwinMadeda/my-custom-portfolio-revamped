import { navByName } from "@/config/site";
import SectionInnerContent from "@/components/section-inner-content";
import { HeroContent, HeroSkeleton } from "./hero-content";
import { PlatformLinksMobile } from "@/components/platform-links";
import { ProfileType } from "@/types";

export type HeroType = ProfileType["hero"];

export default async function Home({ hero }: { hero: HeroType }) {
  const {
    name,
    label: heading,
    longDescription: subHeading,
  } = navByName("home");

  return (
    <section
      id={name}
      className="min-h-screen-minus-nav-height flex h-full flex-col justify-between"
      aria-labelledby={name}
      aria-describedby={`${name}-desc`}
    >
      <SectionInnerContent className="flex h-full flex-1 flex-col justify-between">
        {hero ? <HeroContent hero={hero} /> : <HeroSkeleton />}
        <PlatformLinksMobile className="mt-5" />
      </SectionInnerContent>
    </section>
  );
}
