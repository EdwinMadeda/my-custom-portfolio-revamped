import { ImageIcon } from "lucide-react";
import { title } from "process";
import { defineField, defineType } from "sanity";

export const brandingImageType = defineType({
  name: "brandingImage",
  title: "Branding Image",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Branding Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) =>
        Rule.required().error("A branding image is required."),
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
      description:
        "Alt text for the image (important for SEO and accessibility)",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(150)
          .error("Alt text is required (10-150 characters)."),
    }),
  ],
  preview: {
    select: {
      title: "altText",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Branding Image (no alt text",
        subtitle: "Branding Image",
        media: media,
      };
    },
  },
});
