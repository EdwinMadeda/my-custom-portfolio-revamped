import { HammerIcon, ImageIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const serviceType = defineType({
  name: "service",
  title: "Service / Area of Expertise",
  type: "document",
  icon: HammerIcon,
  fields: [
    defineField({
      name: "serviceIcon",
      title: "Service / Expertise Icon",
      type: "image",
      options: {
        metadata: ["blurhash", "lqip", "image"],
      },
      description:
        "An icon representing this service or area of expertise (optional).",
    }),
    defineField({
      name: "serviceName",
      title: "Service Name / Expertise Name",
      type: "string",
      description:
        "The name of this service offering or core area of expertise (e.g., 'Web Development', 'Technical Consulting', 'Project Management').",
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(100)
          .error(
            "Service Name / Expertise Name must be between 5 and 100 characters.",
          ),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description:
        "A brief overview of the service or expertise, often used for cards or quick summaries.",
      validation: (Rule) =>
        Rule.required()
          .max(300)
          .error("A short description is required (max 300 characters)."),
    }),
    defineField({
      name: "longDescription",
      title: "Detailed Description / Information",
      type: "array",
      description:
        "Provide in-depth details about this service or your expertise, allowing for rich text, lists, and more (optional).",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
          ],
          lists: [
            { title: "Bullet List", value: "bullet" },
            { title: "Numbered List", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "External Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          icon: ImageIcon,
          options: {
            hotspot: true,
            metadata: ["blurhash", "lqip", "image"],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "serviceName",
      subtitle: "shortDescription",
      media: "serviceIcon",
    },
    prepare({ title, subtitle, media }) {
      const truncatedSubtitle = subtitle
        ? `${subtitle.substring(0, 70)}...`
        : "No short description provided";
      return {
        title: title || "Untitled Service/Area of Expertise",
        subtitle: truncatedSubtitle,
        media: media,
      };
    },
  },
});
