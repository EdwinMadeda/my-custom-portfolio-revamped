import { defineField } from "sanity";

export const aboutFields = [
  defineField({
    name: "personalStory",
    title: "About Me",
    type: "array",
    of: [
      {
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "Heading 2", value: "h2" },
          { title: "Heading 3", value: "h3" },
          { title: "Heading 4", value: "h4" },
          { title: "Quote", value: "blockquote" },
        ],
        lists: [
          { title: "Bullet", value: "bullet" },
          { title: "Numbered", value: "number" },
        ],
        marks: {
          decorators: [
            { title: "Bold", value: "strong" },
            { title: "Italic", value: "em" },
          ],
          annotations: [
            {
              name: "link",
              type: "object",
              title: "External Link",
              fields: [
                defineField({
                  name: "href",
                  type: "url",
                  title: "URL",
                  validation: (Rule) =>
                    Rule.required().uri({
                      scheme: ["http", "https", "mailto", "tel"],
                    }),
                }),
                defineField({
                  name: "blank",
                  type: "boolean",
                  title: "Open in new tab",
                  initialValue: true,
                }),
              ],
            },
          ],
        },
      },
      {
        type: "image",
        options: { hotspot: true, storeOriginalFilename: false },
        fields: [
          defineField({
            name: "alt",
            type: "string",
            title: "Alt text",
            description: "Alt text is important for SEO and accessibility.",
            validation: (Rule) =>
              Rule.required().error(
                "Alternative text is required for accessibility",
              ),
          }),
          defineField({
            name: "caption",
            type: "string",
            title: "Caption",
            description: "Optional text to display below the image.",
          }),
        ],
      },
    ],
    description:
      "Tell us about your journey, background, and experiences. You can structure your story with headings, lists, links, and embed images.",
    validation: (Rule) => Rule.required().error("Personal story is required."),
  }),
];
