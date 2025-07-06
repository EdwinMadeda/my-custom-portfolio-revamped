import { defineField, Rule, StringRule } from "sanity";

export const shortIntroField = ({
  name = "shortIntro",
  title = "Short Introduction",
  description = "A concise introduction or tagline for this section (optional).",
  initialValue = "",
  validation,
  ...rest
}: {
  name?: string;
  title?: string;
  description?: string;
  initialValue: string;
  validation?: (Rule: StringRule | Rule) => StringRule | Rule;
}) =>
  defineField({
    name,
    title,
    type: "string",
    description,
    initialValue,
    validation:
      validation ??
      ((Rule) =>
        Rule.min(5)
          .max(150)
          .error(`${title} must be between 5 and 150 characters if provided.`)),
    ...rest,
  });
