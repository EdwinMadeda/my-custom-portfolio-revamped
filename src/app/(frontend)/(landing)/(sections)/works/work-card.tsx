import ImageWithFallback from "@/components/image-with-fallback";
import { Button } from "@/components/ui/custom-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";
import { SingleFeaturedProject } from ".";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface WorkCardProps {
  project: SingleFeaturedProject;
}

export function WorkCard({ project }: WorkCardProps) {
  return (
    <WorkCardTemplate>
      <ImageWithFallback
        className="w-full object-cover object-center"
        src={urlFor(project.thumbnail as SanityImageSource)
          .width(400)
          .height(225)
          .quality(80)
          .auto("format")
          .url()}
        alt={`Thumbnail for ${project.title}`}
        aspectRatio={
          project.thumbnail?.asset?.metadata?.dimensions?.aspectRatio
        }
        width={400}
        height={225}
        fallbackMsg="No Preview Available"
        blurHash={project.thumbnail?.asset?.metadata?.blurHash}
        blurDataURL={project.thumbnail?.asset?.metadata?.lqip}
      />

      <CardContent>
        <CardTitle className="mb-2 text-lg">{project.title}</CardTitle>
        <CardDescription className="mb-2 leading-relaxed">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap items-center">
          <Button
            className="group inline-flex items-center"
            variant="link"
            asChild
          >
            <Link href={`/project-details/${project.slug}`}>
              Learn More
              <BsArrowRight className="ml-2 size-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </WorkCardTemplate>
  );
}

export function WorkCardSkeleton() {
  return (
    <WorkCardTemplate>
      {/* Image placeholder */}
      <Skeleton className="h-36 w-full md:h-36 lg:h-48" />

      <CardContent>
        {/* Title placeholder */}
        <CardTitle className="mb-2 text-lg">
          <Skeleton className="h-6 w-3/4" />
        </CardTitle>

        {/* Description placeholder */}
        <CardDescription className="mb-4 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </CardDescription>

        {/* Button/link placeholder */}
        <div className="flex items-center">
          <Skeleton className="h-5 w-24 rounded-md" />
        </div>
      </CardContent>
    </WorkCardTemplate>
  );
}

function WorkCardTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-4 md:w-1/2 md:p-4 lg:w-1/3">
      <Card className="h-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
        {children}
      </Card>
    </div>
  );
}
