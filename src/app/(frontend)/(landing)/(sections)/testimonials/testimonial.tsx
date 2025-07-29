"use client";

import QuoteSvg from "@/components/svg-icons/quote-svg";
import { Button } from "@/components/ui/custom-button";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import clsx from "clsx";
import React, { forwardRef, useRef } from "react";
import useContentOverFlow from "@/hooks/useContentOverFlow";
import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/custom-avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { ProseContent, Quote } from "@/components/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { SingleFeaturedTestimonial } from ".";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "next-sanity";
import { ExternalLink } from "react-external-link";
import ImageWithFallback from "@/components/image-with-fallback";

type TestimonialProps = {
  featuredTestimonial: SingleFeaturedTestimonial;
};

export function TestimonialCard({ featuredTestimonial }: TestimonialProps) {
  const blockquoteContentRef = useRef<HTMLDivElement>(null);
  const isOverflowing = useContentOverFlow({
    contentRef: blockquoteContentRef,
  });

  const feedback = featuredTestimonial.feedback ? (
    <PortableText value={featuredTestimonial.feedback} />
  ) : (
    <>No feedback available</>
  );

  return (
    <Card className="m-1 h-full w-full">
      <TestimonialTemplate featuredTestimonial={featuredTestimonial}>
        <Blockquote ref={blockquoteContentRef} isClamped feedback={feedback} />
        {isOverflowing && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link">Read More</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
              <VisuallyHidden>
                <DialogTitle>Full Testimonial</DialogTitle>
                <DialogDescription>
                  Read the full text of this testimonial.
                </DialogDescription>
              </VisuallyHidden>
              <TestimonialTemplate featuredTestimonial={featuredTestimonial}>
                <Blockquote isClamped={false} feedback={feedback} />
              </TestimonialTemplate>
            </DialogContent>
          </Dialog>
        )}
      </TestimonialTemplate>
    </Card>
  );
}

function TestimonialTemplate({
  featuredTestimonial,
  children,
}: { children: React.ReactNode } & TestimonialProps) {
  const { photo, name, position } = featuredTestimonial;
  const positionTitle = position?.title;
  const affiliation = position?.affiliation;
  const affiliationName = affiliation?.name;
  const affiliationLink = affiliation?.link;
  const affiliationLogo = affiliation?.logo;

  const affiliationMetadata = affiliationLogo?.asset?.metadata;
  const affiliationLogoAspectRatio =
    affiliationMetadata?.dimensions?.aspectRatio;
  const affiliationLogoBlurHash = affiliationMetadata?.blurHash;
  const affiliationLogoBlurDataURL = affiliationMetadata?.lqip;

  return (
    <CardContent>
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <figure>
          <figcaption className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={urlFor(photo as SanityImageSource)
                  .width(180)
                  .height(180)
                  .auto("format")
                  .url()}
              />
              <AvatarFallback name={name ?? ""} />
            </Avatar>
            <div>
              <div className="font-semibold">{name}</div>
              <div className="text-muted-foreground text-sm">
                {positionTitle}
                {affiliationName && (
                  <>
                    {` at `}
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        {affiliationLink ? (
                          <Button variant="link" asChild className="px-0">
                            <ExternalLink href={affiliationLink}>
                              {affiliationName}
                            </ExternalLink>
                          </Button>
                        ) : (
                          affiliationName
                        )}
                      </HoverCardTrigger>
                      <HoverCardContent
                        className="w-80 text-sm leading-relaxed"
                        side="top"
                      >
                        <div className="relative">
                          <div className="float-left mr-4 mb-2 w-20">
                            <ImageWithFallback
                              className="w-full rounded object-cover object-center"
                              src={urlFor(affiliationLogo as SanityImageSource)
                                .width(200)
                                .quality(80)
                                .auto("format")
                                .url()}
                              alt={`Logo for ${affiliationName}`}
                              width={200}
                              height={
                                affiliationLogoAspectRatio
                                  ? Math.round(200 / affiliationLogoAspectRatio)
                                  : 100
                              }
                              fallbackMsg="No Preview Available"
                              aspectRatio={affiliationLogoAspectRatio}
                              blurHash={affiliationLogoBlurHash}
                              blurDataURL={affiliationLogoBlurDataURL}
                            />
                          </div>
                          <h4 className="text-sm font-semibold">
                            {affiliationName}
                          </h4>
                          <p className="text-sm">{affiliation.description}</p>
                          <div className="text-muted-foreground text-xs">
                            <strong>Located:</strong> {affiliation.location}
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </>
                )}
              </div>
            </div>
          </figcaption>
          {children}
        </figure>
      </div>
    </CardContent>
  );
}

const Blockquote = forwardRef<
  HTMLDivElement,
  { feedback: React.JSX.Element; isClamped: boolean }
>(({ feedback, isClamped }, ref) => {
  return (
    <Quote
      className={clsx("mt-4 transition-all duration-300 ease-out", {
        "max-h-40": isClamped,
      })}
    >
      <QuoteSvg className="text-muted-foreground mb-2 block h-3 w-3" />
      <ProseContent
        ref={ref}
        className={clsx("w-full transition-all duration-300", {
          "line-clamp-3 md:line-clamp-4": isClamped,
        })}
        maxWidth="prose"
        // dangerouslySetInnerHTML={{
        //   __html: feedback || "No feedback provided.",
        // }}
      >
        {feedback}
      </ProseContent>
    </Quote>
  );
});

export function TestimonialSkeleton() {
  return (
    <Card className="m-1 h-full w-full">
      <CardContent>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <figure>
            {/* Avatar and Name Info */}
            <figcaption className="mb-4 flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
            </figcaption>

            {/* Quote Block */}
            <div className="mt-4">
              <Skeleton className="mb-2 h-3 w-4" /> {/* For the quote icon */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Read More Button */}
            <div className="mt-3">
              <Skeleton className="h-4 w-24" />
            </div>
          </figure>
        </div>
      </CardContent>
    </Card>
  );
}

Blockquote.displayName = "Blockquote";
