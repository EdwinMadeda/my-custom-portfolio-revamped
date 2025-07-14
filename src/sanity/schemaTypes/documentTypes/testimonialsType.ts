import { MessageSquareQuoteIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

interface PositionParent {
  positionTitle?: string;
  customPositionTitle?: string;
}

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: MessageSquareQuoteIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "The full name of the person providing the testimonial.",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(150)
          .error("Name must be between 3 and 150 characters."),
    }),
    defineField({
      name: "feedback",
      title: "Feedback",
      type: "array",
      description: "The testimonial text or feedback from the person.",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "External Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required().error("Feedback is required."),
    }),
    defineField({
      name: "position",
      title: "Position and Affiliation",
      type: "object",
      description:
        "Details about the person's role and the organization they represent.",
      fields: [
        defineField({
          name: "positionTitle",
          title: "Position Title",
          type: "string",
          description:
            "Select the person’s job title or position from the list, or choose 'Other' to enter a custom title.",
          options: {
            list: [
              // Tech & Engineering
              { title: "Software Engineer", value: "Software Engineer" },
              { title: "Frontend Developer", value: "Frontend Developer" },
              { title: "Backend Developer", value: "Backend Developer" },
              { title: "Full Stack Developer", value: "Full Stack Developer" },
              { title: "DevOps Engineer", value: "DevOps Engineer" },

              {
                title: "Site Reliability Engineer",
                value: "Site Reliability Engineer",
              },
              { title: "Mobile Developer", value: "Mobile Developer" },
              { title: "QA Engineer", value: "QA Engineer" },
              {
                title: "Machine Learning Engineer",
                value: "Machine Learning Engineer",
              },
              { title: "Data Engineer", value: "Data Engineer" },
              { title: "Cloud Architect", value: "Cloud Architect" },

              // Design & UX
              { title: "UX Designer", value: "UX Designer" },
              { title: "UI Designer", value: "UI Designer" },
              { title: "Product Designer", value: "Product Designer" },
              { title: "Graphic Designer", value: "Graphic Designer" },
              { title: "Design Lead", value: "Design Lead" },

              // Product & Marketing
              { title: "Product Manager", value: "Product Manager" },
              { title: "Product Owner", value: "Product Owner" },
              { title: "Marketing Director", value: "Marketing Director" },
              { title: "Growth Marketer", value: "Growth Marketer" },
              { title: "Content Strategist", value: "Content Strategist" },

              // Leadership & Strategy
              { title: "CTO", value: "CTO" },
              { title: "CEO", value: "CEO" },
              { title: "Co-founder", value: "Co-founder" },
              { title: "Engineering Manager", value: "Engineering Manager" },
              { title: "Tech Lead", value: "Tech Lead" },
              { title: "Lead Developer", value: "Lead Developer" },
              {
                title: "Director of Engineering",
                value: "Director of Engineering",
              },
              { title: "Head of Design", value: "Head of Design" },

              // Community & Misc
              {
                title: "Open Source Contributor",
                value: "Open Source Contributor",
              },
              { title: "Freelancer", value: "Freelancer" },
              { title: "Consultant", value: "Consultant" },
              { title: "Instructor", value: "Instructor" },
              { title: "Mentor", value: "Mentor" },
              { title: "Volunteer", value: "Volunteer" },
              { title: "Advocate", value: "Advocate" },
              { title: "Other", value: "Other" },
            ],
          },
          validation: (Rule) =>
            Rule.required().error("Position title is required."),
        }),

        defineField({
          name: "customPositionTitle",
          title: "Custom Position Title",
          type: "string",
          description:
            'Enter a custom title if "Other" was selected from the Position Title list.',
          hidden: ({ parent }) => parent?.positionTitle !== "Other",
          validation: (Rule) =>
            Rule.custom((customValue, context) => {
              const selectedPosition = (context.parent as PositionParent)
                ?.positionTitle;
              if (selectedPosition === "Other" && !customValue) {
                return 'Custom position title is required when "Other" is selected.';
              }
              return true;
            }),
        }),

        defineField({
          name: "affiliation",
          title: "Affiliation / Organization",
          type: "reference",
          to: [{ type: "affiliation" }],
          description:
            "Select the organization or project the person is affiliated with. You can create new affiliations in the 'Affiliations' section.",
          validation: (Rule) =>
            Rule.required().error(
              "Affiliation is required for this testimonial.",
            ),
          weak: true,
        }),
      ],
    }),

    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      description: "Upload a photo of the person giving the testimonial.",
      options: { hotspot: true, storeOriginalFilename: false },
      validation: (Rule) =>
        Rule.required().assetRequired().error("Testimonial photo is required."),
    }),
    defineField({
      name: "isPinned",
      title: "Pinned Testimonial",
      type: "boolean",
      description: "Mark this testimonial as pinned to feature it at the top.",
      initialValue: false,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Most Popular", value: "mostPopular" },
          { title: "Client's Favorite", value: "clientsFavorite" },
          { title: "Top Rated", value: "topRated" },
          { title: "Other", value: "other" },
        ],
      },
      description: "Categorize testimonials based on their type or importance.",
      initialValue: "other",
    }),
  ],
  preview: {
    select: {
      title: "name",
      positionTitle: "position.positionTitle",
      customPositionTitle: "position.customPositionTitle",
      affiliationName: "position.affiliation->name",
      media: "photo",
    },
    prepare({
      title,
      positionTitle,
      customPositionTitle,
      affiliationName,
      media,
    }) {
      let subtitleText = "";
      if (positionTitle === "Other" && customPositionTitle) {
        subtitleText = customPositionTitle;
      } else if (positionTitle) {
        subtitleText = positionTitle;
      }

      if (affiliationName) {
        if (subtitleText) {
          subtitleText += ` at ${affiliationName}`;
        } else {
          subtitleText = affiliationName;
        }
      }

      if (!subtitleText) {
        subtitleText = "No position details";
      }
      return {
        title: title || "Untitled Testimonial",
        subtitle: subtitleText,
        media: media,
      };
    },
  },
});
