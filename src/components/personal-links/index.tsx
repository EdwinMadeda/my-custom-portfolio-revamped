import React from "react";

import { Button } from "../ui/custom-button";
import { ExternalLink } from "react-external-link";
import clsx from "clsx";
import { cn, generateTextColorFromHex } from "@/lib/utils";
import { PROFILE_QUERYResult } from "../../../sanity.types";
import {
  PersonalLink,
  personalLinkByLabel,
  PersonalLinkLabel,
} from "@/lib/all-personal-links";

type PersonalLinksProps = Pick<
  NonNullable<PROFILE_QUERYResult>,
  "contact" | "resume"
> & {
  className?: string;
};

export function PersonalLinksDesktop(props: PersonalLinksProps) {
  const personalLinks = getPersonalLinks(props);
  return (
    <div className="my-nav-height fixed right-0 bottom-0 mr-4 hidden flex-col items-end space-y-5 xl:flex">
      {personalLinks.map((personalLink) => {
        if (!personalLink) return null;
        const { label, bgColor, Icon, url } = personalLink;
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
            <ExternalLink href={url} download={label === "Resume"}>
              <Icon /> <span className="hidden group-hover:block">{label}</span>
            </ExternalLink>
          </Button>
        );
      })}
    </div>
  );
}

export function PersonalLinksMobile({
  className,
  ...props
}: PersonalLinksProps) {
  const personalLinks = getPersonalLinks(props);

  return (
    <div
      className={cn(
        "mx-auto flex w-min items-center justify-center space-x-6 xl:hidden", // w-min makes the div only as wide as its content
        className,
      )}
    >
      {personalLinks.map((personalLink) => {
        if (!personalLink) return null;
        const { label, bgColor, Icon, url } = personalLink;
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
            <ExternalLink
              href={url}
              title={label}
              aria-label={label}
              download={label === "Resume"}
            >
              <Icon className="!h-5 !w-5" />{" "}
            </ExternalLink>
          </Button>
        );
      })}
    </div>
  );
}

function getPersonalLinks({ contact, resume }: PersonalLinksProps) {
  const rawPlatformLinks = contact?.socialMedia?.links ?? [];
  const rawEmail = contact?.email?.value;
  const rawPhone = contact?.phoneNumber?.value;
  const rawPersonalLinks: {
    platform: (typeof rawPlatformLinks)[number]["platform"] | PersonalLinkLabel;
    link: string | null;
  }[] = [
    ...rawPlatformLinks,
    { platform: "Email", link: rawEmail ? `mailto:${rawEmail}` : null },
    { platform: "Phone", link: rawPhone ? `tel:${rawPhone}` : null },
    { platform: "Resume", link: resume?.asset?.url ?? null },
  ];
  const personalLinks = rawPersonalLinks
    .map(({ platform, link }) =>
      platform && link && platform in personalLinkByLabel
        ? {
            ...personalLinkByLabel[platform as PersonalLinkLabel],
            url: link,
          }
        : null,
    )
    .filter(Boolean);

  return personalLinks;
}
