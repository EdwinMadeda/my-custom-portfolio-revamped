import { defineField } from "sanity";

export const metadataFields = [
  defineField({
    name: "metaTitle",
    title: "Meta Title",
    type: "string",
    description: "Defaults to Profile Name if not set.",
    validation: (Rule) => Rule.max(60).error("Max 60 characters"),
  }),
  defineField({
    name: "metaDescription",
    title: "Meta Description",
    type: "text",
    description: "Defaults to Hero Tagline or About Bio if not set.",
    validation: (Rule) => Rule.max(160).error("Max 160 characters"),
  }),
  defineField({
    name: "metaKeywords",
    title: "Meta Keywords",
    type: "array",
    of: [{ type: "string" }],
    description: "Keywords for search engines (optional but useful).",
  }),
  defineField({
    name: "metaImage",
    title: "Meta Image",
    type: "image",
    description: "Defaults to Brand Image if not set.",
  }),
  defineField({
    name: "metaURL",
    title: "Meta URL",
    type: "url",
    description: "The canonical URL for the profile (auto-generated if blank).",
  }),
  defineField({
    name: "metaType",
    title: "Meta Type",
    type: "string",
    options: {
      list: ["website", "profile", "portfolio"],
    },
    description: "Type of the page for Open Graph (default: profile).",
  }),
];
