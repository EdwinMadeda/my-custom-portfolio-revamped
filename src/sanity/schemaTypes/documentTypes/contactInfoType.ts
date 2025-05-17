import { defineField, defineType } from "sanity";
import { icons, SocialPlatform } from "@/config/icons";
import { socialPlatforms } from "../content/socialMediaPlatforms";
import { countryCodes } from "@/config/country-codes";

export const contactInfoType = defineType({
  name: "contact",
  title: "Contact Information",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) =>
        Rule.required().email().error("Please provide a valid email address."),
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "object",
      fields: [
        defineField({
          name: "countryCode",
          title: "Country Code",
          type: "string",
          options: {
            list: countryCodes.map(({ code, country, flag }) => ({
              title: `${flag} ${country} (+${code})`,
              value: String(code),
            })),
          },
          validation: (Rule) =>
            Rule.required().error("Please select a country code."),
        }),
        defineField({
          name: "phoneNumberValue",
          title: "Phone Number (Local)",
          type: "string",
          validation: (Rule) =>
            Rule.regex(
              /^\d{1,14}$/,
              "Please enter a valid phone number (e.g., 555123456).",
            ),
          description:
            "Enter your local phone number, excluding the country code (e.g., 555123456).",
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      description:
        "Provide links to your social media profiles (e.g., LinkedIn, Twitter, GitHub). Select the appropriate platform using the icons.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Social Platform",
              type: "string",
              options: {
                list: socialPlatforms.map(({ title, value }) => ({
                  title,
                  value,
                  icon: icons[value as SocialPlatform],
                })),
              },
              validation: (Rule) =>
                Rule.required().error("Please select a social media platform."),
            }),
            defineField({
              name: "link",
              title: "Platform Link",
              type: "url",
              validation: (Rule) =>
                Rule.uri({ scheme: ["http", "https"] }).error(
                  "Please provide a valid URL for your social media platform.",
                ),
            }),
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "link",
              media: "platform",
            },
            prepare(selection) {
              const { title, link, media } = selection;
              return {
                title: title,
                subtitle: link,
                media: icons[media as SocialPlatform],
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "email",
    },
  },
});
