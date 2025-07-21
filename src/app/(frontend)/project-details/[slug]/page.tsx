import BackButton from "@/components/back-button";
import ImageWithFallback from "@/components/image-with-fallback";
import SectionInnerContent from "@/components/section-inner-content";
import { Button } from "@/components/ui/custom-button";

import { ExternalLink } from "react-external-link";
import {
  TechStackSidebar,
  TechStackSidebarSkeleton,
} from "./(components)/tech-stack-sidebar";
import { TechArticle, TechArticleSkeleton } from "./(components)/tech-article";
import {
  ProjectIntro,
  ProjectIntroSkeleton,
} from "./(components)/project-intro";
import { getSingleProject } from "@/lib/sanity";
import { Heading4 } from "@/components/typography";
import { Fragment } from "react";
import { urlFor } from "@/sanity/lib/image";
import {
  SanityImageMetadata,
  SINGLE_PROJECT_QUERYResult,
} from "../../../../../sanity.types";
import MyCustomCarousel from "@/components/my-custom-carousel";
import ProjectPreviews, {
  ProjectPreviewImages,
} from "./(components)/project-previews";

export const metadata = {
  title: "Project Details",
};

export default async function ProjectDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const project = await getSingleProject(slug);

  return (
    <>
      {project && (
        <>
          <section>
            <div className="flex h-full flex-col justify-center">
              {project?.title && project?.description ? (
                <ProjectIntro
                  title={project?.title}
                  description={project?.description}
                />
              ) : (
                <ProjectIntroSkeleton />
              )}

              <SectionInnerContent>
                <ProjectPreviews
                  projectPreviewImages={
                    project.projectPreviewImages as ProjectPreviewImages
                  }
                />
              </SectionInnerContent>

              <div className="my-10 flex flex-wrap gap-4">
                <div className="w-full sm:w-fit">
                  <BackButton href="/#works">Back to Works</BackButton>
                </div>
                {project.repoLink && (
                  <Button asChild className="w-full max-w-xs sm:w-fit">
                    <ExternalLink href={project.repoLink}>
                      View Repository
                    </ExternalLink>
                  </Button>
                )}
                {project.liveDemoLink && (
                  <Button asChild className="w-full max-w-xs sm:w-fit">
                    <ExternalLink href={project.liveDemoLink}>
                      Visit Site
                    </ExternalLink>
                  </Button>
                )}
              </div>
            </div>
          </section>

          <section>
            <div className="flex w-full flex-col md:flex-row-reverse md:items-start md:justify-center md:gap-x-16 lg:gap-x-24">
              {project.title && project.technologiesUsed ? (
                <TechStackSidebar
                  title={project.title}
                  technologiesUsed={project.technologiesUsed}
                />
              ) : (
                <TechStackSidebarSkeleton />
              )}

              <div className="md:flex md:flex-grow">
                {project.detailedDescription ? (
                  <TechArticle
                    detailedDescription={project.detailedDescription}
                  />
                ) : (
                  <TechArticleSkeleton />
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
