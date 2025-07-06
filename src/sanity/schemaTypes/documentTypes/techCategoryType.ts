import { isUniqueAcrossAllDocuments } from "@/sanity/lib/utils";
import { CodeIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const techCategoryType = defineType({
  name: "techCategory",
  title: "Technology Category",
  type: "document",
  icon: CodeIcon,
  fields: [
    defineField({
      name: "categoryName",
      title: "Category Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Category name is required."),
    }),

    defineField({
      name: "categorySlug",
      title: "Category Slug",
      type: "slug",
      description:
        "A unique, URL-friendly identifier for the category (e.g., 'frontend-frameworks'). Auto-generated from Category Name.",
      options: {
        source: "categoryName",
        maxLength: 96,
        isUnique: isUniqueAcrossAllDocuments,
      },
      validation: (Rule) => Rule.required().error("Category slug is required."),
    }),

    defineField({
      name: "categoryDescription",
      title: "Category Description",
      type: "text",
      description: "Provide a brief description of the category.",
    }),
  ],
  preview: {
    select: {
      title: "categoryName",
      subtitle: "categorySlug.current",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Category",
        subtitle: subtitle ? `Slug: ${subtitle}` : "No slug generated",
      };
    },
  },
});
