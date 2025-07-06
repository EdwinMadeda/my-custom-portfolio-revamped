import { navItems } from "@/config/site";
import { NavHref } from "@/types";
import { defineField } from "sanity";

export const heroFields = [
  defineField({
    name: "greeting",
    title: "Greeting",
    description:
      'A warm greeting or introduction. e.g. "Hi, I\'m [Your Name], a web developer."',
    type: "array",
    of: [
      {
        type: "block",
        styles: [{ title: "Normal", value: "normal" }],
        lists: [],
        marks: {
          decorators: [],
          annotations: [],
        },
      },
    ],
    validation: (Rule) => Rule.required().error("Greeting is required."),
  }),
  defineField({
    name: "tagline",
    title: "Tagline",
    type: "string",
    description:
      "A short and impactful statement that describes what you do or your value proposition.",
    validation: (Rule) =>
      Rule.max(100).error("Tagline cannot be longer than 100 characters."),
    initialValue: "Let's build something together",
  }),

  defineField({
    name: "subHeadline",
    title: "Sub-headline",
    type: "text",
    description:
      "A longer description of your work, passion, or mission. Can explain more about your skills or approach.",
    validation: (Rule) =>
      Rule.max(200).error("Sub-headline cannot be longer than 200 characters."),
  }),

  defineField({
    name: "ctaButtonText",
    title: "CTA Button Text",
    type: "string",
    initialValue: "View My Work",
    description:
      'Text to display on the call-to-action button. Default: "View My Work".',
    validation: (Rule) => Rule.required().error("CTA button text is required."),
  }),

  defineField({
    name: "ctaButtonLink",
    title: "CTA Button Link",
    type: "string",
    description:
      "The path or URL where the CTA button will direct users (e.g., '#works', '/about', or a full URL).",
    options: {
      list: navItems.map((item) => ({
        title: `${item.label} Section`,
        value: item.href,
      })),
    },
    validation: (Rule) =>
      Rule.required().error("A link is required for the CTA button."),
    initialValue: "#works" as NavHref,
  }),
];
