// schemas/email.ts

import { defineField, defineType } from "sanity";
import { Mail } from "lucide-react";

export const contactEmailType = defineType({
  name: "contactEmail",
  title: "Email Address",
  type: "document",
  icon: Mail,
  fields: [
    defineField({
      name: "title",
      title: "Email Set Name",
      description:
        "A descriptive name for this email (e.g., 'Primary Email', 'Work Email', 'Old Email').",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Email Address",
      type: "string",
      validation: (Rule) =>
        Rule.required().email().error("Please provide a valid email address."),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "address",
    },
  },
});
