"use client";

import QuoteSvg from "@/components/quote-svg";
import { Button } from "@/components/ui/button";

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

export default function Testimonial({}) {
  const blockquoteContentRef = useRef<HTMLDivElement>(null);
  const isOverflowing = useContentOverFlow({
    contentRef: blockquoteContentRef,
  });
  return (
    <TestimonialTemplate>
      <Blockquote ref={blockquoteContentRef} isClamped />
      {isOverflowing && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link">Read More</Button>
          </DialogTrigger>
          <DialogContent>
            <VisuallyHidden>
              <DialogTitle>Full Testimonial</DialogTitle>
              <DialogDescription>
                Read the full text of this testimonial.
              </DialogDescription>
            </VisuallyHidden>
            <TestimonialTemplate>
              <Blockquote isClamped={false} />
            </TestimonialTemplate>
          </DialogContent>
        </Dialog>
      )}
    </TestimonialTemplate>
  );
}

function TestimonialTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 py-4">
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <figure>
          <figcaption className="flex items-center gap-4">
            <img
              alt="Judith Black"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <div className="font-semibold">Judith Black</div>
              <div className="text-muted-foreground text-sm">
                CEO of Workcation
              </div>
            </div>
          </figcaption>
          {children}
        </figure>
      </div>
    </div>
  );
}

const Blockquote = forwardRef<HTMLDivElement, { isClamped: boolean }>(
  ({ isClamped }, ref) => {
    return (
      <blockquote className={clsx("mt-4", { "max-h-40": isClamped })}>
        <QuoteSvg className="text-muted-foreground mb-2 block h-3 w-3" />
        <div
          ref={ref}
          className={clsx(
            "leading-relaxed italic transition-all duration-300",
            {
              "line-clamp-3 md:line-clamp-4": isClamped,
            },
          )}
        >
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            facere vero accusantium cum officia amet nisi deleniti ratione quod
            facilis! Quas, assumenda eveniet nostrum iusto a esse provident
            minus eligendi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            facere vero accusantium cum officia amet nisi deleniti ratione quod
            facilis! Quas, assumenda eveniet nostrum iusto a esse provident
            minus eligendi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            facere vero accusantium cum officia amet nisi deleniti ratione quod
            facilis! Quas, assumenda eveniet nostrum iusto a esse provident
            minus eligendi?
          </p>
        </div>
      </blockquote>
    );
  },
);
