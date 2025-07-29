"use client";
import React from "react";

import { Button } from "../ui/custom-button";
import { ExternalLink } from "react-external-link";
import clsx from "clsx";
import { cn, generateTextColorFromHex } from "@/lib/utils";

import { MessageSquareIcon } from "lucide-react";
import { getPersonalLinks, PersonalLinksProps } from ".";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { CopyableText } from "../copyable-text";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function PersonalLinksMobile({
  className,
  ...props
}: PersonalLinksProps) {
  const personalLinks = getPersonalLinks(props);

  return (
    <div
      role="region"
      aria-label="Personal Links"
      className={cn(
        "mx-auto flex w-min items-center justify-center space-x-6 xl:hidden", // w-min makes the div only as wide as its content
        className,
      )}
    >
      <span className="sr-only">Personal links</span>
      {personalLinks.map((personalLink) => {
        if (!personalLink || personalLink.linkValue) return null;
        const { label, bgColor, Icon, url } = personalLink;
        const textColor = generateTextColorFromHex(bgColor);
        return (
          <PersonalLinksMobileButton
            asChild
            style={{
              backgroundColor: bgColor,
              color: textColor,
            }}
            key={label}
          >
            <ExternalLink href={url} title={label} aria-label={label}>
              <Icon className="!h-5 !w-5" />
            </ExternalLink>
          </PersonalLinksMobileButton>
        );
      })}

      <Drawer>
        <DrawerTrigger asChild>
          <PersonalLinksMobileButton
            style={{
              backgroundColor: "#1F2937",
              color: "#FFFFFF",
            }}
          >
            <MessageSquareIcon className="!h-5 !w-5" />
          </PersonalLinksMobileButton>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <VisuallyHidden>
              <DrawerHeader>
                <DrawerTitle>Contact Details</DrawerTitle>
              </DrawerHeader>
            </VisuallyHidden>
            <div className="space-y-3 p-4">
              {personalLinks.map((personalLink) => {
                if (!personalLink || !personalLink.linkValue) return null;
                const { label, Icon, linkValue } = personalLink;
                return (
                  <div
                    className="flex items-center justify-start gap-2 break-all"
                    key={label}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <p className="shrink-0 text-sm font-semibold"> {label}:</p>
                    <CopyableText text={linkValue} className="truncate" />
                  </div>
                );
              })}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function PersonalLinksMobileButton({
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
}) {
  return (
    <Button
      className={clsx(
        "size-10",
        "transition-all duration-200 ease-in-out",
        "hover:scale-110 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
      )}
      {...props}
    />
  );
}
