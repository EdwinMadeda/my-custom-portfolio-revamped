import {
  ImageIcon,
  UserIcon,
  WrenchIcon,
  LayoutDashboardIcon,
  HammerIcon,
  MessageSquareQuoteIcon,
  FileUser,
  CodeIcon,
  BookOpenText,
  Mail,
  Phone,
  Link,
  LayoutList,
  Building2,
  TagIcon,
  MonitorIcon,
} from "lucide-react";

import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Custom Portfolio")
    .items([
      S.documentTypeListItem("brandingImage")
        .title("Branding Image")
        .icon(ImageIcon),

      S.documentTypeListItem("profile").title("Profile").icon(UserIcon),

      S.documentTypeListItem("technologyOrTool")
        .title("Technology or Tool")
        .icon(WrenchIcon),

      S.documentTypeListItem("project")
        .title("Project")
        .icon(LayoutDashboardIcon),

      S.documentTypeListItem("otherWork")
        .title("Other work / Contribution")
        .icon(BookOpenText),

      S.documentTypeListItem("screenshotViewItemDesc")
        .title("Screenshot View Item")
        .icon(LayoutList),

      S.documentTypeListItem("service").title("Service").icon(HammerIcon),

      S.documentTypeListItem("testimonial")
        .title("Testimonial")
        .icon(MessageSquareQuoteIcon),

      S.documentTypeListItem("affiliation")
        .title("Affiliation")
        .icon(Building2),

      S.documentTypeListItem("contactEmail").title("Email").icon(Mail),

      S.documentTypeListItem("phoneNumber").title("Phone Number").icon(Phone),

      S.documentTypeListItem("socialMediaLinks")
        .title("Social Media Links")
        .icon(Link),

      S.documentTypeListItem("resume").title("Resume").icon(FileUser),

      S.documentTypeListItem("techCategory")
        .title("Technology/Tool Category")
        .icon(CodeIcon),

      S.documentTypeListItem("metaImage").title("Meta Image").icon(MonitorIcon),

      S.documentTypeListItem("metaKeyword").title("Meta Keyword").icon(TagIcon),
    ]);
