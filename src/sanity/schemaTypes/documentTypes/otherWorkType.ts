import { BookOpenText } from "lucide-react";
import { defineField, defineType } from "sanity";

export const otherWorkType = defineType({
  name: "otherWork",
  title: "Other work / Contribution",
  type: "document",
  icon: BookOpenText,
  fields: [
    defineField({
      name: "title",
      title: "Work Title",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(150)
          .error(
            "Work Title must be between 5 and 150 characters and cannot be empty or just whitespace",
          ),
      description:
        "The main title for this contribution, article, or smaller work.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error("Slug is required"),
      description:
        "A unique, URL-friendly identifier for this work (e.g., 'my-open-source-project'). Auto-generated from the title.",
    }),

    defineField({
      name: "thumbnail",
      title: "Work Thumbnail (Optional)",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["blurhash", "lqip", "image"],
      },
      description: `
        Upload an optional image, icon, or screenshot to represent this work.
        **Guidelines:**
        - For best results in cards, aim for a **16:9 aspect ratio** (e.g., 1280x720px, 1920x1080px).
        - Ensure key visual elements are **centered** for optimal cropping across different layouts.
      `,
    }),

    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(300),
      description:
        "A brief summary of this work, appearing in listings and previews. Aim for 10-300 characters.",
    }),

    defineField({
      name: "technologiesUsed",
      title: "Technologies Used",
      type: "array",
      description:
        "List relevant technologies, tools, and frameworks used in this work (optional, max 5).",
      of: [
        {
          type: "reference",
          to: [{ type: "technologyOrTool" }],
        },
      ],

      validation: (Rule) =>
        Rule.max(5).error(
          "You can list a maximum of 5 technologies/tools for this work.",
        ),
    }),

    defineField({
      name: "contributionLink",
      title: "Contribution Link",
      type: "url",
      description:
        "Provide the primary link for this work (e.g., GitHub repo, live demo, published article URL). This is required.",
      validation: (Rule) =>
        Rule.required()
          .uri({ allowRelative: true, scheme: ["http", "https"] })
          .error(
            "Please enter a valid URL starting with http:// or https:// or a valid relative URL.",
          ),
    }),

    defineField({
      name: "detailedDescription",
      title: "Detailed Work/Contribution Description (Optional)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
        {
          type: "image",
          options: {
            hotspot: true,
            metadata: ["blurhash", "lqip", "image"],
          },
        },
      ],
      description:
        "Provide a comprehensive overview of the work, its purpose, and any key features or challenges. You can include text and images.",
    }),

    defineField({
      name: "date",
      title: "Date of Contribution / Completion",
      type: "date",
      description:
        "The date this work was completed, published, or last significantly updated (optional).",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
      subtitle: "contributionLink",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Link: ${subtitle}` : "",
        media,
      };
    },
  },
});
