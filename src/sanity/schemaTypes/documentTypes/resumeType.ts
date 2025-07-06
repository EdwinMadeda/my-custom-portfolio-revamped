import { defineField, defineType } from "sanity";

export const resumeType = defineType({
  name: "resume",
  title: "Resume",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Resume Set Name",
      description:
        "A descriptive title for this resume (e.g., 'Latest Developer Resume', 'Consulting CV - v2').",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pdfFile",
      title: "Resume File",
      description: "Upload the resume file (PDF format only).",
      type: "file",
      options: {
        accept: "application/pdf",
      },
      validation: (Rule) =>
        Rule.required().assetRequired().error("Resume file is required."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "pdfFile",
    },
    prepare({ title, media }) {
      return {
        title: title || "Untitled Resume",
        subtitle: media ? "PDF File" : "",
        media: media,
      };
    },
  },
});
