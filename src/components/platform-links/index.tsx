import React from "react";
import { platformByLabel } from "./all-platform-links";
import { Button } from "../ui/custom-button";
import { ExternalLink } from "react-external-link";
import clsx from "clsx";
import { cn, generateTextColorFromHex } from "@/lib/utils";

export function PlatformLinksDesktop() {
  const platforms = [
    platformByLabel["LinkedIn"],
    platformByLabel["GitHub"],
    platformByLabel["Email"],
    platformByLabel["Resume"],
  ];

  return (
    <div className="my-nav-height fixed right-0 bottom-0 mr-4 hidden flex-col items-end space-y-5 xl:flex">
      {platforms.map(({ label, bgColor, Icon, url }) => {
        const textColor = generateTextColorFromHex(bgColor);
        return (
          <Button
            asChild
            className={clsx(
              "group h-9 w-9 overflow-hidden transition-all duration-200 ease-in-out hover:w-[150px] hover:justify-start",
            )}
            style={{
              backgroundColor: bgColor,
              color: textColor,
            }}
            key={label}
          >
            <ExternalLink href={url}>
              <Icon /> <span className="hidden group-hover:block">{label}</span>
            </ExternalLink>
          </Button>
        );
      })}
    </div>
  );
}

export function PlatformLinksMobile({ className }: { className?: string }) {
  const platforms = [
    platformByLabel["LinkedIn"],
    platformByLabel["GitHub"],
    platformByLabel["Email"],
    platformByLabel["Resume"],
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-min items-center justify-center space-x-6 xl:hidden", // w-min makes the div only as wide as its content
        className,
      )}
    >
      {platforms.map(({ label, bgColor, Icon, url }) => {
        const textColor = generateTextColorFromHex(bgColor);
        return (
          <Button
            asChild
            className={clsx(
              "size-10",
              "transition-all duration-200 ease-in-out",
              "hover:scale-110 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            )}
            style={{
              backgroundColor: bgColor,
              color: textColor,
            }}
            key={label}
          >
            <ExternalLink href={url}>
              <Icon className="!h-5 !w-5" />{" "}
            </ExternalLink>
          </Button>
        );
      })}
    </div>
  );
}
