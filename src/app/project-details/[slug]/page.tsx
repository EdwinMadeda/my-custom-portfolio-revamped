import BackButton from "@/components/back-button";
import ImageWithFallback from "@/components/image-with-fallback";
import SectionInnerContent from "@/components/section-inner-content";
import { ProseContent } from "@/components/typography";
import { Button } from "@/components/ui/custom-button";
import { ExternalLink } from "react-external-link";
import { ProjectIntro, ProjectIntroSkeleton } from "./project-intro";
import {
  TechStackSidebar,
  TechStackSidebarSkeleton,
} from "./teck-stack-sidebar";
import { TechArticleSkeleton } from "./tech-article";

export const metadata = {
  title: "Project Details",
};

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <>
      <section>
        <div className="flex h-full flex-col justify-center">
          {/* <ProjectIntro /> */}
          <ProjectIntroSkeleton />

          <SectionInnerContent>
            <div className="flex flex-wrap gap-8">
              <figure className="flex flex-col items-center justify-end">
                <div className="flex w-[225px] items-end justify-center md:w-[270px]">
                  <ImageWithFallback
                    className="h-auto w-full rounded-lg"
                    src={`https://picsum.photos/id/15/450/975`}
                    alt="Phone Mockup"
                    width={450}
                    height={975}
                    fallbackMsg={
                      <>
                        No <br />
                        preview <br />
                        available
                      </>
                    }
                  />
                </div>
                <figcaption className="p-6 leading-relaxed font-semibold">
                  On Mobile
                </figcaption>
              </figure>
              <figure className="flex flex-col items-center justify-end">
                <div className="flex w-[270px] items-end justify-center md:w-[330px]">
                  <ImageWithFallback
                    className="h-auto w-full rounded-lg"
                    src="https://picsum.photos/id/15/600/800"
                    alt="Tablet Mockup"
                    width={600}
                    height={800}
                  />
                </div>
                <figcaption className="p-6 leading-relaxed font-semibold">
                  On Tablet
                </figcaption>
              </figure>
              <figure className="flex flex-col items-center justify-end">
                <div className="flex w-full items-end justify-center sm:w-[480px] md:w-[576px]">
                  <ImageWithFallback
                    className="h-auto w-full rounded-lg"
                    src="https://picsum.photos/id/15/960/540"
                    alt="Desktop Mockup"
                    width={960}
                    height={540}
                  />
                </div>
                <figcaption className="p-6 leading-relaxed font-semibold">
                  On Desktop
                </figcaption>
              </figure>
            </div>
          </SectionInnerContent>

          <div className="my-10 flex gap-4">
            <BackButton href="/#works">Back to Works</BackButton>
            <Button asChild>
              <ExternalLink href="https://example.com">
                View Repository
              </ExternalLink>
            </Button>
            <Button asChild>
              <ExternalLink href="https://example.com">Visit Site</ExternalLink>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex w-full flex-col md:flex-row-reverse md:items-start md:justify-center md:gap-x-16 lg:gap-x-24">
          {/* <TechStackSidebar /> */}
          <TechStackSidebarSkeleton />
          <div className="md:flex md:flex-grow">
            <TechArticleSkeleton />
          </div>
        </div>
      </section>
    </>
  );
}
