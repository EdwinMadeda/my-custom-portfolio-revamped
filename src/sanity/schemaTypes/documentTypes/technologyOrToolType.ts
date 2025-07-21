import { defineField, defineType } from "sanity";
import { WrenchIcon } from "lucide-react";

export const technologyOrToolType = defineType({
  name: "technologyOrTool",
  title: "Technology or Tool",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({
      name: "techName",
      title: "Tech Name",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(20)
          .error("Tech Name must be between 3 and 20 characters."),
    }),
    defineField({
      name: "techDescription",
      title: "Tech Description",
      type: "text",
      description: "Provide a brief description of the technology or tool.",
      validation: (Rule) =>
        Rule.required()
          .max(150)
          .error(
            "A Tech description is required and must be under 150 characters.",
          ),
    }),
    defineField({
      name: "techLogo",
      title: "Tech Logo",
      type: "image",
      options: {
        metadata: ["blurhash", "lqip", "image"],
      },
      description:
        "Logo or icon representing the technology (must be provided).",
      validation: (Rule) =>
        Rule.required().assetRequired().error("Technology logo is required."),
    }),
    defineField({
      name: "proficiencyLevel",
      title: "Proficiency Level",
      type: "string",
      options: {
        list: ["Beginner", "Intermediate", "Advanced", "Expert"],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "Intermediate",
    }),

    defineField({
      name: "websiteUrl",
      title: "Official Website URL",
      type: "url",
      description:
        "Link to the official website or documentation for this technology.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).error(
          "Please enter a valid absolute URL (starting with http:// or https://).",
        ),
    }),

    defineField({
      name: "techCategory",
      title: "Technology Category",
      type: "reference",
      to: [{ type: "techCategory" }],
      description:
        "Select the category or domain this technology or tool belongs to. You can add new categories in the category section.",
      validation: (Rule) =>
        Rule.required().error("Technology category is required."),
    }),
  ],
  preview: {
    select: {
      title: "techName",
      subtitle: "proficiencyLevel",
      media: "techLogo",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title,
        subtitle: `Proficiency: ${subtitle || "N/A"}`,
        media,
      };
    },
  },
});
