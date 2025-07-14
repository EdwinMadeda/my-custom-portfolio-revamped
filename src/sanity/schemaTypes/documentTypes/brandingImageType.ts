// schemas/brandingImage.ts (assuming this is your file)
import { ImageIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const brandingImageType = defineType({
  name: "brandingImage",
  title: "Branding Image",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Branding Image File",
      type: "image",
      options: {
        hotspot: true,
      },
      description: `
        **Purpose:** This is your primary brand image (e.g., your logo or signature image). It is used across the website and serves as a default fallback for social sharing images if a specific Meta Image isn't provided.
        **Guidelines:**
        - **High Quality:** Upload a high-resolution version for versatility across different placements.
        - **Adaptability:** Consider how it might appear in various contexts (e.g., header, footer, favicon, social share fallback).
        - **Recommended Size:** While flexible, ensure it has enough resolution to scale down cleanly (e.g., at least 1200px on its longest side).
        - **Transparency:** Use a PNG with transparency if your logo has non-rectangular shapes.
      `,
      validation: (Rule) =>
        Rule.required().error("A branding image is required."),
    }),
    defineField({
      name: "altText",
      title: "Branding Image Alt Text",
      type: "string",
      description: `
        **Purpose:** Provides a textual description of your branding image for screen readers (accessibility) and search engines (SEO).
        **Guidelines:**
        - **Describe Your Brand:** Clearly state what the image is, e.g., "John Doe's personal brand logo" or "Acme Corp company logo."
        - **Be Concise:** Keep it brief and to the point.
        - **Avoid Redundancy:** No need to say "image of..." as screen readers announce it.
        - **Example:** "John Doe's professional portfolio logo featuring initials JD."
      `,
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
