import { isUniqueAcrossAllDocuments } from "@/sanity/lib/utils";
import { TagIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const metaKeywordType = defineType({
  name: "metaKeyword",
  title: "Meta Keyword",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "keywordName",
      title: "Keyword Name",
      description:
        'The exact keyword string (e.g., "web development", "react", "UI/UX").',
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "keywordSlug",
      title: "Keyword Slug",
      type: "slug",
      description:
        "A unique, URL-friendly identifier for this keyword (e.g., 'web-development'). It's auto-generated from the Keyword Name.",
      options: {
        source: "keywordName",
        maxLength: 96,
        isUnique: isUniqueAcrossAllDocuments,
      },
      validation: (Rule) => Rule.required().error("Keyword slug is required."),
    }),
  ],
  preview: {
    select: {
      title: "keywordName",
      subtitle: "keywordSlug.current",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled MetaKeyword",
        subtitle: subtitle ? `Slug: ${subtitle}` : "No slug generated",
      };
    },
  },
});
