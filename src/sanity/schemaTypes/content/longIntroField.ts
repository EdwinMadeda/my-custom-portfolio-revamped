import { defineField, Rule, TextRule } from "sanity";

export const longIntroField = ({
  name = "longIntro",
  title = "Long Introduction",
  description = "A more detailed introduction for this section (optional).",
  initialValue = "",
  validation,
  ...rest
}: {
  name?: string;
  title?: string;
  description?: string;
  initialValue?: string;
  validation?: (Rule: TextRule | Rule) => TextRule | Rule;
}) =>
  defineField({
    name,
    title,
    type: "text",
    description,
    initialValue,
    rows: 5,
    validation:
      validation ??
      ((Rule) =>
        Rule.min(5)
          .max(300)
          .error(`${title} must be between 5 and 300 characters if provided.`)),
    ...rest,
  });
