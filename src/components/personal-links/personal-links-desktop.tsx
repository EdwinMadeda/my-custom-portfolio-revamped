"use client";
import React, { Fragment } from "react";

import { Button } from "../ui/custom-button";
import { generateTextColorFromHex } from "@/lib/utils";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

import { CopyableText } from "../copyable-text";
import { ExpandingButton } from "../expanding-button";
import { getPersonalLinks, PersonalLinksProps } from ".";

export function PersonalLinksDesktop(props: PersonalLinksProps) {
  const personalLinks = getPersonalLinks(props);
  return (
    <div
      role="region"
      aria-label="Personal Links"
      className="my-nav-height fixed right-0 bottom-0 mr-4 hidden flex-col items-end space-y-5 xl:flex"
    >
      <span className="sr-only">Personal links</span>
      {personalLinks.map((personalLink) => {
        if (!personalLink) return null;
        const { label, bgColor, Icon, url, linkValue } = personalLink;
        const textColor = generateTextColorFromHex(bgColor);

        return (
          <Fragment key={label}>
            {linkValue ? (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    className="h-9 w-9"
                    style={{
                      backgroundColor: bgColor,
                      color: generateTextColorFromHex(bgColor),
                    }}
                  >
                    <Icon />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-fit" side="left" sideOffset={8}>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold"> {label}</p>
                    <CopyableText text={linkValue} />
                  </div>
                </HoverCardContent>
              </HoverCard>
            ) : (
              <ExpandingButton
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                }}
                icon={Icon}
                url={url}
                label={label}
                download={label === "Resume"}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
