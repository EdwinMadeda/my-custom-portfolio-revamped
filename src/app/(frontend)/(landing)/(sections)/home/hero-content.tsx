import { PlatformLinksMobile } from "@/components/platform-links";
import { Heading1, Paragraph } from "@/components/typography";
import { Button } from "@/components/ui/custom-button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

import { PortableText } from "next-sanity";
import { HeroType } from ".";

export function HeroContent({ hero }: { hero: HeroType }) {
  return (
    <div className="flex h-full max-w-2xl flex-1 flex-col justify-center">
      <Paragraph className="text-primary uppercase">{hero?.tagline}</Paragraph>
      <Heading1 className="mt-2">
        <PortableText value={hero?.greeting ?? []} />
      </Heading1>
      <Paragraph className="mt-5 max-w-xl">{hero?.subHeadline}</Paragraph>
      <div className="my-10">
        <Button className="group" asChild>
          <Link href={hero?.ctaButtonLink ?? "#works"}>
            {hero?.ctaButtonText ?? "View Work"}
            <BsFillArrowRightCircleFill className="size-6 transition-transform duration-300 ease-in-out group-hover:rotate-90" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="flex h-full max-w-2xl flex-1 flex-col justify-center">
      {/* Small uppercase intro text */}
      <Skeleton className="bg-primary/20 mb-4 h-4 w-60" />

      {/* Heading */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-[70%]" />
        <Skeleton className="h-8 w-[80%]" />
      </div>

      {/* Subtext paragraph */}
      <div className="space-y-3">
        <Skeleton className="mt-5 h-4 w-[90%]" />
        <Skeleton className="h-4 w-[70%]" />
      </div>

      {/* Button skeleton */}
      <Skeleton className="my-10 h-10 w-36 rounded-full" />
    </div>
  );
}
