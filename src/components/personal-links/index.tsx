import { PROFILE_QUERYResult } from "../../../sanity.types";
import {
  personalLinkByLabel,
  PersonalLinkLabel,
} from "@/lib/all-personal-links";
import { PersonalLinksDesktop } from "./personal-links-desktop";
import { PersonalLinksMobile } from "./personal-links-mobile";

export type PersonalLinksProps = Pick<
  NonNullable<PROFILE_QUERYResult>,
  "contact" | "resume"
> & {
  className?: string;
};

export function getPersonalLinks({ contact, resume }: PersonalLinksProps) {
  const rawPlatformLinks = contact?.socialMedia?.links ?? [];
  const rawEmail = contact?.email?.value;
  const rawPhone = contact?.phoneNumber?.value;
  const rawPersonalLinks: {
    platform: (typeof rawPlatformLinks)[number]["platform"] | PersonalLinkLabel;
    link: string | null;
    linkValue?: string | null;
  }[] = [
    ...rawPlatformLinks,
    { platform: "Resume", link: resume?.asset?.url ?? null },
    {
      platform: "Email",
      link: rawEmail ? `mailto:${rawEmail}` : null,
      linkValue: rawEmail,
    },
    {
      platform: "Phone",
      link: rawPhone ? `tel:${rawPhone}` : null,
      linkValue: rawPhone,
    },
  ];
  const personalLinks = rawPersonalLinks
    .map(({ platform, link, linkValue }) =>
      platform && link && platform in personalLinkByLabel
        ? {
            ...personalLinkByLabel[platform as PersonalLinkLabel],
            url: link,
            linkValue,
          }
        : null,
    )
    .filter(Boolean);

  return personalLinks;
}

export { PersonalLinksDesktop, PersonalLinksMobile };
