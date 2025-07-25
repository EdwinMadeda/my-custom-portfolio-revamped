import React from "react";
import { PersonalLink, personalLinkByLabel } from "../../lib/personal-links";
import { Button } from "../ui/custom-button";
import { ExternalLink } from "react-external-link";
import clsx from "clsx";
import { cn, generateTextColorFromHex } from "@/lib/utils";
import { PROFILE_QUERYResult } from "../../../sanity.types";

type PersonalLinksProps = Pick<NonNullable<PROFILE_QUERYResult>, "contact">;

export function PersonalLinksDesktop({ contact }: PersonalLinksProps) {
  // const sanitySocialMediaLinks = contact?.socialMedia?.links;
  // const personalLinksItems = sanitySocialMediaLinks?.map(({platform, link})=> ({ ...personalLinkByLabel[platform], url: link }));

  const platforms: PersonalLink[] = [
    // personalLinkByLabel["LinkedIn"],
    // personalLinkByLabel["GitHub"],
    // { ...personalLinkByLabel["Email"], url: `mailto:${contact?.email?.value}` },
    // personalLinkByLabel["Resume"],
  ];

  return (
    <div className="my-nav-height fixed right-0 bottom-0 mr-4 hidden flex-col items-end space-y-5 xl:flex">
      {platforms.map(({ label, bgColor, Icon }) => {
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
            <ExternalLink href="">
              <Icon /> <span className="hidden group-hover:block">{label}</span>
            </ExternalLink>
          </Button>
        );
      })}
    </div>
  );
}

export function PersonalLinksMobile({ className }: { className?: string }) {
  const platforms = [
    personalLinkByLabel["LinkedIn"],
    personalLinkByLabel["GitHub"],
    // personalLinkByLabel["Email"],
    // personalLinkByLabel["Resume"],
  ];

  return (
    <div
      className={cn(
        "mx-auto flex w-min items-center justify-center space-x-6 xl:hidden", // w-min makes the div only as wide as its content
        className,
      )}
    >
      {platforms.map(({ label, bgColor, Icon }) => {
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
            <ExternalLink href="">
              <Icon className="!h-5 !w-5" />{" "}
            </ExternalLink>
          </Button>
        );
      })}
    </div>
  );
}
