import { LayoutList } from "lucide-react";
import { defineField, defineType } from "sanity";

export const screenshotViewItemDescType = defineType({
  name: "screenshotViewItemDesc",
  title: "Screenshot View Item",
  type: "document",
  icon: LayoutList,
  fields: [
    defineField({
      name: "title",
      title: "Display Title",
      type: "string",
      description: 'The name displayed in the dropdown (e.g., "Homepage")',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: "value",
      title: "Internal Value",
      type: "slug",
      description:
        'The unique internal indentifier (e.g., "homepage"). Auto-generated from Display Title.',
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "value.current",
    },
  },
});
