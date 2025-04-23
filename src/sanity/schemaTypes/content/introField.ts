import { defineField, Rule, StringRule } from 'sanity';

export const introField = ({
  name = 'intro',
  title = 'Introduction',
  description = 'A short introduction or tagline.',
  initialValue = '',
  validation,
}: {
  name?: string;
  title?: string;
  description?: string;
  initialValue: string;
  validation?: (Rule: StringRule | Rule) => Rule;
}) =>
  defineField({
    name,
    title,
    type: 'string',
    description,
    initialValue,
    validation:
      validation ??
      ((Rule) =>
        Rule.max(150).error(
          `${title} must be between 5 and 150 characters and cannot be empty or just whitespace.`
        )),
  });
