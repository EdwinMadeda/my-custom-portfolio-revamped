import { icons, SocialPlatform } from "@/config/icons";
import { defineField, defineType } from "sanity";
import { socialPlatforms } from "../content/socialMediaPlatforms";
import { Link } from "lucide-react";

export const socialMediaLinksType = defineType({
  name: "socialMediaLinks",
  title: "Social Media Links",
  type: "document",
  icon: Link,
  fields: [
    defineField({
      name: "title",
      title: "Social Links Set Name",
      description:
        "A descriptive name for this group of social links (e.g., 'Primary Socials', 'Dev Portfolio Socials').",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      description:
        "Provide links to your social media profiles (e.g., LinkedIn, Twitter, GitHub). Select the appropriate platform using the icons.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Social Platform",
              type: "string",
              options: {
                list: socialPlatforms.map(({ title, value }) => ({
                  title,
                  value,
                  icon: icons[value as SocialPlatform],
                })),
              },
              validation: (Rule) =>
                Rule.required().error("Please select a social media platform."),
            }),
            defineField({
              name: "link",
              title: "Platform Link",
              type: "url",
              validation: (Rule) =>
                Rule.required()
                  .uri({ scheme: ["http", "https"] })
                  .error(
                    "Please provide a valid URL for your social media platform (i.e., starting with http:// or https://).",
                  ),
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "link",
              media: "platform",
            },
            prepare(selection) {
              const { title, link, media } = selection;
              return {
                title: title,
                subtitle: link,
                media: icons[media as SocialPlatform],
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.unique().error(
          "Duplicate social media platforms are not allowed in one set. Each platform should be unique.",
        ),
    }),
  ],
  preview: {
    select: {
      title: "title",
      allLinks: "links",
    },
    prepare(selection) {
      const { title, allLinks } = selection;
      const linkCount = allLinks ? allLinks.length : 0;
      return {
        title: title,
        subtitle: `${linkCount} links`,
      };
    },
  },
});
