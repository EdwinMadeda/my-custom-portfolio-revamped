import {
  ImageIcon,
  UserIcon,
  WrenchIcon,
  LayoutDashboardIcon,
  HammerIcon,
  MessageSquareQuoteIcon,
  MailIcon,
  FileUser,
  CodeIcon,
} from 'lucide-react';

import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Custom Portfolio')
    .items([
      S.documentTypeListItem('brandingImage')
        .title('Branding Image')
        .icon(ImageIcon),

      S.documentTypeListItem('profile').title('Profile').icon(UserIcon),

      S.documentTypeListItem('technologyOrTool')
        .title('Technology or Tool')
        .icon(WrenchIcon),

      S.documentTypeListItem('project')
        .title('Project')
        .icon(LayoutDashboardIcon), // More intuitive for project overview

      S.documentTypeListItem('service').title('Service').icon(HammerIcon),

      S.documentTypeListItem('testimonial')
        .title('Testimonial')
        .icon(MessageSquareQuoteIcon),

      S.documentTypeListItem('contact').title('Contact Info').icon(MailIcon),

      S.documentTypeListItem('resume').title('Resume').icon(FileUser),

      S.documentTypeListItem('techCategory')
        .title('Technology/Tool Category')
        .icon(CodeIcon),
    ]);
