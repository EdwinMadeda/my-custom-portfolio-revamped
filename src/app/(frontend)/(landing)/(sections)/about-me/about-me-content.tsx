import { ProseContent } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { PortableText } from "next-sanity";
import React from "react";
import { AboutMeType } from ".";

export function AboutMeContent({ about }: { about: AboutMeType }) {
  return (
    <ProseContent maxWidth="none">
      <PortableText value={about?.personalStory ?? []} />
    </ProseContent>
  );
}

export function AboutMeContentSkeleton() {
  return (
    <ProseContent maxWidth="none">
      <div className="space-y-10">
        {/* First paragraph skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[99%]" />
          <Skeleton className="h-4 w-[98%]" />
          <Skeleton className="h-4 w-[96%]" />
          <Skeleton className="h-4 w-[62%]" />
        </div>

        {/* Second paragraph skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[96%]" />
          <Skeleton className="h-4 w-[98%]" />
          <Skeleton className="h-4 w-[95%]" />
          <Skeleton className="h-4 w-[70%]" />
        </div>
      </div>
    </ProseContent>
  );
}
