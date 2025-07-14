import { Building2 } from "lucide-react";
import { defineField, defineType } from "sanity";

export const affiliationType = defineType({
  name: "affiliation",
  title: "Affiliation",
  type: "document",
  icon: Building2,
  fields: [
    defineField({
      name: "name",
      title: "Affiliation Name",
      type: "string",
      description: "The name of the organization, company, or project.",
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(100)
          .error("Affiliation Name must be between 2 and 100 characters."),
    }),
    defineField({
      name: "type",
      title: "Affiliation Type",
      type: "string",
      description:
        "Select the type of organization or group this person represents.",
      options: {
        list: [
          { title: "Company", value: "company" },
          { title: "Nonprofit", value: "nonprofit" },
          { title: "Community Project", value: "community" },
          { title: "Open Source", value: "openSource" },
          { title: "Government Body", value: "government" },
          { title: "Freelance", value: "freelance" },
          { title: "Personal Brand", value: "personalBrand" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) =>
        Rule.required().error("Affiliation type is required."),
      initialValue: "company",
    }),

    defineField({
      name: "link",
      title: "Official Website/Link",
      type: "url",
      description:
        "Link to the official website or project page for this affiliation (optional).",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).error(
          "Please provide a valid URL (starting with http:// or https://).",
        ),
    }),

    defineField({
      name: "logo",
      title: "Affiliation Logo",
      type: "image",
      description: "Upload the official logo of the organization (optional).",
      options: {
        hotspot: true,
        storeOriginalFilename: false,
      },
    }),

    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      description:
        "A brief description or mission statement of the affiliation (optional).",
      rows: 3,
    }),

    defineField({
      name: "location",
      title: "Headquarters Location",
      type: "string",
      description: "e.g., 'Diani Beach, Kwale County, Kenya' (optional).",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "type",
      media: "logo",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Untitled Affiliation",
        subtitle: subtitle
          ? `Type: ${subtitle.charAt(0).toUpperCase() + subtitle.slice(1)}`
          : "No type specified",
        media,
      };
    },
  },
});
