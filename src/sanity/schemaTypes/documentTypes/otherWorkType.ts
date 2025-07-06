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
      description: "The title of this contribution, article, or smaller work.",
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
      description: "A unique identifier for this work, used in URLs.",
    }),

    defineField({
      name: "thumbnail",
      title: "Work Thumbnail (Optional)",
      type: "image",
      options: {
        hotspot: true,
      },
      description: `Upload an optional image, icon, or screenshot to represent this work. 
      For best results in cards, aim for a 16:9 aspect ratio (e.g., 1280x720px) and ensure key elements are centered.`,
    }),

    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(10).max(300),
    }),

    defineField({
      name: "technologiesUsed",
      title: "Technologies Used",
      type: "array",
      description:
        "Technologies, tools, and frameworks relevant to this work (optional).",
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
        "Link to the GitHub repository, article, live demo, or relevant URL for this work.",
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
          options: { hotspot: true },
        },
      ],
    }),

    defineField({
      name: "date",
      title: "Date of Contribution / Completion",
      type: "date",
      description:
        "The date this work was contributed, completed, or published (optional).",
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
