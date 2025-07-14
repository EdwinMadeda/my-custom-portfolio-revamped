import { navByName } from "@/config/site";
import SectionInnerContent from "@/components/section-inner-content";
import { HeroContent } from "./hero-content";
import { PlatformLinksMobile } from "@/components/platform-links";

export default async function Home() {
  const { name } = navByName("home");

  return (
    <section
      id={name}
      className="min-h-screen-minus-nav-height flex h-full flex-col justify-between"
      aria-labelledby={name}
      aria-describedby={`${name}-desc`}
    >
      <SectionInnerContent className="flex h-full flex-1 flex-col justify-between">
        <HeroContent />
        {/* <HeroSkeleton /> */}
        <PlatformLinksMobile className="mt-5" />
      </SectionInnerContent>
    </section>
  );
}
