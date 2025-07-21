import { MonitorIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const metaImageType = defineType({
  name: "metaImage",
  title: "Meta Image",
  type: "document",
  icon: MonitorIcon,
  fields: [
    defineField({
      name: "image",
      title: "Meta Image File",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["blurhash", "lqip", "image"],
      },
      description: `
        **Purpose:** This is the primary image file used for social media sharing (e.g., Twitter, Facebook, LinkedIn) and sometimes in search engine results.
        **Guidelines:**
        - **Visual Impact:** Choose an image that is visually appealing and represents your brand or the page content effectively.
        - **Recommended Dimensions:** Aim for **1200x630 pixels** for optimal display without cropping across most platforms. Other common aspect ratios are also supported, but this is the safest.
        - **File Size:** Keep file sizes reasonable for faster loading.
        - **Content:** Avoid placing critical text too close to the edges, as some platforms might crop slightly.
      `,
      validation: (Rule) => Rule.required().error("A meta image is required."),
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
      description: `
        **Purpose:** Provides a textual alternative to the image for screen readers (accessibility) and search engines (SEO).
        **Guidelines:**
        - **Be Descriptive:** Describe the image content clearly and concisely.
        - **Contextual:** Include keywords relevant to the page and image, but write naturally.
        - **Concise:** Aim for **10-150 characters**. Long alt text can be cumbersome for screen readers.
        - **Avoid "image of" or "picture of":** Screen readers already announce it as an image.
        - **Example:** If it's a briefcase for a portfolio, use "Professional briefcase symbolizing John Doe's portfolio."
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
        title: title || "Meta Image (no alt text",
        subtitle: "Meta Image",
        media: media,
      };
    },
  },
});
