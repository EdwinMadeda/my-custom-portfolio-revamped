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
import { CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/custom-avatar";

import { ProseContent, Quote } from "@/components/typography";

export interface TestimonialType {
  name: string;
  feedback: string; // HTML content in string form
  positionTitle: string;
  affiliationName: string;
  affiliationLink: string;
  photoUrl: string;
  isPinned: boolean;
  category: "topRated" | "clientsFavorite" | "mostPopular" | "other"; // You can expand categories as needed
}

interface TestimonialProps {
  testimonial: TestimonialType;
}

export default function Testimonial({ testimonial }: TestimonialProps) {
  const blockquoteContentRef = useRef<HTMLDivElement>(null);
  const isOverflowing = useContentOverFlow({
    contentRef: blockquoteContentRef,
  });

  return (
    <TestimonialTemplate testimonial={testimonial}>
      <Blockquote
        ref={blockquoteContentRef}
        isClamped
        feedback={testimonial.feedback}
      />
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
            <TestimonialTemplate testimonial={testimonial}>
              <Blockquote isClamped={false} feedback={testimonial.feedback} />
            </TestimonialTemplate>
          </DialogContent>
        </Dialog>
      )}
    </TestimonialTemplate>
  );
}

function TestimonialTemplate({
  testimonial,
  children,
}: { children: React.ReactNode } & TestimonialProps) {
  return (
    <CardContent>
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <figure>
          <figcaption className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={testimonial.photoUrl} />
              <AvatarFallback name={testimonial.name} />
            </Avatar>
            <div>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-muted-foreground text-sm">
                {testimonial.positionTitle} of {testimonial.affiliationName}
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
  { feedback: string; isClamped: boolean }
>(({ feedback, isClamped }, ref) => {
  return (
    <Quote className={clsx("mt-4", { "h-40": isClamped })}>
      <QuoteSvg className="text-muted-foreground mb-2 block h-3 w-3" />
      <ProseContent
        ref={ref}
        className={clsx("w-full transition-all duration-300", {
          "line-clamp-3 md:line-clamp-4": isClamped,
        })}
        maxWidth="prose"
        dangerouslySetInnerHTML={{ __html: feedback }}
      />
    </Quote>
  );
});
